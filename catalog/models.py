from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    img = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.ForeignKey(Category, related_name='products')

    def __str__(self):
        return self.name


class Address(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Order(models.Model):
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.pk)
