from django.urls import path

from quiz.views import IndexView, QuizView, set_user_answer_view, user_login

urlpatterns = [
    path("accounts/login/", user_login, name="login"),
    path("quiz/<slug:slug>", QuizView.as_view(), name="quiz"),
    path("set_user_answer", set_user_answer_view, name="set_user_answer"),
    path("", IndexView.as_view(), name="index"),
]
