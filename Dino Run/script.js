let buttons = document.querySelector(".buttons");
let dino = document.querySelector(".dino");
let board = document.querySelector(".board");
let sound = document.querySelector(".volume");
let play = document.querySelector(".play");
let header = document.querySelector(".header");
let countScore = document.querySelector(".count-score");

let clickSound = new Audio("./sounds/click.mp3");
let musicSound = new Audio("./sounds/music.mp3");
let gameoverSound = new Audio("./sounds/gameover.mp3");
let moveSound = new Audio("./sounds/move.mp3");
let bellSound = new Audio("./sounds/bell.mp3");
let successSound = new Audio("./sounds/success.mp3");

// // Handle Large Food Play or Resume
let right = -30;
let randomVar = 0;
let intervalId3 = 0;
let intervalId4 = 0;
let moveItem = null;
let largeCactus = 0;
let smallCactus = 0;
let bird = 0;
let speed = 0;
let countItem = 0;

let increaseSpeed = 0;
let isStart = 0;

const moveCactus = () => {
  if (!isStart) {
    increaseSpeed = setInterval(() => {
      speed++;
    }, 10000);
    isStart = 1;
  }
  isPlay = 1;
  if (increaseScore == 0) {
    updateScore();
  }
  if (!isMusicPause) musicSound.play();
  if (isPlay) {
    randomVar = Math.floor(Math.random() * 20);
    if (randomVar % 3 === 0) {
      moveItem = document.createElement("div");
      board.appendChild(moveItem);
      moveItem.classList.add("large-cactus");
      (largeCactus = 1), (smallCactus = 0), (bird = 0);
    } else if (randomVar % 2 === 0) {
      moveItem = document.createElement("div");
      board.appendChild(moveItem);
      moveItem.classList.add("small-cactus");
      (largeCactus = 0), (smallCactus = 1), (bird = 0);
    } else {
      moveItem = document.createElement("div");
      board.appendChild(moveItem);
      moveItem.classList.add("bird");
      (largeCactus = 0), (smallCactus = 0), (bird = 1);
    }
  }
  setTimeout(() => {
    intervalId4 = setInterval(() => {
      right += 2;
      moveItem.style.right = `${right}px`;
      checkGameOver();
      if (right > 350) {
        board.removeChild(moveItem);
        clearInterval(intervalId4);
        moveCactus();
        right = 0;
        countItem++;
        if (countItem > 10) {
          speed += 2;
          countItem = 0;
        }
      }
    }, 20 - speed);
  }, randomVar);
};

let isGameOver = 0;
const checkGameOver = () => {
  if (right > 240 && right < 250) {
    if ((!isJump && (largeCactus || smallCactus)) || (!isSit && bird))
      gameOver();
    // if (!isGameOver) successSound.play();
  } else if (right > 260 && right < 280) {
    if (
      (isJump && bird) ||
      (isSit && (largeCactus || smallCactus)) ||
      (!isJump && (largeCactus || smallCactus)) ||
      (!isSit && bird)
    )
      gameOver();
  } else if (right > 280 && !isGameOver) successSound.play();
};

const gameOver = () => {
  isGameOver = 1;
  musicSound.pause();
  gameoverSound.play();
  clearInterval(intervalId4);
  clearInterval(intervalId1);
  clearInterval(intervalId2);
  clearInterval(increaseScore);
  clearInterval(increaseSpeed);

  dino.style.background = "linear-gradient(to bottom, #fa6800, #fa6800)";
  let scoreShow = document.querySelector(".score");
  scoreShow.style.fontSize = "2rem";
  let time = 3;
  scoreShow.textContent = `Game Over!`;
  let gameoverId = setInterval(() => {
    scoreShow.textContent = `Game Over! ${time--}`;
  }, 1000);

  setTimeout(() => {
    clearInterval(gameoverId);
    board.classList.add("game-over");
    board.textContent = `Score: ${score}`;
    scoreShow.textContent = `Game Over!`;
    let button = document.createElement("button");
    buttons.innerHTML = "";
    button.style.fontSize = "2rem";
    button.style.width = "100%";
    button.style.height = "100%";
    button.textContent = `Play Again`;
    buttons.appendChild(button);
    document.addEventListener("keydown", function keyPress(e) {
      if (e.key === " ") {
        clickSound.play();
        setTimeout(() => {
          location.reload();
        }, 300);
      }
    });
    button.addEventListener("click", () => {
      clickSound.play();
      setTimeout(() => {
        location.reload();
      }, 300);
    });
  }, 3000);
};

