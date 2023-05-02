from django.contrib import admin

from quiz.models import AnswerText


@admin.register(AnswerText)
class AnswerTextAdmin(admin.ModelAdmin):
    list_display = ("text", "question", "user")
    search_fields = ("text", "question", "user")
    list_filter = ("text", "question", "user")
