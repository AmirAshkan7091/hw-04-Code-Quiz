var startBtn = document.getElementById("btn-start");
var timer = document.getElementById("timer");
var highscore = document.getElementById("highscores");
var startingContainer = document.getElementById("starting-page");
var quizContainer = document.getElementById("quiz-container");
var finalContainer = document.getElementById("final-container");
var questionTitle = document.getElementById("questiontitle");
var congrats = document.getElementById("right-or-wrong");
var rightCorner = document.getElementById("rightCorner");
var quizScore = document.getElementById("quizScore");
var initialBtn = document.getElementById("initial-submit");
var initials = document.getElementById("initials");
var highScoreContainer = document.getElementById("highscore-container");
var clearHighscoreBtn = document.getElementById("clear-highscore");
var goHomeBtn = document.getElementById("go-back");
var displayedScores = document.getElementById("displayedScores");

var secondsLeft = 75;
var score = 0;
var currentQuestion = 0; 


startBtn.addEventListener("click", function() {
   quizTimer();
    startingContainer.setAttribute("class","container d-none");
    quizContainer.setAttribute("class","container");
})


function endGame() {
    if (secondsLeft === 0 || currentQuestion > 4) {
        quizContainer.setAttribute("class","container d-none");
        finalContainer.setAttribute("class","container");
        score = secondsLeft;
        quizScore.textContent = "Your final score is: " + score;
    } else {
        console.log(currentQuestion)
    }
}


function generateQuestion() {
    var choicesArr = questions[currentQuestion].choices;
    questionTitle.textContent = questions[currentQuestion].title;
    console.log(questions[currentQuestion].title);
    for (var i = 0; i < choicesArr.length; i++) {
    console.log(choicesArr[i]);
    document.getElementById("btn-" + i).textContent = choicesArr[i]; 
    var currentBtn = document.getElementById("btn-" + i);
    currentBtn.addEventListener("click", handleAnswerClick)
    }
}

function handleAnswerClick(){
    console.log(this.textContent);
    console.log(questions[currentQuestion].answer);
    if(this.textContent===questions[currentQuestion].answer) {
        currentQuestion ++;
        congrats.textContent = "congratulations!"
        endGame();
        generateQuestion();
    }  else {

            secondsLeft -= 5; 
            congrats.textContent = " -5 seconds. Try again!"
            endGame();
            generateQuestion();
    }
}

var questions = [
    {
        title: "1. The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
        choices: ["<html></html>", "<body></body>", "<meta></meta>","<style></style>"], 
        answer: "<meta></meta>"
    },
    {
        title: "2. Which of the following tags is used to insert a blank line?",
        choices: ["<br>","<h1>","<hr>","<p>"],
        answer: "<hr>"
    },
    {
        title: "3. Items in a(n) ___ list are preceded by numbers.",
        choices: ["unordered","bulleted","ordered","grocery"],
        answer: "bulleted"
    },
    {
        title: "4. How do you add a comment in a CSS file?",
        choices: ["/* this is a comment */","// this is a comment //","// this is a comment","<! this is a comment>"],
        answer: "/* this is a comment */"
    },
    {
        title: "5. The # symbol specifies that the selector is?",
        choices: ["class","tag","first","id"],
        answer: "id"
    },
];

function quizTimer() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft;
  
      if(secondsLeft === 0 || currentQuestion > 4) {
        clearInterval(timerInterval);
        timer.setAttribute("class","timer d-none");

      }
  
    }, 750);
  }

  function highscorePage () {
    finalContainer.setAttribute("class","container d-none");
    highScoreContainer.setAttribute("class","container");
    init();
}

goHomeBtn.addEventListener("click", function(){
    highScoreContainer.setAttribute("class","container d-none");
    startingContainer.setAttribute("class","container");
    location.reload();
})

clearHighscoreBtn.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

highscore.addEventListener("click", function(){
    startingContainer.setAttribute("class","container d-none");
    quizContainer.setAttribute("class","container d-none");
    finalContainer.setAttribute("class","container d-none");
    highScoreContainer.setAttribute("class","container");
})



  initialBtn.addEventListener("click", function(){
    var submitInitials = initials.value;

    if (initials.value === "") {
        alert("you need to enter your initials!");
    } else {
        var Item = localStorage.getItem(initials);
        function createItem() {
            localStorage.setItem(Item, submitInitials); 
        } 
        createItem()
        
        function getValue() {
            return localStorage.getItem(Item);  
            
        } 
        console.log(getValue()); 
        highscorePage();

            
            
    }
  })

  function init() {
    var dataStored =JSON.parse(localStorage.getItem("highScores"));
    
    
    if(dataStored) {
        console.log(dataStored)
        for (const property in dataStored) {
            console.log(`${property}: ${dataStored[property]}`);
         
        var createLi= document.createElement("li");
        createLi.textContent = property + ": " + dataStored[property];
        displayedScores.appendChild(createLi);
        }
        }
    }

  generateQuestion();
  endGame();
  init();