from django.db import models


class AnswerText(models.Model):
    text = models.CharField(max_length=200)
    question = models.ForeignKey("Question", on_delete=models.CASCADE)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.text} - {self.question} - {self.user}"
