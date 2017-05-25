from django.conf.urls import url
from . import views

app_name = 'catalog'

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='catalog-home'),
    url(r'^product/(?P<pk>[0-9]+)$', views.ProductView.as_view(), name='product-detail'),
]

