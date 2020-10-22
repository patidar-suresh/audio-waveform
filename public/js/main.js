/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 528:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html,body{width:100%;height:100%;padding:0;margin:0;font-size:0;line-height:0;font-family:sans-serif;background-color:#2d2d2d}.label{display:block;padding-bottom:.8em}.label.no-padding{padding-bottom:0}.slider{width:256px;padding:.5em 1em}.select{padding:.5em;width:100%}input:focus{outline:none}#overlay{background-color:rgba(0,0,0,.5);color:#fff;position:fixed;bottom:0;right:0;z-index:1000;font-size:14px;line-height:1em;padding:1em;pointer-events:none;opacity:0;box-shadow:0 0 10px 0 rgba(0,0,0,.5);transition:all .1s linear}button{background-color:#2d2d2d;color:#fff;font-size:14px;line-height:1em;padding:.5em 1em;outline:none;border:0;cursor:pointer}#openOverlay{background-color:rgba(0,0,0,.5);position:fixed;bottom:0;right:0;z-index:1000;font-size:14px;line-height:1em;opacity:0;padding:1em;pointer-events:none;box-shadow:0 0 10px 0 rgba(0,0,0,.5);outline:none;border:0;cursor:pointer;transition:all .1s linear}#openOverlay.visible{opacity:.2;pointer-events:all}.clear{overflow:none}.clear::after{content:\"\";clear:both;display:table}#overlay.visible{pointer-events:all;opacity:1}#closeOverlay{float:right}#audioPlayer{width:100%;height:54px;background:#f1f3f4;opacity:0;transition:all .1s;position:fixed;top:0;left:0}#audioPlayer:after{content:\" \";position:fixed;top:0;left:0;width:100%;height:100px;opacity:0}#waveformContainer{width:100%;position:relative}#audioPlayer.visible{opacity:1}#audioPlayer>div>audio{width:100%;float:left;background:#f1f3f4;box-shadow:0 0 10px 0 rgba(0,0,0,.5)}#audioPlayer>div>audio:focus{outline:none}#seekPosition{position:absolute;display:none;text-align:center;vertical-align:middle;left:0px;border-left:solid 2px #f08080}#audioPlayer canvas{width:100%;height:100px;float:left;background:#2d2d2d;border-bottom:1px solid #fff}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss
var main = __webpack_require__(528);
// CONCATENATED MODULE: ./src/scss/main.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(main/* default */.Z, options);



/* harmony default export */ const scss_main = (main/* default.locals */.Z.locals || {});
// CONCATENATED MODULE: ./src/index.js


//Define AnimationFrame variables
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const AUTOPLAY = false;

let VU_TYPE = 0;
let VU_BAR_GAP = true;
let VU_TYPES = [
    {
        id: 0,
        name: 'Standard',
        fn: (x, width, fbc_array) => {
            canvasCtx.fillStyle = `#f1f3f4`;

            for (let i = 0; i < fbc_array.length; i++) {
                let height = -(fbc_array[i] / 8) * vuModifier;

                canvasCtx.fillRect(x, canvas.height, width, height);
                x += width;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 1,
        name: 'Standard + Full Greyscale',
        fn: (x, width, fbc_array) => {
            for (let i = 0; i < fbc_array.length; i++) {
                let height = -(fbc_array[i] / 8) * vuModifier;

                canvasCtx.fillStyle = `rgba(255, 255, 255, ${fbc_array[i] / 200})`;
                canvasCtx.fillRect(x, canvas.height, width, -canvas.height);

                canvasCtx.fillStyle = `#f1f3f4`;
                canvasCtx.fillRect(x, canvas.height, width - VU_BAR_GAP, height);

                x += width + VU_BAR_GAP;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 2,
        name: 'Full Greyscale',
        fn: (x, width, fbc_array) => {
            for (let i = 0; i < fbc_array.length; i++) {
                canvasCtx.fillStyle = `rgba(255, 255, 255, ${fbc_array[i] / 200})`;

                canvasCtx.fillRect(x, canvas.height, width, -canvas.height);
                x += width;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 3,
        name: 'Full RGB',
        fn: (x, width) => {
            for (let i = 0; i < fbc_array.length; i++) {
                canvasCtx.fillStyle = `hsla(${180 - (fbc_array[i] / 1.5)}, 100%, 50%, 0.8)`;

                canvasCtx.fillRect(x, canvas.height, width, -canvas.height);
                x += width;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 4,
        name: 'Standard RGB',
        fn: (x, width, fbc_array) => {
            for (let i = 0; i < fbc_array.length; i++) {
                canvasCtx.fillStyle = `hsla(${180 - (fbc_array[i] / 1.5)}, 100%, 50%, 0.8)`;
                let height = -(fbc_array[i] / 8) * vuModifier;

                canvasCtx.fillRect(x, canvas.height, width, height);
                x += width;
                if (x > canvas.width)
                    break;
            }
        }
    },
    {
        id: 5,
        name: 'Inverted RGB + Full Greyscale',
        fn: (x, width, fbc_array) => {
            for (let i = 0; i < fbc_array.length; i++) {
                let height = -(fbc_array[i] / 8) * vuModifier;

                canvasCtx.fillStyle = `rgba(255, 255, 255, ${fbc_array[i] / 200})`;
                canvasCtx.fillRect(x, canvas.height, width, -canvas.height);

                canvasCtx.fillStyle = `hsla(${(fbc_array[i] / 1.5)}, 100%, 50%, 0.8)`;
                canvasCtx.fillRect(x, canvas.height, width, height);

                x += width;
                if (x > canvas.width)
                    break;
            }
        }
    },
]

//Generate menu for VU Types
let VUTypeContainer = document.getElementById('vu_types');

for (let type of VU_TYPES) {
    let radioEl = document.createElement('input');
    let radioElLabel = document.createElement('label');
    let radioId = `vu_type_${type.id}`
    radioElLabel.innerHTML = `&nbsp;${type.name.toString()}`;
    radioElLabel.htmlFor = radioId;
    radioEl.type = 'radio';
    radioEl.id = radioId;
    radioEl.checked = type.id == 0;
    radioEl.name = 'vu_type';
    radioEl.value = type.id.toString()
    VUTypeContainer.appendChild(radioEl);
    VUTypeContainer.appendChild(radioElLabel);
    VUTypeContainer.appendChild(document.createElement('br'));
}

const radios = document.getElementsByName('vu_type');
radios.forEach((radio) => {
    radio.oninput = (e) => {
        VU_TYPE = parseInt(e.target.value);
    }
})

const fileNames = [
    './audio/force.mp3',
    './audio/dont_worry.mp3',
    './audio/mama.mp3',
];

let fileName = fileNames[0];

let canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;

let seekPositionBar = document.getElementById("seekPosition");


//Create the instance of Audio element and set its properties
const audio = new Audio();
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let analyser, canvas, canvasCtx, animationRequestID, audioPositionTimer;

let playing = false;
window.addEventListener("keypress", (e) => {
    if (e.code === 'Space') {
        if (playing) {
            audio.pause();
            playing = false;
        } else {
            audio.play();
            playing = true;
        }
    }
})

let menuButton = document.getElementById('openOverlay');
let closeButton = document.getElementById('closeOverlay');
let overlay = document.getElementById('overlay');

menuButton.onmouseenter = () => openMenu();
overlay.onmouseleave = () => closeMenu();

const toggleMenu = () => {
    menuButton.classList.toggle('visible');
    overlay.classList.toggle('visible');
}
const openMenu = () => {
    menuButton.classList.remove('visible');
    overlay.classList.add('visible');
}
const closeMenu = () => {
    menuButton.classList.add('visible');
    overlay.classList.remove('visible');
}

let player = document.getElementById('audioPlayer');

player.onmouseenter = () => {
    player.classList.add('visible')
}
player.onmouseleave = () => {
    player.classList.remove('visible')
}

window.addEventListener("load", () => {
    //Append audio object to the player div so that it is visible on page.
    document.getElementById("player").appendChild(audio);

    //Create audio analyser.    
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = Math.pow(2, 10);

    //Create canvas context
    canvas = document.getElementById("analyzer");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasCtx = canvas.getContext('2d');

    window.onresize = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    //Connect source to analyzer and then to audio context destination
    let source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioCtx.destination);

}, false);

document.getElementById('VUSlider').oninput = (e) => {
    analyser.fftSize = Math.pow(2, e.target.value);
}

let vuModifier = 3;

document.getElementById('VUSlider2').oninput = (e) => {
    vuModifier = e.target.value;
}

document.getElementById('songSelector').onchange = (e) => {
    loadAudio(fileNames[parseInt(e.target.value)]);
}

//Attach callback for different audio events.
audio.onplay = function () {
    //Draw waveform
    drawAnalyzer();
};

audio.onpause = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID), 1000);
}

audio.onended = () => {
    //Cancel Animation after a delay of 1 second to let waveform go down smoothly
    setTimeout(() => cancelAnimationFrame(animationRequestID), 1000);
}

audio.ontimeupdate = () => {
    let percentage = audio.currentTime / audio.duration;
}


//Draw the waveform on canvas using the frequency data from audio source.
function drawAnalyzer() {
    //Request animation frame to call draw function multiple times in a second
    animationRequestID = requestAnimationFrame(() => drawAnalyzer());

    //Get frequency data from analyzer
    let fbc_array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(fbc_array);

    //Create Canvas with background color
    canvasCtx.fillStyle = '#2d2d2d';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw bars of the waveform
    let width = (canvas.width / fbc_array.length) * 2;
    let x = 0;

    VU_TYPES[VU_TYPE].fn(x, width, fbc_array);
}

//Load audio using AJAX
function loadAudio(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onreadystatechange = function (e) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //Since response is array buffer, Convert it to blob so that it can be set as audio src.
                let dataView = new DataView(req.response);
                let blob = new Blob([dataView], { type: "audio/mpeg" });
                audio.src = window.URL.createObjectURL(blob);

                //Decode audio data (arraybuffer) and display waveform
                audioCtx.decodeAudioData(req.response,
                    function (buffer) {
                        if (AUTOPLAY) {
                            audio.play();
                            playing = true;
                        }
                    }, () => { console.error('error in decoding'); });
            }
            else
                console.error('error during the load.Wrong url or cross origin issue');
        }
    };
    req.send();
}



//Call method to load audio data
loadAudio(fileName);
})();

/******/ })()
;