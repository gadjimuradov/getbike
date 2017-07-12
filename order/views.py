from django.shortcuts import render
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin

from basket.models import Basket, Line


class OrderListView(LoginRequiredMixin, View):
    template_name = 'order/order_list.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        baskets = Basket.objects.filter(status='Submitted').order_by('-date_created')
        ctx['baskets'] = baskets
        return render(request, self.template_name, ctx)


class OrderDetailView(LoginRequiredMixin, View):
    template_name = 'order/order_detail.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        ctx['object'] = Basket.objects.filter(pk=kwargs.get('pk')).first()
        return render(request, self.template_name, ctx)

