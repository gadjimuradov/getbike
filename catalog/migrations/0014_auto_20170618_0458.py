# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-18 04:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0013_auto_20170617_1831'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='wetsuit',
            field=models.CharField(choices=[('woman', 'Женский'), ('male', 'Мужской'), ('default', 'По умолчанию')], default='default', max_length=50),
        ),
        migrations.AlterField(
            model_name='size',
            name='type',
            field=models.CharField(choices=[('male', 'Мужской'), ('woman', 'Женский')], default='male', max_length=100),
        ),
    ]