let score = 0;
let increaseScore = 0;
let hitBell = 100;
const updateScore = () => {
  increaseScore = setInterval(() => {
    score++;
    if (score >= hitBell) {
      bellSound.play();
      hitBell += 100;
    }
    countScore.textContent = score;
  }, 100);
};

// // Play On Computer
let isJump = 0;
let isSit = 0;
let intervalId1 = 0;
let intervalId2 = 0;
let isPlay = 0;

const jump = () => {
  if (!isPlay) moveCactus();
  else if (isResume) handleResume();
  moveSound.play();
  clearInterval(intervalId2);
  dino.style.bottom = "120px";
  dino.style.height = "60px";
  play.textContent = "Pause";
  if (!isJump) {
    isJump = 1;
    dino.style.bottom = "180px";
    intervalId1 = setTimeout(() => {
      dino.style.bottom = "120px";
    }, 600);

    setTimeout(() => {
      isJump = 0;
    }, 700);
  }
};

const sit = () => {
  if (!isPlay) moveCactus();
  else if (isResume) handleResume();
  moveSound.play();
  moveSound.play();
  clearInterval(intervalId1);
  dino.style.bottom = "120px";
  dino.style.height = "60px";
  play.textContent = "Pause";
  if (!isSit) {
    isSit = 1;
    dino.style.height = "30px";
    intervalId2 = setTimeout(() => {
      dino.style.height = "60px";
    }, 600);

    setTimeout(() => {
      isSit = 0;
    }, 700);
  }
};

// Handle Resume
const handleResume = () => {
  isResume = 0;
  if (!isMusicPause) musicSound.play();
  intervalId4 = setInterval(() => {
    right += 2;
    moveItem.style.right = `${right}px`;
    checkGameOver();
    if (right > 350) {
      board.removeChild(moveItem);
      clearInterval(intervalId4);
      moveCactus();
      right = 0;
    }
  }, 20 - speed);
  updateScore();
};

document.addEventListener("keydown", function keyPress(e) {
  if (!isGameOver) {
    if (e.key === "ArrowUp" || e.key === " ") jump();
    if (e.key === "ArrowDown") sit();
  } else document.removeEventListener("keydown", keyPress);
});

// // Play on Phone
let isMusicPause = 0;
let isMusicPlay = 0;
let isResume = 0;

buttons.addEventListener("click", function clickButton(e) {
  if (!isGameOver) {
    if (e.target.classList.contains("up")) jump();
    if (e.target.classList.contains("down")) sit();

    if (e.target.classList.contains("sound")) {
      clickSound = new Audio("./sounds/click.mp3");
      clickSound.play();
      if (
        musicSound.duration >= 0 &&
        sound.classList.contains("fa-volume-high")
      ) {
        musicSound.pause();
        sound.classList.remove("fa-volume-high");
        sound.classList.add("fa-volume-off");
        isMusicPause = 1;
      } else {
        if (!isPlay) musicSound.play();
        sound.classList.remove("fa-volume-off");
        sound.classList.add("fa-volume-high");
        isMusicPause = 0;
      }
    }

    if (e.target.classList.contains("play")) {
      clickSound = new Audio("./sounds/click.mp3");
      clickSound.play();
      if (play.textContent === "Play" || play.textContent === "Resume") {
        if (!isPlay) moveCactus();
        else if (isResume) handleResume();
        isResume = 0;
        if (!isMusicPause) musicSound.play();
        play.textContent = "Pause";
      } else if (play.textContent === "Pause") {
        musicSound.pause();
        clearInterval(intervalId4);
        clearInterval(intervalId2);
        clearInterval(intervalId3);
        clearInterval(increaseScore);
        clearInterval(increaseSpeed);
        play.textContent = "Resume";
        isResume = 1;
      }
    }
  } else buttons.removeEventListener("click", clickButton);
});
