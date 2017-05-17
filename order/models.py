from django.db import models
from django.utils import timezone

from catalog.models import Product
from users.models import User


class ShippingAddress(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Order(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    take_date = models.DateField(null=True)
    return_date = models.DateField(null=True)
    user = models.ForeignKey(User)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderLine(models.Model):
    order = models.ForeignKey(Order, related_name='lines')
    product = models.ForeignKey(Product)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.pk)
