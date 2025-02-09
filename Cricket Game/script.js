let bowler = document.querySelector(".bowler");
let ball = document.querySelector(".ball");
let batsman = document.querySelector(".batsman");
let batsmanNo = document.querySelector(".batsman-no");
let bat = document.querySelector(".bat");
let hit = document.querySelector(".hit");
let batsmanSideWicket2 = document.querySelector(".batsman-side-wicket-2");
let batsmanSideWicket3 = document.querySelector(".batsman-side-wicket-3");
let bowlerSideWicket1 = document.querySelector(".bowler-side-wicket-1");
let bowlerSideWicket2 = document.querySelector(".bowler-side-wicket-2");
let startBall = document.querySelector(".start-ball");
let field = document.querySelector(".field");
let allFielders = document.querySelectorAll(".fielders");
let fielder1 = document.querySelector(".fielder-1");
let fielder2 = document.querySelector(".fielder-2");
let fielder3 = document.querySelector(".fielder-3");
let fielder4 = document.querySelector(".fielder-4");
let fielder5 = document.querySelector(".fielder-5");
let fielder6 = document.querySelector(".fielder-6");
let fielder7 = document.querySelector(".fielder-7");
let fielder8 = document.querySelector(".fielder-8");
let fielder9 = document.querySelector(".fielder-9");
let wicketKeeper = document.querySelector(".wicket-keeper");
let overDisplay = document.querySelector(".overs");
let wicketDisplay = document.querySelector(".wickets");
let runsDisplay = document.querySelector(".runs");

let clickSound = new Audio("./sounds/click.mp3");
let runSound = new Audio("./sounds/run.mp3");
let outSound = new Audio("./sounds/out.mp3");
let boldSound = new Audio("./sounds/bold.mp3");
let hitSound = new Audio("./sounds/hit.mp3");
let runCompleteSound = new Audio("./sounds/runcomplete.mp3");
let boundarySound = new Audio("./sounds/boundary.mp3");
let wideSound = new Audio("./sounds/wide.mp3");

let totalOvers = 1;
let totalBalls = totalOvers * 6;
let opponentRuns =
  Math.floor(Math.random() * (totalOvers * 10 - totalOvers * 5 + 1)) +
  totalOvers * 5;
let countBalls = 0;
let countRuns = 0;
let countWickets = 0;
let totalWickets = 10;
let wideBall = 0;

let coverFourRuns = 0;
let isBallStart = false;
let isHitBall = false;
let isRunOut = false;
let isWicket = false;
let isCatchOut = false;

let isRun = false;
let upRun = null;
let downRun = null;
let isUp = false;
let ballReach = false;
let throwAtBowler = false;
let throwAtWicketKeeper = false;

let batsmanPos = 0;
let bowlerPos = null;
let wicketKeeperPos = null;
let ballPos = null;
let fielder1Obj = null;
let fielder2Obj = null;
let fielder3Obj = null;
let fielder4Obj = null;
let fielder5Obj = null;
let fielder6Obj = null;
let fielder7Obj = null;
let fielder8Obj = null;
let fielder9Obj = null;

// Function For Show Overs
const showOvers = () => {
  if (countBalls % 6 == 0) {
    let currentBowler = bowler.textContent;
    let randomBowler = Math.ceil(Math.random() * 10);
    while (currentBowler == randomBowler)
      randomBowler = Math.ceil(Math.random() * 10);

    for (let i = 0; i < allFielders.length; i++) {
      const fielder = allFielders[i];
      if (fielder.textContent == randomBowler) {
        bowler.textContent = randomBowler;
        fielder.textContent = currentBowler;
        break;
      }
    }
  }
  overDisplay.innerHTML = `<span class="overs">Overs<br />${Math.floor(
    countBalls / 6
  )}.${countBalls % 6} / ${Math.floor(totalBalls / 6)}.${
    totalBalls % 6
  }</span>`;
};

