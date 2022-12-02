from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
from subscriptions.models import UserPlan


class MyUser(AbstractUser):
    avatar = models.ImageField(upload_to='user_avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=12)

    def is_subscribed(self, date):
        try:
            user_plan = UserPlan.objects.get(user=self)
            return user_plan.is_subscribed(date)
        except UserPlan.DoesNotExist:
            return False
