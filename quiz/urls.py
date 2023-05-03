from django.urls import path

from quiz.views import QuizView, set_user_answer_view

urlpatterns = [
    path("quiz/<slug:slug>", QuizView.as_view(), name="quiz"),
    path("set_user_answer", set_user_answer_view, name="set_user_answer"),
]