// Function For Initialize Positions
const initializePositions = () => {
  hit = document.querySelector(".hit");
  hit.classList.remove("run");
  hit.textContent = "Hit";
  hit.style.backgroundColor = "#007bff";

  batsmanSideWicket2.classList.remove("batsman-w-2");
  batsmanSideWicket3.classList.remove("batsman-w-3");
  bowlerSideWicket1.classList.remove("bowler-w-1");
  bowlerSideWicket2.classList.remove("bowler-w-2");

  showOvers();
  wicketDisplay.innerHTML = `<span class="wickets">Wickets <br />${countWickets} / ${totalWickets}</span>`;
  runsDisplay.innerHTML = `<span class="runs">Runs <br />${countRuns} / ${opponentRuns}</span>`;
  batsmanNo.textContent = countWickets + 1;

  coverFourRuns = 0;
  wideBall = 0;
  isBallStart = false;
  isHitBall = false;
  isRunOut = false;
  isWicket = false;
  isCatchOut = false;

  isRun = false;
  upRun = null;
  downRun = null;
  isUp = false;
  ballReach = false;
  throwAtBowler = false;
  throwAtWicketKeeper = false;

  // Batsman and Bowler and Wicket Keeper Position
  batsmanPos = 5;
  batsman.style.bottom = `${batsmanPos}px`;

  wicketKeeperPos = {
    top: 350,
    right: 120,
  };
  wicketKeeper.style.top = `${wicketKeeperPos.top}px`;
  wicketKeeper.style.right = `${wicketKeeperPos.right}px`;

  bowlerPos = {
    top: 60,
    right: 120,
  };
  bowler.style.top = `${bowlerPos.top}px`;
  bowler.style.right = `${bowlerPos.right}px`;
  bowler.style.transition = "all 0.2s linear";

  // Ball Position
  ballPos = {
    top: 60,
    right: 110,
  };
  ball.style.top = `${ballPos.top}px`;
  ball.style.right = `${ballPos.right}px`;
  ball.style.backgroundColor = "#ff299f";
  ball.style.transition = "all 0.2s linear";

  // Fielders Positions
  fielder1Obj = {
    top: 230,
    right: 240,
  };
  fielder1.style.top = `${fielder1Obj.top}px`;
  fielder1.style.right = `${fielder1Obj.right}px`;

  fielder2Obj = {
    top: 230,
    right: 10,
  };
  fielder2.style.top = `${fielder2Obj.top}px`;
  fielder2.style.right = `${fielder2Obj.right}px`;

  fielder3Obj = {
    top: 10,
    right: 110,
  };
  fielder3.style.top = `${fielder3Obj.top}px`;
  fielder3.style.right = `${fielder3Obj.right}px`;

  fielder4Obj = {
    top: 440,
    right: 120,
  };
  fielder4.style.top = `${fielder4Obj.top}px`;
  fielder4.style.right = `${fielder4Obj.right}px`;

  fielder5Obj = {
    top: 370,
    right: 190,
  };
  fielder5.style.top = `${fielder5Obj.top}px`;
  fielder5.style.right = `${fielder5Obj.right}px`;

  fielder6Obj = {
    top: 370,
    right: 60,
  };
  fielder6.style.top = `${fielder6Obj.top}px`;
  fielder6.style.right = `${fielder6Obj.right}px`;

  fielder7Obj = {
    top: 90,
    right: 60,
  };
  fielder7.style.top = `${fielder7Obj.top}px`;
  fielder7.style.right = `${fielder7Obj.right}px`;

  fielder8Obj = {
    top: 90,
    right: 190,
  };
  fielder8.style.top = `${fielder8Obj.top}px`;
  fielder8.style.right = `${fielder8Obj.right}px`;

  fielder9Obj = {
    top: 180,
    right: 200,
  };
  fielder9.style.top = `${fielder9Obj.top}px`;
  fielder9.style.right = `${fielder9Obj.right}px`;
};

initializePositions();

