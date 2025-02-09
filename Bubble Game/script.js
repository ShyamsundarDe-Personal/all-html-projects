let headerHTML = `<div class="time">
                    <h2>Time</h2>
                    <div class="box count-time">1:00</div>
                  </div>
                  <div class="hit">
                    <h2>Hit Number</h2>
                    <div class="box hit-number">2</div>
                  </div>
                  <div class="score">
                    <h2>Score</h2>
                    <div class="box count-score">0</div>
                  </div>
                `;
let startBtn = document.querySelector(".start-btn");
let board = document.querySelector(".board");
let header = document.querySelector(".header");
let countTime = null;
let countScore = null;
let hitNumber = null;

let clickSound = new Audio("./sounds/click.mp3");
let music = new Audio("./sounds/music.mp3");
let rightSound = new Audio("./sounds/right.mp3");
let wrongSound = new Audio("./sounds/wrong.mp3");

let time = 0;
let score = 0;
let isGameStart = false;
let startTimer = 0;

const createBubble = () => {
  board.innerHTML = "";
  for (let i = 0; i < 90; i++) {
    let rand = Math.ceil(Math.random() * 9);
    let elem = document.createElement("div");
    hitNumber.innerText = rand;
    elem.innerText = rand;
    board.appendChild(elem);
    elem.classList.add("elem");
  }
};

const gameOver = () => {
  music.pause();
  isGameStart = false;
  let button = document.createElement("button");
  button.classList.add("start-btn");
  clearInterval(startTimer);
  board.classList.add("game-over");
  header.innerHTML = "<h1>Game Over</h1>";
  board.innerHTML = `<h2>Score: ${score}</h2>`;
  board.appendChild(button);
  button.innerText = "Play Again";
  button.addEventListener("click", () => {
    if (!isGameStart) {
      clickSound.play();
      initialGame();
    }
  });
};

const handleGame = (e) => {
  if (e.target.classList.contains("elem")) {
    if (hitNumber.innerText === e.target.innerText) {
      score += 20;
      rightSound = new Audio("./sounds/right.mp3");
      rightSound.play();
    } else if (score > 10) {
      wrongSound = new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      setTimeout(() => {
        wrongSound.pause();
      }, 600);
      score -= 10;
    } else {
      wrongSound = new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      setTimeout(() => {
        wrongSound.pause();
      }, 600);
    }
    countScore.textContent = score;
    createBubble();
  }
};

const initialGame = () => {
  isGameStart = true;
  music = new Audio("./sounds/music.mp3");
  music.play();
  board.classList.remove("game-over");
  header.innerHTML = headerHTML;
  countTime = document.querySelector(".count-time");
  countScore = document.querySelector(".count-score");
  hitNumber = document.querySelector(".hit-number");
  createBubble();
  board.addEventListener("click", (e) => {
    handleGame(e);
  });
  time = 60;
  score = 0;
  countTime.innerText = "1:00";
  countScore.innerText = score;
  startTimer = setInterval(() => {
    if (time == 0) gameOver();
    else if (time <= 10) countTime.innerText = `0:0${--time}`;
    else countTime.innerText = `0:${--time}`;
  }, 1000);
};

// Play In Phone
startBtn.addEventListener("click", () => {
  if (!isGameStart) {
    clickSound.play();
    initialGame();
  }
});

// Play In Computer or Using Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key == " " && !isGameStart) {
    clickSound.play();
    initialGame();
  }
});
