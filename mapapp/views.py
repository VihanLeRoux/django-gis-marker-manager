from django.shortcuts import render, redirect, render_to_response, get_object_or_404
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import UploadForm, MarkerForm
from .models import UploadModel, MarkerModel
from .mixins import AjaxFormMixin
from django.http import HttpResponse
import os

def upload(request):
	markers = MarkerModel.objects.all()
	path = "media/"
	docs = UploadModel.objects.all()#sorted(os.listdir(path))
	if request.method == 'POST':
		uploadform = UploadForm(request.POST, request.FILES)
		createform = MarkerForm(request.POST)
		if uploadform.is_valid():
			uploadform.save()
			return redirect('form')
		elif createform.is_valid():
			createform.save()
			return redirect('form')
	else:
		uploadform = UploadForm()
		createform = MarkerForm()
	return render(request, 'mapapp/form.html', {
		'uploadform': uploadform,
		'createform': createform,
		'docs': docs,
		'markers': markers
	})
	
def marker_delete(request, pk):
	MarkerModel.objects.get(pk=pk).delete()
	return redirect('form')
	
def delete(request, pk, doc):
	path = "media/"
	os.remove(path + doc)
	UploadModel.objects.get(pk=pk).delete()
	return redirect('form')
	
def download(request, doc):
	path = "media/"
	file_path = path + doc
	if os.path.exists(file_path):
		with open(file_path, 'rb') as fh:
			response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
			response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
			return response
	raise Http404