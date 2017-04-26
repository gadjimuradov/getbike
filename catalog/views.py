from django.shortcuts import render
from django.views.generic.base import View
from django.views.generic.detail import DetailView

from catalog.models import Product


class IndexView(View):
    template_name = 'catalog/index.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()
        products = Product.objects.all()
        ctx['products'] = products
        return render(request, self.template_name, ctx)


class ProductView(DetailView):
    model = Product
    template_name = 'catalog/product.html'
