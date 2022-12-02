from django.contrib import admin
from .models import Studio, StudioAmenity, StudioImage


# Register your models here.
class StudioAmenityAdmin(admin.TabularInline):
    model = StudioAmenity
    extra = 1


class StudioImageAdmin(admin.TabularInline):
    model = StudioImage
    extra = 1


class StudioAdmin(admin.ModelAdmin):
    inlines = (StudioAmenityAdmin, StudioImageAdmin)
    exclude = ['studios', 'distance']


admin.site.register(Studio, StudioAdmin)
