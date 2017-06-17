from django.shortcuts import render
from  django.views.generic import TemplateView

from common.models import Page


class OfertaView(TemplateView):
    template_name = 'static_page.html'

    def get_context_data(self, **kwargs):
        page = Page.objects.filter(slug='oferta').first()
        content = page.content if page else ''
        return {
            'content': content
        }
