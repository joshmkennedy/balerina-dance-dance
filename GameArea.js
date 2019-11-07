import { loop, player } from "./game";

console.log(typeof loop);
export const GameArea = {
  canvas: document.querySelector("#canvas"),
  start: function() {
    this.shouldStop = false;
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    this.lastTime = new Date().getTime;
    this.currentTime = 0;
    this.startLoop = requestAnimationFrame(loop);
    window.addEventListener("keydown", function(e) {
      GameArea.keys = GameArea.keys || [];
      GameArea.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function(e) {
      player.isWalkRight = false;
      player.isWalkLeft = false;
      GameArea.keys[e.keyCode] = false;
    });
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    this.shouldStop = true;
  },
};
//--//
