from django.shortcuts import render
from django.views import View

from quiz.models import Quiz, UserAnswer


class ResultView(View):
    def get(self, request, slug):
        quiz = Quiz.objects.get(slug=slug)
        questions = quiz.questions.all()

        result_questions = []
        for question in questions:
            answers = []
            for answer in question.answers.all():
                question_answers = UserAnswer.objects.filter(answer=answer)
                print(question_answers)
                question_answers_count_all = question_answers.count()
                question_answers_count_true = question_answers.filter(
                    user_answer=True
                ).count()
                print(question_answers_count_all, question_answers_count_true)
                answers.append(
                    {
                        "name": answer.name,
                        "count": question_answers_count_true,
                        "percent": int(
                            question_answers_count_true
                            / question_answers_count_all
                            * 100
                        ),
                    }
                )
            result_questions.append(
                {"name": question.name, "answers": answers, "id": question.id}
            )

        context = {"quiz": quiz, "questions": result_questions}

        print(context)
        return render(request, "result.html", context=context)
