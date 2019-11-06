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
},{"./images/ballerinaSprites_right.png":[["ballerinaSprites_right.ee890085.png","images/ballerinaSprites_right.png"],"images/ballerinaSprites_right.png"],"./images/ballerinaSprites_left.png":[["ballerinaSprites_left.58c06726.png","images/ballerinaSprites_left.png"],"images/ballerinaSprites_left.png"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"game.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*document.addEventListener("keydown", function(event) {
  console.log(event.which);
})*/
var player = document.querySelector(".player");

var allObstacles = _toConsumableArray(document.querySelectorAll(".obstacle"));

var leftIsDown = false,
    rightIsDown = false;
var shouldFall = false,
    shouldJump = true;
var speed = 3;
var crash = false;
var stageWidth = innerWidth;

var didCrashAgainstWall = function didCrashAgainstWall(dir) {
  var _player$getBoundingCl = player.getBoundingClientRect(),
      x = _player$getBoundingCl.x,
      width = _player$getBoundingCl.width,
      bottom = _player$getBoundingCl.bottom,
      height = _player$getBoundingCl.height,
      y = _player$getBoundingCl.y;

  var pbot = bottom,
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
  var playerBounds = player.getBoundingClientRect();
  allObstacles.map(function (obs) {
    var bounds = obs.getBoundingClientRect();

    if (playerBounds.right == bounds.left || playerBounds.right <= bounds.left + bounds.width || playerBounds.right + playerBounds.width <= bounds.left + bounds.width || playerBounds.left == bounds.right || playerBounds.left <= bounds.right - 20) {
      ScorePoints();
    }
  });
} ////GO RIGHT


window.addEventListener("keydown", goRight);
window.addEventListener("keyup", stopGoRight); ///GO LEFT

window.addEventListener("keydown", goLeft);
window.addEventListener("keyup", stopGoLeft); ////JUMP

window.addEventListener("keydown", jump);
window.addEventListener("keydown", scorePositon); //GO RIGHT FN

function goRight(e) {
  if (e.code === "ArrowRight") {
    var _currentPos = parseInt(window.getComputedStyle(player).left);

    player.classList.add("walking_right");

    if (!rightIsDown) {
      rightIsDown = true;
      var req;

      var moveRight = function moveRight() {
        didCrashAgainstWall("right");

        if (!crash) {
          req = requestAnimationFrame(moveRight);
          player.style.left = _currentPos + speed + "px";
          _currentPos = _currentPos + speed;

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
} //STOP GO RIGHT FN


function stopGoRight(e) {
  if (rightIsDown && e.code === "ArrowRight") {
    player.classList.remove("walking_right");
    rightIsDown = false;
  }
} ///GO LEFT FN


function goLeft(e) {
  if (e.code === "ArrowLeft") {
    player.classList.add("walking_left");

    var _currentPos2 = parseInt(window.getComputedStyle(player).left);

    if (!leftIsDown) {
      leftIsDown = true;
      var req;

      var moveLeft = function moveLeft() {
        didCrashAgainstWall("left");

        if (!crash) {
          req = requestAnimationFrame(moveLeft);
          player.style.left = _currentPos2 - speed + "px";
          _currentPos2 = _currentPos2 - speed;

          if (!leftIsDown) {
            cancelAnimationFrame(req);
          }
        }
      };

      requestAnimationFrame(moveLeft);
    }
  }
} //STOP GO LEFT FN


function stopGoLeft(e) {
  if (leftIsDown && e.code === "ArrowLeft") {
    player.classList.remove("walking_left");
    leftIsDown = false;
  }
} ///JUMP FN


var currentPos = parseInt(window.getComputedStyle(player).top);
var startingPos = currentPos;

function jump(e) {
  var startJump;

  if (e.code === "ArrowUp" || e.keyCode === 32) {
    if (shouldJump) {
      shouldJump = false;
      var req;
      dontActivate = true;
      player.classList.add("jumping");

      if (!shouldFall) {
        startJump = setInterval(function () {
          if (shouldFall) {
            clearInterval(startJump);
          }

          var performJump = function performJump() {
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

            var performFall = function performFall() {
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
},{}],"main.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59490" + '/');

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