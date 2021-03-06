# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-16 23:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0005_auto_20170416_1837'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accessory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('icon', models.CharField(blank=True, max_length=100, null=True)),
                ('img', models.ImageField(upload_to='accessories/')),
                ('description', models.TextField(blank=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.Product')),
            ],
            options={
                'verbose_name': 'Аксессуар',
                'verbose_name_plural': 'Аксессуары',
            },
        ),
        migrations.CreateModel(
            name='TypeProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'Тип комплекта',
                'verbose_name_plural': 'Типы комплектов',
            },
        ),
        migrations.AddField(
            model_name='accessory',
            name='type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='catalog.TypeProduct'),
        ),
    ]
