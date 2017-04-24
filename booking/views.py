import json

from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.base import View

from basket.models import Basket
from booking.forms import BookingForm, BookingStepOneForm
from catalog.models import Category, Product


class BookingPreValidate(View):

    def post(self,request, *args, **kwargs):
        if request.is_ajax():
            booking_form = BookingForm(request.POST)
            if booking_form.is_valid():
                phone = booking_form.cleaned_data.get('phone')
                basket, created = Basket.objects.get_or_create(phone=phone, status='Open')
                basket.date_take = booking_form.cleaned_data.get('take_date')
                basket.date_return = booking_form.cleaned_data.get('return_date')
                basket.save()
                request.session['basket'] = basket.id
                data = {'status': 'ok1'}
            else:
                data = {'status': 'error1'}

            response = HttpResponse(json.dumps(data), content_type='application/json')
            response.set_cookie('phone', phone)
            print(phone)
            return response
        # return redirect(reverse('booking:booking'))


class BookingView(View):
    template_name = 'booking/booking.html'

    def get(self, request, *args, **kwargs):
        phone = request.COOKIES.get('phone')
        if phone:
            basket = Basket.objects.filter(phone=phone).first()
            if basket:
                ctx = dict()
                ctx['form'] = BookingForm(request.POST)
                ctx['form_step_one'] = BookingStepOneForm(request.POST)
                ctx['basket'] = basket
                return render(request, self.template_name, ctx)
        return redirect('/')

    def post(self, request, *args, **kwargs):
        form_step_one = BookingStepOneForm(request.POST)
        basket_id = request.session.get('basket')
        if basket_id:
            basket = Basket.objects.filter(id=basket_id).first()
        
        if form_step_one.is_valid():
            hotel = form_step_one.cleaned_data.get('hotel')
            basket.hotel = hotel
            basket.save()
            return redirect('/booking/complect/')
        else:
            ctx = dict()
            ctx['basket'] = basket
            return render(request, self.template_name, ctx)


class BookingComplectView(View):
    template_name = 'booking/booking_complect.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        phone = request.COOKIES.get('phone')
        basket_id = request.session.get('basket')
        if basket_id:
            basket = Basket.objects.filter(id=basket_id).first()
            ctx['basket'] = basket
        categories = Category.objects.all()
        products = Product.objects.all()

        ctx['categories'] = categories
        ctx['products'] = products

        return render(request,self.template_name, ctx)


class BookingPaymentView(View):
    template_name = 'booking/booking_payment.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        return render(request, self.template_name, ctx)

    def post(self, request, *args, **kwargs):
        return render(request, self.template_name)
