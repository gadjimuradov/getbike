from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from tinymce.models import HTMLField
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True)
    position = models.PositiveIntegerField(default=0)
    show = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('position',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Size(models.Model):
    MALE, WOMAN = 'male', 'woman'
    GENDER_CHOICES = (
        (MALE, 'Мужской'),
        (WOMAN, 'Женский'),
    )
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, choices=GENDER_CHOICES, default=MALE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размеры'


class Product(models.Model):
    WOMAN,MALE,DEFAULT = 'woman', 'male', 'default'
    WETSUIT_CHOICES = (
        (WOMAN, 'Женский'),
        (MALE, 'Мужской'),
        (DEFAULT, 'По умолчанию'),
    )
    name = models.CharField(max_length=200)
    img = models.ImageField(upload_to='products/')
    price = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.ForeignKey(Category, related_name='products')
    description = HTMLField()
    date_created = models.DateTimeField(default=timezone.now)
    position = models.PositiveIntegerField(default=0)
    show = models.BooleanField(default=True)
    size = models.ForeignKey(Size, related_name='products_all', null=True, blank=True)
    wetsuit = models.CharField(max_length=50, choices=WETSUIT_CHOICES, default=DEFAULT)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('position',)
        verbose_name = 'Комплект'
        verbose_name_plural = 'Комплекты'

    def get_size_options(self):
        sizes = Size.objects.filter(type=self.wetsuit)
        return sizes

    def is_motoprogulki(self):
        return self.category.slug == 'motoprogulki'



class ProductImage(models.Model):
    img = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, related_name='images')
    position = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'


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
