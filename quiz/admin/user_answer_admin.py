from django.contrib import admin

from quiz.models import UserAnswer


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ("user", "answer", "user_answer")
    search_fields = ("user", "answer", "user_answer")
    list_filter = ("answer", "user_answer")
