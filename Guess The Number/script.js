let playBtn = document.querySelector(".play-btn");
let challengeBtn = document.querySelector(".challenge-btn");
let userInput = document.querySelector(".user-input");
let board = document.querySelector(".board");
let feedBack = document.querySelector(".feedback");

let clickSound = new Audio("./sounds/click.mp3");
let music = new Audio("./sounds/music.mp3");
let rightSound = new Audio("./sounds/right.mp3");
let wrongSound = new Audio("./sounds/wrong.mp3");
let winnerSound = new Audio("./sounds/winner.mp3");
let lossSound = new Audio("./sounds/loss.mp3");
let drawSound = new Audio("./sounds/draw.mp3");

let userNumber = 0;
let computerNumber = 0;
let userScore = 0;
let computerScore = 0;

const displayNumbers = () => {
  for (let i = 1; i <= 100; i++) {
    let elem = document.createElement("div");
    elem.classList.add("number");
    elem.textContent = i;
    board.appendChild(elem);
  }
};

const checkWinner = () => {
  if (computerScore < userScore) {
    lossSound.play();
    feedBack.innerHTML = "You Loss! The Match";
    board.innerHTML = `
            <div class="options">
            <p class="user">You Guessed Computer's Number In ${userScore} Chance</p>
            <p class="computer">Computer Guessed Your Number In ${computerScore} Chance</p>
                <ol>
                  <li><button class="play-again">Play Again</button></li>
                  </ol>
                  </div>`;
    let user = document.querySelector(".user");
    let computer = document.querySelector(".computer");
    user.style.color = "red";
    user.style.fontSize = "1.6rem";
    user.style.textAlign = "center";
    computer.style.textAlign = "center";
    computer.style.color = "green";
    computer.style.fontSize = "1.6rem";
  } else if (computerScore > userScore) {
    winnerSound.play();
    feedBack.innerHTML = "You Win! The Match";
    board.innerHTML = `
            <div class="options">
            <p class="user">You Guessed Computer's Number In ${userScore} Chance</p>
            <p class="computer">Computer Guessed Your Number In ${computerScore} Chance</p>
              <ol>
                <li><button class="play-again">Play Again</button></li>
                </ol>
            </div>`;
    let user = document.querySelector(".user");
    let computer = document.querySelector(".computer");
    user.style.color = "green";
    user.style.fontSize = "1.6rem";
    user.style.textAlign = "center";
    computer.style.textAlign = "center";
    computer.style.color = "red";
    computer.style.fontSize = "1.6rem";
  } else {
    drawSound.play();
    feedBack.innerHTML = "The Match Is Draw!";
    board.innerHTML = `
    <div class="options">
    <p class="user">Both Are Guessed The Number In ${userScore} Chance</p>
    <ol>
    <li><button class="play-again">Play Again</button></li>
    </ol>
    </div>`;
    let user = document.querySelector(".user");
    user.style.color = "#1b2b1b";
    user.style.fontSize = "1.6rem";
    user.style.textAlign = "center";
  }
  let playAgain = document.querySelector(".play-again");
  playAgain.style.width = "200px";
  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      clickSound = new Audio("./sounds/click.mp3");
    clickSound.play();
    setTimeout(() => {
      location.reload();
    }, 300);
    }
  });
  playAgain.addEventListener("click", () => {
    clickSound = new Audio("./sounds/click.mp3");
    clickSound.play();
    setTimeout(() => {
      location.reload();
    }, 300);
  });
  computerScore = 0;
  userScore = 0;
};

const userPlay = () => {
  music = new Audio("./sounds/music.mp3");
  music.play();
  let count = 3;
  feedBack.textContent = "Guess The Number";
  board.innerHTML = "";
  displayNumbers();
  computerNumber = Math.ceil(Math.random() * 100);

  board.addEventListener("click", function startGame(e) {
    if (e.target.classList.contains("number")) {
      feedBack.textContent = "Calculating...";
      userNumber = Number(e.target.textContent);
      userScore++;
      if (userNumber < computerNumber) {
        wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        e.target.classList.add("wrong-number");
        e.target.style.backgroundColor = "red";
        e.target.style.color = "white";
        setTimeout(() => {
          feedBack.textContent = "Guess Greater Than It";
        }, 1000);
      } else if (userNumber > computerNumber) {
        wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        e.target.classList.add("wrong-number");
        e.target.style.backgroundColor = "red";
        e.target.style.color = "white";
        setTimeout(() => {
          feedBack.textContent = "Guess Less Than It";
        }, 1000);
      } else {
        rightSound.play();
        music.pause();
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
        feedBack.textContent = `Number Guessed`;
        let intervalId = setInterval(() => {
          feedBack.textContent = `Number Guessed ${count--}`;
        }, 1000);
        setTimeout(() => {
          clearInterval(intervalId);
          if (computerScore && userScore) {
            checkWinner();
          } else {
            feedBack.textContent = `Congratulation!`;
            board.innerHTML = `
            <div class="options">
            <p class="over-challenge">You Guessed Computer's Number In ${userScore} Chance</p>
            <ol>
            <li>Challenge For Computer<button class="challenge-btn">Go</button></li>
            </ol>
            </div>`;
            let overChallenge = document.querySelector(".over-challenge");
            overChallenge.style.fontSize = "1.6rem";
            overChallenge.style.textAlign = "center";
            challengeBtn = document.querySelector(".challenge-btn");
            challengeBtn.addEventListener("click", () => {
              clickSound.play();
              computerPlay();
            });
          }
        }, 4000);
        board.removeEventListener("click", startGame);
      }
    }
  });
};

