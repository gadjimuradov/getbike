from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from decimal import Decimal as D

from catalog.models import Product, Size
from users.models import User


class Basket(models.Model):
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,null=True,blank=True)
    owner = models.ForeignKey(User, related_name='baskets', null=True)
    OPEN, MERGED, SAVED, FROZEN, SUBMITTED = ('Open', 'Merged','Saved', 'Frozen', 'Submitted')
    STATUS_CHOICES = (
        (OPEN, _("Open - currently active")),
        (MERGED, _("Merged - superceded by another basket")),
        (SAVED, _("Saved - for items to be purchased later")),
        (FROZEN, _("Frozen - the basket cannot be modified")),
        (SUBMITTED, _("Submitted - has been ordered at the checkout")),
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_take = models.DateField(default=timezone.now)
    date_return = models.DateField(default=timezone.now)
    hotel = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=128, default=OPEN, choices=STATUS_CHOICES)
    total_sum = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

    def get_total_sum(self):
        total_sum = D(0.0)
        for l in self.lines.all():
            total_sum += l.price
        return total_sum


class Line(models.Model):
    MALE, WOMAN = 'male','woman'
    GENDER_CHOICES = (
        (MALE,'Мужской'),
        (WOMAN,'Женский'),
    )
    basket = models.ForeignKey(Basket, related_name='lines')
    product = models.ForeignKey(Product, related_name='basket_lines')
    weight = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    fio = models.CharField(max_length=255, null=True)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default=MALE)
    size = models.ForeignKey(Size, null=True, blank=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        ordering = ('pk',)
        verbose_name = 'Строка корзины'
        verbose_name_plural = 'Строки корзины'

