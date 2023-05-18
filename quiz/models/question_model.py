from django.db import models

QUIZ_TYPES = (("SINGLE_SELECT", "Single select"), ("MULTI_SELECT", "Multi select"))


class Question(models.Model):
    name = models.CharField(max_length=100)
    answers = models.ManyToManyField("Answer", related_name="answers")
    type = models.CharField(max_length=20, choices=QUIZ_TYPES, default="SINGLE_SELECT")

    def __str__(self):
        return self.name
