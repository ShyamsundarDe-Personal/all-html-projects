let buttons = document.querySelector(".buttons");
let space = document.querySelector(".space");
let spaceShuttle = document.querySelector(".space-shuttle");
let sound = document.querySelector(".volume");
let play = document.querySelector(".play");
let header = document.querySelector(".header");
let countScore = document.querySelector(".count-score");

let clickSound = new Audio("./sounds/click.mp3");
let musicSound = new Audio("./sounds/music.mp3");
let gameoverSound = new Audio("./sounds/gameover.mp3");
let moveSound = new Audio("./sounds/move.mp3");
let shootSound = new Audio("./sounds/shoot.mp3");

let enemyPositionBottom = 300;
let enemyPositionLeft = 0;
let range2 = 600;
let hitNumber = 0;
let enemy = null;
let enemyDownStart = null;
let isWeakEnemy = false;
let isStrongEnemy = false;
let speed = 0;
let isGameOver = 0;
let isPlay = 0;

const arriveEnemy = () => {
  isPlay = 1;
  if (!isMusicPause) musicSound.play();
  if (isPlay) {
    let enemyType = Math.floor(Math.random() * 5);
    enemy = document.createElement("div");
    if (enemyType) {
      hitNumber = Math.ceil(Math.random() * 100);
      enemy.classList.add("weak-enemy");
      enemy.textContent = hitNumber;
      speed += 10;
      isWeakEnemy = true;
      isStrongEnemy = false;
    } else {
      hitNumber = Math.floor(Math.random() * (250 - (200 + 1) + 1)) + (200 + 1);
      enemy.classList.add("strong-enemy");
      enemy.textContent = hitNumber;
      speed += 20;
      isWeakEnemy = false;
      isStrongEnemy = true;
    }
    space.appendChild(enemy);
    enemyPositionLeft = Math.floor(Math.random() * 270);
    enemy.style.left = `${enemyPositionLeft}px`;
    enemy.style.bottom = `${enemyPositionBottom}px`;
    enemyDownStart = setInterval(() => {
      range2 -= 50;
      checkGameOver();
      enemyPositionBottom -= 20;
      enemy.style.bottom = `${enemyPositionBottom}px`;
    }, 1000 - speed);
  }
};

const checkGameOver = () => {
  if (
    enemyPositionBottom <= 80 &&
    enemyPositionLeft > shuttlePosition - 22 &&
    enemyPositionLeft < shuttlePosition + 22
  )
    gameOver(enemyPositionBottom <= 0);
  else if (enemyPositionBottom <= 20) gameOver();
};

const gameOver = () => {
  isGameOver = 1;
  musicSound.pause();
  gameoverSound.play();
  clearInterval(enemyDownStart);

  enemy.style.background = "linear-gradient(to bottom,#0043fa,#8100fa)";
  let scoreShow = document.querySelector(".score");
  scoreShow.style.fontSize = "2rem";
  let time = 3;
  scoreShow.textContent = `Game Over!`;
  let gameoverId = setInterval(() => {
    scoreShow.textContent = `Game Over! ${time--}`;
  }, 1000);

  setTimeout(() => {
    clearInterval(gameoverId);
    space.classList.add("game-over");
    space.style.background = "#ccc";
    space.textContent = `Score: ${score}`;
    scoreShow.textContent = `Game Over!`;
    let button = document.createElement("button");
    buttons.innerHTML = "";
    button.style.fontSize = "2rem";
    button.style.width = "100%";
    button.style.height = "100%";
    button.textContent = `Play Again`;
    buttons.appendChild(button);
    button.addEventListener("click", () => {
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
    })
  }, 3000);
};

let score = 0;
const updateScore = () => {
  if (isWeakEnemy) score += 10;
  else if (isStrongEnemy) score += 50;
  countScore.textContent = score;
};


let bullet = document.createElement("div");
let magazin = [];

let range1 = 600;

