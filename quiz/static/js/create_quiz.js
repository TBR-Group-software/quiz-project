const DEFAULT_ANSWER_COUNT = 3;
const MIN_ANSWER_COUNT = 2;
const MAX_ANSWER_COUNT = 5;

const MAX_QUESTION_COUNT = 10;
const MIN_QUESTION_COUNT = 2;

function changeScreenToAddQuestion() {
    const quizScreen = document.querySelector('.quiz');
    const addQuestionScreen = document.querySelector('.question-answer');

    document.querySelectorAll('.action').forEach(button => button.classList.remove('d-none'));

    quizScreen.classList.add('d-none');
    addQuestionScreen.classList.remove('d-none');

    showOrHideNextButton();
    showOrHideBackButton();
}

function addAnswer() {
    const answerContainer = document.querySelector('.question-answer:not(.d-none)').querySelector('.answers');
    const answerElemet = answerContainer.querySelector('.answer');
    const answerCount = answerContainer.querySelectorAll('.answer').length;

    if (answerCount >= MAX_ANSWER_COUNT) {
        alert(`You can't add more than ${MAX_ANSWER_COUNT} answers`);
        return;
    }
    const questionCount = document.querySelectorAll('.question-answer').length;
    let newAnswer = answerElemet.cloneNode(true);
    newAnswer.querySelector('input').value = '';
    newAnswer.querySelector('input').name = `question_${questionCount}_answer_${answerCount + 1}`;
    answerContainer.appendChild(newAnswer);

    showOrHideNextButton();
    showOrHideBackButton();
}

function addQuestion() {
    const questionContainer = document.querySelector('.question-answer');
    const questionCount = document.querySelectorAll('.question-answer').length;
    if (questionCount >= MAX_QUESTION_COUNT) {
        alert(`You can't add more than ${MAX_QUESTION_COUNT} questions`);
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
    showOrHideBackButton();
    showOrHideNextButton();
}

function hideCurrentQuestion() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    currentQuestion.classList.add('d-none');
}

function createQuiz() {
    const quizForm = document.getElementById('createQuizForm');
    quizForm.submit();
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
        alert(`You need at least ${MIN_ANSWER_COUNT} answers`);
    }
}

function removeQuestion() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null | !prevQuestion.classList.contains('question-answer')) {
        alert('You need at least one question');
        return;
    }
    currentQuestion.remove();
    prevQuestion.classList.remove('d-none');

    showOrHideNextButton();
    showOrHideBackButton();
}

function backButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {
        alert('You need at least one question');
        return;
    }
    currentQuestion.classList.add('d-none');
    prevQuestion.classList.remove('d-none');

    showOrHideNextButton();
    showOrHideBackButton();
}

function nextButton() {
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;

    if (nextQuestion == null || !nextQuestion.classList.contains('question-answer')) {
        alert('You need at least one question');
        return;
    }
    currentQuestion.classList.add('d-none');
    nextQuestion.classList.remove('d-none');

    showOrHideNextButton();
    showOrHideBackButton();
}

function showOrHideNextButton(){
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const nextQuestion = currentQuestion.nextElementSibling;
    console.log(nextQuestion);
    if (nextQuestion==null){ console.log('null');}

    if (nextQuestion == null || !nextQuestion.classList.contains('question-answer')) {
        document.querySelector('.next-button').classList.add('d-none');
        console.log('next button hidden');
    }
    else {
        document.querySelector('.next-button').classList.remove('d-none');
        console.log('back button shown');
    }

}

function showOrHideBackButton(){
    const currentQuestion = document.querySelector('.question-answer:not(.d-none)');
    const prevQuestion = currentQuestion.previousElementSibling;

    if (prevQuestion == null || !prevQuestion.classList.contains('question-answer')) {

        document.querySelector('.back-button').classList.add('d-none');
        console.log('back button hidden');
    }
    else {
        document.querySelector('.back-button').classList.remove('d-none');
        console.log('next button shown');
    }

}
