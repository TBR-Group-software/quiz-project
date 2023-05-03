from django.db import models


class UserAnswer(models.Model):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    answer = models.ForeignKey("Answer", on_delete=models.CASCADE)
    user_answer = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} - {self.answer} - {self.user_answer}"

    class Meta:
        """Meta definition for UserAnswer."""

        unique_together = ("user", "answer")
