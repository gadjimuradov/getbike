from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    name = models.CharField(max_length=200)
    img = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.ForeignKey(Category, related_name='products')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Комплект'
        verbose_name_plural = 'Комплекты'


class TypeProduct(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип комплекта'
        verbose_name_plural = 'Типы комплектов'


class Accessory(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.ForeignKey(TypeProduct, null=True)
    product = models.ForeignKey(Product)
    icon = models.CharField(max_length=100, blank=True, null=True)
    img = models.ImageField(upload_to='accessories/')
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Аксессуар'
        verbose_name_plural = 'Аксессуары'


class Address(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