// Function For Show Result
let isEndMatch = false;
const showResult = () => {
  isEndMatch = true;
  boundarySound = new Audio("./sounds/boundary.mp3");
  boundarySound.play();
  initializePositions();
  field.innerHTML = "";
  let result = document.createElement("h1");
  let cause = document.createElement("p");
  let reMatch = document.createElement("button");
  startBall.remove();
  hit.remove();
  reMatch.classList.add("re-match");
  field.appendChild(result);
  field.appendChild(cause);
  field.appendChild(reMatch);
  result.textContent = "Congratulation!";
  if (countRuns == opponentRuns - 1) cause.textContent = `The Match Is Tie!`;
  else if (countRuns >= opponentRuns)
    cause.textContent = `You Won By ${totalWickets - countWickets} Wickets`;
  else cause.textContent = `Opponent Won By ${opponentRuns - countRuns} Runs`;
  reMatch.textContent = "Re-Match";
  reMatch.addEventListener("click", () => {
    location.reload();
  });
};

// Function For Show Run
const showRun = (run) => {
  let bTag = document.createElement("b");
  let pitch = document.querySelector(".pitch");
  pitch.appendChild(bTag);
  bTag.textContent = "";
  bTag.textContent = `+${run} Run`;
  setTimeout(() => {
    pitch.removeChild(bTag);
    bTag.remove();
  }, 400);
};

const showWide = () => {
  wideSound = new Audio("./sounds/wide.mp3");
  wideSound.play();
  let bTag = document.createElement("b");
  let pitch = document.querySelector(".pitch");
  pitch.appendChild(bTag);
  bTag.textContent = "";
  bTag.textContent = `Wide`;
  ++countRuns;
  --countBalls;
  setTimeout(() => {
    pitch.removeChild(bTag);
    bTag.remove();
  }, 400);
};

// Function For Show Run Out
const showRunOut = () => {
  isRunOut = true;
  if (throwAtWicketKeeper && isRunOut) {
    setTimeout(() => {
      batsmanSideWicket2.classList.add("batsman-w-2");
      batsmanSideWicket3.classList.add("batsman-w-3");
    }, 300);
  } else if (throwAtBowler && isRunOut) {
    setTimeout(() => {
      bowlerSideWicket1.classList.add("bowler-w-1");
      bowlerSideWicket2.classList.add("bowler-w-2");
    }, 300);
  }
  outSound = new Audio("./sounds/out.mp3");
  outSound.play();
  boldSound = new Audio("./sounds/bold.mp3");
  boldSound.play();
  ++countWickets;
  let bTag = document.createElement("b");
  let pitch = document.querySelector(".pitch");
  bTag.textContent = "";
  bTag.textContent = `Run Out`;
  hit.textContent = `Run Out`;
  hit.style.backgroundColor = "#f00";
  pitch.appendChild(bTag);
  clearInterval(downRun);
  clearInterval(upRun);
  downRun = null;
  upRun = null;
  setTimeout(() => {
    pitch.removeChild(bTag);
    bTag.remove();
    boldSound.pause();
  }, 400);
};

// Function For Show Bold Out
const showBoldOut = () => {
  setTimeout(() => {
    batsmanSideWicket2.classList.add("batsman-w-2");
    batsmanSideWicket3.classList.add("batsman-w-3");
  }, 100);
  boldSound = new Audio("./sounds/bold.mp3");
  boldSound.play();
  isRunOut = true;
  ++countWickets;
  let bTag = document.createElement("b");
  let pitch = document.querySelector(".pitch");
  pitch.appendChild(bTag);
  bTag.textContent = "";
  bTag.textContent = `Bold Out`;
  setTimeout(() => {
    pitch.removeChild(bTag);
    bTag.remove();
    boldSound.pause();
  }, 400);
};

