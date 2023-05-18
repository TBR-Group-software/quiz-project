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

function processSingleUserChoice(questionId, anwerdId) {
    const data = {
        type: 'SINGLE_SELECT',
        questionId: questionId,
        anwerdId: anwerdId,
    }
    const isAnswered = sendUserChoice(data);
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

function sendUserChoice(data) {
    let xhttp = new XMLHttpRequest();
    xhttp.onerror = function () {
        console.log(this);
        return false
    }

    xhttp.onload = function () {
        console.log(this);
        return true
    }

    const postJSON = JSON.stringify(data);

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

    question.classList.add('d-none');
    nextQuestion.classList.remove('d-none');
    hideOrShowBackButton();
    showOrHideNextButton();

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
    lastQuestion.classList.add('d-none');

    const finishScreen = document.getElementById('finish_quiz_container');
    finishScreen.classList.remove('d-none');
}

function backToPreviusQuestion() {
    let currentQuestion = document.querySelector('.question-container:not(.d-none)');
    if (currentQuestion == null) {
        var prevQuestion = document.querySelector('.last-question.d-none');
        const finishScreen = document.getElementById('finish_quiz_container');
        finishScreen.classList.add('d-none');
    }
    else {
        var prevQuestion = currentQuestion.previousElementSibling;
        currentQuestion.classList.add('d-none');
    }

    if (prevQuestion == null) {
        return false;
    }

    prevQuestion.classList.remove('d-none');

    updateProgressBar(prevQuestion.id.replace('question_', ''), true);
    hideOrShowBackButton();
    showOrHideNextButton();

    return true;
}

function hideOrShowBackButton() {
    const backButton = document.querySelector('.back-button-container');
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const questions = Array.prototype.slice.call(document.getElementById('questions').children);
    const currentQuestionIndex = questions.findIndex(question => question.id === currentQuestion.id);
    if (currentQuestionIndex === 0) {
        backButton.classList.add('d-none');
    }
    else {
        backButton.classList.remove('d-none');
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

function showOrHideNextButton(){
    const nextButton = document.querySelector('.next-button');
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    if (currentQuestion == null) {
        nextButton.classList.add('d-none');
        return false;
    }
    const answers = currentQuestion.querySelectorAll('input[type="checkbox"]');
    const isAnyAnswerChecked = Array.prototype.slice.call(answers).some(answer => answer.checked);
    if (isAnyAnswerChecked) {
        nextButton.classList.remove('d-none');
        return true;
    }
    else {
        nextButton.classList.add('d-none');
        return false;
    }
}

function processMultiUserChoice(){
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const answers = currentQuestion.querySelectorAll('input[type="checkbox"]:checked');

    const data = {
        type: 'MULTI_SELECT',
        questionId: currentQuestion.id.replace('question_', ''),
        anwerdId: Array.prototype.slice.call(answers).map(answer => answer.id.replace('answer_', '')),
    }
    const isAnswered = sendUserChoice(data);

    if (isAnswered) {
        const isNextSelected = selectNextQuestion(data.questionId);
        if (!isNextSelected) {
            console.log('Quiz is finished');
            finishQuiz();
        }
    }
    updateProgressBar(data.questionId);
    showOrHideNextButton();
}
