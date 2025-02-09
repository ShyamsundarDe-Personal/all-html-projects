let h1 = document.querySelector("h1");
let board = document.querySelector(".board");
let dice = document.querySelector(".dice");
let arrow = document.querySelector(".arrow");
let container = document.querySelector(".container");

let tokenSection = document.querySelector(".tokens-section");

let redSection = document.querySelector(".red-section");
let blueSection = document.querySelector(".blue-section");
let yellowSection = document.querySelector(".yellow-section");
let purpleSection = document.querySelector(".purple-section");

let redToken = document.querySelector(".red-token");
let blueToken = document.querySelector(".blue-token");
let yellowToken = document.querySelector(".yellow-token");
let purpleToken = document.querySelector(".purple-token");

let clickSound = new Audio("./sounds/click.mp3");
let diceRollSound = new Audio("./sounds/diceroll.mp3");
let fallSound = new Audio("./sounds/fall.mp3");
let initialSound = new Audio("./sounds/initial.mp3");
let moveSound = new Audio("./sounds/move.mp3");
let upSound = new Audio("./sounds/up.mp3");
let winnerSound = new Audio("./sounds/winner.mp3");

let allColorTokens = [redToken, blueToken, yellowToken, purpleToken];
let allColorSections = [redSection, blueSection, yellowSection, purpleSection];

let initialIndex = 0;
let diceNumber = 0;
let isDiceRolled = false;

let redDone = false;
let blueDone = false;
let yellowDone = false;
let purpleDone = false;

let redComplete = false;
let blueComplete = false;
let yellowComplete = false;
let purpleComplete = false;

let isNextChance = true;
let moveStart = null;

let winTokens = [];
let countWinner = 0;

let initialPosition = {
  left: 8,
  bottom: 26,
};

let redPosition = {
  left: initialPosition.left,
  bottom: initialPosition.bottom,
};

let bluePosition = {
  left: initialPosition.left,
  bottom: initialPosition.bottom,
};

let yellowPosition = {
  left: initialPosition.left,
  bottom: initialPosition.bottom,
};

let purplePosition = {
  left: initialPosition.left,
  bottom: initialPosition.bottom,
};

let pixel = {
  i: 40,
  j: 32,
};

let row = 10;
let column = 10;

// Ladder Positions

let ladder1 = {
  base: {
    i: 0,
    j: 7,
  },
  front: {
    i: 2,
    j: 8,
  },
};

let ladder2 = {
  base: {
    i: 2,
    j: 1,
  },
  front: {
    i: 6,
    j: 0,
  },
};

let ladder3 = {
  base: {
    i: 5,
    j: column - 1 - 6,
  },
  front: {
    i: 6,
    j: 7,
  },
};

let ladder4 = {
  base: {
    i: 6,
    j: 4,
  },
  front: {
    i: 9,
    j: 3,
  },
};

let ladder5 = {
  base: {
    i: 7,
    j: column - 1 - 8,
  },
  front: {
    i: 9,
    j: 7,
  },
};

// Snake Positions
let snake1 = {
  head: {
    i: 2,
    j: 2,
  },
  tail: {
    i: 1,
    j: 3,
  },
};

let snake2 = {
  head: {
    i: 4,
    j: 4,
  },
  tail: {
    i: 0,
    j: 4,
  },
};

let snake3 = {
  head: {
    i: 5,
    j: column - 1 - 8,
  },
  tail: {
    i: 3,
    j: 7,
  },
};

let snake4 = {
  head: {
    i: 6,
    j: 6,
  },
  tail: {
    i: 2,
    j: 7,
  },
};

let snake5 = {
  head: {
    i: 8,
    j: 9,
  },
  tail: {
    i: 4,
    j: 9,
  },
};

let snake6 = {
  head: {
    i: 9,
    j: column - 1 - 1,
  },
  tail: {
    i: 2,
    j: 3,
  },
};

let red = {
  i: 0,
  j: 0,
};

