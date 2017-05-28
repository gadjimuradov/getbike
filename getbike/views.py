from django.views.generic.base import TemplateView, View
from django.shortcuts import render

from catalog.models import Product, Category
from booking.forms import BookingForm
from common.models import HappyClient


class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        form = BookingForm()
        ctx = super().get_context_data(**kwargs)
        products = Product.objects.order_by('-id')[:6]
        categories = Category.objects.all()
        happy_clients = HappyClient.objects.all()[:4]
        ctx['products'] = products
        ctx['form'] = form
        ctx['categories'] = categories
        ctx['happy_clients'] = happy_clients
        return ctx


class HappyClientsView(View):
    template_name = 'happy_clients.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        ctx['happy_clients'] = HappyClient.objects.all()
        return render(request,self.template_name,ctx)