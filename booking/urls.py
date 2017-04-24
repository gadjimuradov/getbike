from django.conf.urls import url
from . import views

app_name = 'booking'

urlpatterns = [
    url(r'^pre-validate/$', views.BookingPreValidate.as_view(), name='booking-pre-validate'),
    url(r'^$', views.BookingView.as_view(), name='booking'),
    url(r'^complect/$', views.BookingComplectView.as_view(), name='booking-complect'),
    url(r'^payment/$', views.BookingPaymentView.as_view(), name='booking-payment'),

]
