from django.contrib import admin

from quiz.models import AnswerBool


@admin.register(AnswerBool)
class AnswerBoolAdmin(admin.ModelAdmin):
    list_display = ("bool", "question", "user")
    search_fields = ("bool", "question", "user")
    list_filter = ("bool", "question", "user")
