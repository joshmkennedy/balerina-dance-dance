/*document.addEventListener("keydown", function(event) {
  console.log(event.which);
})*/

const player = document.querySelector(".player");
const allObstacles = [...document.querySelectorAll(".obstacle")];
let leftIsDown = false,
  rightIsDown = false;

let shouldFall = false,
  shouldJump = true;
let speed = 3;

let crash = false;

const stageWidth = innerWidth;

const didCrashAgainstWall = dir => {
  const { x, width, bottom, height, y } = player.getBoundingClientRect();
  const pbot = bottom,
    ph = height;

  crash = false;
  if (dir === "left" && x < 0) {
    console.log("CRASSSHED");
    console.log(x, stageWidth);
    crash = true;
  }
  if (dir === "right" && x >= stageWidth - width) {
    console.log("CRASSSHED");
    console.log(x, stageWidth);
    crash = true;
  }

  return crash;
};

function scorePositon() {
  const playerBounds = player.getBoundingClientRect();
  allObstacles.map(obs => {
    const bounds = obs.getBoundingClientRect();

    if (
      playerBounds.right == bounds.left ||
      playerBounds.right <= bounds.left + bounds.width ||
      playerBounds.right + playerBounds.width <= bounds.left + bounds.width ||
      playerBounds.left == bounds.right ||
      playerBounds.left <= bounds.right - 20
    ) {
      ScorePoints();
    }
  });
}

////GO RIGHT

window.addEventListener("keydown", goRight);
window.addEventListener("keyup", stopGoRight);

///GO LEFT
window.addEventListener("keydown", goLeft);
window.addEventListener("keyup", stopGoLeft);

////JUMP
window.addEventListener("keydown", jump);
window.addEventListener("keydown", scorePositon);
//GO RIGHT FN
function goRight(e) {
  if (e.code === "ArrowRight") {
    let currentPos = parseInt(window.getComputedStyle(player).left);
    player.classList.add("walking_right");

    if (!rightIsDown) {
      rightIsDown = true;
      let req;
      const moveRight = () => {
        didCrashAgainstWall("right");
        if (!crash) {
          req = requestAnimationFrame(moveRight);
          player.style.left = currentPos + speed + "px";
          currentPos = currentPos + speed;
          if (!rightIsDown) {
            cancelAnimationFrame(req);
          }
        } else {
          cancelAnimationFrame(req);
        }
      };
      requestAnimationFrame(moveRight);
    }
  }
}
//STOP GO RIGHT FN
function stopGoRight(e) {
  if (rightIsDown && e.code === "ArrowRight") {
    player.classList.remove("walking_right");
    rightIsDown = false;
  }
}

///GO LEFT FN
function goLeft(e) {
  if (e.code === "ArrowLeft") {
    player.classList.add("walking_left");
    let currentPos = parseInt(window.getComputedStyle(player).left);

    if (!leftIsDown) {
      leftIsDown = true;
      let req;
      const moveLeft = () => {
        didCrashAgainstWall("left");
        if (!crash) {
          req = requestAnimationFrame(moveLeft);
          player.style.left = currentPos - speed + "px";
          currentPos = currentPos - speed;
          if (!leftIsDown) {
            cancelAnimationFrame(req);
          }
        }
      };
      requestAnimationFrame(moveLeft);
    }
  }
}
//STOP GO LEFT FN
function stopGoLeft(e) {
  if (leftIsDown && e.code === "ArrowLeft") {
    player.classList.remove("walking_left");
    leftIsDown = false;
  }
}

///JUMP FN
let currentPos = parseInt(window.getComputedStyle(player).top);
const startingPos = currentPos;
function jump(e) {
  let startJump;
  if (e.code === "ArrowUp" || e.keyCode === 32) {
    if (shouldJump) {
      shouldJump = false;
      let req;

      dontActivate = true;
      player.classList.add("jumping");
      if (!shouldFall) {
        startJump = setInterval(() => {
          if (shouldFall) {
            clearInterval(startJump);
          }
          const performJump = () => {
            req = requestAnimationFrame(performJump);
            player.style.top = currentPos - 10 + "px";
            currentPos = currentPos - 10;
            if (currentPos <= startingPos) {
              cancelAnimationFrame(req);
            }
          };
          requestAnimationFrame(performJump);
          if (currentPos <= startingPos - 100) {
            shouldFall = true;
            const performFall = () => {
              req = requestAnimationFrame(performFall);
              player.style.top = currentPos + 2 + "px";
              currentPos = currentPos + 2;
              if (currentPos >= startingPos) {
                cancelAnimationFrame(req);
                player.style.top = startingPos;
                shouldFall = false;
                shouldJump = true;
                player.classList.remove("jumping");
              }
            };
            requestAnimationFrame(performFall);
          }
        }, 20);
      }
    }
  }
}
