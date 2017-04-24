from django.utils.deprecation import MiddlewareMixin
from django.utils.functional import SimpleLazyObject


class BasketMiddleware(MiddlewareMixin):

    def process_request(self, request):
        request.cookies_to_delete = []
        request._basket_cache = None

        def load_full_basket():
            basket = self.get_basket(request)
            return basket

        request.basket = SimpleLazyObject(load_full_basket)

    def process_response(self, request, response):
        cookies_to_delete = getattr(request, 'cookies_to_delete', [])
        for cookie_key in cookies_to_delete:
            response.delete_cookie(cookie_key)

        if not hasattr(request, 'basket'):
            return response

    def get_basket(self, request):
        if request._basket_cache is not None:
            return request._basket_cache

        if hasattr(request, 'user') and request.user.is_authenticated():
            pass
