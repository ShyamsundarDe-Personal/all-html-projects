let picOptions = document.querySelector(".pic-options");
let container = document.querySelector(".container");
let body = document.querySelector("body");
let headCreate = document.createElement("h1");

let clickSound = new Audio("./sounds/click.mp3");
let music = new Audio("./sounds/music.mp3");
let tieSound = new Audio("./sounds/tie.mp3");
let winSound = new Audio("./sounds/win.mp3");
let wrongSound = new Audio("./sounds/wrong.mp3");

let playerX = 0;
let playerO = 0;
let selectPlayer = 0;
let isMatchStart = false;

let box = null;
let temp = 1;
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let forTie = 0;
const checkWinner = (e) => {
  if (arr[0] === arr[1] && arr[1] === arr[2]) {
    return e.target.innerText;
  } else if (arr[2] === arr[5] && arr[5] === arr[8]) {
    return e.target.innerText;
  } else if (arr[8] === arr[7] && arr[7] === arr[6]) {
    return e.target.innerText;
  } else if (arr[6] === arr[3] && arr[3] === arr[0]) {
    return e.target.innerText;
  } else if (arr[0] === arr[4] && arr[4] === arr[8]) {
    return e.target.innerText;
  } else if (arr[2] === arr[4] && arr[4] === arr[6]) {
    return e.target.innerText;
  } else if (arr[1] === arr[4] && arr[4] === arr[7]) {
    return e.target.innerText;
  } else if (arr[3] === arr[4] && arr[4] === arr[5]) {
    return e.target.innerText;
  } else {
    return false;
  }
};

const resetGame = () => {
  let body = document.querySelector("body");
  let button = document.createElement("button");
  button.textContent = "Re-Match";
  button.classList.add("re-match");
  body.appendChild(button);
  document.addEventListener("keydown", () => {
    clickSound.play();
    setTimeout(() => {
      location.reload();
    }, 300);
  });
  button.addEventListener("click", () => {
    clickSound.play();
    setTimeout(() => {
      location.reload();
    }, 300);
  });
};

const handleGame = (e) => {
  clickSound = new Audio("./sounds/click.mp3");
  if (e.target.innerText === "" && temp) {
    isMatchStart = true;
    clickSound.play();
    e.target.innerText = playerX;
    headCreate.innerText = `Player ${playerO} 's Turn`;
    e.target.style.color = "#fa2961";
    temp = 0;
    ++forTie;
  } else if (e.target.innerText === "") {
    clickSound.play();
    isMatchStart = true;
    e.target.innerText = playerO;
    headCreate.innerText = `Player ${playerX} 's Turn`;
    e.target.style.color = "#7cd95f";
    temp = 1;
    ++forTie;
  } else if (isMatchStart) {
    wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
  }

  for (let i = 0; i < arr.length; i++) {
    if (e.target.classList.contains(i)) {
      arr[i] = e.target.innerText;
    }
  }

  let winner = checkWinner(e);
  if (winner) {
    music.pause();
    winSound.play();
    container.removeEventListener("click", startGame);
    headCreate.style.fontSize = "1.8rem";
    headCreate.innerText = `Congratulation! ${winner} Win The Match`;
    resetGame();
  } else if (forTie === 9) {
    music.pause();
    tieSound.play();
    container.removeEventListener("click", startGame);
    headCreate.innerText = `The Match Is Tie`;
    resetGame();
    return;
  }
};

const startGame = (e) => {
  if (container.classList.contains("grid")) {
    handleGame(e);
  }
};
container.addEventListener("click", startGame);

const initializeGame = (e) => {
  body.appendChild(headCreate);

  headCreate.innerText = `Player ${e.target.innerText} 's Turn`;
  if (e.target.innerText === "X") {
    playerX = "X";
    playerO = "O";
  } else {
    playerX = "O";
    playerO = "X";
  }
  container.innerHTML = "";
  container.classList.add("grid");
  for (let i = 0; i < 9; i++) {
    box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(`${arr[i]}`);
    container.appendChild(box);
  }
};

picOptions.addEventListener("click", (e) => {
  if (e.target.classList.contains("select")) {
    clickSound.play();
    music.play();
    initializeGame(e);
  }
});
