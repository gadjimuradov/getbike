from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.base import View

from catalog.models import Category, Product


class BookingPreValidate(View):
    def post(self,request, *args, **kwargs):
        return redirect(reverse('booking:booking'))


class BookingView(View):
    template_name = 'booking/booking.html'

    def get(self, request, *args, **kwargs):
        return render(request,self.template_name)


class BookingComplectView(View):
    template_name = 'booking/booking_complect.html'

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        products = Product.objects.all()
        ctx = dict()
        ctx['categories'] = categories
        ctx['products'] = products
        return render(request,self.template_name, ctx)
