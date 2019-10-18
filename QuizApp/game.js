const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);


const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");


const loader = document.getElementById("loader");
const game = document.getElementById('game');


let currentQuestions = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availiableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=50&category=18&difficulty=hard&difficulty=medium&type=multiple")
.then( res => {
  console.log(res)
  return res.json();
})

.then(loadedQuestions => {
  console.log(loadedQuestions.results);
questions = loadedQuestions.results.map(loadedQuestion => {
  const formattedQuestion = {
    question: loadedQuestion.question
  };

  const answerChoices = [...loadedQuestion.incorrect_answers];
  formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
  answerChoices.splice(
    formattedQuestion.answer -1, 0,
    loadedQuestion.correct_answer);

answerChoices.forEach((choice,index) => {
  formattedQuestion["choice" + (index+1)] = choice;
});

  return formattedQuestion;
});

game.classList.remove("hidden");
loader.classList.add("hidden");
startGame();

})

.catch( err => {
  console.error(err);
})

/*[ {
    "question": "Inside which HTML element do we put the JavaScript??",
    "choice1": "<script>",
    "choice2": "<javascript>",
    "choice3": "<js>",
    "choice4": "<scripting>",
    "answer": 1
  },
  {
    "question":
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "choice1": "<script href='xxx.js'>",
    "choice2": "<script name='xxx.js'>",
    "choice3": "<script src='xxx.js'>",
    "choice4": "<script file='xxx.js'>",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }
]
*/

  //constants

  const CORRECT_BONUS = 100;
  const MAX_QUESTIONS = 15;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availiableQuestions = [...questions];
    console.log(availiableQuestions);
    getNewQuestion();
  }

  getNewQuestion = () => {
    if (availiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
      localStorage.setItem("mostRecentScore", score);
    // go to the end page
    return window.location.assign("/end.html");
  }

    questionCounter++;
    questionCounterText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    console.log((questionCounter / MAX_QUESTIONS) * 100)
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;


   const questionIndex = Math.floor(Math.random() * availiableQuestions.length);
    currentQuestion = availiableQuestions [questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });

      availiableQuestions.splice(questionIndex, 1);
      acceptingAnswers = true;
  };
  
  choices.forEach(choice => {
    choice.addEventListener("click", e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

     const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
     
     if(classToApply === 'correct') {
       incrementScore(CORRECT_BONUS);
     }

      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() =>{

        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 400);


  

  });

});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
