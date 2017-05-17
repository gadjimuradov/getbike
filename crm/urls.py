from django.conf.urls import url
from . import views

app_name = 'crm'

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='crm-index'),
]
