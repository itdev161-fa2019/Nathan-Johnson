const question = document.getElementsByName("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestions = {};
let acceptingAnswers = true;
let score = 0;
let questioncounter = 0;
let availiablequestions = [];

let questions = [

    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ];
  

  //constants

  const corrent_bonus = 10;
  const max_questions = 3;

  startGame = () => {
    questioncounter = 0;
    score = 0;
    availiableQuestions = [...questions];
    console.log(availiableQuestions);
    getNewQuestion();
  }

  getNewQuestion = () => {
    questioncounter++;
   const questionIndex = Math.floor(Math.random()*availiableQuestions.length);
    currentQuestion = availiableQuestions [questionIndex];
    question.innertext = currentQuestion.question;

    

  }
  
  startGame();