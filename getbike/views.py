from django.views.generic.base import TemplateView, View
from django.shortcuts import render

from catalog.models import Product, Category
from booking.forms import BookingForm
from common.models import HappyClient
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import get_template, render_to_string
from django.core.mail import EmailMultiAlternatives

class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        form = BookingForm()
        ctx = super().get_context_data(**kwargs)
        products = Product.objects.order_by('position')
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


class SendMailView(View):
    def get(self, request, *args, **kwargs):
        ctx = dict()
        ctx['complects'] = 'test , test2'
        ctx['order_sum_amount'] = 24000
        to = request.GET.get('email')
        subject, from_email = 'Ваш заказ с сайта', 'no-reply@givetwo.me'
        text_content = render_to_string('mail/order_mail_detail.txt',ctx)
        html_content = get_template('mail/order_mail_detail.html').render(ctx)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()