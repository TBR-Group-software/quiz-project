from django.contrib import messages
from django.contrib.auth import login
from django.http import HttpRequest
from django.shortcuts import redirect, render

from quiz.forms import UserLoginForm


def user_login(request: HttpRequest):
    """User login view."""
    if request.method == "POST":
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            redirect_to = request.GET.get("redirect_to", "")
            if redirect_to != "":
                return redirect(redirect_to)
            else:
                return redirect("quiz:index")
        else:
            messages.error(request, "Please enter a correct email and password!")
    else:
        form = UserLoginForm()
    return render(request, "login.html", {"form": form})
