from rest_framework_filters import (
    FilterSet, RelatedFilter,NumberFilter,
    AllLookupsFilter,)

from .models import (
    Category,
    Product,
)


class CategoryFilterSet(FilterSet):
    id = AllLookupsFilter()
    name = AllLookupsFilter()

    class Meta:
        model = Category


class ProductFilterSet(FilterSet):
    id = AllLookupsFilter()
    name = AllLookupsFilter()
    price = AllLookupsFilter()
    category = RelatedFilter(CategoryFilterSet)

    class Meta:
        model = Product
