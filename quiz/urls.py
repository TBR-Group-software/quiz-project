from django.urls import path

from quiz.views import IndexView

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
]
