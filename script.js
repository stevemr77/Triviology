const questionsURL = "http://localhost:3000/questions/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
// const answerContentElements = document.querySelectorAll(".answer-content");

fetch(questionsURL)
  .then((response) => response.json())
  .then((json) => updateCard(json[0])); //TODO: want a function that randomly picks a question.

  function shuffleArray(arr) {
    let remainingIndices = arr.length;
    // There remain elements to shuffle
    while (0 !== remainingIndices) {
      console.log(remainingIndices)
      // Pick a remaining element
      let randIndex = Math.floor(Math.random() * remainingIndices);
      remainingIndices -= 1;
      // Swap it with the current element.
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
    const labelElement = document.createElement("div");
    labelElement.classList.add('answer-label')
    
    const answerElement = document.createElement("div");
    answerElement.classList.add('answer-content')
    
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

