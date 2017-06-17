"""getbike URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from payment.views import PaymentAvisoView,CheckOrderView
from . import views
from common.views import OfertaView



urlpatterns = [
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(r'^catalog/', include('catalog.urls')),
    url(r'^happy-clients/', views.HappyClientsView.as_view(), name='happy_clients'),
    url(r'^send_mail/', views.SendMailView.as_view(), name='send_mail'),
    url(r'^booking/', include('booking.urls')),
    url(r'^crm/', include('crm.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^tinymce/', include('tinymce.urls')),
    url(r'^yandex-money/aviso/', PaymentAvisoView.as_view(), name='payment-aviso'),
    url(r'^yandex-money/check/', CheckOrderView.as_view(), name='payment-check'),
    url(r'oferta/$', OfertaView.as_view()),
    url(r'^success-payment/$', TemplateView.as_view(template_name='message.html'), {
                      'message': 'Оплата прошла успешно',
                  }, name='payment-success'),
    url(r'^fail-payment/$', TemplateView.as_view(template_name='message.html'), {
                      'message': 'Произошла ошибка при оплате',
                  }, name='payment-fail'),

    url(r'^admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
