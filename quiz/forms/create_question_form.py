from django import forms


class CreateQuestionForm(forms.Form):
    name = forms.CharField(
        label="",
        widget=forms.TextInput(
            attrs={"class": "form-control input", "placeholder": "name"}
        ),
    )
    type = forms.CharField(
        label="",
        widget=forms.TextInput(
            attrs={"class": "form-control input", "placeholder": "quiz type"}
        ),
    )
