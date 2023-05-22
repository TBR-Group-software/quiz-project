function previusScreen(){
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;
    currentQuestion.classList.add('d-none');
    prevQuestion.classList.remove('d-none');
    showOrHideButtons();
}

function nextScreen(){
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;
    currentQuestion.classList.add('d-none');
    nextQuestion.classList.remove('d-none');
    showOrHideButtons();
}

function showOrHideNextButton(){
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;
    if (nextQuestion == null) {
        document.querySelector('.next-button-container').classList.add('d-none');
    } else {
        document.querySelector('.next-button-container').classList.remove('d-none');
    }
}

function hideOrShowBackButton(){
    const currentQuestion = document.querySelector('.question-container:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;
    if (prevQuestion == null) {
        document.querySelector('.back-button-container').classList.add('d-none');
    } else {
        document.querySelector('.back-button-container').classList.remove('d-none');
    }
}

function showOrHideButtons(){
    showOrHideNextButton();
    hideOrShowBackButton();
}
