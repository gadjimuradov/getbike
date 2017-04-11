from django.shortcuts import render

from catalog.forms import BookingForm
from catalog.models import Product


def booking(request):
    form = BookingForm()
    ctx = dict()
    ctx['form'] = form
    return render(request,'catalog/booking.html', ctx)


def booking_complect(request):
    ctx = dict()
    products = Product.objects.all()
    ctx['products'] = products
    return render(request, 'catalog/booking-complect.html', ctx)