// Function For Show Catch Out
const showCatchOut = () => {
  isCatchOut = true;
  ++countWickets;
  let bTag = document.createElement("b");
  let pitch = document.querySelector(".pitch");
  setTimeout(() => {
    pitch.appendChild(bTag);
    outSound = new Audio("./sounds/out.mp3");
    outSound.play();
    bTag.textContent = "";
    bTag.textContent = `Catch Out`;
  }, 800);
  setTimeout(() => {
    pitch.removeChild(bTag);
    bTag.remove();
  }, 1200);
};

// Function For Continue Run
const continueRun = () => {
  if (
    upRun === null &&
    downRun === null &&
    coverFourRuns < 4 &&
    !isRunOut &&
    !ballReach
  ) {
    if (isUp && isRun) {
      isUp = false;
      downRun = setInterval(() => {
        if (batsmanPos > 5) {
          batsman.style.bottom = `${batsmanPos--}px`;
          if (
            ballPos.top == wicketKeeperPos.top &&
            ballPos.right == wicketKeeperPos.right
          ) {
            setTimeout(() => {
              if (batsmanPos > 5 && !isRunOut) showRunOut();
            }, 500);
          } else hit.textContent = "Running...";
        } else {
          clearInterval(downRun);
          runCompleteSound = new Audio("./sounds/runcomplete.mp3");
          runCompleteSound.play();
          downRun = null;
          upRun = null;
          ++countRuns;
          ++coverFourRuns;
          showRun(coverFourRuns);
          if (coverFourRuns == 4) {
            hit.textContent = "Run Completed";
            hit.style.backgroundColor = "#0f0";
          } else hit.textContent = "Run Continue?";
        }
      }, 5);
    } else if (!isUp && isRun) {
      isUp = true;
      upRun = setInterval(() => {
        if (batsmanPos < 165) {
          batsman.style.bottom = `${batsmanPos++}px`;
          if (
            ballPos.top == bowlerPos.top - 10 &&
            ballPos.right == bowlerPos.right - 10
          ) {
            setTimeout(() => {
              if (batsmanPos < 165 && !isRunOut) showRunOut();
            }, 500);
          } else hit.textContent = "Running...";
        } else {
          clearInterval(upRun);
          runCompleteSound = new Audio("./sounds/runcomplete.mp3");
          runCompleteSound.play();
          upRun = null;
          downRun = null;
          ++countRuns;
          ++coverFourRuns;
          showRun(coverFourRuns);
          hit.textContent = "Run Continue?";
        }
      }, 5);
    }
  }
};

const isContinueRun = () => {
  hit.classList.add("run");
  let run = document.querySelector(".run");
  run.addEventListener("click", () => {
    continueRun();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === " " && !isEndMatch) continueRun();
  });
};

// Function For Start Run
const letsRun = () => {
  isRun = true;
  isUp = true;
  hit.textContent = "Running...";
  upRun = setInterval(() => {
    if (batsmanPos <= 165) batsman.style.bottom = `${batsmanPos++}px`;
    else {
      clearInterval(upRun);
      runCompleteSound = new Audio("./sounds/runcomplete.mp3");
      runCompleteSound.play();
      upRun = null;
      downRun = null;
      ++countRuns;
      ++coverFourRuns;
      showRun(coverFourRuns);
      hit.textContent = "Run Continue?";
      isContinueRun();
    }
  }, 5);
};

