
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const questions = [
    {
        question:"Which is sum 130+125+191 ?",
        answers:[
            { option: "A. 335", correct: false},
            { option: "B. 456", correct: false},
            { option: "C. 446", correct: true},
            { option: "D. 426", correct: false},
        ]
    },
    {
        question:"If we minus 712 from 1500, how much do we get?",
        answers:[
            { option: "788", correct: true},
            { option: "778", correct: false},
            { option: "768", correct: false},
            { option: "758", correct: false},
        ]
    },
    {
        question:"50 times of 8 is equal to:",
        answers:[
            { option: "80", correct: false},
            { option: "400", correct: true},
            { option: "800", correct: false},
            { option: "4000", correct: false},
        ]
    },
    {
        question:"What is the next prime number after 5?",
        answers:[
            { option: "6", correct: false},
            { option: "7", correct: true},
            { option: "9", correct: false},
            { option: "11", correct: false},
        ]
    },
    {
        question:"Solve 300-(150 x 2):",
        answers:[
            { option: "150", correct: false},
            { option: "100", correct: false},
            { option: "50", correct: false},
            { option: "0", correct: true},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
            button.innerHTML = answer.option;
            button.classList.add("bttn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}   

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();