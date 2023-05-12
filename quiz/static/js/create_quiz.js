const DEFAULT_ANSWER_COUNT = 2;
const MIN_ANSWER_COUNT = 2;
const MAX_ANSWER_COUNT = 5;

const MAX_QUESTION_COUNT = 10;
const MIN_QUESTION_COUNT = 2;


function changeScreenToAddQuestion() {
    const quizScreen = document.querySelector('.quiz');
    const addQuestionScreen = document.querySelector('.question-answer');
    const pageCounter = document.querySelector('#page-counter');

    document.querySelectorAll('.action').forEach(button => button.classList.remove('invisible'));

    quizScreen.classList.add('d-none');
    addQuestionScreen.classList.remove('d-none');

    pageCounter.classList.remove('d-none');
    pageCounter.classList.add('d-block');

    showOrHideButtons();
}

function addAnswer() {
    const answerContainer = document.querySelector('.question-answer:not(.d-none)').querySelector('.answers');
    const answerElemet = answerContainer.querySelector('.answer');
    const answerCount = answerContainer.querySelectorAll('.answer').length;

    if (answerCount >= MAX_ANSWER_COUNT) {
        createAlert('danger', `You can't add more than ${MAX_ANSWER_COUNT} answers`);
        return;
    }
    const questionCount = document.querySelectorAll('.question-answer').length;
    let newAnswer = answerElemet.cloneNode(true);
    newAnswer.querySelector('input').value = '';
    newAnswer.querySelector('input').name = `question_${questionCount}_answer_${answerCount + 1}`;
    answerContainer.appendChild(newAnswer);

    showOrHideButtons();
}

function addQuestion() {
    const questionContainer = document.querySelector('.question-answer');
    const questionCount = document.querySelectorAll('.question-answer').length;
    if (questionCount >= MAX_QUESTION_COUNT) {
        createAlert('danger', `You can't add more than ${MAX_QUESTION_COUNT} questions`);
        return;
    }
    let newQuestion = questionContainer.cloneNode(true);
    newQuestion.querySelector('.question').name = `question_name_${questionCount + 1}`;

    var answerIndex = 0;
    newQuestion.querySelectorAll('.answer').forEach(answer => {
        answerIndex++;
        if (answerIndex > DEFAULT_ANSWER_COUNT) {
            answer.remove()
        }
        else {
            answer.querySelector('input').name = `question_${questionCount + 1}_answer_${answerIndex}`;
        }
    });
    newQuestion.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    newQuestion.classList.remove('d-none');
    hideCurrentQuestion();
    questionContainer.parentElement.appendChild(newQuestion);

    showOrHideButtons();
}

function showOrHideAddQuestionButton() {
    const questionCount = document.querySelectorAll('.question-answer').length;
    const addQuestionButton = document.querySelector('.add-question');
    if (questionCount >= MAX_QUESTION_COUNT) {
        addQuestionButton.classList.add('invisible');
    }
    else {
        addQuestionButton.classList.remove('invisible');
    }
}

function showOrHideAddAnswerButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const answerCount = currentQuestion.querySelectorAll('.answer').length;
    const addAnswerButton = currentQuestion.querySelector('.add-answer');
    if (answerCount >= MAX_ANSWER_COUNT) {
        addAnswerButton.classList.add('invisible');
    }
    else {
        addAnswerButton.classList.remove('invisible');
    }
}

function hideCurrentQuestion() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    currentQuestion.classList.add('d-none');
}

function createQuiz() {
    const quizForm = document.getElementById('createQuizForm');

    if (!validateFields()){
        return;
    }

    const questionsInForm = document.querySelectorAll('.question-answer');
    let questions = [];
    questionsInForm.forEach(question => {
        let answers = [];
        question.querySelectorAll('.answer').forEach(answer => {
            answers.push(answer.querySelector('input').value);
        });
        questions.push({
            "question": question.querySelector('.question').value,
            "answers": answers
        });
    });

    let data = {
        "quiz_name": quizForm.querySelector('#quiz_name').value,
        "quiz_description": quizForm.querySelector('#quiz_description').value,
        "quiz_start_date": quizForm.querySelector('#quiz_start_date').value,
        "quiz_end_date": quizForm.querySelector('#quiz_end_date').value,
        "questions": questions
        };

    sendCreateQuiz(data);
}

