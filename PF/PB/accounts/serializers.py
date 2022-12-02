from rest_framework import serializers

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'avatar', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            avatar=validated_data['last_name'],
            phone_number=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token
