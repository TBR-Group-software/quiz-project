from celery.exceptions import TimeLimitExceeded
from quiz_project.celery import app
from account.managers import MailjetManager


@app.task(
    time_limit=60 * 60 * 2,
    autoretry_for=(TimeLimitExceeded,),
    default_retry_delay=10,
    retry_kwargs={"max_retries": 3},
    resultrepr_maxsize=100000,
)
def send_welcome_message(user_email):
    """Send welcome message to user email."""
    mailjet_manager = MailjetManager()
    mailjet_manager.send_welcome_email(user_email)
    return f"success send email to user {user_email}"
