
# Quizology

## Summary
Quizology is a trivia game which has fun & curious facts. No particular theme was chosen for the questions but some resounding themes are soccer and space. Players are presented with a trivia question on a card and multiple choice answers. After an answer is selected, the player is informed of whether their selection is right or wrong and given the option to move on to the next question or quit.

## Technologies
* [HTML5](https://www.w3schools.com/html/) 

<img src="https://www.w3.org/html/logo/img/mark-word-icon.png" alt="HTML Logo" height="126">

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascript Logo" height="126">

* [CSS3](https://www.w3schools.com/css/) 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/CSS.3.svg/730px-CSS.3.svg.png" alt="CSS Logo" height="126">


## Setup
Clone(`git clone`) this repo to your local machine. Navigate(`cd <subdirectory name>`) into the newly created directory. 

### Set up your backend
All of the questions/answers data is stored in the `db.json` file. To use this file, if you don't already have a JSON server, in your terminal run `npm install -g json-server`. Then run `json-server --watch db.json`. 

### Set up your front-end
Open another window in your terminal and navigate into the directory where the game files live, aka the newly crated directory after this repository was cloned. Run `lite-server`, the game should open in your browser.

## Features
* Flipping card animation revealing results of selection
    (Gif here)

* Keep tracks of points and updates with every question answered
    (Gif here)

* Players can sign up for an account
    <img src='https://media.giphy.com/media/9zgofTvN2YdalAurg0/giphy.gif' height='450'>

## Code Snippets
Randomizes answers so they're not in the same position when the same question loads:
```javascript
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
```

## Expansions
* skipping undesired questions
* add different question formats (ex: true/false, type answer in input box, etc.)
* Difficulty Level - awarding different quantity of points based on the difficulty of the question
* like, dislike and review questions


## Contributors
* [Brandon](https://github.com/brandonefields)
* [Danny](https://github.com/dannyirwin)
* [Michael](https://github.com/stevemr77)
