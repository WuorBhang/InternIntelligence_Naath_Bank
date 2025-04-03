from django.urls import path
from .views import (
    CustomTokenObtainPairView,
    UserCreateView,
    AccountListView,
    AccountDetailView,
    TransactionListView,
    TransferView
)

urlpatterns = [
    path('auth/register/', UserCreateView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('accounts/', AccountListView.as_view(), name='account-list'),
    path('accounts/<str:account_number>/', AccountDetailView.as_view(), name='account-detail'),
    path('accounts/<str:account_number>/transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('transfer/', TransferView.as_view(), name='transfer'),
]