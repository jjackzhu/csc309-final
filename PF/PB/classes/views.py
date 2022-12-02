import datetime

from django.shortcuts import render
from rest_framework.generics import ListAPIView, get_object_or_404, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from studios.models import Studio
from .models import Classes, ClassSchedule
from .serializers import ClassesSerializer, ScheduleSerializer


# Create your views here.


class StudioClassView(ListAPIView):
    model = Classes
    serializer_class = ClassesSerializer

    # paginate_by = 100

    def get_queryset(self):
        current_time = datetime.datetime.now()
        studio_id = self.kwargs.get("studio_id")
        studio = get_object_or_404(Studio, pk=studio_id)
        # what if no class has that studio edge case
        classes = Classes.objects.filter(studio=studio).filter(time__gte=current_time).order_by('time')
        return classes


class ScheduleView(ListAPIView):
    permission_classes = [IsAuthenticated]
    model = ClassSchedule
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        classes = ClassSchedule.objects.filter(user=self.request.user)
        print(classes)
        return classes


class EnrollClassView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        class_to_enroll = get_object_or_404(Classes, id=kwargs['class_id'])
        user = self.request.user
        # check if user subscribed
        if not user.is_subscribed(class_to_enroll.time.date()):
            return Response({
                'detail': "User not subscribed"
            })

        # update classes
        # check capacity and time
        capacity = class_to_enroll.capacity
        if capacity - 1 <= 0:
            return Response({
                'detail': "Overcapacity"
            })
        class_to_enroll.capacity = capacity - 1
        class_to_enroll.save()

        current_time = datetime.datetime.now()
        if current_time.replace(tzinfo=None) >= class_to_enroll.time.replace(tzinfo=None):
            return Response({
                'detail': "Class has already finished or started"
            })

        ClassSchedule.objects.create(
            user=user,
            classes=class_to_enroll
        )
        return Response({
            'detail': "user was enrolled"
        })


class DropClassView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        class_to_drop = get_object_or_404(Classes, id=kwargs['class_id'])
        current_time = datetime.datetime.now()
        if current_time.replace(tzinfo=None) >= class_to_drop.time.replace(tzinfo=None):
            return Response({
                'detail': "Class has already finished or started"
            })
        classes_to_drop = ClassSchedule.objects.filter(user=self.request.user).filter(classes=class_to_drop)
        classes_to_drop.delete()
        return Response({
            'detail': "classes were dropped"
        })
