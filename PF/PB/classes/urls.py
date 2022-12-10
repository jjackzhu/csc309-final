from django.urls import path

from .views import ScheduleView, StudioClassView, EnrollClassView, DropClassView, StudiosView

app_name = 'classes'
urlpatterns = [
    path('<studio_id>/info/', StudioClassView.as_view(), name='studio_class'),
    path('studios/', StudiosView.as_view(), name='studios'),
    path('<class_id>/enroll/', EnrollClassView.as_view(), name='enroll_class'),
    path('<class_id>/drop/', DropClassView.as_view(), name='drop_class'),
    path('history/', ScheduleView.as_view(), name='schedule'),
]