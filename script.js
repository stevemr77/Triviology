const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
// const answerContentElements = document.querySelectorAll(".answer-content");

fetch(questionsURL)
  .then((response) => response.json())
  .then((json) => updateCard(json[0])); //TODO: want a function that randomly picks a question.

function updateCard(questionData) {
  const allAnswers = [questionData.rightAnswer].concat(
    questionData.wrongAnswers
  ); //TODO: we want a function that randomizes the order of this

  questionElement.innerHTML = questionData.question;

  allAnswers.forEach((answer, index) => {
    const buttonElement = document.createElement("button");
    const labelElement = document.createElement("div");
    const answerElement = document.createElement("div");
    const labelChar = String.fromCharCode(65 + index);
    buttonElement.append(labelElement, answerElement);
    labelElement.innerHTML = labelChar;
    answerElement.innerHTML = answer;
    answerContainerElement.append(buttonElement);
    buttonElement.addEventListener("click", handleAnswerButton);
    // TODO: pass in correct answer somehow
  });
}
//TODO: limit answers to 26. you know why!
function handleAnswerButton(event) {
  console.log(event);
}
