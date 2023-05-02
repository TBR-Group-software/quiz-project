from django.contrib import admin

from quiz.models import Quiz


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("name", "user_created", "start_date", "end_date")
    search_fields = ("name", "user_created", "start_date", "end_date")
    list_filter = ("name", "user_created", "start_date", "end_date")
