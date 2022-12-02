from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import CASCADE


# Create your models here.

# add a primary key reference to studio user model
from studios.models import Studio


class Classes(models.Model):
    studio = models.ForeignKey(to=Studio, on_delete=CASCADE, related_name='classes')
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    coach = models.CharField(max_length=100)
    keywords = models.CharField(max_length=200)
    capacity = models.IntegerField(default=0)
    time = models.DateTimeField()
    end_recurrence = models.DateTimeField()

    def __str__(self):
        return f'Class {self.pk} Name: {self.name}'


class ClassSchedule(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE)
    classes = models.ForeignKey(to=Classes, on_delete=CASCADE)

    def __str__(self):
        return f'{self.classes.name}: {self.user.username}'


