import { GameArea } from "./GameArea";
import image from "./images/ballerinaSprites_right.png";
import image2 from "./images/ballerinaSprites_left.png";
const img = new Image();
img.src = image;
const img2 = new Image();
img2.src = image2;

//
export default function component(
  width,
  height,
  color,
  x,
  y,
  ticksPerFrame,
  numberOfFrames
) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = ticksPerFrame || 0;
  this.numberOfFrames = numberOfFrames || 1;
  this.isWalkRight = false;
  this.update = function() {
    const ctx = GameArea.context;
    if (this.isWalkRight) {
      this.walkRight();
    } else if (this.isWalkLeft) {
      this.walkLeft();
    } else {
      this.standStill();
    }
  };
  this.newPos = function(delta) {
    this.x = this.speedX;
    this.y = this.speedY;
  };
  this.walkRight = function() {
    const ctx = GameArea.context;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    ctx.drawImage(
      img,
      this.frameIndex * (this.width + 1),
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
  this.walkLeft = function() {
    const ctx = GameArea.context;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    ctx.drawImage(
      img2,
      969 - this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
  this.standStill = function() {
    const ctx = GameArea.context;
    ctx.drawImage(
      img,
      4,
      this.height * 2.1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
}
