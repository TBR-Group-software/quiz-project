from django.urls import path

from quiz.views import (
    CreateQuizView,
    IndexView,
    QuizView,
    set_user_answer_view,
    ResultView,
)

urlpatterns = [
    path("quiz/<slug:slug>", QuizView.as_view(), name="quiz"),
    path("set_user_answer", set_user_answer_view, name="set_user_answer"),
    path("create_quiz", CreateQuizView.as_view(), name="create_quiz"),
    path("result/<slug:slug>", ResultView.as_view(), name="result"),
    path("", IndexView.as_view(), name="index"),
]
