// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./images/Stage.jpg":[["Stage.bee5bc65.jpg","images/Stage.jpg"],"images/Stage.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"images/testimg.png":[function(require,module,exports) {
module.exports = "/testimg.ba02fcaf.png";
},{}],"GameArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameArea = void 0;

var _game = require("./game");

var _testimg = _interopRequireDefault(require("./images/testimg.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = new Image();
image.src = _testimg.default;
var video = document.createElement("VIDEO");
video.setAttribute("width", 800);
video.setAttribute("height", 500);
navigator.mediaDevices.getUserMedia({
  video: true
}).then(function (media) {
  video.srcObject = media;
  video.play();
}); //document.body.appendChild(video);

var GameArea = {
  canvas: document.querySelector("#canvas"),
  width: 800,
  height: 500,
  start: function start() {
    this.shouldStop = false;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.floor = 300;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0; //

    this.lastTime = new Date().getTime;
    this.currentTime = 0;
    this.score = 0;
    this.startLoop = requestAnimationFrame(_game.loop);
    window.addEventListener("keydown", function (e) {
      GameArea.keys = GameArea.keys || [];
      GameArea.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
      _game.player.isWalkRight = false;
      _game.player.isWalkLeft = false;
      _game.player.isDancing = false;
      GameArea.keys[e.keyCode] = false;
    });
  },
  clear: function clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function stop() {
    this.shouldStop = true;
  },
  updateScore: function updateScore() {
    this.score += 1;
    console.log(this.score);

    if (this.score === 2) {
      this.stop();
      this.win();
    }
  },
  win: function win() {
    var _this = this;

    _game.player.isDancing = false;
    this.score = 0;
    this.countDown = 4;
    this.timer = setInterval(function () {
      if (_this.countDown < 1) {
        clearInterval(_this.timer);

        _this.takePicture();

        return;
      }

      _this.context.fillStyle = "hotpink";

      _this.context.fillRect(0, 0, _this.width, _this.height);

      _this.context.fillStyle = "white";
      _this.context.font = " 30px arial";
      _this.context.textAlign = "center";

      if (_this.countDown >= 2) {
        _this.context.fillText("Wait and see who is the best balerina", _this.width / 2, 30);
      } else {
        _this.context.fillText("SMILE", _this.width / 2, 30);
      }

      _this.context.font = "70px cursive";

      _this.context.fillText("".concat(_this.countDown), _this.width / 2, _this.height / 2);

      _this.countDown -= 1;
    }, 1000); //this.takePicture();
  },
  menu: function menu() {
    var _this2 = this;

    var ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    ctx.fillStyle = "rgba(0,0,0,.6)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px cursive";
    ctx.textAlign = "center";
    ctx.fillText("Play Game", this.width / 2, this.height / 3);
    ctx.font = "35px helvetica";
    ctx.fillText("Spin in the spotlight to be the best Balerina", this.width / 2, this.height / 2);
    ctx.font = "18px helvetica";
    ctx.fillText("move the balerina with arrow keys", this.width / 2, this.height / 2 + 45);
    ctx.fillText("press space bar to spin her", this.width / 2, this.height / 2 + 75);
    ctx.font = "25px arial";
    ctx.fillText("click anywhere to start", this.width / 2, this.height - 80);
    window.addEventListener("click", function () {
      return _this2.startGame();
    });
  },
  startGame: function startGame() {
    console.log("donuts");
    window.removeEventListener("click", GameArea.startGame);
    GameArea.start();

    _game.player.restart();
  },
  takePicture: function takePicture() {
    this.context.textAlign = "center";
    this.context.drawImage(video, 0, 0, 800, 675);
    this.context.fillStyle = "white";
    this.context.font = "50px cursive";
    this.context.fillText("Its You!", this.width / 2, this.height - 100);
    this.context.font = "25px helvetica";
    this.context.fillText("Click anywhere to restart", this.width / 2, this.height - 50);
    window.addEventListener("click", this.startGame);
  }
}; //--//

exports.GameArea = GameArea;
},{"./game":"game.js","./images/testimg.png":"images/testimg.png"}],"images/ballerinaSprites_right.png":[function(require,module,exports) {
module.exports = "/ballerinaSprites_right.ee890085.png";
},{}],"images/ballerinaSprites_left.png":[function(require,module,exports) {
module.exports = "/ballerinaSprites_left.58c06726.png";
},{}],"component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = playerComponent;

