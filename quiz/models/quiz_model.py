from django.db import models


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    questions = models.ManyToManyField("Question", related_name="questions")
    user_created = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return (
            f"{self.name} - {self.user_created} - {self.start_date} - {self.end_date}"
        )
