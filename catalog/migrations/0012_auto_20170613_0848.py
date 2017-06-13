# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-13 08:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0011_auto_20170609_0725'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ('position',), 'verbose_name': 'Комплект', 'verbose_name_plural': 'Комплекты'},
        ),
        migrations.AddField(
            model_name='category',
            name='show',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='show',
            field=models.BooleanField(default=True),
        ),
    ]