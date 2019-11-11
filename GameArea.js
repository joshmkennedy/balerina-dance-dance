import { loop, player, GAME_STATE } from "./game";
import imagesrc from "./images/testimg.png";
const image = new Image();
image.src = imagesrc;

const video = document.createElement("VIDEO");
video.setAttribute("width", 800);
video.setAttribute("height", 500);
navigator.mediaDevices.getUserMedia({ video: true }).then(media => {
  video.srcObject = media;
  video.play();
});

//document.body.appendChild(video);

export const GameArea = {
  canvas: document.querySelector("#canvas"),
  width: 800,
  height: 500,

  start: function() {
    this.shouldStop = false;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.floor = 300;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0; //
    this.lastTime = new Date().getTime;
    this.currentTime = 0;
    this.score = 0;
    this.startLoop = requestAnimationFrame(loop);

    window.addEventListener("keydown", function(e) {
      GameArea.keys = GameArea.keys || [];
      GameArea.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function(e) {
      player.isWalkRight = false;
      player.isWalkLeft = false;
      player.isDancing = false;
      GameArea.keys[e.keyCode] = false;
    });
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    this.shouldStop = true;
  },
  updateScore: function() {
    this.score += 1;
    console.log(this.score);
    if (this.score === 2) {
      this.stop();
      this.win();
    }
  },
  win: function() {
    player.isDancing = false;
    this.score = 0;
    this.countDown = 4;
    this.timer = setInterval(() => {
      if (this.countDown < 1) {
        clearInterval(this.timer);
        this.takePicture();
        return;
      }
      this.context.fillStyle = "hotpink";
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fillStyle = "white";
      this.context.font = " 30px arial";
      this.context.textAlign = "center";
      if (this.countDown >= 2) {
        this.context.fillText(
          "Wait and see who is the best balerina",
          this.width / 2,
          30
        );
      } else {
        this.context.fillText("SMILE", this.width / 2, 30);
      }
      this.context.font = "70px cursive";
      this.context.fillText(
        `${this.countDown}`,
        this.width / 2,
        this.height / 2
      );
      this.countDown -= 1;
    }, 1000);
    //this.takePicture();
  },
  menu: function() {
    const ctx = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    ctx.fillStyle = "rgba(0,0,0,.6)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px cursive";
    ctx.textAlign = "center";
    ctx.fillText("Play Game", this.width / 2, this.height / 3);

    ctx.font = "35px helvetica";
    ctx.fillText(
      "Spin in the spotlight to be the best Balerina",
      this.width / 2,
      this.height / 2
    );
    ctx.font = "18px helvetica";
    ctx.fillText(
      "move the balerina with arrow keys",
      this.width / 2,
      this.height / 2 + 45
    );
    ctx.fillText(
      "press space bar to spin her",
      this.width / 2,
      this.height / 2 + 75
    );
    ctx.font = "25px arial";
    ctx.fillText("click anywhere to start", this.width / 2, this.height - 80);
    window.addEventListener("click", () => this.startGame());
  },
  startGame: () => {
    console.log("donuts");
    window.removeEventListener("click", GameArea.startGame);
    GameArea.start();
    player.restart();
  },
  takePicture: function() {
    this.context.textAlign = "center";
    this.context.drawImage(video, 0, 0, 800, 675);
    this.context.fillStyle = "white";
    this.context.font = "50px cursive";
    this.context.fillText("Its You!", this.width / 2, this.height - 100);
    this.context.font = "25px helvetica";
    this.context.fillText(
      "Click anywhere to restart",
      this.width / 2,
      this.height - 50
    );
    window.addEventListener("click", this.startGame);
  },
};

//--//
