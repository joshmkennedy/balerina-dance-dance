import component from "./component";
import { GameArea } from "./GameArea";

// starts the game

function startGame() {
  GameArea.start();
}
// creation of our ballerina
export const player = new component(53, 73, "red", 0, 0, 4, 8);

// Causes all Changes in the Game
// put all events in between clear and update
function gameLoop(delta) {
  GameArea.clear();

  if (GameArea.keys && GameArea.keys[37]) {
    player.isWalkLeft = true;
    player.speedX += -2;
  }
  if (GameArea.keys && GameArea.keys[39]) {
    player.isWalkRight = true;
    player.speedX += 2;
  }
  if (GameArea.keys && GameArea.keys[38]) {
    player.speedY += -2;
  }
  if (GameArea.keys && GameArea.keys[40]) {
    player.speedY += 2;
  }
  player.newPos(delta);
  player.update();
}

/* 
 this is Called by GameArea to update the game
 it calls the game loop function which causes the Changes in the canvas
*/
export function loop() {
  const req = requestAnimationFrame(loop);
  GameArea.currentTime = new Date().getTime();
  const delta = (GameArea.currentTime - GameArea.lastTime) / 1000;

  gameLoop(delta);
  GameArea.lastTime = GameArea.currentTime;
  if (GameArea.shouldStop) {
    cancelAnimationFrame(req);
  }
}
startGame();
