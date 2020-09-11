from django.db import models
	
class MarkerModel(models.Model):
	marker_name = models.CharField(max_length=30, null=True)
	description = models.TextField(null=True)
	lat = models.FloatField(null=True)
	long = models.FloatField(null=True)
	
	def __str__(self):
		return self.marker_name
	
class UploadModel(models.Model):
	marker = models.ForeignKey('mapapp.MarkerModel', on_delete=models.CASCADE, default='1', related_name='docs')
	document = models.FileField(upload_to='uploads/', null=True)