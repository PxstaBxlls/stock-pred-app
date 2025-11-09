from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True,min_length = 5,style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['username','email','password']

    def create(self,validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )    #manual way
        #User.objects.create = save password in manual form
        #User.objects.create_user = automatically hash the password
        # user = User.objects.create_user(**validated_data) #automatic way
        return user
        