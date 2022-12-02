from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from .models import Classes, ClassSchedule


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'avatar', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}


class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ['studio', 'name', 'description', 'coach', 'keywords', 'capacity', 'time', 'end_recurrence']


class ScheduleSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    classes = ClassesSerializer()

    class Meta:
        model = ClassSchedule
        fields = ['user', 'classes']