const hitBall = () => {
  if (!isHitBall) {
    bat.style.rotate = "-360deg";
    setTimeout(() => {
      bat.style.rotate = "20deg";
    }, 200);
  }
  if (!isHitBall && !isWicket) {
    if (
      ballPos.top < 335 &&
      ballPos.top > 315 &&
      ballPos.right >= 110 &&
      ballPos.right <= 130
    ) {
      isHitBall = true;
      // hitSound.play();
      clearInterval(throwingBall);
      let randomHit = Math.floor(Math.random() * 12);
      // Go Ball
      if (randomHit == 0) {
        let isCaught = Math.floor(Math.random() * 5);
        ballPos.right -= 10;
        ball.style.right = `${ballPos.right}px`;

        if (isCaught) {
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            if (ballPos.top < -20) clearInterval(goHitBall);
          }, 5);
          if (isCaught == 1) {
            setTimeout(() => {
              clearInterval(goHitBall);
              bowler.style.top = `${ballPos.top}px`;
              bowler.style.right = `${ballPos.right + 10}px`;
              setTimeout(() => {
                if (
                  countBalls >= totalBalls ||
                  countWickets >= totalWickets ||
                  countRuns >= opponentRuns
                ) {
                  showResult();
                } else {
                  initializePositions();
                  startGame();
                }
              }, 2000);
            }, 500);
          } else {
            let runfielder = setInterval(() => {
              fielder3.style.top = `${fielder3Obj.top++}px`;
            }, 10);

            let notCatchOut = Math.floor(Math.random() * 5);
            if (notCatchOut) letsRun();
            let stopBall = Math.floor(Math.random() * (800 - 600 + 1)) + 600;

            setTimeout(() => {
              fielder3.style.top = `${ballPos.top}px`;
              fielder3.style.right = `${ballPos.right}px`;

              clearInterval(goHitBall);
              clearInterval(runfielder);
              if (!notCatchOut) showCatchOut();
              isCaughtBall();
            }, stopBall);
          }
        } else {
          ballPos.right -= 10;
          ball.style.right = `${ballPos.right}px`;
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            if (ballPos.top < -20) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 2);
          let runfielder = setInterval(() => {
            fielder3.style.right = `${fielder3Obj.right--}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 100);
        }
      } else if (randomHit == 1) {
        let isCaught = Math.floor(Math.random() * 5);
        ballPos.right -= 10;
        ball.style.right = `${ballPos.right}px`;
        if (isCaught) {
          if (isCaught == 2) {
            ballPos.top += 20;
            ball.style.top = `${ballPos.top}px`;
            wicketKeeper.style.top = `${ballPos.top}px`;
            wicketKeeper.style.right = `${ballPos.right}px`;
            showCatchOut();
            isCaughtBall();
          } else {
            let goHitBall = setInterval(() => {
              ball.style.top = `${ballPos.top++}px`;
              if (ballPos.top > 470) clearInterval(goHitBall);
            }, 10);

            let runfielder = setInterval(() => {
              fielder6.style.right = `${fielder6Obj.right++}px`;
              fielder4.style.top = `${fielder4Obj.top--}px`;
            }, 10);

            let notCatchOut = Math.floor(Math.random() * 5);
            if (notCatchOut) letsRun();
            let stopBall = Math.floor(Math.random() * (400 - 200 + 1)) + 200;

            setTimeout(() => {
              if (isCaught == 3) {
                fielder6.style.top = `${ballPos.top}px`;
                fielder6.style.right = `${ballPos.right}px`;
              } else {
                fielder4.style.top = `${ballPos.top}px`;
                fielder4.style.right = `${ballPos.right}px`;
              }
              clearInterval(goHitBall);
              clearInterval(runfielder);
              if (!notCatchOut) showCatchOut();
              isCaughtBall();
            }, stopBall);
          }
        } else {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top++}px`;
            if (ballPos.top > 470) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder6.style.right = `${fielder6Obj.right++}px`;
            fielder6.style.top = `${fielder6Obj.top++}px`;
            fielder4.style.right = `${fielder4Obj.right--}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 200);
        }
      } else if (randomHit == 2) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top--}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 280) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder1.style.right = `${fielder1Obj.right--}px`;
            fielder9.style.top = `${fielder9Obj.top++}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (800 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 1) {
              fielder1.style.top = `${ballPos.top}px`;
              fielder1.style.right = `${ballPos.right}px`;
            } else {
              fielder9.style.top = `${ballPos.top}px`;
              fielder9.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top--}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 280) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder1.style.right = `${fielder1Obj.right--}px`;
            fielder9.style.top = `${fielder9Obj.top++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 200);
        }
      } else if (randomHit == 3) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top--}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder2.style.top = `${fielder2Obj.top++}px`;
            fielder2.style.right = `${fielder2Obj.right++}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (800 - 500 + 1)) + 500;

          setTimeout(() => {
            fielder2.style.top = `${ballPos.top}px`;
            fielder2.style.right = `${ballPos.right}px`;

            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top--}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder2.style.top = `${fielder2Obj.top--}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 200);
        }
      } else if (randomHit == 4) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder7.style.top = `${fielder7Obj.top++}px`;
            fielder2.style.top = `${fielder2Obj.top--}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (800 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 2) {
              fielder2.style.top = `${ballPos.top}px`;
              fielder2.style.right = `${ballPos.right}px`;
            } else {
              fielder7.style.top = `${ballPos.top}px`;
              fielder7.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder7.style.top = `${fielder7Obj.top--}px`;
            fielder7.style.right = `${fielder7Obj.right--}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 5) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 270) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder8.style.top = `${fielder8Obj.top++}px`;
            fielder9.style.top = `${fielder9Obj.top++}px`;
            fielder9.style.right = `${fielder9Obj.right--}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (800 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 2) {
              fielder8.style.top = `${ballPos.top}px`;
              fielder8.style.right = `${ballPos.right}px`;
            } else {
              fielder9.style.top = `${ballPos.top}px`;
              fielder9.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ballPos.top -= 2;
            ball.style.top = `${ballPos.top}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 270) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder8.style.right = `${fielder8Obj.right++}px`;
            fielder9.style.top = `${fielder9Obj.top--}px`;
            fielder9.style.right = `${fielder9Obj.right++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 6) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ballPos.right -= 2;
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right}px`;
            if (ballPos.right < -20) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder2Obj.top += 2;
            fielder2.style.top = `${fielder2Obj.top}px`;
            fielder6.style.right = `${fielder6Obj.right--}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (600 - 400 + 1)) + 400;

          setTimeout(() => {
            if (isCaught == 2) {
              fielder2.style.top = `${ballPos.top}px`;
              fielder2.style.right = `${ballPos.right}px`;
            } else {
              fielder6.style.top = `${ballPos.top}px`;
              fielder6.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ballPos.right -= 2;
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right}px`;
            if (ballPos.right < -20) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder6.style.top = `${fielder5Obj.top--}px`;
            fielder2.style.top = `${fielder1Obj.top++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 7) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ballPos.right += 2;
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right}px`;
            if (ballPos.right > 280) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder1Obj.top += 2;
            fielder1.style.top = `${fielder1Obj.top}px`;
            fielder5.style.right = `${fielder5Obj.right++}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (600 - 400 + 1)) + 400;

          setTimeout(() => {
            if (isCaught == 1) {
              fielder1.style.top = `${ballPos.top}px`;
              fielder1.style.right = `${ballPos.right}px`;
            } else {
              fielder5.style.top = `${ballPos.top}px`;
              fielder5.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ballPos.right += 2;
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right}px`;
            if (ballPos.right > 280) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder5.style.top = `${fielder5Obj.top--}px`;
            fielder1.style.top = `${fielder1Obj.top++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 8) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.top > 460) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder6.style.top = `${fielder6Obj.top++}px`;
            fielder4.style.right = `${fielder4Obj.right--}px`;
            fielder4.style.top = `${fielder4Obj.top--}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (700 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 4) {
              fielder4.style.top = `${ballPos.top}px`;
              fielder4.style.right = `${ballPos.right}px`;
            } else {
              fielder6.style.top = `${ballPos.top}px`;
              fielder6.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.top > 460) {
              isBoundary();
              clearInterval(goHitBall);
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder6.style.top = `${fielder6Obj.top++}px`;
            fielder4.style.right = `${fielder4Obj.right--}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 9) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.top > 460) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder5.style.top = `${fielder5Obj.top++}px`;
            fielder4.style.right = `${fielder4Obj.right++}px`;
            fielder4.style.top = `${fielder4Obj.top--}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (700 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 4) {
              fielder4.style.top = `${ballPos.top}px`;
              fielder4.style.right = `${ballPos.right}px`;
            } else {
              fielder5.style.top = `${ballPos.top}px`;
              fielder5.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.top = `${ballPos.top++}px`;
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.top > 460) {
              isBoundary();
              clearInterval(goHitBall);
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder5.style.top = `${fielder5Obj.top++}px`;
            fielder4.style.right = `${fielder4Obj.right++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 10) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 280) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder5.style.top = `${fielder5Obj.top--}px`;
            fielder1.style.top = `${fielder1Obj.top++}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (900 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 1) {
              fielder1.style.top = `${ballPos.top}px`;
              fielder1.style.right = `${ballPos.right}px`;
            } else {
              fielder5.style.top = `${ballPos.top}px`;
              fielder5.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.right = `${ballPos.right++}px`;
            if (ballPos.right > 280) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder5.style.top = `${fielder5Obj.top--}px`;
            fielder1.style.top = `${fielder1Obj.top++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      } else if (randomHit == 11) {
        let isCaught = Math.floor(Math.random() * 5);
        if (isCaught) {
          let goHitBall = setInterval(() => {
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) clearInterval(goHitBall);
          }, 10);

          let runfielder = setInterval(() => {
            fielder6.style.top = `${fielder6Obj.top--}px`;
            fielder2.style.top = `${fielder2Obj.top++}px`;
          }, 10);

          let notCatchOut = Math.floor(Math.random() * 5);
          if (notCatchOut) letsRun();
          let stopBall = Math.floor(Math.random() * (900 - 500 + 1)) + 500;

          setTimeout(() => {
            if (isCaught == 2) {
              fielder2.style.top = `${ballPos.top}px`;
              fielder2.style.right = `${ballPos.right}px`;
            } else {
              fielder6.style.top = `${ballPos.top}px`;
              fielder6.style.right = `${ballPos.right}px`;
            }
            clearInterval(goHitBall);
            clearInterval(runfielder);
            if (!notCatchOut) showCatchOut();
            isCaughtBall();
          }, stopBall);
        } else {
          let goHitBall = setInterval(() => {
            ball.style.right = `${ballPos.right--}px`;
            if (ballPos.right < -20) {
              clearInterval(goHitBall);
              isBoundary();
            }
          }, 5);
          let runfielder = setInterval(() => {
            fielder6.style.top = `${fielder6Obj.top--}px`;
            fielder2.style.top = `${fielder2Obj.top++}px`;
          }, 10);
          setTimeout(() => {
            clearInterval(runfielder);
          }, 400);
        }
      }
    }
  }
};

