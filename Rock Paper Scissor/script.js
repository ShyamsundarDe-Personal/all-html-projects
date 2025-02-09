let selectOption = document.querySelector(".select-option");
let container = document.querySelector(".container");
let options = document.querySelectorAll(".option");
let resultToDisplay = document.querySelector("b");
let you = document.querySelector(".you");
let computer = document.querySelector(".computer");

let clickSound = new Audio("./sounds/click.mp3");
let lossSound = new Audio("./sounds/loss.mp3");
let music = new Audio("./sounds/music.mp3");
let tieSound = new Audio("./sounds/tie.mp3");
let winSound = new Audio("./sounds/win.mp3");
let winnerSound = new Audio("./sounds/winner.mp3");

let userScore = 0;
let computerScore = 0;
let computerChoice = 0;

const initializeGame = () => {
  handleGame();
  resultToDisplay.textContent = "Choose Any";
  resultToDisplay.style.color = "black";
  options.forEach((element) => {
    element.style.backgroundColor = "white";
  });
};

const printResult = (res, computerChoice, event) => {
  if (res === 1) {
    winSound.play();
    resultToDisplay.textContent = `You Win! Computer Choosen ${computerChoice}`;
    resultToDisplay.style.color = "green";
    event.target.style.backgroundColor = "green";
    options.forEach((element) => {
      if (element.textContent === computerChoice)
        element.style.backgroundColor = "red";
    });
    userScore += 2;
    if (computerScore > 1) computerScore -= 2;
    you.textContent = `${userScore} / 10`;
    computer.textContent = `${computerScore} / 10`;
  } else if (res === -1) {
    lossSound.play();
    resultToDisplay.textContent = `You Loss! Computer Choosen ${computerChoice}`;
    resultToDisplay.style.color = "red";
    event.target.style.backgroundColor = "red";
    options.forEach((element) => {
      if (element.textContent === computerChoice)
        element.style.backgroundColor = "green";
    });
    if (userScore > 1) userScore -= 2;
    computerScore += 2;
    you.textContent = `${userScore} / 10`;
    computer.textContent = `${computerScore} / 10`;
  } else {
    tieSound.play();
    resultToDisplay.textContent = "Tie";
    resultToDisplay.style.color = "#cfaf00";
    event.target.style.backgroundColor = "yellow";
    userScore += 1;
    computerScore += 1;
    you.textContent = `${userScore} / 10`;
    computer.textContent = `${computerScore} / 10`;
  }
};

const handleGame = () => {
  selectOption.addEventListener("click", function clickOption(e) {
    if (music.paused) music.play();
    if (e.target.classList.contains("option")) {
      let userChoice = e.target.textContent;
      let randomIndex = Math.floor(Math.random() * 3);
      if (randomIndex === 0) {
        computerChoice = "Rock";
      } else if (randomIndex === 1) {
        computerChoice = "Paper";
      } else {
        computerChoice = "Scissor";
      }

      let result = 0;
      selectOption.removeEventListener("click", clickOption);
      if (userChoice === "Rock" && computerChoice === "Scissor") {
        result = 1;
        printResult(result, computerChoice, e);
      } else if (userChoice === "Paper" && computerChoice === "Rock") {
        result = 1;
        printResult(result, computerChoice, e);
      } else if (userChoice === "Scissor" && computerChoice === "Paper") {
        result = 1;
        printResult(result, computerChoice, e);
      } else if (userChoice === computerChoice) {
        result = 0;
        printResult(result, computerChoice, e);
      } else {
        result = -1;
        printResult(result, computerChoice, e);
      }

      if (userScore >= 10 || computerScore >= 10) {
        music.pause();
        let countSecond = 3;
        let intervalId = setInterval(() => {
          resultToDisplay.style.color = "#000";
          resultToDisplay.textContent = `Game Over! ${countSecond--}`;
        }, 1000);
        setTimeout(() => {
          winnerSound.play();
          clearInterval(intervalId);
          if (computerScore >= 10 && userScore < 10)
            container.innerHTML = `<b> Congratulation! Computer Win The Match </b>`;
          else if (userScore >= 10 && computerScore < 10)
            container.innerHTML = `<b> Congratulation! You Win The Match </b>`;
          else
            container.innerHTML = `<b> Congratulation! The Match Is Draw </b>`;
          let restartButton = document.createElement("button");
          container.appendChild(restartButton);
          restartButton.classList.add("restart-btn");
          restartButton.textContent = "Restart";
          restartButton.addEventListener("click", () => {
            clickSound.play();
            setTimeout(() => {
              location.reload();
            }, 300);
          });
          document.addEventListener("keydown", () => {
            clickSound.play();
            setTimeout(() => {
              location.reload();
            }, 300);
          });
        }, 4000);
      } else {
        setTimeout(() => {
          initializeGame();
        }, 2000);
      }
    }
  });
};

handleGame();
