const configContainer = document.querySelector("#config_container");
const quizContainer = document.querySelector("#quiz_container");
const resultContainer = document.querySelector("#result_container");
const answerOptions = document.querySelector(".answer-options");
const nextQuestion = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const timerDisplay = document.querySelector(".time_duration");


const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let numberOfQuestions = 1;
let quizCategory = "programming";
let currentQuestion = null;
const questionsIndexHistory = [];
let correctAnswerCount = 0;


const resetTimer = () => {
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    timerDisplay.textContent = `${currentTime}s`;
}
const startTimer = () => {
    timer = setInterval(() => {
        currentTime--;
        timerDisplay.textContent = `${currentTime}s`;

        if (currentTime <= 0) {
            clearInterval(timer);
            const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
            correctOption.classList.add("correct");
            const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
            correctOption.insertAdjacentHTML("beforeend", iconHTML);
            answerOptions.querySelectorAll(".answer-option").forEach(option => {
                option.style.pointerEvents = "none";
            });
            document.querySelector(".next-question-btn").style.display = "block";
        }
    }, 1000);
}


var categories = document.querySelectorAll(".elem");
categories.forEach((e) => {
    e.addEventListener('click', () => {
        e.classList.add('active');
        quizCategory = e.innerHTML;
    })
})
var questionQuantities = document.querySelectorAll(".numbers");
questionQuantities.forEach((e) => {
    e.addEventListener('click', () => {
        e.classList.add('active');
        numberOfQuestions = e.innerHTML;
    })
})


const getRandomQuestion = () => {
    // This gives all questions of that category
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase())?.questions || [];

    if (questionsIndexHistory.length == Math.min(categoryQuestions.length, numberOfQuestions)) {
        quizContainer.style.display = "none";
        resultContainer.style.display = "flex";
        document.querySelector(".count-result").textContent = `You answered ${correctAnswerCount} out of ${numberOfQuestions} questions correctly.Great effort!`;
    }

    const availableQuestion = categoryQuestions.filter((_, index) => !questionsIndexHistory.includes(index));

    // This will choose one random question
    const randomQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];

    questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
    return randomQuestion;
}

const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
    const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
}

const handleAnswer = (option, answerIndex) => {
    clearInterval(timer);
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    !isCorrect ? highlightCorrectAnswer() : correctAnswerCount++;

    const iconHTML = `<span class="material-symbols-rounded">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    // disabling options once an option has been selected
    answerOptions.querySelectorAll(".answer-option").forEach(option => {
        option.style.pointerEvents = "none";
    });
  
    document.querySelector(".next-question-btn").style.display = "flex";

}

const renderQuestion = () => {
    currentQuestion = getRandomQuestion();
    if (!currentQuestion) return;

    resetTimer();
    startTimer();

    answerOptions.innerHTML = "";
    document.querySelector(".quiz_question").textContent = currentQuestion.question;

    questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions} </b>Questions`;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li);
        li.addEventListener("click", () => handleAnswer(li, index));
        document.querySelector(".next-question-btn").style.display = "none";
    })
}


const startQuiz = () =>{
    configContainer.style.display = "none";
    quizContainer.style.display = "flex";
    renderQuestion();
}
const resetQuiz = () =>{
    resetTimer();
    correctAnswerCount = 0;
    questionsIndexHistory.length = 0;
    configContainer.style.display = "flex";
    resultContainer.style.display = "none";
}

nextQuestion.addEventListener("click", renderQuestion);
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);
document.querySelector("#startButton").addEventListener("click", startQuiz);