var _GameArea = require("./GameArea");

var _game = _interopRequireDefault(require("./game"));

var _ballerinaSprites_right = _interopRequireDefault(require("./images/ballerinaSprites_right.png"));

var _ballerinaSprites_left = _interopRequireDefault(require("./images/ballerinaSprites_left.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = new Image();
img.src = _ballerinaSprites_right.default;
var img2 = new Image();
img2.src = _ballerinaSprites_left.default;

/////////     //     //
function playerComponent(width, height, color, x, y, ticksPerFrame, numberOfFrames) {
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

  this.update = function () {
    var ctx = _GameArea.GameArea.context; //this adds the animations and draws the images based on if the key is pressed

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

  this.newPos = function (delta) {
    this.speedY += 0.7; // gravity

    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9; // friction

    this.speedY *= 0.9; // friction
    // if player is falling below floor line

    if (this.y > _GameArea.GameArea.floor - this.height) {
      this.isJumping = false;
      this.y = _GameArea.GameArea.floor - this.height;
      this.speedY = 0;
    }
  };

  this.walkRight = function () {
    var ctx = _GameArea.GameArea.context;
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
      ctx.drawImage(img, this.frameIndex * (this.width + 1), 0, this.width, this.height, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(img, this.frameIndex * (this.width + 1), this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  };

  this.walkLeft = function () {
    var ctx = _GameArea.GameArea.context;
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
      ctx.drawImage(img2, 969 - this.frameIndex * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(img, this.frameIndex * (this.width + 1), this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  };

  this.standStill = function () {
    var ctx = _GameArea.GameArea.context;
    ctx.drawImage(img, 4, this.height * 2.1, this.width, this.height, this.x, this.y, this.width - 5, this.height - 5);
  };

  this.jump = function () {
    var ctx = _GameArea.GameArea.context;
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames[1] - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }

    ctx.drawImage(img, this.frameIndex * (this.width + 1), this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  };

  this.dance = function () {
    var ctx = _GameArea.GameArea.context;

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

    ctx.drawImage(img, this.frameIndex * (this.width + 1), this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  };

  this.restart = function () {
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
},{"./GameArea":"GameArea.js","./game":"game.js","./images/ballerinaSprites_right.png":"images/ballerinaSprites_right.png","./images/ballerinaSprites_left.png":"images/ballerinaSprites_left.png"}],"physics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = physics;

var _GameArea = require("./GameArea");

function physics(speedX, speedY, x, y) {
  speedY += 0.7; // gravity

  x += speedX;
  y += speedY;
  speedX *= 0.9; // friction

  speedY *= 0.9; // friction

  return {
    speedX: speedX,
    speedY: speedY,
    x: x,
    y: y
  };
}
},{"./GameArea":"GameArea.js"}],"images/spotlight.png":[function(require,module,exports) {
module.exports = "/spotlight.beb6c793.png";
},{}],"obstacle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameArea = require("./GameArea");

var _physics = _interopRequireDefault(require("./physics"));

var _spotlight = _interopRequireDefault(require("./images/spotlight.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var spotLight = new Image();
spotLight.src = _spotlight.default;

var Obstacle =
/*#__PURE__*/
function () {
  function Obstacle(width, height, color, x) {
    _classCallCheck(this, Obstacle);

    this.height = height;
    this.width = width;
    this.color = "rgba(0,0,0,.3)";
    this.y = 350;
    this.x = x;
    this.speedX = 0;
    this.speedY = 0;
    this.crash = false;
  }

  _createClass(Obstacle, [{
    key: "update",
    value: function update() {
      var ctx = _GameArea.GameArea.context;
      ctx.fillStyle = this.color; // ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.drawImage(spotLight, 0, -50, 500, 500, this.x, this.y, this.width, this.height);
    }
  }, {
    key: "newPos",
    value: function newPos(delta) {
      this.speedY += 0.7; // gravity

      if (this.newSpot <= this.x) {
        this.speedX -= 4;
      } else if (this.newSpot >= this.x) {
        this.speedX += 4;
      } else {
        this.speedX = this.x;
      }

      this.x = this.speedX;
      this.y += this.speedY; //this.speedX *= 0.9; // friction

      this.speedY *= 0.9; // friction
      // if player is falling below floor line

      if (this.y > _GameArea.GameArea.floor - this.height / 1.5) {
        this.y = _GameArea.GameArea.floor - this.height / 1.5;
        this.speedY = 0;
      }
    }
  }, {
    key: "collision",
    value: function collision(obj) {
      var bottomOfMe = this.y + this.height,
          topOfMe = this.y,
          rightOfMe = this.x,
          leftOfMe = this.x + this.width;
      var bottomOfObj = obj.y + obj.height,
          topOfObj = obj.y,
          rightOfObj = obj.x,
          leftOfObj = obj.x + obj.width;

      if (leftOfMe > rightOfObj && rightOfMe < leftOfObj && topOfMe < bottomOfObj) {
        this.crash = true;
      } else {
        this.crash = false;
      }

      return this.crash;
    }
  }]);

  return Obstacle;
}();

exports.default = Obstacle;
},{"./GameArea":"GameArea.js","./physics":"physics.js","./images/spotlight.png":"images/spotlight.png"}],"game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = loop;
exports.player = void 0;

var _component = _interopRequireDefault(require("./component"));

var _GameArea = require("./GameArea");

var _obstacle = _interopRequireDefault(require("./obstacle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// starts the game
function startGame() {
  _GameArea.GameArea.menu();
} // creation of our ballerina


var player = new _component.default(53, 73, "red", 100, 100, 4, [8, 18]);
exports.player = player;
var obstacle = new _obstacle.default(150, 100, "black", 400);
_GameArea.GameArea.GAME_STATE = "GAME_START";
console.log("object"); // Causes all Changes in the Game
// put all events in between clear and update

function gameLoop(delta) {
  _GameArea.GameArea.clear();

  if (_GameArea.GameArea.keys && _GameArea.GameArea.keys[37] && player.x > 0 + player.width / 2) {
    player.isWalkLeft = true;
    player.speedX -= 0.5;
  }

  if (_GameArea.GameArea.keys && _GameArea.GameArea.keys[39] && player.x < _GameArea.GameArea.canvas.width - player.width * 1.5) {
    player.isWalkRight = true;
    player.speedX += 0.5;
  }

  if (_GameArea.GameArea.keys && _GameArea.GameArea.keys[38] && player.isJumping == false) {
    player.speedY -= 25;
    player.isJumping = true;
  }

  if (_GameArea.GameArea.keys && _GameArea.GameArea.keys[32]) {
    player.isDancing = true;
  }

  player.update();
  obstacle.update();
  player.newPos(delta);

  if (obstacle.collision(player) && player.isDancing && player.danceTime == 0) {
    obstacle.newSpot = Math.floor(Math.random() * 600);

    _GameArea.GameArea.updateScore();
  }

  _GameArea.GameArea.context.fillStyle = "black";
  _GameArea.GameArea.context.font = "20px arial";
  _GameArea.GameArea.context.textAlign = "center";

  _GameArea.GameArea.context.fillText("score:".concat(_GameArea.GameArea.score), _GameArea.GameArea.width / 2, 40);

  obstacle.newPos(delta);
}
/* 
 this is Called by GameArea to update the game
 it calls the game loop function which causes the Changes in the canvas
*/


function loop() {
  var req = requestAnimationFrame(loop);
  _GameArea.GameArea.currentTime = new Date().getTime();
  var delta = (_GameArea.GameArea.currentTime - _GameArea.GameArea.lastTime) / 1000;
  gameLoop(delta);
  _GameArea.GameArea.lastTime = _GameArea.GameArea.currentTime;

  if (_GameArea.GameArea.shouldStop) {
    cancelAnimationFrame(req);
  }

  _GameArea.GameArea.shouldStop = false;
}

startGame();
},{"./component":"component.js","./GameArea":"GameArea.js","./obstacle":"obstacle.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./main.scss");

require("./game");
},{"./main.scss":"main.scss","./game":"game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53711" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map