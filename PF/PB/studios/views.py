
# Create your views here.
import datetime
from datetime import time

from django.core.exceptions import ObjectDoesNotExist
from geopy import distance

from geopy.geocoders import Nominatim
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from classes.models import Classes
from classes.serializers import ClassesSerializer
from .models import Studio, StudioAmenity, StudioImage
from .serializers import StudioAmenitySerializer, StudioImageSerializer, \
    StudioSerializer


# ----------helper functions------------
def distance_sort(studios, origin):
    #   calculate the distance between each studio in studios and the origin
    #   return the studios in order of closest to farthest distance

    for studio in studios:
        lat = studio.latitude
        long = studio.longitude
        studio_point = (lat, long)
        distance_in_km = distance.distance(origin, studio_point).km
        studio.distance = distance_in_km
        studio.save()

    # sort in order from closest to farthest distance to user
    sorted_studios = Studio.objects.order_by('distance')

    return sorted_studios


def filter_studios(studios, request):
    # filter studios based on query parameters in request

    # get the filter parameters
    studio_names = request.query_params.get("studio_names")
    amenity_types = request.query_params.get("amenities")

    if studio_names:
        studio_names = studio_names.split(",")
        studios = studios.filter(name__in=studio_names)

    if amenity_types:
        amenity_types = amenity_types.split(",")
        studios = studios.filter(amenity__type__in=amenity_types)

    return studios


# ------------Views------------
# address must be in toronto
"""
class GetClosestStudiosView(ListAPIView):
    queryset = Studio
    serializer_class = StudioSerializer
    location = None
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        address = self.request.data.get('address')
        if not address:
            return Response({'error': 'Not an address'})

        geolocator = Nominatim(user_agent="studios")
        location = geolocator.geocode(address)
        self.location = location

        if location is None:
            return Response({'error': 'Not a valid address'})

        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        # get the coordinates of the address provided by the user
        current_point = (self.location.latitude, self.location.longitude)

        studios = Studio.objects.all()

        # sort the studios based on distance
        studios = distance_sort(studios, current_point)

        # filter the sorted studios (if filter parameters were given)
        studios = filter_studios(studios, self.request)

        return studios
    """
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'perPage'
    max_page_size = 10

class GetClosestStudiosView(APIView, StandardResultsSetPagination):

    #queryset = Studio
    #serializer_class = StudioSerializer
    location = None
    pagination_class = StandardResultsSetPagination
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        address = self.request.data.get('address')
        if not address:
            return Response({'error': 'Not an address'})

        geolocator = Nominatim(user_agent="studios")
        location = geolocator.geocode(address)
        self.location = location

        if location is None:
            return Response({'error': 'Not a valid address'})

        #return super().get(request, *args, **kwargs)

    #def get_queryset(self):
        # get the coordinates of the address provided by the user
        current_point = (self.location.latitude, self.location.longitude)

        studios = Studio.objects.all()

        # sort the studios based on distance
        studios = distance_sort(studios, current_point)

        # filter the sorted studios (if filter parameters were given)
        studios = filter_studios(studios, self.request)

        studios = self.paginate_queryset(studios, request, view=self)
    
        studios_serializer = StudioSerializer(studios, many=True)

        #return studios
        #return Response(studios_serializer.data)
        return self.get_paginated_response(studios_serializer.data)



class GetStudioInfoView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        studio_id = self.kwargs.get("studio_id")
        try:
            studio = Studio.objects.get(id=studio_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Studio does not exist'})

        studio_amenities = StudioAmenity.objects.filter(studio=studio)
        studio_images = StudioImage.objects.filter(studio=studio)

        studio_serializer = StudioSerializer(studio)
        studio_amenity_serializer = StudioAmenitySerializer(studio_amenities,
                                                            many=True)
        studio_image_serializer = StudioImageSerializer(studio_images,
                                                        many=True, context={'request': request})

        return Response({
            'studio': studio_serializer.data,
            'amenities': studio_amenity_serializer.data,
            'images': studio_image_serializer.data,
        })


class StudioClassSearchView(ListAPIView):
    queryset = Studio
    serializer_class = ClassesSerializer
    studio = None
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        studio_id = self.kwargs.get("studio_id")
        try:
            self.studio = Studio.objects.get(id=studio_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Studio does not exist'})

        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        # get the classes associated with the studio
        classes = Classes.objects.filter(studio=self.studio)

        # get filter parameters
        class_names = self.request.query_params.get("class_names")
        coaches = self.request.query_params.get("coaches")
        dates = self.request.query_params.get("dates")
        time_range = self.request.query_params.get("time_range")

        if class_names:
            class_names = class_names.split(",")
            classes = classes.filter(name__in=class_names)

        if coaches:
            coaches = coaches.split(",")
            classes = classes.filter(coach__in=coaches)

        if dates:
            dates = dates.split(",")
            classes = classes.filter(time__date__in=dates)

        if time_range:
            time_range = time_range.split(",")
            start_end = []

            # separate the start/end times into hour and minute
            for t in time_range:
                hour_min = t.split(":")
                start_end.append(hour_min)

            start_time = start_end[0]
            end_time = start_end[1]
            classes = classes.filter(time__time__range=
                                     (datetime.time(hour=int(start_time[0]),
                                                    minute=int(start_time[1])),
                                      datetime.time(hour=int(end_time[0]),
                                                    minute=int(end_time[1]))))
            print(classes)

        return classes

