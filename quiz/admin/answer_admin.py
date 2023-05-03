from django.contrib import admin

from quiz.models import Answer


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
