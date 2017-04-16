from rest_framework import routers

from .views import (
    CategoryViewSet,
    ProductViewSet,
)

router = routers.DefaultRouter()

router.register(r'category', CategoryViewSet)
router.register(r'product', ProductViewSet)
# router.register(r'office', OfficeViewSet)
# router.register(r'locations', LocationViewSet)
# router.register(r'cityoffice', CityOfficeViewSet)
# router.register(r'productscategory', ProductCategoryViewSet, base_name='products_category')
# router.register(r'productimages', ProductImageViewSet)
# router.register(r'useraddress', UserAddressViewSet)
# router.register(r'delivery', ProductDeliveryViewSet, base_name='products_delivery')


urlpatterns = router.urls
