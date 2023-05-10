from mailjet_rest import Client
import os

MAILJET_API_KEY = os.environ["MAILJET_API_KEY"]
MAILJET_SECRET_KEY = os.environ["MAILJET_SECRET_KEY"]
MAILJET_SENDER = os.environ["MAILJET_SENDER"]


class MailjetManager:
    """Mailjet manager."""

    def send_welcome_email(self, user_email):
        """Send welcome message to user email."""
        mailjet = Client(auth=(MAILJET_API_KEY, MAILJET_SECRET_KEY), version="v3.1")

        data = {
            "Messages": [
                {
                    "From": {"Email": MAILJET_SENDER, "Name": "Quiz project"},
                    "To": [{"Email": user_email, "Name": user_email}],
                    "Subject": "Welcome to Quiz project!",
                    "TextPart": "Welcome to Quiz project!",
                    "CustomID": "QuizProject",
                }
            ]
        }

        mailjet.send.create(data=data)
