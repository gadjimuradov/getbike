import json

from decimal import Decimal as D
from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic.base import View
from django.template.loader import get_template, render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

from basket.models import Basket, Line
from booking.forms import BookingForm, BookingStepOneForm
from catalog.models import Category, Product
from order.models import Order


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
        products = Product.objects.order_by('position')

        ctx['categories'] = categories
        ctx['products'] = products

        return render(request,self.template_name, ctx)

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            basket_id = request.session.get('basket')
            basket = Basket.objects.filter(id=basket_id).first()
            user_names = request.POST.getlist('userName')
            products = request.POST.getlist('product')
            weight = request.POST.getlist('weight')
            height = request.POST.getlist('height')
            gender = request.POST.getlist('gender')
            lines = request.POST.getlist('line')
            results = list(zip(products,user_names, weight, height, gender, lines))
            data = {'status': 'error'}
            for res in results:
                if res[0]:
                    data = {'status': 'ok'}
                    product = Product.objects.filter(pk=res[0]).first()
                    if not res[5]:
                        line = Line()
                        line.basket = basket
                        line.product = product
                        line.fio = res[1]
                        line.weight = res[2]
                        line.height = res[3]
                        line.quantity = 1
                        line.price = product.price
                        line.save()
                    else:
                        line = Line.objects.filter(pk=res[5]).first()
                        if line:
                            line.fio = res[1]
                            line.weight = res[2]
                            line.height = res[3]
                            line.save()

            total_sum = D(0.0)
            for l in basket.lines.all():
                total_sum += l.price
            basket.total_sum = total_sum
            basket.save()
            return HttpResponse(json.dumps(data), content_type='application/json')


class LineRemoveView(View):

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            line_pk = request.POST.get('line_pk')
            Line.objects.filter(id=line_pk).delete()
            data = {'status': 'ok'}
            return HttpResponse(json.dumps(data), content_type='application/json')


class BookingPaymentView(View):
    template_name = 'booking/booking_payment.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        ctx['YANDEX_MONEY'] = settings.YANDEX_MONEY
        print(settings.YANDEX_MONEY)
        phone = request.COOKIES.get('phone')
        basket_id = request.session.get('basket')
        if basket_id:
            basket = Basket.objects.filter(id=basket_id).first()
            ctx['basket'] = basket
        return render(request, self.template_name, ctx)

    def post(self, request, *args, **kwargs):
        print(request.POST)
        ctx = dict()
        email = request.POST.get('email')
        basket_id = request.session.get('basket')
        if basket_id:
            basket = Basket.objects.filter(id=basket_id).first()
            ctx['basket'] = basket
            if email:
                order = Order()
                order.take_date = basket.date_take


        return render(request, self.template_name, ctx)


class BookingThankYouView(View):
    template_name = 'booking/booking_thank_you.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)
