const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
const cardsContainerElement = document.querySelector(".cards-container");

let points = 0;

function fetchQuestions() {
  fetch(questionsURL)
    .then(response => response.json())
    .then(json => {
      const randIndex = Math.floor(Math.random() * json.length);
      updateCard(json[randIndex]);
    });
}

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
  let allAnswers = [questionData.rightAnswer].concat(questionData.wrongAnswers);

  allAnswers = shuffleArray(allAnswers);

  questionElement.innerHTML = questionData.question;
  answerContainerElement.innerHTML = "";

  allAnswers.forEach((answer, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.classList = "answer-button";
    buttonElement.addEventListener("click", handleAnswerButton);
    buttonElement.data = {
      isCorrectAnswer: answer === questionData.rightAnswer,
    };

    const labelChar = String.fromCharCode(65 + index);

    const labelElement = document.createElement("div");
    labelElement.classList.add("answer-label");
    labelElement.innerHTML = labelChar;

    const answerElement = document.createElement("div");
    answerElement.classList.add("answer-content");
    answerElement.innerHTML = answer;

    buttonElement.append(labelElement, answerElement);
    answerContainerElement.append(buttonElement);
  });
}

function handleAnswerButton() {
  const answerButtonElements = document.querySelectorAll(".answer-button");
  answerButtonElements.forEach(element => (element.disabled = true));
  createResultCard(this.data.isCorrectAnswer);
}

function createResultCard(isCorrectAnswer) {
  const cardElement = document.createElement("div");
  cardElement.classList = "card result-card";

  const resultMessageElement = document.createElement("p");

  const pointsDisplayElement = document.createElement("p");

  const nextQuestionButtonElement = document.createElement("button");
  nextQuestionButtonElement.innerHTML = "Next Question ->";
  nextQuestionButtonElement.onclick = handleNextCard;

  if (isCorrectAnswer) {
    resultMessageElement.innerHTML = "You got it right!";
    pointsDisplayElement.innerHTML = "+ 10 Points!";
    updatePointsDOM(10);
  } else {
    resultMessageElement.innerHTML = "You're WRONG :(";
  }

  cardElement.append(
    resultMessageElement,
    pointsDisplayElement,
    nextQuestionButtonElement
  );
  cardsContainerElement.append(cardElement);
}

function handleNextCard() {
  const cardElements = document.querySelectorAll(".result-card");
  cardElements.forEach(element => element.remove());
  fetchQuestions();
  console.log("Going to next card");
}

function updatePointsDOM(points) {
  const pointsDisplayElement = document.querySelector("#pointsDisplay");
  let newPoints = points + parseInt(pointsDisplayElement.innerHTML);
  pointsDisplayElement.innerHTML = `${newPoints} Points`;
}

function init() {
  fetchQuestions();
}

init();

//TODO: limit answers to 26. you know why!
