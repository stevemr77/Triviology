const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
// const answerContentElements = document.querySelectorAll(".answer-content");

fetch(questionsURL)
  .then((response) => response.json())
  .then((json) => updateCard(json[0])); //TODO: want a function that randomly picks a question.

//   function shuffleArray(arr) {
//     let placeHolder = arr.length;
//     // There remain elements to shuffle
//     while (0 !== placeHolder) {
//       // Pick a remaining element
//       let randId = Math.floor(Math.random() * placeHolder);
//       placeHolder -= 1;
//       // Swap it with the current element.
//       let tmp = arr[placeHolder];
//       arr[placeHolder] = arr[randId];
//       arr[randId] = tmp;
//     }
//     return arr;
//   }
//   // Usage of shuffle
//   let arr = [1, 2, 3, 4, 5];
//   arr = shuffleArray(arr);
//   console.log(arr);




  

function updateCard(questionData) {
  const allAnswers = [questionData.rightAnswer].concat(
    questionData.wrongAnswers
  ); //TODO: we want a function that randomizes the order of this

  questionElement.innerHTML = questionData.question;

  allAnswers.forEach((answer, index) => {
    const buttonElement = document.createElement("button");
    const labelElement = document.createElement("div");//add attributes class names or ids for styling these elements later
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

