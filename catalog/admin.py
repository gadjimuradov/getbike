from django.contrib import admin

from catalog.models import (Category, Product,Accessory, TypeProduct,ProductImage, Size,)


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','position',)


class SizeAdmin(admin.ModelAdmin):
    list_display = ('name','type')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(TypeProduct)
admin.site.register(Accessory)
admin.site.register(ProductImage)
admin.site.register(Size, SizeAdmin)
