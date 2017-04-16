from django.contrib import admin

from catalog.models import (Category, Product,Accessory, TypeProduct, )


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product)
admin.site.register(TypeProduct)
admin.site.register(Accessory)
