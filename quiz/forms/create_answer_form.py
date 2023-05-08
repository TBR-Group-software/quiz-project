from django import forms


class CreateAnswerForm(forms.Form):
    name = forms.CharField(
        label="",
        widget=forms.TextInput(
            attrs={"class": "form-control input", "placeholder": "name"}
        ),
    )
