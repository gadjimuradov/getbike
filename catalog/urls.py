from django.conf.urls import url
from . import views

app_name = 'catalog'

urlpatterns = [
    url(r'^booking/$', views.booking, name='booking'),
    url(r'^booking/step2/$', views.booking_complect, name='booking-complect'),

]
