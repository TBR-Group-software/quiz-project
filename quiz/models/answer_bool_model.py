from django.db import models


class AnswerBool(models.Model):
    bool = models.BooleanField()
    question = models.ForeignKey("Question", on_delete=models.CASCADE)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.bool} - {self.question} - {self.user}"
