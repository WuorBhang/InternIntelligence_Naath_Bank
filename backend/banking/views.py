from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.db import transaction
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import User, Account, Transaction
from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    AccountSerializer,
    TransactionSerializer,
    TransferSerializer
)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccountListView(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

class AccountDetailView(generics.RetrieveAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(
            Account,
            account_number=self.kwargs['account_number'],
            user=self.request.user
        )

class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        account = get_object_or_404(
            Account,
            account_number=self.kwargs['account_number'],
            user=self.request.user
        )
        return account.transactions.all()

class TransferView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @method_decorator(ratelimit(key='user', rate='5/m'))
    def post(self, request):
        serializer = TransferSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        from_account = get_object_or_404(
            Account,
            account_number=data['from_account'],
            user=request.user
        )

        if from_account.balance < data['amount']:
            return Response(
                {'error': 'Insufficient funds'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            with transaction.atomic():
                # Deduct from sender
                from_account.balance -= data['amount']
                from_account.save()

                # Add to recipient
                to_account = get_object_or_404(
                    Account,
                    account_number=data['to_account']
                )
                to_account.balance += data['amount']
                to_account.save()

                # Create transactions
                Transaction.objects.create(
                    account=from_account,
                    transaction_type='TRANSFER',
                    amount=data['amount'],
                    reference=data['reference'],
                    recipient_account=data['to_account'],
                    status='COMPLETED',
                    balance_after=from_account.balance
                )

                Transaction.objects.create(
                    account=to_account,
                    transaction_type='TRANSFER',
                    amount=data['amount'],
                    reference=data['reference'],
                    recipient_account=data['from_account'],
                    status='COMPLETED',
                    balance_after=to_account.balance
                )

                return Response({'status': 'Transfer successful'})

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )