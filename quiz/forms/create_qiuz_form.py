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
    start_date = forms.DateField(
        label="",
        widget=forms.DateInput(
            attrs={
                "class": "form-control input",
                "placeholder": "start date",
            }
        ),
    )
    end_date = forms.DateField(
        label="",
        widget=forms.DateInput(
            attrs={
                "class": "form-control input",
                "placeholder": "end date",
            }
        ),
    )
