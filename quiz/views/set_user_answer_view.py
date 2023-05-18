import json

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from django.db.models import QuerySet

from quiz.models import Question, UserAnswer


@login_required(redirect_field_name="redirect_to", login_url="login")
def set_user_answer_view(request: HttpRequest) -> JsonResponse:
    """
    Create user answer for question and return JsonResponse.

    access: only authenticated users
    ajax params: questionId, anwerdId
    return: JsonResponse
    """
    request_data = json.loads(request.body.decode("utf-8"))

    type = request_data["type"]
    question_id = request_data["questionId"]
    answer_id = request_data["anwerdId"]
    user = request.user
    question = Question.objects.get(id=question_id)
    all_answer = question.answers.all()

    if type == "SINGLE_SELECT":
        return _process_single_select(user, answer_id, all_answer)
    elif type == "MULTI_SELECT":
        return _process_multi_select(user, answer_id, all_answer)

    return JsonResponse({"complite": False})


def _process_single_select(
    user: AbstractBaseUser | AnonymousUser, answer_id: int, all_answer: QuerySet
) -> JsonResponse:
    selected_answer = all_answer.get(id=answer_id)
    not_selected_answer = all_answer.exclude(id=answer_id)

    UserAnswer.objects.update_or_create(
        user=user, answer=selected_answer, defaults={"user_answer": True}
    )

    for answer in not_selected_answer:
        UserAnswer.objects.update_or_create(
            user=user, answer=answer, defaults={"user_answer": False}
        )

    return JsonResponse({"complite": True})


def _process_multi_select(
    user: AbstractBaseUser | AnonymousUser, answer_ids: int, all_answer: QuerySet
) -> JsonResponse:
    selected_answers = all_answer.filter(id__in=answer_ids)
    not_selected_answers = all_answer.exclude(id__in=answer_ids)

    for answer in selected_answers:
        UserAnswer.objects.update_or_create(
            user=user, answer=answer, defaults={"user_answer": True}
        )

    for answer in not_selected_answers:
        UserAnswer.objects.update_or_create(
            user=user, answer=answer, defaults={"user_answer": False}
        )

    return JsonResponse({"complite": True})
