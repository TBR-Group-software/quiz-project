function previusScreen() {
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;
    currentQuestion.classList.add('d-none');
    prevQuestion.classList.remove('d-none');
    showOrHideButtons();
    updateProgressBar(prevQuestion.id.replace('question_', ''), true);
}

function nextScreen() {
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;
    currentQuestion.classList.add('d-none');
    nextQuestion.classList.remove('d-none');
    showOrHideButtons();
    updateProgressBar(nextQuestion.id.replace('question_', ''));
}

function showOrHideNextButton() {
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;
    if (nextQuestion == null) {
        document.querySelector('.next-button-container').classList.add('d-none');
    } else {
        document.querySelector('.next-button-container').classList.remove('d-none');
    }
}

function hideOrShowBackButton() {
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;
    if (prevQuestion == null) {
        document.querySelector('.back-button-container').classList.add('d-none');
    } else {
        document.querySelector('.back-button-container').classList.remove('d-none');
    }
}

function showOrHideButtons() {
    showOrHideNextButton();
    hideOrShowBackButton();
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
