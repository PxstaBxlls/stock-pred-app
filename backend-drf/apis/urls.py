from django.urls import path,include
from accounts import views as userviews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StockPredictionAPIView

urlpatterns = [
    path('register/',userviews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected_views/',userviews.ProtectedView.as_view()),
    path('predict/',StockPredictionAPIView.as_view(),name='stock_prediction')
]