from django import forms
from .models import UploadModel, MarkerModel

class UploadForm(forms.ModelForm):
    class Meta:
        model = UploadModel
        fields = ('marker','document',)
		
class MarkerForm(forms.ModelForm):
    class Meta:
        model = MarkerModel
        fields = ('marker_name','description','lat','long',)