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

function processUserChoice(questionId, anwerdId) {
    const isAnswered = sendUserChoice(questionId, anwerdId);
    if (isAnswered) {
        unCheckAnswer(anwerdId, questionId);
        const isNextSelected = selectNextQuestion(questionId);
        if (!isNextSelected) {
            console.log('Quiz is finished');
            finishQuiz();
        }
    }
    updateProgressBar(questionId);
}

function sendUserChoice(questionId, anwerdId) {
    let xhttp = new XMLHttpRequest();
    xhttp.onerror = function () {
        console.log(this);
        return false
    }

    xhttp.onload = function () {
        console.log(this);
        return true
    }

    const postObj = {
        questionId: questionId,
        anwerdId: anwerdId,
    };
    const postJSON = JSON.stringify(postObj);

    xhttp.open("POST", `/set_user_answer`, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhttp.send(postJSON);

    return true;
}

function selectNextQuestion(questionId) {
    const question = document.getElementById(`question_${questionId}`);
    const nextQuestion = question.nextElementSibling;
    if (nextQuestion == null) {
        return false;
    }

    question.className += ' d-none';
    nextQuestion.className = nextQuestion.className.replace('d-none', '');
    hideOrShowBackButton();

    return true;
}

function updateProgressBar(questionId, isBackButtonPressed = false) {
    const progressBar = document.getElementById('progress_bar');
    const questions = Array.prototype.slice.call(document.getElementById('questions').children);
    const questionsCount = questions.length;
    const currentQuestionIndex = questions.findIndex(question => question.id === `question_${questionId}`);
    if (currentQuestionIndex === -1) {
        return false;
    }
    if (!isBackButtonPressed) {
        var progress = Math.round((currentQuestionIndex + 1) / questionsCount * 100);
    } else {
        var progress = Math.round((currentQuestionIndex) / questionsCount * 100);
        if (progress < 0) {
            progress = 0;
        }
    }

    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);

    return true;
}

function finishQuiz() {
    const lastQuestion = document.getElementById('questions').lastElementChild;
    lastQuestion.className += ' d-none';

    const finishScreen = document.getElementById('finish_quiz_container');
    finishScreen.className = finishScreen.className.replace('d-none', '');
}

function backToPreviusQuestion() {
    let currentQuestion = document.querySelector('.question-container:not(.d-none)');
    if (currentQuestion == null) {
        var prevQuestion = document.querySelector('.last-question.d-none');
        const finishScreen = document.getElementById('finish_quiz_container');
        finishScreen.className += ' d-none';
    }
    else {
        var prevQuestion = currentQuestion.previousElementSibling;
        currentQuestion.className += ' d-none';
    }

    if (prevQuestion == null) {
        return false;
    }

    prevQuestion.className = prevQuestion.className.replace('d-none', '');

    updateProgressBar(prevQuestion.id.replace('question_', ''), true);
    hideOrShowBackButton();

    return true;
}

function hideOrShowBackButton() {
    const backButton = document.querySelector('.back-button-container');
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const questions = Array.prototype.slice.call(document.getElementById('questions').children);
    const currentQuestionIndex = questions.findIndex(question => question.id === currentQuestion.id);
    if (currentQuestionIndex === 0) {
        backButton.className += ' d-none';
    }
    else {
        backButton.className = backButton.className.replace('d-none', '');
    }
}

function unCheckAnswer(answerId, questionId) {
    const question = document.getElementById(`question_${questionId}`);
    const allAnswerds = question.getElementsByClassName('form-check-input');
    for (var currentAnserIndex = 0; currentAnserIndex < allAnswerds.length; currentAnserIndex++) {
        if (allAnswerds[currentAnserIndex].id != `answer_${answerId}`) {
            allAnswerds[currentAnserIndex].checked = false;
        }
        else{
            allAnswerds[currentAnserIndex].checked = true;
        }
    }
}
