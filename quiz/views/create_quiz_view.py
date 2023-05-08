from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponsePermanentRedirect,
    HttpResponseRedirect,
)
from django.shortcuts import redirect, render
from django.views import View

from quiz.forms import CreateAnswerForm, CreateQuestionForm, CreateQuizForm


class CreateQuizView(LoginRequiredMixin, View):
    """Create quiz view."""

    def get(self, request: HttpRequest) -> HttpResponse:
        context = {
            "quiz_form": CreateQuizForm(),
            "question_form": CreateQuestionForm(),
            "answer_form": CreateAnswerForm(),
        }

        return render(request, "create_quiz.html", context)

    def post(
        self, request: HttpRequest
    ) -> HttpResponseRedirect | HttpResponsePermanentRedirect:
        print(request.POST)
        return redirect("quiz:index")
