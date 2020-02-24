// colect global
let startBtn = document.querySelector('.start');
let question = document.querySelector('.question');
let scoreContainer = document.querySelector('.score');
let answersList = document.querySelector('.answersContainer');
let userName = document.querySelector('.userName');

userName.textContent = " ";

// set counter for bulid function
let counter = 0;

// set score for checkout function
let score = 0;
let output = 0;
scoreContainer.innerHTML = `${output}%`;


//Get user
function getUser() {
    let getUser = prompt('Your name is: ');
    userName.textContent = getUser;
}

// quiz Questions
let quizQuestions = [
    {
        question: "When was the first Serbian uprising?",
        answers: ["14.02.1804", "12.05.1805", "05.06.1992", "21.12.2000"],
        correctAnswer: "14.02.1804"
    },
    {
        question: "Who is raised the first Serbian uprising?",
        answers: ["Kralj Petar I Karađorđević", "Josip Broz-tito", "Karađorđe Petrović", "Milorad Dodik"],
        correctAnswer: "Karađorđe Petrović"
    },
    {
        question: "When was the second Serbian uprising?",
        answers: ["14.02.1900", "23.05.1815", "05.06.1996", "16.12.2018"],
        correctAnswer: "23.05.1815"
    },
    {
        question: "Who is raised the second Serbian uprising?",
        answers: ["Marko Marin", "Aleksandar Vučić", "Miloš Obrenović", "Hajduk Veljko"],
        correctAnswer: "Miloš Obrenović"
    },
]

//quiz bulid 
function quizBulid() {
    let questions = [];
    let answers = [];
    let htmlTemplate;

    question.textContent = '';
    htmlTemplate = ``;
    answersList.innerHTML = htmlTemplate;
    startBtn.textContent = "NEXT";


    quizQuestions.forEach(e => {
        questions.push(e.question);
    })

    if (counter <= 3) {
        for (let i = 0; i < quizQuestions[counter].answers.length; i++) {
            answers.push(quizQuestions[counter].answers[i]);
        }
    }

    question.textContent = questions[counter];

    for (let i = 0; i < answers.length; i++) {
        htmlTemplate = `
                <li>
                    <label>
                        <input type="radio"  class="answers" name="answer"  value="${answers[i]}">${answers[i]}
                    </label>
                </li>
            `
        answersList.innerHTML += htmlTemplate;
    }
}

// check amswers
function checkAnswers() {
    let userAnswers = document.querySelectorAll('.answers');
    let userAnswer;
    let inputs;

    let correctAnswers = [];
    quizQuestions.forEach(e => {
        correctAnswers.push(e.correctAnswer);
    });

    userAnswers.forEach(e => {
        e.addEventListener('click', e => {
            e.stopPropagation();
            if (e.target.tagName === "INPUT") {
                //prevent multiple clicks
                inputs = document.querySelectorAll('input');
                inputs.forEach((e) => {
                    e.disabled = true;
                })

                //update score and check answers
                userAnswer = e.target.value;
                for (let i = 0; i <= correctAnswers.length; i++) {
                    if (userAnswer === correctAnswers[i]) {
                        score += 25;
                    }
                }

                //animating score
                const timer = setInterval(() => {
                    scoreContainer.innerHTML = `${output}%`;
                    if (output === score) {
                        clearInterval(timer);
                    } else {
                        output++;
                    }
                }, 10)
            }
        });
    });
}


// app 
startBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.tagName === "BUTTON") {
        if (counter <= 3) {
            if (counter == 0) {
                getUser();
            }
            quizBulid();
            checkAnswers();

            counter++;
        } else {
            alert(`You won ${score}`);
            counter = 0;
            output = 0;
            score = 0;
            scoreContainer.innerHTML = `${output}%`;
            question.textContent = '';
            htmlTemplate = ``;
            answersList.innerHTML = htmlTemplate;
            startBtn.textContent = "START";
            userName.textContent = " ";
        }
    }
})
