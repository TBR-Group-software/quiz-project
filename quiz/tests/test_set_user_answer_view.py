import json
from datetime import timedelta

from django.contrib.auth.models import User
from django.test import TestCase
from django.test.client import RequestFactory
from django.utils import timezone

from quiz.models import Answer, Question, Quiz, UserAnswer
from quiz.views import set_user_answer_view


class TestSetUserAnswer(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.answer_1_question_1 = Answer.objects.create(name="Answer 1 for Question 1")
        cls.answer_2_question_1 = Answer.objects.create(name="Answer 2 for Question 1")
        cls.answer_3_question_1 = Answer.objects.create(name="Answer 3 for Question 1")
        cls.answer_1_question_2 = Answer.objects.create(name="Answer 1 for Question 2")
        cls.answer_2_question_2 = Answer.objects.create(name="Answer 2 for Question 2")
        cls.answer_3_question_2 = Answer.objects.create(name="Answer 3 for Question 2")

        cls.question_1 = Question.objects.create(name="Question 1")
        cls.question_1.answers.add(
            cls.answer_1_question_1, cls.answer_2_question_1, cls.answer_3_question_1
        )
        cls.question_1.save()

        cls.question_2 = Question.objects.create(name="Question 2")
        cls.question_2.answers.add(
            cls.answer_1_question_2, cls.answer_2_question_2, cls.answer_3_question_2
        )
        cls.question_2.save()

        cls.user = User.objects.create_user(username="test_user", password="12345678")

        yesterday = timezone.now() - timedelta(1)
        tomorrow = timezone.now() + timedelta(1)

        cls.quiz = Quiz.objects.create(
            name="Quiz-1",
            description="Quiz-1 description",
            user_created=cls.user,
            start_date=yesterday,
            end_date=tomorrow,
        )
        cls.quiz.questions.add(cls.question_1, cls.question_2)
        cls.quiz.save()

        cls.factory = RequestFactory()

        super(TestSetUserAnswer, cls).setUpClass()

    def test_set_user_answer_response(self):
        """Test set user answer view check response status code and json data."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        response = set_user_answer_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), {"complite": True})

    def test_set_user_answer_database_created_user_answer_user(self):
        """Test set user answer view check user in new user answer."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answer = UserAnswer.objects.get(
            user=self.user, answer=self.answer_1_question_1
        )
        self.assertEqual(user_answer.user, self.user)

    def test_set_user_answer_database_created_user_answer_answer(self):
        """Test set user answer view check answer in new user answer."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answer = UserAnswer.objects.get(
            user=self.user, answer=self.answer_1_question_1
        )
        self.assertEqual(user_answer.answer, self.answer_1_question_1)

    def test_set_user_answer_database_created_user_answer_user_answer(self):
        """Test set user answer view check user answer in new user answer."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answer = UserAnswer.objects.get(
            user=self.user, answer=self.answer_1_question_1
        )
        self.assertEqual(user_answer.user_answer, True)

    def test_set_user_answer_database_created_user_answer_count(self):
        """Test set user answer view check count of user answers in database."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.filter(user=self.user).count()
        self.assertEqual(user_answers_count, self.question_1.answers.count())

    def test_set_user_answer_database_created_user_answer_count_true(self):
        """Test set user answer view check count true of user answers in database."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.filter(
            user=self.user, user_answer=True
        ).count()

        self.assertEqual(user_answers_count, 1)

    def test_set_user_answer_database_created_user_answer_count_false(self):
        """Test set user answer view check count false of user answers in database."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.filter(
            user=self.user, user_answer=False
        ).count()

        self.assertEqual(user_answers_count, self.question_1.answers.all().count() - 1)

    def test_set_user_answer_database_created_user_answer_count_other_question(self):
        """Test set user answer view check count of user answers in database for another question."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.exclude(user=self.user).count()
        self.assertEqual(user_answers_count, 0)

    def test_set_user_answer_database_rechoice_user_answer(self):
        """Test set user answer view check user in rechoice user answer."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_2_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answer_1 = UserAnswer.objects.get(
            user=self.user, answer=self.answer_1_question_1
        )
        user_answer_2 = UserAnswer.objects.get(
            user=self.user, answer=self.answer_2_question_1
        )
        self.assertEqual(user_answer_1.user_answer, False)
        self.assertEqual(user_answer_2.user_answer, True)

    def test_set_user_answer_database_rechoice_user_answer_count_true(self):
        """Test set user answer view check count true of user answers in database for rechoice."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_2_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.filter(
            user=self.user, user_answer=True
        ).count()

        self.assertEqual(user_answers_count, 1)

    def test_set_user_answer_database_rechoice_user_answer_count_false(self):
        """Test set user answer view check count false of user answers in database for rechoice."""
        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_1_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        request = self.factory.post(
            "/set_user_answer/",
            data=json.dumps(
                {
                    "questionId": self.question_1.pk,
                    "anwerdId": self.answer_2_question_1.pk,
                }
            ),
            content_type="application/json",
        )
        request.user = self.user

        set_user_answer_view(request)

        user_answers_count = UserAnswer.objects.filter(
            user=self.user, user_answer=False
        ).count()

        self.assertEqual(user_answers_count, self.question_1.answers.all().count() - 1)
