import datetime
from math import ceil
from django.db.models import Q, F
from rest_framework import serializers
from rest_framework.serializers import (
    ModelSerializer, ImageField,
    FileField, PrimaryKeyRelatedField,
)

from .models import Basket, Line


class BasketSerializer(ModelSerializer):

    class Meta:
        model = Basket

        fields = (
            'id',
            'phone',
            'status',
        )


class LineSerializer(ModelSerializer):
    class Meta:
        model = Line
        fields = (
            'id',
            'basket',
            'product',
            'price',

        )


