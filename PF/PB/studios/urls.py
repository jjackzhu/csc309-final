from django.urls import path

from .views import GetClosestStudiosView, GetStudioInfoView, \
    StudioClassSearchView

app_name = "studios"
urlpatterns = [
    path("map/", GetClosestStudiosView.as_view(), name='studio_map'),
    path("<studio_id>/info/", GetStudioInfoView.as_view(), name='studio_info'),
    path("<studio_id>/class_search/", StudioClassSearchView.as_view(), name='class_search'),

]
