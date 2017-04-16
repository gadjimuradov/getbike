from django.conf import settings
from django.db.models import Q, F
from rest_framework import permissions, renderers
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
from django.core.paginator import (Paginator, EmptyPage,
                                   PageNotAnInteger, InvalidPage,
                                   )
from itertools import chain
from catalog.models import Category, Product
from catalog.serializers import CategorySerializer, ProductSerializer
from catalog.filters import CategoryFilterSet, ProductFilterSet


class ManyResultsSetPagination(PageNumberPagination):
    page_size = 300
    page_size_query_param = 'page_size'
    max_page_size = 10000


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_class = ProductFilterSet
    pagination_class = ManyResultsSetPagination


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.exclude(name='_root').all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilterSet
