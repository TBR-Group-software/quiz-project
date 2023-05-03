from django.db import models
from django.utils.text import slugify


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)
    description = models.TextField()
    questions = models.ManyToManyField("Question", related_name="questions")
    user_created = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Quiz, self).save(*args, **kwargs)

    def __str__(self):
        return (
            f"{self.name} - {self.user_created} - {self.start_date} - {self.end_date}"
        )
