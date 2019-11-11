import { GameArea } from "./GameArea";
import physics from "./physics";
import spotLightSource from "./images/spotlight.png";
const spotLight = new Image();
spotLight.src = spotLightSource;

export default class Obstacle {
  constructor(width, height, color, x) {
    this.height = height;
    this.width = width;
    this.color = "rgba(0,0,0,.3)";
    this.y = 350;
    this.x = x;
    this.speedX = 0;
    this.speedY = 0;
    this.crash = false;
  }
  update() {
    const ctx = GameArea.context;
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      spotLight,
      0,
      -50,
      500,
      500,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  newPos(delta) {
    this.speedY += 0.7; // gravity
    if (this.newSpot <= this.x) {
      this.speedX -= 4;
    } else if (this.newSpot >= this.x) {
      this.speedX += 4;
    } else {
      this.speedX = this.x;
    }

    this.x = this.speedX;
    this.y += this.speedY;
    //this.speedX *= 0.9; // friction
    this.speedY *= 0.9; // friction

    // if player is falling below floor line
    if (this.y > GameArea.floor - this.height / 1.5) {
      this.y = GameArea.floor - this.height / 1.5;
      this.speedY = 0;
    }
  }

  collision(obj) {
    const bottomOfMe = this.y + this.height,
      topOfMe = this.y,
      rightOfMe = this.x,
      leftOfMe = this.x + this.width;
    const bottomOfObj = obj.y + obj.height,
      topOfObj = obj.y,
      rightOfObj = obj.x,
      leftOfObj = obj.x + obj.width;

    if (
      leftOfMe > rightOfObj &&
      rightOfMe < leftOfObj &&
      topOfMe < bottomOfObj
    ) {
      this.crash = true;
    } else {
      this.crash = false;
    }

    return this.crash;
  }
}
