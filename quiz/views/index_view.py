from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.utils import timezone
from django.views import View

from quiz.models import Quiz


class IndexView(LoginRequiredMixin, View):
    """Index view."""

    def get(self, request):
        today = timezone.now()
        quizzes = Quiz.objects.filter(start_date__lte=today, end_date__gte=today)
        return render(request, "index.html", {"quizzes": quizzes})
