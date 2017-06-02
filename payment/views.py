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

from users.models import User


# class TestView(View):
#     template_name = 'payment/test.html'
#
#     def get(self, request, *args, **kwargs):
#         form = UserRegistrationForm()
#         ctx = dict()
#         ctx['form'] = form
#         return render(request, self.template_name, ctx)
#
#     def post(self, request, *args, **kwargs):
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             user = User()
#             user.first_name = form.cleaned_data["first_name"]
#             user.last_name = form.cleaned_data["last_name"]
#             user.email = form.cleaned_data["email"]
#             user.username = form.cleaned_data["email"]
#             user.knowledge = form.cleaned_data["knowledge"]
#             password = form.cleaned_data["password1"]
#             user.set_password(password)
#             user.is_active = True
#             user.save()
#             promocod = form.cleaned_data["promocod"]
#             rate = form.cleaned_data["rate"]
#             g = Group.objects.filter(name=rate).first()
#             if g:
#                 g.user_set.add(user)
#
#             pc = PaymentCondition()
#             pc.user = user
#             tariff = Tariff.objects.filter(code=rate).first()
#             pc.tariff = tariff
#             pc.promocode = promocod
#             pc.save()
#
#             send_mail('Вы зарегистрировались на Zubareva.online', 'Логин:' + user.email + '  Пароль: ' + password + '',
#                   'no-reply@zubareva.ru', ['' + user.email + ''])
#
#             return redirect(reverse_lazy('payment:pay-tariff',kwargs={
#                 'pk': user.pk
#             }))
#         else:
#             ctx = dict()
#             ctx['form'] = form
#             return render(request, self.template_name, ctx)
#
#
# class ProlongView(View):
#     template_name = 'payment/prolong.html'
#
#     def get(self, request, *args, **kwargs):
#         form = ProlongForm()
#         ctx = dict()
#         ctx['form'] = form
#         user = request.user
#         pc_yes = PaymentCondition.objects.filter(user=user).first()
#         # if pc_yes:
#         #     return redirect(reverse_lazy('payment:pay-tariff',kwargs={
#         #         'pk': user.pk
#         #     }))
#         return render(request, self.template_name,ctx)
#
#     def post(self, request, *args, **kwargs):
#         form = ProlongForm(request.POST)
#         user = request.user
#         if form.is_valid():
#             knowledge = form.cleaned_data["knowledge"]
#             user.knowledge = knowledge
#             user.save()
#             promocod = form.cleaned_data["promocod"]
#             rate = form.cleaned_data["rate"]
#             g = Group.objects.filter(name=rate).first()
#             if g:
#                 user_group = User.groups.through.objects.get(user=user)
#                 user_group.group = g
#                 user_group.save()
#
#             pc_yes = PaymentCondition.objects.filter(user=user).first()
#             tariff = Tariff.objects.filter(code=rate).first()
#             if not pc_yes:
#                 pc = PaymentCondition()
#                 pc.user = user
#                 pc.tariff = tariff
#                 pc.promocode = promocod
#                 pc.save()
#             else:
#                 pc_yes.tariff = tariff
#                 pc_yes.promocode = promocod
#                 pc_yes.save()
#             return redirect(reverse_lazy('payment:pay-tariff',kwargs={
#                 'pk': user.pk
#             }))
#         else:
#             ctx = dict()
#             ctx['form'] = form
#             return render(request, self.template_name, ctx)
#
#
# class PayView(View):
#     template_view = 'payment/pay.html'
#
#     def get(self, request, *args, **kwargs):
#         user = User.objects.filter(pk=kwargs.get('pk')).first()
#         pc = PaymentCondition.objects.filter(user=user, payd=False).first()
#         if not pc or not user:
#             raise Http404
#
#         sum = pc.tariff.cost
#         if pc.promocode:
#             promocode_info = MainSettings.objects.filter(code=pc.promocode).first()
#             if promocode_info:
#                 sum = pc.tariff.cost - (pc.tariff.cost / 100 * int(promocode_info.value))
#
#         ctx = dict()
#         ctx['customer_id'] = user.pk
#         ctx['order_number'] = pc.pk
#         ctx['sum'] = int(sum)
#         ctx['tariff'] = pc.tariff
#         return render(request, self.template_view, ctx)


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

            pc = PaymentCondition.objects.filter(id=order_number).first()
            if pc:
                pc.payd = True
                pc.sum_payd = float(order_sum_amount)
                pc.save()

            user = User.objects.filter(id=user_id).first()
            user.is_active = True
            user.save()

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