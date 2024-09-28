const questions = [
    {
        question: "What is the capital of Maharashtra?",
        answer: [
            { text: "Mumbai", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false },
            { text: "Bengaluru", correct: false },
        ]
    },
    {
        question: "What is the capital of Karnataka?",
        answer: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false },
            { text: "Bengaluru", correct: true },
        ]
    },
    {
        question: "What is the capital of Tamil Nadu?",
        answer: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: true },
            { text: "Bengaluru", correct: false },
        ]
    },
    {
        question: "What is the capital of Uttar Pradesh?",
        answer: [
            { text: "Lucknow", correct: true },
            { text: "Patna", correct: false },
            { text: "Jaipur", correct: false },
            { text: "Delhi", correct: false },
        ]
    },
    {
        question: "What is the capital of West Bengal?",
        answer: [
            { text: "Kolkata", correct: true },
            { text: "Mumbai", correct: false },
            { text: "Chennai", correct: false },
            { text: "Bengaluru", correct: false },
        ]
    },
    {
        question: "What is the capital of Gujarat?",
        answer: [
            { text: "Ahmedabad", correct: false },
            { text: "Gandhinagar", correct: true },
            { text: "Jaipur", correct: false },
            { text: "Bhopal", correct: false },
        ]
    },
    {
        question: "What is the capital of Rajasthan?",
        answer: [
            { text: "Jaipur", correct: true },
            { text: "Lucknow", correct: false },
            { text: "Patna", correct: false },
            { text: "Delhi", correct: false },
        ]
    },
    {
        question: "What is the capital of Madhya Pradesh?",
        answer: [
            { text: "Bhopal", correct: true },
            { text: "Jaipur", correct: false },
            { text: "Lucknow", correct: false },
            { text: "Patna", correct: false },
        ]
    },
    {
        question: "What is the capital of Bihar?",
        answer: [
            { text: "Patna", correct: true },
            { text: "Ranchi", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Bhubaneswar", correct: false },
        ]
    },
    {
        question: "Who created this application?",
        answer: [
            { text: "Rahul Mauriya", correct: false },
            { text: "Aamir Khan", correct: true },
            { text: "Tauseef Khan", correct: false },
            { text: "Farooque Khan", correct: false },
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let progressBarWidth = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeElement = document.getElementById("time");
const progressBar = document.querySelector(".progress");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    progressBarWidth = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    startTimer();
    updateProgressBar();
}

function resetState() {
    nextButton.style.display = "none";
    clearInterval(timer);
    timeLeft = 10;
    timeElement.innerHTML = timeLeft;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    clearInterval(timer);
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz; 
}

function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.innerHTML = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextButton.style.display = "block";
        }
    }, 1000);
}

function updateProgressBar() {
    progressBarWidth = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressBarWidth}%`;
}

startQuiz();
