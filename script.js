const questionsURL = "http://localhost:3000/questions/";
const usersURL = "http://localhost:3000/users/";
const answerContainerElement = document.querySelector(".answers-container");
const questionElement = document.querySelector(".question");
const cardsContainerElement = document.querySelector(".cards-container");

const signUpButton = document.querySelector("#signUpButton");
const logInButton = document.querySelector("#logInButton");
const logInCardContainer = document.querySelector("#logInCardContainer");
const signUpCard = document.querySelector("#signUpCard");
const logInCard = document.querySelector("#logInCard");
const closeCardButtons = document.querySelectorAll(".closeCardButton");
const logInForm = document.querySelector("#logInForm");
const signUpForm = document.querySelector("#signUpForm");

let currentUser;
let currentUserId;

const answeredQuestionIds = []

function getQuestionsFromAPI() {
  fetch(questionsURL)
    .then(response => response.json())
    .then(json => {
      const randIndex = getRandomNewId(json.length);
      updateCard(json[randIndex]);
    });
}

function getRandomNewId(maxId){
  const randIndex = Math.floor(Math.random() * maxId);
  if (answeredQuestionIds.length === maxId){
    alert("You've answered all the questions correctly!")
  } else if (answeredQuestionIds.includes(randIndex +1)){
    getRandomNewId(maxId)
  } else {
    return randIndex
  }
  return 0
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
      questionId: questionData.id
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
  if (this.data.isCorrectAnswer){
    answeredQuestionIds.push(this.data.questionId)
  }
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
}

function handleSignUpButton() {
  logInCardContainer.style.visibility = "visible";
  signUpCard.style.visibility = "visible";
  signUpCard.style.height = "auto";
  logInCard.style.height = 0;
}

function handleLogInButton() {
  logInCardContainer.style.visibility = "visible";
  logInCard.style.visibility = "visible";
  logInCard.style.height = "auto";
  signUpCard.style.height = 0;
}

function handleSignUpSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const newUser = {
    username: username,
    password: password,
    points: parseInt(document.querySelector("#pointsDisplay").innerText),
  };

  const errorDiv = document.querySelector("#signUpErrorDisplay");

  if (confirmPassword === password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    };

    fetch(usersURL + "?username=" + username)
      .then(response => response.json())
      .then(json => {

        const userBtnContainer = document.querySelector("#userBtnContainer");
        const userNameElement = document.createElement("h2");
        userNameElement.innerHTML = username;
        userBtnContainer.innerHTML = "";
        userBtnContainer.append(userNameElement);
        currentUser = json;
        closeUserCard();
      
        if (json.length > 0) {
          errorDiv.innerHTML = "Username already taken by another user.";
        } else {
          fetch(usersURL, options)
            .then(response => response.json())
            .then(json => {
              console.log(json);
              const userBtnContainer =
                document.querySelector("#userBtnContainer");
              const userNameElement = document.createElement("h2");
              userNameElement.innerHTML = username;
              userBtnContainer.innerHTML = "";
              userBtnContainer.append(userNameElement);
              currentUser = json;
              closeUserCard();
            });
        }
      });
  } else {
    errorDiv.innerHTML = "Passwords do not match";
  }
}

function handleLogInSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const password = formData.get("password");

  fetch(usersURL + "?username=" + username)
    .then(response => response.json())
    .then(json => {
      const errorDiv = document.querySelector("#logInErrorDisplay");
      errorDiv.innerHTML = "Incorrect Username or Password";
      const user = json[0];
      if (!user || user.password !== password) {
        event.target.prepend(errorDiv);
      } else {
        const userBtnContainer = document.querySelector("#userBtnContainer");
        const userNameElement = document.createElement("h2");
        userNameElement.classList.add("username");
        userNameElement.innerHTML = username;
        userBtnContainer.innerHTML = "";
        userBtnContainer.append(userNameElement);
        currentUser = user;
        updatePointsDOM(parseInt(user.points));
        closeUserCard();
      }
    });
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

  if (currentUser) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ points: newPoints }),
    };
    fetch(usersURL + currentUser.id, options)
  }
}

function init() {
  signUpButton.addEventListener("click", handleSignUpButton);
  logInButton.addEventListener("click", handleLogInButton);
  closeCardButtons.forEach(btn => {
    btn.onclick = closeUserCard;
  });
  logInForm.addEventListener("submit", handleLogInSubmit);
  signUpForm.addEventListener("submit", handleSignUpSubmit);

  getQuestionsFromAPI();
}

init();

//TODO: limit answers to 26. you know why!
