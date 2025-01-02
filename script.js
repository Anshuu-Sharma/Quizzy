const answerOptions = document.querySelector(".answer-options");
const nextQuestion = document.querySelector(".next-question-btn");

let quizCategory = "programming";
let currentQuestion = null;

const getRandomQuestion = () => {
    // This gives all questions of that category
   const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase())?.questions || [];

    // This will choose one random question
    const randomQuestion = categoryQuestions[Math.floor(Math.random()  * categoryQuestions.length)];
    return randomQuestion;
}

const highlightCorrectAnswer = () =>{
    const correctOption =  answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
    const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
}
const handleAnswer = (option, answerIndex) =>  {
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');

    !isCorrect ? highlightCorrectAnswer() : "";

    const iconHTML = `<span class="material-symbols-rounded">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    // disabling option selecting once an option has been selected
    answerOptions.querySelectorAll(".answer-option").forEach(option => {
        option.style.pointerEvents = "none";
    });

}
const renderQuestion = () =>{
    currentQuestion = getRandomQuestion();
    if(!currentQuestion) return;
    
    answerOptions.innerHTML = "";
    document.querySelector(".quiz_question").textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li);
        li.addEventListener("click", () => handleAnswer(li, index));

    })
}
renderQuestion();
nextQuestion.addEventListener("click", renderQuestion);
