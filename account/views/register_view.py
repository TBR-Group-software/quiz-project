from django.contrib import messages
from django.contrib.auth import login
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render

from account.forms import RegisterForm
from account.tasks import send_welcome_message


def user_register_view(request: HttpRequest) -> HttpResponse:
    """User register view."""
    if request.user.is_authenticated:
        messages.success(request, "You already registered.")
        return redirect("quiz:index")

    if request.method == "GET":
        form = RegisterForm()
        return render(request, "register.html", {"form": form})

    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.email.lower()
            user.save()
            send_welcome_message.delay(user.email)
            messages.success(request, "You have singed up successfully.")
            login(request, user)
            return redirect("quiz:index")
        else:
            return render(request, "register.html", {"form": form})

    return redirect("quiz:index")
