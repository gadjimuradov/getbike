from django import forms
from django.conf import settings


class CheckOrderForm(forms.Form):
    action = forms.CharField()
    md5 = forms.CharField()
    shopId = forms.IntegerField()
    invoiceId = forms.IntegerField()

    def clean_action(self):
        action = self.cleaned_data.get('action')
        if action != 'checkOrder':
            raise forms.ValidationError('Wrong action')
        return action

    def clean_shopId(self):
        shop_id = self.cleaned_data.get('shopId')
        if shop_id != settings.YANDEX_MONEY['shop_id']:
            raise forms.ValidationError('Wrong shop ID')
        return shop_id


class PaymentAvisoForm(forms.Form):
    action = forms.CharField()  # Has to be "paymentAviso"
    md5 = forms.CharField()
    shopId = forms.IntegerField()
    invoiceId = forms.IntegerField()
    orderSumAmount = forms.DecimalField()

    def clean_action(self):
        action = self.cleaned_data.get('action')
        if action != 'paymentAviso':
            raise forms.ValidationError('Wrong action')
        return action

    def clean_shopId(self):
        shop_id = self.cleaned_data.get('shopId')
        if shop_id != settings.YANDEX_MONEY['shop_id']:
            raise forms.ValidationError('Wrong shop ID')
        return shop_id


class BaseShopIdForm(forms.Form):
    shopId = forms.IntegerField(initial=settings.YANDEX_MONEY_SHOP_ID, widget=forms.TextInput(
        attrs=dict(readonly='readonly')))

    def clean_shopId(self):
        shop_id = self.cleaned_data['shopId']
        if int(shop_id) != int(settings.SHOP_ID):
            raise forms.ValidationError('shopId не совпадает с YANDEX_KASSA_SHOPID')
        return shop_id


class BaseOrderNumberForm(forms.Form):
    orderNumber = forms.CharField(label='Номер заказа', min_length=1, max_length=64,widget=forms.TextInput(
        attrs=dict(readonly='readonly')))
