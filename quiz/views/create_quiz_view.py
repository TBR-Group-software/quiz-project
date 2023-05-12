from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponsePermanentRedirect,
    HttpResponseRedirect,
)
from django.shortcuts import redirect, render
from django.views import View
import json

from quiz.forms import CreateAnswerForm, CreateQuestionForm, CreateQuizForm
from quiz.models import Quiz, Question, Answer
from psycopg2.errors import UniqueViolation
from django.db.utils import IntegrityError
from django.contrib import messages


MIN_ANSWER_COUNT = 2
MAX_ANSWER_COUNT = 5
MAX_QUESTION_COUNT = 10
MIN_QUESTION_COUNT = 2


class CreateQuizView(LoginRequiredMixin, View):
    """Create quiz view."""

    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, "create_quiz.html")

    def post(
        self, request: HttpRequest
    ) -> HttpResponseRedirect | HttpResponsePermanentRedirect | HttpResponse:
        request_data = json.loads(request.body.decode("utf-8"))
        quiz_data = {
            "name": request_data["quiz_name"],
            "description": request_data["quiz_description"],
            "start_date": request_data["quiz_start_date"],
            "end_date": request_data["quiz_end_date"],
        }
        if CreateQuizForm(data=quiz_data).is_valid():
            try:
                quiz = Quiz(**quiz_data, user_created=request.user)
                quiz.save()
            except (UniqueViolation, IntegrityError):
                return HttpResponse(
                    status=400, content="Quiz with this name already exists"
                )
            if (
                len(request_data["questions"]) > MAX_QUESTION_COUNT
                or len(request_data["questions"]) < MIN_QUESTION_COUNT
            ):
                return HttpResponse(status=400, content="Too many or too few questions")
            for question_request_data in request_data["questions"]:
                question_data = {"name": question_request_data["question"]}
                if CreateQuestionForm(data=question_data).is_valid():
                    if (
                        len(question_request_data["answers"]) < MIN_ANSWER_COUNT
                        or len(question_request_data["answers"]) > MAX_ANSWER_COUNT
                    ):
                        return HttpResponse(
                            status=400, content="Too many or too few answers"
                        )
                    question = Question(**question_data)
                    question.save()
                    for answer in question_request_data["answers"]:
                        answer_data = {"name": answer}
                        if CreateAnswerForm(data=answer_data).is_valid():
                            answer = Answer(**answer_data)
                            answer.save()
                            question.answers.add(answer)
                    quiz.questions.add(question)
        else:
            return HttpResponse(status=400, content="Form not valid")
        messages.success(request, "Qiuz created!.")
        return redirect("quiz:index")