const computerPlay = () => {
  userNumber = 0;
  let count = 3;
  let lowerBound = 0;
  let upperBound = 100;
  feedBack.textContent = "Guess The Number";
  board.innerHTML = `
  <div class="user-input">
  <h3>Choose The Number Between 1 to 100</h3>
  <div class="input-field">
  <input type="text" class="input"><button class="user-btn">Go</button> 
  </div>
  </div>
  `;
  let input = document.querySelector(".input");
  input.addEventListener("input", (e) => {
    userNumber = e.target.value;
  });
  let userBtn = document.querySelector(".user-btn");
  userBtn.addEventListener("click", () => {
    if (userNumber >= 1 && userNumber <= 100) {
      music = new Audio("./sounds/music.mp3");
      music.play();
      clickSound.play();
      board.innerHTML = "";
      displayNumbers();
      computerNumber =
      Math.floor(Math.random() * (upperBound - (lowerBound + 1) + 1)) +
      (lowerBound + 1);
      let intervalId = setInterval(() => {
        feedBack.textContent = "Calculating...";
        let allNumbers = document.querySelectorAll(".number");
        for (let i = lowerBound; i < upperBound; i++) {
          if (computerNumber == allNumbers[i].textContent) {
            if (userNumber > computerNumber) {
              wrongSound = new Audio("./sounds/wrong.mp3");
              wrongSound.play();
              allNumbers[i].classList.add("wrong-number");
              allNumbers[i].style.backgroundColor = "red";
              allNumbers[i].style.color = "white";
              setTimeout(() => {
                feedBack.textContent = "Guess Greater Than It";
              }, 1000);
              lowerBound = computerNumber;
            } else if (userNumber < computerNumber) {
              wrongSound = new Audio("./sounds/wrong.mp3");
              wrongSound.play();
              allNumbers[i].classList.add("wrong-number");
              allNumbers[i].style.backgroundColor = "red";
              allNumbers[i].style.color = "white";
              setTimeout(() => {
                feedBack.textContent = "Guess Less Than It";
              }, 1000);
              upperBound = computerNumber;
            } else {
              music.pause();
              rightSound.play();
              allNumbers[i].style.backgroundColor = "green";
              allNumbers[i].style.color = "white";
              feedBack.textContent = `Number Guessed`;
              clearInterval(intervalId);
              let intervalId2 = setInterval(() => {
                feedBack.textContent = `Number Guessed ${count--}`;
              }, 1000);
              setTimeout(() => {
                clearInterval(intervalId2);
                if (computerScore && userScore) {
                  checkWinner();
                } else {
                  feedBack.textContent = `Congratulation!`;
                  board.innerHTML = `
                              <div class="options">
                                  <p class="over-challenge">Computer Guessed Your Number In ${computerScore} Chance</p>
                                  <ol>
                                      <li>Try Your Self<button class="play-btn">Go</button></li>
                                  </ol>
                              </div>`;
                  let overChallenge = document.querySelector(".over-challenge");
                  overChallenge.style.fontSize = "1.6rem";
                  overChallenge.style.textAlign = "center";
                  playBtn = document.querySelector(".play-btn");
                  playBtn.addEventListener("click", () => {
                    clickSound.play();
                    userPlay();
                  });
                }
              }, 4000);
            }
          }
        }
        computerNumber =
          Math.floor(Math.random() * (upperBound - 1 - (lowerBound + 1) + 1)) +
          (lowerBound + 1);
        computerScore++;
      }, 2000);
    }
  });
};

playBtn.addEventListener("click", () => {
  clickSound.play();
  userPlay();
});

challengeBtn.addEventListener("click", () => {
  clickSound.play();
  computerPlay();
});