let blue = {
  i: 0,
  j: 0,
};

let yellow = {
  i: 0,
  j: 0,
};

let purple = {
  i: 0,
  j: 0,
};

const moveLadderFrontPosition = (ladder, token, tokenColor, tokenPosition) => {
  tokenColor.i = ladder.front.i;
  tokenColor.j = ladder.front.j;
  tokenPosition.left = initialPosition.left;
  tokenPosition.bottom = initialPosition.bottom;
  tokenPosition.bottom += pixel.i * tokenColor.i;
  tokenPosition.left += pixel.j * tokenColor.j;
  token.style.bottom = `${tokenPosition.bottom}px`;
  token.style.left = `${tokenPosition.left}px`;
  upSound = new Audio("./sounds/up.mp3");
  upSound.play();
};

const isLadderBasePosition = (token, tokenColor, tokenPosition) => {
  if (tokenColor.i == ladder1.base.i && tokenColor.j == ladder1.base.j) {
    moveLadderFrontPosition(ladder1, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == ladder2.base.i && tokenColor.j == ladder2.base.j) {
    moveLadderFrontPosition(ladder2, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == ladder3.base.i && tokenColor.j == ladder3.base.j) {
    moveLadderFrontPosition(ladder3, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == ladder4.base.i && tokenColor.j == ladder4.base.j) {
    moveLadderFrontPosition(ladder4, token, tokenColor, tokenPosition);
    tokenColor.j = column - 1 - tokenColor.j;
  }
  if (tokenColor.i == ladder5.base.i && tokenColor.j == ladder5.base.j) {
    moveLadderFrontPosition(ladder5, token, tokenColor, tokenPosition);
    tokenColor.j = column - 1 - tokenColor.j;
  }
};

const moveSnakeTailPosition = (snake, token, tokenColor, tokenPosition) => {
  tokenColor.i = snake.tail.i;
  tokenColor.j = snake.tail.j;
  tokenPosition.left = initialPosition.left;
  tokenPosition.bottom = initialPosition.bottom;
  tokenPosition.bottom += pixel.i * tokenColor.i;
  tokenPosition.left += pixel.j * tokenColor.j;
  token.style.bottom = `${tokenPosition.bottom}px`;
  token.style.left = `${tokenPosition.left}px`;
  fallSound = new Audio("./sounds/fall.mp3");
  fallSound.play();
};

const isSnakeHeadPosition = (token, tokenColor, tokenPosition) => {
  if (tokenColor.i == snake1.head.i && tokenColor.j == snake1.head.j) {
    moveSnakeTailPosition(snake1, token, tokenColor, tokenPosition);
    tokenColor.j = column - 1 - tokenColor.j;
  }
  if (tokenColor.i == snake2.head.i && tokenColor.j == snake2.head.j) {
    moveSnakeTailPosition(snake2, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == snake3.head.i && tokenColor.j == snake3.head.j) {
    moveSnakeTailPosition(snake3, token, tokenColor, tokenPosition);
    tokenColor.j = column - 1 - tokenColor.j;
  }
  if (tokenColor.i == snake4.head.i && tokenColor.j == snake4.head.j) {
    moveSnakeTailPosition(snake4, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == snake5.head.i && tokenColor.j == snake5.head.j) {
    moveSnakeTailPosition(snake5, token, tokenColor, tokenPosition);
  }
  if (tokenColor.i == snake6.head.i && tokenColor.j == snake6.head.j) {
    moveSnakeTailPosition(snake6, token, tokenColor, tokenPosition);
  }
};

const showResult = () => {
  container.classList.add("show-result");
  let containerHTML = "<h1>Result</h1>";
  container.innerHTML = containerHTML;
  for (let i = 0; i < winTokens.length; i++) {
    const element = winTokens[i];
    if (i == 0)
      containerHTML += `<li><div class="token ${element}-token"></div><span> 1st</span></li>`;
    else if (i == 1)
      containerHTML += `<li><div class="token ${element}-token"></div><span> 2nd</span></li>`;
    else if (i == 2)
      containerHTML += `<li><div class="token ${element}-token"></div><span> 3rd</span></li>`;

    container.innerHTML = containerHTML;
    let button = document.createElement("button");
    button.classList.add("re-start");
    button.textContent = "Restart";
    container.appendChild(button);
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
    });
  }
};

const forwardToken = () => {
  if (countWinner >= 3) showResult();
  else {
    for (let i = 0; i < 4; i++) {
      allColorTokens[i].style.zIndex = "1";
      allColorTokens[i].style.animation = "animate 0s linear infinite";
      allColorSections[i].style.backgroundColor = "#fff";
    }

    ++initialIndex;
    if (initialIndex >= allColorSections.length) initialIndex = 0;

    if (initialIndex == 0 && redComplete) ++initialIndex;
    if (initialIndex == 1 && blueComplete) ++initialIndex;
    if (initialIndex == 2 && yellowComplete) ++initialIndex;
    if (initialIndex == 3 && purpleComplete) ++initialIndex;

    if (initialIndex >= allColorSections.length) initialIndex = 0;
    if (initialIndex == 0 && redComplete) ++initialIndex;

    gameInitialize();
  }
};

const nextChance = (diceNumber) => {
  clearInterval(moveStart);
  moveStart = null;
  isNextChance = true;
  if (diceNumber != 1) forwardToken();
  else gameInitialize();
};

const checkComplete = () => {
  if (initialIndex == 0) {
    if (red.i == row - 1 && red.j == column - 1) {
      ++countWinner;
      winTokens.push("red");
      redComplete = true;
      winnerSound = new Audio("./sounds/winner.mp3");
      winnerSound.play();
    }
  }
  if (initialIndex == 1) {
    if (blue.i == row - 1 && blue.j == column - 1) {
      ++countWinner;
      winTokens.push("blue");
      blueComplete = true;
      winnerSound = new Audio("./sounds/winner.mp3");
      winnerSound.play();
    }
  }
  if (initialIndex == 2) {
    if (yellow.i == row - 1 && yellow.j == column - 1) {
      ++countWinner;
      winTokens.push("yellow");
      yellowComplete = true;
      winnerSound = new Audio("./sounds/winner.mp3");
      winnerSound.play();
    }
  }
  if (initialIndex == 3) {
    if (purple.i == row - 1 && purple.j == column - 1) {
      ++countWinner;
      winTokens.push("purple");
      purpleComplete = true;
      winnerSound = new Audio("./sounds/winner.mp3");
      winnerSound.play();
    }
  }
};

const moving = (token, tokenColor, tokenPosition, diceNumber) => {
  let moveCount = 0;
  moveStart = setInterval(() => {
    if (++moveCount <= diceNumber) {
      moveSound = new Audio("./sounds/move.mp3");
      moveSound.play();
      if (++tokenColor.j < column && tokenColor.i % 2 === 0) {
        tokenPosition.left += pixel.j;
        token.style.left = `${tokenPosition.left}px`;
      } else if (tokenColor.j === column) {
        tokenColor.i++;
        tokenColor.j = 0;
        tokenPosition.bottom += pixel.i;
        token.style.bottom = `${tokenPosition.bottom}px`;
      } else {
        tokenPosition.left -= pixel.j;
        token.style.left = `${tokenPosition.left}px`;
      }
    } else {
      isLadderBasePosition(token, tokenColor, tokenPosition);
      isSnakeHeadPosition(token, tokenColor, tokenPosition);
      checkComplete();
      nextChance(diceNumber);
    }
  }, 300);
};

const move = (token, tokenColor, tokenPosition, diceNumber) => {
  if (tokenColor.i != row - 1) {
    moving(token, tokenColor, tokenPosition, diceNumber);
  } else {
    if (tokenColor.j + diceNumber <= column - 1) {
      moving(token, tokenColor, tokenPosition, diceNumber);
    } else {
      forwardToken();
    }
  }
};

const moveTokens = (initialIndex, token, diceNumber) => {
  if (initialIndex === 0) move(token, red, redPosition, diceNumber);
  else if (initialIndex === 1) move(token, blue, bluePosition, diceNumber);
  else if (initialIndex === 2) move(token, yellow, yellowPosition, diceNumber);
  else if (initialIndex === 3) move(token, purple, purplePosition, diceNumber);
};

const initialTokenPosition = (token, section) => {
  section.remove(token);
  board.appendChild(token);
  token.style.position = "absolute";
  token.style.animation = "animate 0.5s linear infinite";
  token.style.zIndex = "3";

  token.style.left = `${initialPosition.left}px`;
  token.style.bottom = `${initialPosition.bottom}px`;
};

const startGame = (initialIndex, token, section, diceNumber) => {
  if (initialIndex === 0) {
    if (redDone) moveTokens(initialIndex, token, diceNumber);
    else if (diceNumber === 1) {
      redDone = true;
      initialTokenPosition(token, section);
      gameInitialize();
    } else forwardToken();
  } else if (initialIndex === 1) {
    if (blueDone) moveTokens(initialIndex, token, diceNumber);
    else if (diceNumber === 1) {
      blueDone = true;
      initialTokenPosition(token, section);
      gameInitialize();
    } else forwardToken();
  } else if (initialIndex === 2) {
    if (yellowDone) moveTokens(initialIndex, token, diceNumber);
    else if (diceNumber === 1) {
      yellowDone = true;
      initialTokenPosition(token, section);
      gameInitialize();
    } else forwardToken();
  } else if (initialIndex === 3) {
    if (purpleDone) moveTokens(initialIndex, token, diceNumber);
    else if (diceNumber === 1) {
      purpleDone = true;
      initialTokenPosition(token, section);
      gameInitialize();
    } else forwardToken();
  }

  if (diceNumber == 1) {
    initialSound = new Audio("./sounds/initial.mp3");
    initialSound.play();
  }

  if (redDone && blueDone && yellowDone && purpleDone) tokenSection.remove();
};

const rollTheDice = () => {
  arrow.innerHTML = "";
  if (!isDiceRolled) {
    clickSound = new Audio("./sounds/click.mp3");
    clickSound.play();
    isDiceRolled = true;
    diceRollSound = new Audio("./sounds/diceroll.mp3");
    diceRollSound.play();
    let rollDice = setInterval(() => {
      // Random Here
      diceNumber = Math.ceil(Math.random() * 6);
      dice.textContent = diceNumber;
    }, 20);

    setTimeout(() => {
      dice.textContent = diceNumber;
      clearInterval(rollDice);
      startGame(
        initialIndex,
        allColorTokens[initialIndex],
        allColorSections[initialIndex],
        diceNumber
      );
    }, 1000);
  }
};

const displayTokensTurns = (initialIndex) => {
  if (initialIndex === 0) h1.textContent = "Red's Turn";
  else if (initialIndex === 1) h1.textContent = "Blue's Turn";
  else if (initialIndex === 2) h1.textContent = "Yellow's Turn";
  else if (initialIndex === 3) h1.textContent = "Purple's Turn";

  allColorTokens[initialIndex].style.animation = "animate 0.5s linear infinite";

  if (!redDone || !blueDone || !yellowDone || !purpleDone)
    allColorSections[initialIndex].style.backgroundColor = "#ff9eea";
};

const autoPlay = () => {
  setInterval(() => {
    rollTheDice();
  }, 2000);
};

const userPlay = () => {
  dice.addEventListener("click", () => {
    rollTheDice();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === " ") rollTheDice();
  });
};

const gameInitialize = () => {
  arrow.innerHTML = "&larr;";
  isDiceRolled = false;
  displayTokensTurns(initialIndex);

  // autoPlay();
  userPlay();
};

gameInitialize();
