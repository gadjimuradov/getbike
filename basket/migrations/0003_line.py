# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-24 00:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0006_auto_20170416_2344'),
        ('basket', '0002_auto_20170423_2301'),
    ]

    operations = [
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(default=0.0)),
                ('height', models.FloatField(default=0.0)),
                ('fio', models.CharField(max_length=255, null=True)),
                ('quantity', models.IntegerField(default=0)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lines', to='basket.Basket')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='basket_lines', to='catalog.Product')),
            ],
            options={
                'verbose_name': 'Строка корзины',
                'verbose_name_plural': 'Строки корзины',
            },
        ),
    ]