hit.addEventListener("click", () => {
  hitBall();
});

// For Throw The Ball Out of Boundary
const isBoundary = () => {
  let fourOrSix = Math.floor(Math.random() * 4);
  boundarySound = new Audio("./sounds/boundary.mp3");
  boundarySound.play();
  if (fourOrSix) {
    countRuns += 4;
    showRun(4);
  } else {
    countRuns += 6;
    showRun(6);
  }
  setTimeout(() => {
    ball.style.transition = "all 0.6s linear";
    ballPos = {
      top: 130,
      right: 110,
    };

    ball.style.backgroundColor = "#ff299f";
    ball.style.top = `${ballPos.top}px`;
    ball.style.right = `${ballPos.right}px`;
  }, 2000);

  setTimeout(() => {
    if (
      countBalls >= totalBalls ||
      countWickets >= totalWickets ||
      countRuns >= opponentRuns
    ) {
      showResult();
    } else {
      let volume = 1;
      let decreaseVolume = setInterval(() => {
        volume -= 0.2;
        volume = Math.max(volume, 0);
        boundarySound.volume = volume;
        if (volume === 0) clearInterval(decreaseVolume);
      }, 200);
      initializePositions();
      startGame();
    }
  }, 4000);
};

// For Fielder Caught Ball
const isCaughtBall = () => {
  let delayThrow = Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000;

  bowler.style.transition = "all 0.6s linear";
  if (isWicket) {
    ball.style.transition = "all 0.2s linear";
  } else {
    ball.style.transition = "all 0.6s linear";
  }

  if (!isWicket && !isCatchOut && wideBall != 2 && wideBall != 10) {
    bowlerPos.right += 30;
    bowler.style.right = `${bowlerPos.right}px`;
  }
  if (!isCatchOut) {
    wicketKeeperPos.top -= 20;
    wicketKeeper.style.top = `${wicketKeeperPos.top}px`;
  }

  setTimeout(() => {
    if (downRun !== null) {
      throwAtWicketKeeper = true;
      ballPos = {
        top: wicketKeeperPos.top,
        right: wicketKeeperPos.right,
      };
    } else {
      throwAtBowler = true;
      ballPos = {
        top: bowlerPos.top - 10,
        right: bowlerPos.right - 10,
      };
    }

    ballReach = true;
    ball.style.backgroundColor = "#ff299f";
    ball.style.top = `${ballPos.top}px`;
    ball.style.right = `${ballPos.right}px`;
  }, delayThrow);

  setTimeout(() => {
    if (
      countBalls >= totalBalls ||
      countWickets >= totalWickets ||
      countRuns >= opponentRuns
    ) {
      showResult();
    } else {
      initializePositions();
      startGame();
    }
  }, 4000);
};

