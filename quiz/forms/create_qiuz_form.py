from django import forms


class CreateQuizForm(forms.Form):
    name = forms.CharField(
        label="",
        widget=forms.TextInput(
            attrs={"class": "form-control input", "placeholder": "name"}
        ),
    )
    description = forms.CharField(
        label="",
        widget=forms.TextInput(
            attrs={"class": "form-control input", "placeholder": "description"}
        ),
    )
    start_date = forms.DateTimeField(
        label="",
        widget=forms.DateTimeInput(
            attrs={
                "class": "form-control input",
                "placeholder": "start date",
                "type": "datetime-local",
            }
        ),
    )
    end_date = forms.DateTimeField(
        label="",
        widget=forms.DateTimeInput(
            attrs={
                "class": "form-control input",
                "placeholder": "end date",
                "type": "datetime-local",
            }
        ),
    )
