from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer


# login code taken from https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5

# Create your views here.
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class SignUpView(CreateAPIView):
    model = get_user_model()
    permission_classes = ()
    authentication_classes = ()
    serializer_class = RegisterSerializer


class UpdateUserView(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RegisterSerializer

    def get_object(self):
        return self.request.user
