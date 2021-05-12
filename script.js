const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
const cardsContainerElement = document.querySelector(".cards-container");

const signUpButton = document.querySelector("#signUpButton");
const logInButton = document.querySelector("#logInButton");
const logInCardContainer = document.querySelector("#logInCardContainer");
const signUpCard = document.querySelector("#signUpCard");
const logInCard = document.querySelector("#logInCard");
const closeCardButtons = document.querySelectorAll(".closeCardButton");

function getQuestionsFromAPI() {
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
  resultMessageElement.setAttribute("id", "result-message-element");

  const pointsDisplayElement = document.createElement("p");
  pointsDisplayElement.setAttribute("id", "result-message-element");

  const nextQuestionButtonElement = document.createElement("button");
  nextQuestionButtonElement.innerHTML = "Next Question &#9758;";
  nextQuestionButtonElement.setAttribute("id", "next-question-button");
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
  getQuestionsFromAPI();
  console.log("Going to next card");
}

function handleSignUpButton() {
  logInCardContainer.style.visibility = "visible";
  signUpCard.style.visibility = "visible";
  signUpCard.style.height = "auto";
}

function handleLogInButton() {
  logInCardContainer.style.visibility = "visible";
  logInCard.style.visibility = "visible";
  logInCard.style.height = "auto";
}

function closeUserCard() {
  logInCardContainer.style.visibility = "hidden";
  signUpCard.style.visibility = "hidden";
  signUpCard.style.height = 0;
  logInCard.style.visibility = "hidden";
  logInCard.style.height = 0;
}

function updatePointsDOM(points) {
  const pointsDisplayElement = document.querySelector("#pointsDisplay");
  let newPoints = points + parseInt(pointsDisplayElement.innerHTML);
  pointsDisplayElement.innerHTML = `${newPoints} Points`;
}

function init() {
  signUpButton.addEventListener("click", handleSignUpButton);
  logInButton.addEventListener("click", handleLogInButton);
  closeCardButtons.forEach(btn => {
    btn.onclick = closeUserCard;
  });

  getQuestionsFromAPI();
}

init();

//TODO: limit answers to 26. you know why!
