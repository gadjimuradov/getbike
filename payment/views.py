import logging
from hashlib import md5

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect, Http404
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from django.contrib.auth.models import Group
from django.core.urlresolvers import reverse_lazy
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import get_template, render_to_string
from django.core.mail import EmailMultiAlternatives

from users.models import User
from basket.models import Basket
from .forms import CheckOrderForm, PaymentAvisoForm, BaseShopIdForm
from .models import Payment


class CheckMd5(object):

    def make_md5(self, cd):
        params = [cd['action'],
          str(cd['orderSumAmount']),
          str(cd['orderSumCurrencyPaycash']),
          str(cd['orderSumBankPaycash']),
          str(cd['shopId']),
          str(cd['invoiceId']),
          str(cd['customerNumber']),
          settings.YANDEX_MONEY_PASSWORD]

        s = str(';'.join(params)).encode('utf-8')
        return md5(s).hexdigest().upper()


class CheckOrderView(CheckMd5, View):
    form_class = CheckOrderForm

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        logging.debug('TmpCheckOrderView')
        form = self.form_class(request.POST)
        print('===========checkorder==========')

        if form.is_valid():
            res = """<?xml version="1.0" encoding="utf-8"?>
                <checkOrderResponse
                    performedDatetime="{date}"
                    code="0"
                    invoiceId="{invoice_id}"
                    shopId="{shop_id}"/>
            """.format(
                date=timezone.now().isoformat(),
                invoice_id=form.cleaned_data.get('invoiceId'),
                shop_id=form.cleaned_data.get('shopId'),
            )

            return HttpResponse(res, content_type='application/xml')
        else:
            res = """<?xml version="1.0" encoding="utf-8"?>
                <checkOrderResponse
                    performedDatetime="{date}"
                    code="1"
                    invoiceId="{invoice_id}"
                    shopId="{shop_id}"
                    message="Check order, validation error"
                    techMessage="Check order, validation error"/>
            """.format(
                date=timezone.now().isoformat(),
                invoice_id=form.cleaned_data.get('invoiceId'),
                shop_id=form.cleaned_data.get('shopId'),
            )

            return HttpResponse(res, content_type='application/xml')


class PaymentAvisoView(CheckMd5,View):
    form_class = PaymentAvisoForm

    def send_mail_for_user(self,email, complects, order_sum_amount):
        ctx = dict()
        ctx['complects'] = complects
        ctx['order_sum_amount'] = order_sum_amount
        to = email
        subject, from_email = 'Ваш заказ с сайта', 'no-reply@givetwo.me'
        text_content = render_to_string('mail/order_mail_detail.txt',ctx)
        html_content = get_template('mail/order_mail_detail.html').render(ctx)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    def send_mail_for_admin(self, complects, order_sum_amount):
        ctx = dict()
        ctx['complects'] = complects
        ctx['order_sum_amount'] = order_sum_amount
        to = 'orders@givetwo.me'
        subject, from_email = 'Новый заказ на сайте', 'no-reply@givetwo.me'
        text_content = render_to_string('mail/admin_order_detail.txt',ctx)
        html_content = get_template('mail/admin_order_detail.html').render(ctx)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    def create_new_user(self,email, phone):
        pass

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        print('===========payment==========')

        data = {k: str(v) for k, v in form.data.items()}

        if form.is_valid():
            cd = form.cleaned_data
            user_id = form.data.get('customerNumber')
            order_number = form.data.get('orderNumber')
            order_sum_amount= form.data.get('orderSumAmount')
            email = form.data.get('email')

            user_info = User.objects.filter(email=email)
            basket = Basket.objects.filter(id=order_number).first()
            if not user_info:
                new_user = User()
                new_user.email = email
                new_user.phone = basket.phone
                password = User.objects.make_random_password(length=15)
                new_user.set_password(password)
                new_user.save()
                user_pk = new_user.pk
            else:
                user_pk = user_info.first().pk

            basket.status = Basket.SUBMITTED
            basket.save()

            complects = ''
            for line in basket.lines.all():
                complects += str(line.product.name) + ','

            if complects:
                complects = complects[:-1]

            self.send_mail_for_user(email, complects, order_sum_amount)
            self.send_mail_for_admin(complects, order_sum_amount)

            payment = Payment()
            payment.order_number= basket.pk
            payment.invoice_id = user_pk
            payment.order_amount = order_sum_amount
            payment.status = Payment.STATUS.SUCCESS
            payment.performed_datetime = timezone.now()
            payment.save()

            res = """<?xml version="1.0" encoding="utf-8"?>
                <paymentAvisoResponse
                    performedDatetime="{date}"
                    code="0"
                    invoiceId="{invoice_id}"
                    shopId="{shop_id}"/>
            """.format(
                date=timezone.now().isoformat(),
                invoice_id=form.cleaned_data.get('invoiceId'),
                shop_id=form.cleaned_data.get('shopId'),
            )

            return HttpResponse(res, content_type='application/xml')
        else:
            res = """<?xml version="1.0" encoding="utf-8"?>
                <paymentAvisoResponse
                    performedDatetime="{date}"
                    code="1"
                    message="Payment aviso, validation error"
                    techMessage="Payment aviso, validation error"/>
            """.format(date=timezone.now().isoformat())

            return HttpResponse(res, content_type='application/xml')
            # return HttpResponse('<pre>{msg}</pre>'.format(msg=pformat(form.errors))) # Debug