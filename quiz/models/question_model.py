from django.db import models


class Question(models.Model):
    name = models.CharField(max_length=100)
    answers = models.ManyToManyField("Answer", related_name="answers")

    def __str__(self):
        return self.name
