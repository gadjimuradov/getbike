from django import forms


class BookingForm(forms.Form):
    take_date = forms.DateTimeField()
    return_date = forms.DateTimeField()

