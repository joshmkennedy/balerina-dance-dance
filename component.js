import { GameArea } from "./GameArea";
import obstacles from "./game";
import image from "./images/ballerinaSprites_right.png";
import image2 from "./images/ballerinaSprites_left.png";
const img = new Image();
img.src = image;
const img2 = new Image();
img2.src = image2;
import player from "./game";
/////////     //     //
export default function playerComponent(
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
  this.isJumping = true;
  this.jumpPos = 0;
  this.isDancing = false;
  this.danceTime = 100;

  this.update = function() {
    const ctx = GameArea.context;
    //this adds the animations and draws the images based on if the key is pressed

    if (this.isWalkRight) {
      this.walkRight();
    } else if (this.isWalkLeft) {
      this.walkLeft();
    } else if (this.isJumping) {
      this.jump();
    } else if (this.isDancing) {
      this.dance();
    } else {
      this.standStill();
    }
  };
  this.newPos = function(delta) {
    this.speedY += 0.7; // gravity
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9; // friction
    this.speedY *= 0.9; // friction

    // if player is falling below floor line
    if (this.y > GameArea.floor - this.height) {
      this.isJumping = false;
      this.y = GameArea.floor - this.height;
      this.speedY = 0;
    }
  };
  this.walkRight = function() {
    const ctx = GameArea.context;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames[this.isJumping ? 1 : 0] - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    if (!this.isJumping) {
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
    } else {
      ctx.drawImage(
        img,
        this.frameIndex * (this.width + 1),
        this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  };
  this.walkLeft = function() {
    const ctx = GameArea.context;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames[this.isJumping ? 1 : 0] - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    if (!this.isJumping) {
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
    } else {
      ctx.drawImage(
        img,
        this.frameIndex * (this.width + 1),
        this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
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
      this.width - 5,
      this.height - 5
    );
  };
  this.jump = function() {
    const ctx = GameArea.context;

    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames[1] - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }

    ctx.drawImage(
      img,
      this.frameIndex * (this.width + 1),
      this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  this.dance = function() {
    const ctx = GameArea.context;
    if (this.danceTime >= 0) {
      this.danceTime -= 1;
    } else {
      this.danceTime = 100;
    }

    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames[1] - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }

    ctx.drawImage(
      img,
      this.frameIndex * (this.width + 1),
      this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
  this.restart = function() {
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
    this.isJumping = true;
    this.jumpPos = 0;
    this.isDancing = false;
    this.danceTime = 100;
  };
}
