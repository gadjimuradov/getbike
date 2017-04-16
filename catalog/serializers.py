import datetime
from math import ceil
from django.db.models import Q, F
from rest_framework import serializers
from rest_framework.serializers import (
    ModelSerializer, ImageField,
    FileField, PrimaryKeyRelatedField,
)

from .models import Category, Product


class CategorySerializer(ModelSerializer):

    class Meta:
        model = Category

        fields = (
            'id',
            'name',
            'slug',
        )


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price',
            'category',
        )


# class ProductStockSerializer(ModelSerializer):
#     class Meta:
#         model = StockRecord
#         fields = (
#             'num_in_stock',
#             'num_allocated',
#         )


# class ProductSerializer(ModelSerializer):
#     categories = CategorySerializer(many=True, read_only=True)
#     images = ProductImageSerializer(many=True, read_only=True)
#     main_img = serializers.SerializerMethodField()
#     price_mrc = serializers.SerializerMethodField()
#     prod = serializers.SerializerMethodField()
#     variants = serializers.SerializerMethodField()
#     discount_product = ProductSalesSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Product
#
#         fields = (
#             'id',
#             'title',
#             'slug',
#             'product_1c_id',
#             'price_mrc',
#             'categories',
#             'images',
#             'main_img',
#             'prod',
#             'variants',
#             'discount_product'
#
#         )
#
#     def get_main_img(self, obj):
#         img = obj.primary_image()
#         return img
#
#     def get_prod(self, obj):
#         return obj
#
#     def get_price_mrc(self, obj):
#         price_mrc = int(obj.price_mrc)
#         return price_mrc
#
#     def get_variants(self, obj):
#         return Product.objects.prefetch_related('images').filter(Q(item_id=obj.item_id),
#                                                                  Q(stockrecords__num_in_stock__gt=0),
#                                                                  Q(stockrecords__num_in_stock__gt=F('stockrecords__num_allocated'))).exclude(item_id=None)
#
#     @staticmethod
#     def setup_eager_loading(queryset):
#         # # "one: relationships
#         # queryset = queryset.select_related('contractor', 'internal', 'internal__head_user', )
#         # # "to-many" relationships
#         queryset = queryset.prefetch_related('categories', 'images','stockrecords')
#         return queryset

