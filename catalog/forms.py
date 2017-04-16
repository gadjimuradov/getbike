from django import forms


class BookingForm(forms.Form):
    take_date = forms.DateField(input_formats=['%d.%m.%Y'])
    return_date = forms.DateField(input_formats=['%d.%m.%Y'])
    phone = forms.CharField()

