from rest_framework import serializers
from .models import User, Account, Transaction
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'phone', 
            'first_name', 'last_name', 'security_question',
            'security_answer', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'security_answer': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash password and security answer
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['security_answer'] = make_password(validated_data['security_answer'].lower())
        
        # Create user
        user = User.objects.create(**validated_data)
        
        # Create default savings account
        Account.objects.create(
            user=user,
            account_number=f"NAA{user.id:08d}",
            account_type='SAVINGS',
            balance=0.00
        )
        
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'account_type', 'balance', 'created_at']
        read_only_fields = ['account_number', 'balance', 'created_at']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount', 'reference', 
                 'recipient_account', 'timestamp', 'status', 'balance_after']
        read_only_fields = ['timestamp', 'status', 'balance_after']

class TransferSerializer(serializers.Serializer):
    from_account = serializers.CharField(max_length=20)
    to_account = serializers.CharField(max_length=20)
    amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    reference = serializers.CharField(max_length=100)