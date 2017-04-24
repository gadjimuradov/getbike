from django import template

register = template.Library()


@register.inclusion_tag('templatetags/cart_total.html', takes_context=True)
def cart_total(context):
    ctx = dict()
    ctx['basket'] = context['basket']
    return ctx
