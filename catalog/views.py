from django.shortcuts import render
from django.views.generic.base import View

from catalog.forms import BookingForm
from catalog.models import Product


class IndexView(View):
    template_name = 'catalog/index.html'

    def get(self, request, *args, **kwargs):
        ctx = dict()

        return render(request, self.template_name,ctx)
