from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	url(r'^$', views.upload, name='form'),
	url(r'^delete/file/(?P<doc>[a-zA-Z\/. ()0-9_-]+)/(?P<pk>\d+)/$', views.delete, name='delete'),
	url(r'^download/(?P<doc>[a-zA-Z\/. ()0-9_-]+)/$', views.download, name='download'),
	url(r'^delete/marker/(?P<pk>\d+)/$', views.marker_delete, name='marker_delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)