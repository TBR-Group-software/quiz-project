from django.http import HttpRequest
from django.shortcuts import render
from django.views import View

from quiz.models import Quiz


class QuizView(View):
    """Quiz view."""

    def get(self, request: HttpRequest, slug: str):
        try:
            quiz = Quiz.objects.get(slug=slug)
        except Quiz.DoesNotExist:
            return render(request, "404.html")

        return render(request, "quiz.html", {"quiz": quiz})
