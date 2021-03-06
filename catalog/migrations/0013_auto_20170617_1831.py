# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-17 18:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0012_auto_20170613_0848'),
    ]

    operations = [
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('male', 'Мужмкой'), ('woman', 'Женский')], default='male', max_length=100)),
            ],
            options={
                'verbose_name': 'Размер',
                'verbose_name_plural': 'Размеры',
            },
        ),
        migrations.AddField(
            model_name='product',
            name='size',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='products_all', to='catalog.Size'),
        ),
    ]
