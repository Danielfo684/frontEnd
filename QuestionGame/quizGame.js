let question;
let assignedQuestion = 0;
let correctAnswer;
let score = 0;
let defaultImage =
        'https://as1.ftcdn.net/v2/jpg/01/34/02/24/1000_F_134022431_DCaIkrIQ2x0QV6qZpmhSaF5mc9I3YOkc.jpg';

function init() {
    fetch('https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/quizimg')
    .then(response => response.json())
    .then(text => game(text));
}

function game(text) {
    //test2
    showQuestion(text);

    //buttons
    document.getElementById('quizButtonTrue').addEventListener('click', () => {
        checkAnswer(1);
    });
    document.getElementById('quizButtonFalse').addEventListener('click', () => {
        checkAnswer(0);
    });

    document.getElementById('quizButtonNext').addEventListener('click', () => {
        nextQuestion(text);
    });

    //restart
    document.getElementById('quizButtonRestart').addEventListener('click', () => {
        document.getElementById('quizButtonRestart').style.display = 'none';
location.reload();
    });


}

//checkAnswer
function checkAnswer(buttonValidation) {
    hideButtons();
    if (question.correct === buttonValidation) {
        document.getElementById('quizResult').textContent = 'Correct';
        score++;
        document.getElementById('quizScore').textContent = 'Score: ' + score;
    } else {
        document.getElementById('quizResult').textContent = 'Incorrect';
    }
    document.getElementById('quizExplanation').textContent = question.realNew;
    document.getElementById('quizExplanation').style.display = 'block';
}

//hideButtons
function hideButtons() {
    document.getElementById('quizButtonTrue').style.display = 'none';
    document.getElementById('quizButtonFalse').style.display = 'none';
    document.getElementById('quizButtonNext').style.display = 'block';
}

//showButtons
function showButtons() {
    document.getElementById('quizButtonTrue').style.display = 'block';
    document.getElementById('quizButtonFalse').style.display = 'block';
    document.getElementById('quizButtonNext').style.display = 'none';
}

//nextQuestion
function nextQuestion(text) {
    assignedQuestion++;
    if (assignedQuestion >= text.questions.length) {
        document.getElementById('quizButtonRestart').style.display = 'block';
        document.getElementById('quizButtonNext').style.display = 'none';
    } else {
        showQuestion(text);
        document.getElementById('quizResult').textContent = '';
        showButtons();
    }
document.getElementById('quizExplanation').style.display = 'none';
}

function showQuestion(text) {
    question = text.questions[assignedQuestion];
    document.getElementById('quizTestImage').src = question.img ? question.img : defaultImage;
    document.getElementById('quizTestText').textContent = question.question;
}
window.onload = init();
