const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
// const answerContentElements = document.querySelectorAll(".answer-content");

fetch(questionsURL)
  .then((response) => response.json())
  .then((json) => { 
    const randIndex = Math.floor(Math.random() * json.length )
    updateCard(json[randIndex])
  });

function shuffleArray(arr) {
  let remainingIndices = arr.length;

  while (0 !== remainingIndices) {

    let randIndex = Math.floor(Math.random() * remainingIndices);
    remainingIndices -= 1;

    let tempArr = arr[remainingIndices];
    arr[remainingIndices] = arr[randIndex];
    arr[randIndex] = tempArr;
  }
  return arr;
}



function updateCard(questionData) {
  let allAnswers = [questionData.rightAnswer].concat(
    questionData.wrongAnswers
  );


  allAnswers = shuffleArray(allAnswers)



  questionElement.innerHTML = questionData.question;

  allAnswers.forEach((answer, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.addEventListener("click", handleAnswerButton);
    buttonElement.data = { isCorrectAnswer: answer === questionData.rightAnswer }

    const labelChar = String.fromCharCode(65 + index);

    const labelElement = document.createElement("div");
    labelElement.classList.add('answer-label')
    labelElement.innerHTML = labelChar;

    const answerElement = document.createElement("div");
    answerElement.classList.add('answer-content')
    answerElement.innerHTML = answer;

    buttonElement.append(labelElement, answerElement);
    answerContainerElement.append(buttonElement);
  });
}


function handleAnswerButton() {
  if (this.data.isCorrectAnswer) {
    console.log('You got it right!')
  } else {
    console.log("You're WRONG :(")
  }
}

//TODO: handle choosing correct answer


//TODO: handle choosing wrong answer


//TODO: limit answers to 26. you know why!