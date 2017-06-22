from django.shortcuts import render
from django.views.generic import View


class OrderListView(View):
    template_name = ''

    def get(self, request, *args, **kwargs):
        ctx = dict()
        return render(request, self.template_name, ctx)


class OrderDetailView(View):
    template_name = ''
    def get(self, request, *args, **kwargs):
        ctx = dict()
        return render(request, self.template_name, ctx)

