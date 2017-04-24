# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-24 00:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('basket', '0003_line'),
    ]

    operations = [
        migrations.AddField(
            model_name='basket',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='basket',
            name='phone',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='basket',
            name='hotel',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
