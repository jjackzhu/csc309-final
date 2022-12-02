from django.urls import path

from . import views
from .views import SignUpView, UpdateUserView, MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenObtainPairView


app_name = 'accounts'
urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('edit/', UpdateUserView.as_view(), name='edit'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),


]

#path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),