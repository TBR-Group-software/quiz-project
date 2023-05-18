from django.contrib import admin

from quiz.models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "type",
    )
    search_fields = ("name",)
    list_filter = ("type",)
