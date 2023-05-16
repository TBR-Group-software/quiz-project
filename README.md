# Quiz project
The goal of this project is to develop the best quiz platform. This project was made using the Django framework and some minor libraries.

<p float="center", align="justify ">
  <img src="https://github.com/TBR-Group-software/quiz-project/assets/19671971/d44f6697-480c-4e83-bfd9-e5d3710595be" width="250" />

  <img src="https://github.com/TBR-Group-software/quiz-project/assets/19671971/dc69a6ce-c1ab-421c-9053-84adc8a8acbe" width="250" />
     
  <img src="https://github.com/TBR-Group-software/quiz-project/assets/19671971/68a5e6a2-6203-4014-a666-57b18a61c2d7" width="250" />
</p>
<p>
  <img src="https://github.com/TBR-Group-software/quiz-project/assets/19671971/cee67f6f-5d20-4b3f-85be-c0d0599e712d" width="750" />
</p>

## Features

- Responsive design for all types of devices
- Take quiz
- Create quiz
- Register and login
- Register email notification
- Docker container
- Unit tests

## Built with
- [Django](https://www.djangoproject.com/) - Back-end server side web framework
- [Celery](https://docs.celeryq.dev/en/stable/) - Simple, flexible, and reliable distributed system to process vast amounts of messages, while providing operations with the tools required to maintain such a system.
- [daphne](https://github.com/django/daphne/) - HTTP, HTTP2 and WebSocket protocol server for ASGI and ASGI-HTTP, developed to power Django Channels.
- [Visual Studio Code](https://code.visualstudio.com/) - Code Editing.
- [pre-commit](https://pre-commit.com/) - Framework for managing and maintaining multi-language pre-commit hooks.
- [black](https://github.com/psf/black) - The uncompromising Python code formatter.
- [Flake8](https://github.com/pycqa/flake8) - Python tool that glues together pycodestyle, pyflakes, mccabe, and third-party plugins to check the style and quality of some python code.
- [Bootstrap 5](https://getbootstrap.com/) - Bootstrap is a powerful, feature-packed frontend toolkit. Build anything-from prototype to production—in minutes.
- [Sass](https://sass-lang.com/) - Preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.
- [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) - Programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS
- [Docker](https://www.docker.com/) - Set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
- [Nginx](https://www.nginx.com/) -  Web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.
- [PostgreSQL](https://www.postgresql.org/) - Relational database management system emphasizing extensibility and SQL compliance.
- [RabbitMQ](https://www.rabbitmq.com/) - Message-broker software that originally implemented the Advanced Message Queuing Protocol.
- [Mailjet](https://www.mailjet.com/home/) - Cloud-based email delivery and tracking system which allows users to send marketing emails and transactional emails.

## Build

**Step 1:**

Download or clone this repo by using the link below:

```
https://github.com/TBR-Group-software/quiz-project.git
```

**Step 2:**

Create in root folder .env file and write in this values:

```
PSQL_NAME = 'quiz_project'
PSQL_USER = 'postgres'
PSQL_PASSWORD = 'XXX'
PSQL_HOST = 'localhost'
PSQL_PORT = 5432

DJANGO_DEBUG = True/False
DJANGO_ALLOWED_HOSTS = 'XXX'
DJANGO_SECRET_KEY = 'XXX'

RABBITMQ_HOST = 'localhost'
RABBITMQ_PORT = 5672

MAILJET_API_KEY = 'XXX'
MAILJET_SECRET_KEY = 'XXX'
MAILJET_SENDER = 'XXX@XXX.com'
```

**Step 3:**
#### If you want launch with Docker:

```
docker-compose up --build
```

Quiz project is now available at http://127.0.0.1/

#### Launch without Docker:

**Step 1:**
Create and activate python env
```
python3 -m venv env
. env/bin/activate
```
**Step 2:**
Install requirements-dev.txt
```
pip3 install -r requirements-dev.txt
```
**Step 3:**
Run PostgreSQL

**Step 4:**
Run RabbitMQ

**Step 5:**
Run django migrations
```
python3 manage.py migrate
```
**Step 6:**
Run Django server
```
python3 manage.py runserver
```

Quiz project is now available at http://127.0.0.1:8000/


## License
This project is licensed under the GNU GPL v3 License - see the [LICENSE.md](https://github.com/TBR-Group-software/quiz-project/blob/main/LICENSE) file for details.