const shoot = () => {
  if (!isGameOver) {
    shootSound = new Audio("./sounds/shoot.mp3");
    shootSound.volume = 0.2;
    shootSound.play();
    if (!enemyDownStart) arriveEnemy();
    bullet = document.createElement("div");
    bullet.classList.add("bullet");
    spaceShuttle.appendChild(bullet);
    magazin.unshift(bullet);
    if (
      enemyPositionLeft > shuttlePosition - 22 &&
      enemyPositionLeft < shuttlePosition + 22
    ) {
      setTimeout(() => {
        enemy.style.fontSize = "1.6rem";
        if (hitNumber == 1) {
          clearInterval(enemyDownStart);
          space.removeChild(enemy);
          updateScore();
          range2 = 600;
          enemyPositionBottom = 300;
          arriveEnemy();
        } else {
          if (enemyPositionBottom < 280)
            enemy.textContent = --hitNumber;
        }
        setTimeout(() => {
          enemy.style.fontSize = "1.1rem";
        }, 50);
        spaceShuttle.removeChild(magazin.pop());
      }, range2 - 40);
    } else {
      setTimeout(() => {
        spaceShuttle.removeChild(magazin.pop());
      }, range1);
    }
    if (isResume) handleResume();
    play.textContent = "Pause";
  }
};

let shootStart = null;
const mouseShoot = () => {
  shootStart = setInterval(shoot, 30);
};

let maxWidth = 270;
let minWidth = 15;
let shuttlePosition = 135;

const leftMove = () => {
  if (!enemyDownStart) arriveEnemy();
  if (shuttlePosition >= minWidth) {
    shuttlePosition -= 15;
    spaceShuttle.style.left = `${shuttlePosition}px`;
  }
  if (isResume) handleResume();
  moveSound.play();
  play.textContent = "Pause";
};

const rightMove = () => {
  if (!enemyDownStart) arriveEnemy();
  if (shuttlePosition < maxWidth) {
    shuttlePosition += 15;
    spaceShuttle.style.left = `${shuttlePosition}px`;
  }
  if (isResume) handleResume();
  moveSound.play();
  play.textContent = "Pause";
};

let leftMoveStart = null;
const mouseLeft = () => {
  clearInterval(rightMoveStart);
  leftMoveStart = setInterval(leftMove, 100);
};

let rightMoveStart = null;
const mouseRight = () => {
  clearInterval(leftMoveStart);
  leftMoveStart = setInterval(rightMove, 100);
};

// Handle Resume
const handleResume = () => {
  isResume = 0;
  if (!isMusicPause) musicSound.play();
  enemyDownStart = setInterval(() => {
    range2 -= 50;
    checkGameOver();
    enemyPositionBottom -= 20;
    enemy.style.bottom = `${enemyPositionBottom}px`;
  }, 1000 - speed);
};

document.addEventListener("keydown", function keyPress(e) {
  if (!isGameOver) {
    if (e.key === "ArrowUp") shoot();
    if (e.key === "ArrowLeft") leftMove();
    if (e.key === "ArrowRight") rightMove();
  } else document.removeEventListener("keydown", keyPress);
});

// // Play on Phone
let isMusicPause = 0;
let isMusicPlay = 0;
let isResume = 0;

buttons.addEventListener("click", function clickButton(e) {
  if (!isGameOver) {
    if (e.target.classList.contains("up")) shoot();
    if (e.target.classList.contains("left")) leftMove();
    if (e.target.classList.contains("right")) rightMove();
    
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
        if (!isPlay) arriveEnemy();
        else if (isResume) handleResume();
        isResume = 0;
        if (!isMusicPause) musicSound.play();
        play.textContent = "Pause";
      } else if (play.textContent === "Pause") {
        musicSound.pause();
        clearInterval(enemyDownStart);
        play.textContent = "Resume";
        isResume = 1;
      }
    }
  } else buttons.removeEventListener("click", clickButton);
});

buttons.addEventListener("touchstart", (e) => {
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
  if (!isGameOver) {
    if (e.target.classList.contains("up")) mouseShoot();
    if (e.target.classList.contains("left")) mouseLeft();
    if (e.target.classList.contains("right")) mouseRight();
  }
});

buttons.addEventListener("touchend", () => {
  clearInterval(shootStart);
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
});

buttons.addEventListener("touchcancel", () => {
  clearInterval(shootStart);
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
});

buttons.addEventListener("mousedown", (e) => {
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
  if (!isGameOver) {
    if (e.target.classList.contains("up")) mouseShoot();
    if (e.target.classList.contains("left")) mouseLeft();
    if (e.target.classList.contains("right")) mouseRight();
  }
});

buttons.addEventListener("mouseup", () => {
  clearInterval(shootStart);
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
});

buttons.addEventListener("mouseleave", () => {
  clearInterval(shootStart);
  clearInterval(rightMoveStart);
  clearInterval(leftMoveStart);
});
