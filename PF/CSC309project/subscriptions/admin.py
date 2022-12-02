from django.contrib import admin

# Register your models here.
from subscriptions import models


class SubPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'month_duration')


class UserPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'sub_plan', 'expires_in')


class UserCardAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'card_num', 'cvv', 'expires_in')


class UserPaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'card_num', 'amount', 'date', 'time', 'paid',
                    'month_duration')


admin.site.register(models.SubPlan, SubPlanAdmin)
admin.site.register(models.UserPlan, UserPlanAdmin)
admin.site.register(models.UserCard, UserCardAdmin)
admin.site.register(models.UserPayment, UserPaymentAdmin)
