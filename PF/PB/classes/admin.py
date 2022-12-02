from datetime import timedelta

from django.contrib import admin
from .models import Classes, ClassSchedule


# Register your models here.
@admin.action(description='Add Weekly Classes')
def make_recur(modeladmin, request, queryset):
    curr_class = queryset.first()
    studio = curr_class.studio
    name = curr_class.name
    description = curr_class.description
    coach = curr_class.coach
    keywords = curr_class.keywords
    capacity = curr_class.capacity

    curr_time = curr_class.time
    end_recurrence = curr_class.end_recurrence
    while curr_time <= end_recurrence:
        curr_time = curr_time + timedelta(weeks=1)
        Classes.objects.create(
            studio=studio,
            name=name,
            description=description,
            coach=coach,
            keywords=keywords,
            capacity=capacity,
            time=curr_time,
            end_recurrence=end_recurrence
        )


class ClassesAdmin(admin.ModelAdmin):
    actions = [make_recur]


admin.site.register(Classes, ClassesAdmin)
admin.site.register(ClassSchedule)