let throwingBall = null;
const throwBall = () => {
  wideBall = Math.floor(Math.random() * 12);
  if (wideBall == 2) ballPos.right += 5;
  else if (wideBall == 10) ballPos.right -= 5;

  ballPos.top -= 40;
  ballPos.right += 10;
  hitSound = new Audio("./sounds/hit.mp3");
  throwingBall = setInterval(() => {
    ball.style.top = `${ballPos.top++}px`;
    ball.style.right = `${ballPos.right}px`;

    if (ballPos.top > 240 && wideBall != 2 && wideBall != 10) {
      hitSound.play();
    } else if (ballPos.top > 260 && wideBall == 2) {
      if (ballPos.top % 2 == 0) ballPos.right++;
    } else if (ballPos.top > 260 && wideBall == 10) {
      if (ballPos.top % 2 == 0) ballPos.right--;
    }

    if (ballPos.top >= 335 && !isHitBall && wideBall != 2 && wideBall != 10) {
      hitSound.pause();
      isWicket = true;
      clearInterval(throwingBall);
      showBoldOut();
      isCaughtBall();
    } else if (ballPos.top >= 335 && (wideBall != 2 || wideBall != 10)) {
      clearInterval(throwingBall);
      wicketKeeper.style.top = `${ballPos.top}px`;
      wicketKeeper.style.right = `${ballPos.right}px`;
      showWide();
      isCaughtBall();
    }
  }, 5);
};

const startBowling = () => {
  if (!isBallStart) {
    runSound = new Audio("./sounds/run.mp3");
    runSound.play();
    isBallStart = true;
    ++countBalls;
    bowling = setInterval(() => {
      ball.style.top = `${ballPos.top++}px`;
      bowler.style.top = `${bowlerPos.top++}px`;
      if (bowlerPos.top >= 140) {
        runSound.pause();
        clickSound = new Audio("./sounds/click.mp3");
        clickSound.play();
        clearInterval(bowling);
        throwBall();
      }
    }, 20);
  }
};

const startGame = () => {
  startBall.addEventListener("click", () => {
    startBowling();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === " " && !isBallStart && !isEndMatch) startBowling();
    else if (!isEndMatch) hitBall();
    else if(isEndMatch) location.reload();
  });
};

startGame();
