from django.views.generic.base import TemplateView

from catalog.models import Product, Category
from booking.forms import BookingForm


class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        form = BookingForm()
        ctx = super().get_context_data(**kwargs)
        products = Product.objects.all()
        categories = Category.objects.all()
        ctx['products'] = products
        ctx['form'] = form
        ctx['categories'] = categories
        return ctx
