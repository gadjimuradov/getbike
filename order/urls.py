from django.conf.urls import url
from . import views

app_name = 'order'

urlpatterns = [
    url(r'^$', views.OrderListView.as_view(), name='index'),
    url(r'^(?P<pk>[0-9]+)$', views.OrderDetailView.as_view(), name='order-detail'),
]
