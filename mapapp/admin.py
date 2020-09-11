from django.contrib import admin
from .models import UploadModel, MarkerModel

admin.site.register(MarkerModel)
admin.site.register(UploadModel)