from django.contrib import admin
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
# Create your models here..


class Studio(models.Model): 
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    latitude = models.FloatField(default=0, validators=[
        MinValueValidator(-90.0),
        MaxValueValidator(90.0)
    ])
    longitude = models.FloatField(default=0, validators=[
        MinValueValidator(-180.0),
        MaxValueValidator(180.0)
    ])
    phone_number = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    distance = models.FloatField(default=0)

    def __str__(self):
        return f'Studio Name: {self.name}'


# allow for multiple images to be associated to a studio
class StudioImage(models.Model):
    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE, null=True,
                               related_name='image')
    image = models.ImageField(upload_to='studio_images/')

    def __str__(self):
        return f'Image Belongs to: {self.studio.name}'


class StudioAmenity(models.Model):
    studio = models.ForeignKey(to=Studio, on_delete=models.CASCADE, null=True,
                               related_name="amenity")
    type = models.CharField(max_length=200)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f'Studio Amenity: {self.type}, quantity: {self.quantity} '
