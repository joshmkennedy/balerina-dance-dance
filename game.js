import playerComponent from "./component";
import { GameArea } from "./GameArea";
import Obstacle from "./obstacle";

// starts the game

function startGame() {
  GameArea.menu();
}
// creation of our ballerina
export const player = new playerComponent(53, 73, "red", 100, 100, 4, [8, 18]);

const obstacle = new Obstacle(150, 100, "black", 400);
GameArea.GAME_STATE = "GAME_START";
console.log("object");
// Causes all Changes in the Game
// put all events in between clear and update
function gameLoop(delta) {
  GameArea.clear();

  if (GameArea.keys && GameArea.keys[37] && player.x > 0 + player.width / 2) {
    player.isWalkLeft = true;
    player.speedX -= 0.5;
  }
  if (
    GameArea.keys &&
    GameArea.keys[39] &&
    player.x < GameArea.canvas.width - player.width * 1.5
  ) {
    player.isWalkRight = true;
    player.speedX += 0.5;
  }
  if (GameArea.keys && GameArea.keys[38] && player.isJumping == false) {
    player.speedY -= 25;
    player.isJumping = true;
  }
  if (GameArea.keys && GameArea.keys[32]) {
    player.isDancing = true;
  }

  player.update();
  obstacle.update();

  player.newPos(delta);

  if (obstacle.collision(player) && player.isDancing && player.danceTime == 0) {
    obstacle.newSpot = Math.floor(Math.random() * 600);

    GameArea.updateScore();
  }
  GameArea.context.fillStyle = "black";
  GameArea.context.font = "20px arial";
  GameArea.context.textAlign = "center";
  GameArea.context.fillText(`score:${GameArea.score}`, GameArea.width / 2, 40);

  obstacle.newPos(delta);
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
  GameArea.shouldStop = false;
}

startGame();
