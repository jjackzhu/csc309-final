from rest_framework import serializers

from .models import Studio, StudioAmenity, StudioImage


class StudioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = ['name',
                  'address',
                  'latitude',
                  'longitude',
                  'phone_number',
                  'postal_code',
                  'distance']


class StudioImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudioImage
        fields = ['studio', 'image', ]


class StudioAmenitySerializer(serializers.ModelSerializer):

    class Meta:
        model = StudioAmenity
        fields = ['studio', 'type', 'quantity' ]
