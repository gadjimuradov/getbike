# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-16 18:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0004_orderline'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderline',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderline',
            name='product',
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Категория', 'verbose_name_plural': 'Категории'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Комплект', 'verbose_name_plural': 'Комплекты'},
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderLine',
        ),
    ]
