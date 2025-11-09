from django.urls import path,include
from accounts import views as userviews

urlpatterns = [
    path('register/',userviews.RegisterView.as_view()),
]