function sendCreateQuiz(data){
    let xhttp = new XMLHttpRequest();
    xhttp.onerror = function () {
        createAlert('danger', this.responseText);
        return false
    }

    xhttp.onload = function () {
        console.log(this);
        if (this.status != 200) {
            createAlert('danger', this.responseText);
            return false
        }
        window.location.replace("/");
        return true
    }

    const postJSON = JSON.stringify(data);

    xhttp.open("POST", `/create_quiz`, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhttp.send(postJSON);

    return true;
}

function removeAnswer(element) {
    const answerContainer = element.parentElement.parentElement;
    const answerCount = answerContainer.querySelectorAll('.answer').length;

    if (answerCount > MIN_ANSWER_COUNT) {
        element.parentElement.remove();
        const answerContainer = document.querySelector('.question-answer:not(.d-none)').querySelector('.answers')
        const answers = answerContainer.querySelectorAll('.answer');
        answers.forEach((answer, index) => {
            answer.querySelector('input').name = answer.querySelector('input').name.replace(/answer_\d+/, `answer_${index + 1}`);
        });
    }
    else {
        createAlert('danger', `You need at least ${MIN_ANSWER_COUNT} answers`);
    }
    showOrHideAddAnswerButton();
}

function removeQuestion() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {
        createAlert('danger', 'You need at least one question');
        return;
    }
    currentQuestion.remove();
    prevQuestion.classList.remove('d-none');

    showOrHideButtons();
}

function confirmRemoveQuestion() {
    new bootstrap.Modal(document.getElementById('removeQuestionModal')).show();
}

function backButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {
        createAlert('danger', 'You need at least one question');
        return;
    }
    currentQuestion.classList.add('d-none');
    prevQuestion.classList.remove('d-none');

    showOrHideButtons();
}

function nextButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;

    if (nextQuestion == null || !nextQuestion.classList.contains('question-answer')) {
        createAlert('danger', 'You need at least one question');
        return;
    }
    currentQuestion.classList.add('d-none');
    nextQuestion.classList.remove('d-none');

    showOrHideButtons();
}

function backToStart() {
    const quizScreen = document.querySelector('.quiz');
    const addQuestionScreen = document.querySelector('.question-answer');
    const pageCounter = document.querySelector('#page-counter');

    quizScreen.classList.remove('d-none');
    addQuestionScreen.classList.add('d-none');

    pageCounter.classList.remove('d-block');
    pageCounter.classList.add('d-none');

    document.querySelectorAll('.action').forEach(button => button.classList.add('invisible'));
}

function showOrHideNextButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;

    if (nextQuestion == null || !nextQuestion.classList.contains('question-answer')) {
        document.querySelector('.next-button').classList.add('invisible');
    }
    else {
        document.querySelector('.next-button').classList.remove('invisible');
    }
}

function showOrHideBackButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {

        document.querySelector('.back-button').classList.add('invisible');
    }
    else {
        document.querySelector('.back-button').classList.remove('invisible');
    }
}

function showOrHideCreateButton() {
    const questionCount = document.querySelectorAll('.question-answer').length;

    if (questionCount >= MIN_QUESTION_COUNT && questionCount <= MAX_QUESTION_COUNT) {
        document.querySelector('.action-create-quiz').classList.remove('invisible');
    }
    else {
        document.querySelector('.action-create-quiz').classList.add('invisible');
    }
}

function showCurrentPage() {
    const allQuestions = document.querySelectorAll('.question-answer');
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const questionIndex = Array.from(allQuestions).indexOf(currentQuestion);
    document.querySelector('#page-counter').innerHTML = `Page ${questionIndex + 1}`;
}

function showOrHideRemoveQuestionButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {
        document.querySelector('.remove-question-button').classList.add('d-none');
    }
    else {
        document.querySelector('.remove-question-button').classList.remove('d-none');
    }
}

function showBackToStartButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {
        document.querySelector('.back-to-start-button').classList.remove('d-none');
    }
    else {
        document.querySelector('.back-to-start-button').classList.add('d-none');
    }
}


function showOrHideButtons() {
    showOrHideNextButton();
    showOrHideBackButton();
    showOrHideCreateButton();
    showCurrentPage();
    showOrHideRemoveQuestionButton();
    showBackToStartButton();
    showOrHideAddQuestionButton();
    showOrHideAddAnswerButton();
}

function validateFields() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const questionName = currentQuestion.querySelector('.question').value;
    const answers = currentQuestion.querySelectorAll('.answer');
    let valid = true;
    if (questionName == '') {
        createAlert('danger', 'Question name is required');
        valid = false;
    }
    answers.forEach(answer => {
        if (answer.querySelector('input').value == '') {
            createAlert('danger', 'Answer text is required');
            valid = false;
        }
    });
    return valid;
}

const getCookie = function (cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}


function createAlert(type, message) {
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'position-absolute', 'message-alert');
    const alectConteiner = document.createElement('div');
    alectConteiner.innerHTML = message;
    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    alectConteiner.appendChild(closeButton);
    alert.appendChild(alectConteiner);
    const screen = document.querySelector('.screen');
    screen.prepend(alert);

    return alert;
}
