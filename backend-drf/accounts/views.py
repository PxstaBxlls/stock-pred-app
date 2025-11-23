from django.shortcuts import render
from .serializers import UserSerializers
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    
    permission_classes = [AllowAny]       #should be accesible to anyone
    
    
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        response = {
            'status' : 'Req was permitted'
        }
        return Response(response)