from rest_framework import serializers

from .models import Studio, StudioAmenity, StudioImage


class StudioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Studio
        fields = ['id',
                  'name',
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

    def get_image_url(self, image):
        request = self.context.get('request')
        image_url = image.image.url
        path = "studio_images" + image_url
        return request.build_absolute_uri(path)


class StudioAmenitySerializer(serializers.ModelSerializer):

    class Meta:
        model = StudioAmenity
        fields = ['studio', 'type', 'quantity' ]
