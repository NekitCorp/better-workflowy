/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content_script.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hotkeys-js/dist/hotkeys.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/hotkeys-js/dist/hotkeys.esm.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * hotkeys-js v3.8.1
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */

var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event);
    });
  }
} // 修饰键转换成对应的键码


function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);

  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }

  return mods;
} // 处理传的key字符串转换成数组


function getKeys(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

  var keys = key.split(','); // 同时设置多个快捷键，以','分割

  var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
} // 比较修饰键的数组


function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }

  return isIndex;
}

var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
}; // Modifier Keys

var _modifier = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {}; // F1~F12 special key

for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}

var _downKeys = []; // 记录摁下的绑定键

var _scope = 'all'; // 默认热键范围

var elementHasBindEvent = []; // 已绑定事件的节点记录
// 返回键码

var code = function code(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}; // 设置获取当前范围（默认为'所有'）


function setScope(scope) {
  _scope = scope || 'all';
} // 获取当前范围


function getScope() {
  return _scope || 'all';
} // 获取摁下绑定键的键值


function getPressedKeyCodes() {
  return _downKeys.slice(0);
} // 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true


function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }

  return flag;
} // 判断摁下的键是否为某个键，返回true或者false


function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }

  return _downKeys.indexOf(keyCode) !== -1;
} // 循环删除handlers中的所有 scope(范围)


function deleteScope(scope, newScope) {
  var handlers;
  var i; // 没有指定scope，获取scope

  if (!scope) scope = getScope();

  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  } // 如果scope被删除，将scope重置为all


  if (getScope() === scope) setScope(newScope || 'all');
} // 清除修饰键


function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;

  var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


  if (i >= 0) {
    _downKeys.splice(i, 1);
  } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys.splice(0, _downKeys.length);
  } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


  if (key === 93 || key === 224) key = 91;

  if (key in _mods) {
    _mods[key] = false; // 将修饰键重置为false

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = false;
    }
  }
}

function unbind(keysInfo) {
  // unbind(), unbind all keys
  if (!keysInfo) {
    Object.keys(_handlers).forEach(function (key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // support old method
    // eslint-disable-line
    var scope = args[0],
        method = args[1];

    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }

    eachUnbind({
      key: keysInfo,
      scope: scope,
      method: method,
      splitKey: '+'
    });
  }
} // 解除绑定某个范围的快捷键


var eachUnbind = function eachUnbind(_ref) {
  var key = _ref.key,
      scope = _ref.scope,
      method = _ref.method,
      _ref$splitKey = _ref.splitKey,
      splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === '*' ? '*' : code(lastKey);
    if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

    if (!scope) scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].map(function (record) {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      var isMatchingMethod = method ? record.method === method : true;

      if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
        return {};
      }

      return record;
    });
  });
}; // 对监听对应快捷键的回调函数进行处理


function eventHandler(event, handler, scope) {
  var modifiersMatch; // 看它是否在当前范围

  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    } // 调用处理程序，如果是修饰键不做处理


    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
} // 处理keydown事件


function dispatch(event) {
  var asterisk = _handlers['*'];
  var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

  if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样

  if (key === 93 || key === 224) key = 91;
  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */

  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */

  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
    var keyNum = modifierMap[keyName];

    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods) {
    _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }

    if (!asterisk) return;
  } // 将 modifierMap 里面的修饰键绑定到 event 中


  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */


  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }

    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }

    _mods[17] = true;
    _mods[18] = true;
  } // 获取范围 默认为 `all`


  var scope = getScope(); // 对任何快捷键都需要做的处理

  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope);
      }
    }
  } // key 不在 _handlers 中返回


  if (!(key in _handlers)) return;

  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = []; // 记录当前按键键值

        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }

        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
          // 找到处理内容
          eventHandler(event, record, scope);
        }
      }
    }
  }
} // 判断 element 是否已经绑定事件


function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}

function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key); // 需要处理的快捷键列表

  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效

  var element = document; // 快捷键事件绑定节点

  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = '+'; // 对为设定范围的判断

  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line

    if (option.element) element = option.element; // eslint-disable-line

    if (option.keyup) keyup = option.keyup; // eslint-disable-line

    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表

    mods = []; // 如果是组合快捷键取得组合快捷键

    if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
    // 判断key是否在_handlers中，不在就赋一个空数组

    if (!(key in _handlers)) _handlers[key] = [];

    _handlers[key].push({
      keyup: keyup,
      keydown: keydown,
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i],
      splitKey: splitKey
    });
  } // 在全局document上设置快捷键


  if (typeof element !== 'undefined' && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, 'keydown', function (e) {
      dispatch(e);
    });
    addEvent(window, 'focus', function () {
      _downKeys = [];
    });
    addEvent(element, 'keyup', function (e) {
      dispatch(e);
      clearModifier(e);
    });
  }
}

var _api = {
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  unbind: unbind
};

for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys = window.hotkeys;

  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }

    return hotkeys;
  };

  window.hotkeys = hotkeys;
}

/* harmony default export */ __webpack_exports__["default"] = (hotkeys);


/***/ }),

/***/ "./src/content_script.ts":
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hotkeys_js_1 = __webpack_require__(/*! hotkeys-js */ "./node_modules/hotkeys-js/dist/hotkeys.esm.js");
const time_1 = __webpack_require__(/*! ./utils/time */ "./src/utils/time.ts");
// By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
hotkeys_js_1.default.filter = function (event) {
    return true;
};
chrome.storage.sync.get({
    hotkeys: [],
    calcTotalTime: true,
}, function ({ hotkeys, calcTotalTime }) {
    // Start calculate total time
    if (calcTotalTime) {
        time_1.highlight();
        time_1.renderTotalTime();
        time_1.createObserver();
    }
    // Start hotkeys
    for (const hotkey of hotkeys) {
        hotkeys_js_1.default(`${hotkey.specialKey}+${hotkey.key}`, function (event, handler) {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();
            if (hotkey.hash) {
                location.hash =
                    "?q=" + hotkey.hash.split(" ").reduce((acc, val) => `${acc}#${val} `, "");
            }
            else {
                location.hash = "";
            }
        });
    }
});


/***/ }),

/***/ "./src/utils/time.ts":
/*!***************************!*\
  !*** ./src/utils/time.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight = exports.renderTotalTime = exports.getTagSeconds = exports.createObserver = void 0;
const HIGHLIGHT_COLOR = "#13cbd3";
const COUNTER_ID = "cte-counter";
/**
 * Observe to change tags
 */
function createObserver() {
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.classList &&
                    addedNode.classList.contains("innerContentContainer")) {
                    const contentTag = addedNode.querySelector(".contentTagText");
                    if (contentTag) {
                        highlight();
                        renderTotalTime();
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
exports.createObserver = createObserver;
/**
 * Parse and calculate total seconds from tag string
 * @example "#2h20m" -> 8400
 */
function getTagSeconds(str) {
    // Test to fit string
    const regExp = /^#(\d+(d|h|m|s))+$/;
    if (!regExp.test(str)) {
        return 0;
    }
    let totalSeconds = 0;
    const days = str.match(/(\d+)\s*d/);
    const hours = str.match(/(\d+)\s*h/);
    const minutes = str.match(/(\d+)\s*m/);
    const seconds = str.match(/(\d+)\s*s/);
    if (days) {
        totalSeconds += parseInt(days[1]) * 86400;
    }
    if (hours) {
        totalSeconds += parseInt(hours[1]) * 3600;
    }
    if (minutes) {
        totalSeconds += parseInt(minutes[1]) * 60;
    }
    if (seconds) {
        totalSeconds += parseInt(seconds[1]);
    }
    return totalSeconds;
}
exports.getTagSeconds = getTagSeconds;
/**
 * Render total recognized time in header
 */
function renderTotalTime() {
    // Try find header
    const header = document.querySelector(".header");
    if (!header) {
        return;
    }
    // Calculate total time
    const tags = [...document.querySelectorAll(".contentTag")].map((el) => el.innerText);
    let totalSeconds = tags.reduce((acc, val) => acc + getTagSeconds(val), 0);
    const days = Math.floor(totalSeconds / 86400);
    if (days > 0) {
        totalSeconds -= days * 86400;
    }
    const hours = Math.floor(totalSeconds / 3600);
    if (hours > 0) {
        totalSeconds -= hours * 3600;
    }
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes > 0) {
        totalSeconds -= minutes * 60;
    }
    const seconds = totalSeconds;
    const totalHtml = (days > 0 ? days + "d " : "") +
        (hours > 0 ? hours + "h " : "") +
        (minutes > 0 ? minutes + "m " : "") +
        (seconds > 0 ? seconds + "s" : "");
    // Try find already added counter
    const counter = document.getElementById(COUNTER_ID);
    if (counter) {
        counter.innerHTML = totalHtml;
    }
    else {
        const div = document.createElement("div");
        div.innerHTML = totalHtml;
        div.id = COUNTER_ID;
        div.style.fontSize = 13 + "px";
        const breadcrumbs = header.querySelector(".breadcrumbs");
        header.insertBefore(div, breadcrumbs.nextSibling);
    }
}
exports.renderTotalTime = renderTotalTime;
/**
 * Highlight recognized tags
 */
function highlight() {
    const tags = document.querySelectorAll(".contentTag");
    for (const tag of tags) {
        if (getTagSeconds(tag.innerText) > 0) {
            tag.style.outline = `1px dashed ${HIGHLIGHT_COLOR}`;
        }
    }
}
exports.highlight = highlight;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvdGtleXMtanMvZGlzdC9ob3RrZXlzLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrR0FBK0c7O0FBRS9HO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Es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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvbnRlbnRfc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udGVudF9zY3JpcHQudHNcIik7XG4iLCIvKiFcbiAqIGhvdGtleXMtanMgdjMuOC4xXG4gKiBBIHNpbXBsZSBtaWNyby1saWJyYXJ5IGZvciBkZWZpbmluZyBhbmQgZGlzcGF0Y2hpbmcga2V5Ym9hcmQgc2hvcnRjdXRzLiBJdCBoYXMgbm8gZGVwZW5kZW5jaWVzLlxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAga2Vubnkgd29uZyA8d293b2hvb0BxcS5jb20+XG4gKiBodHRwOi8vamF5d2NqbG92ZS5naXRodWIuaW8vaG90a2V5c1xuICogXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxudmFyIGlzZmYgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyA/IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAwIDogZmFsc2U7IC8vIOe7keWumuS6i+S7tlxuXG5mdW5jdGlvbiBhZGRFdmVudChvYmplY3QsIGV2ZW50LCBtZXRob2QpIHtcbiAgaWYgKG9iamVjdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG1ldGhvZCwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKG9iamVjdC5hdHRhY2hFdmVudCkge1xuICAgIG9iamVjdC5hdHRhY2hFdmVudChcIm9uXCIuY29uY2F0KGV2ZW50KSwgZnVuY3Rpb24gKCkge1xuICAgICAgbWV0aG9kKHdpbmRvdy5ldmVudCk7XG4gICAgfSk7XG4gIH1cbn0gLy8g5L+u6aWw6ZSu6L2s5o2i5oiQ5a+55bqU55qE6ZSu56CBXG5cblxuZnVuY3Rpb24gZ2V0TW9kcyhtb2RpZmllciwga2V5KSB7XG4gIHZhciBtb2RzID0ga2V5LnNsaWNlKDAsIGtleS5sZW5ndGggLSAxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZHMubGVuZ3RoOyBpKyspIHtcbiAgICBtb2RzW2ldID0gbW9kaWZpZXJbbW9kc1tpXS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIHJldHVybiBtb2RzO1xufSAvLyDlpITnkIbkvKDnmoRrZXnlrZfnrKbkuLLovazmjaLmiJDmlbDnu4RcblxuXG5mdW5jdGlvbiBnZXRLZXlzKGtleSkge1xuICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIGtleSA9ICcnO1xuICBrZXkgPSBrZXkucmVwbGFjZSgvXFxzL2csICcnKTsgLy8g5Yy56YWN5Lu75L2V56m655m95a2X56ymLOWMheaLrOepuuagvOOAgeWItuihqOespuOAgeaNoumhteespuetieetiVxuXG4gIHZhciBrZXlzID0ga2V5LnNwbGl0KCcsJyk7IC8vIOWQjOaXtuiuvue9ruWkmuS4quW/q+aNt+mUru+8jOS7pScsJ+WIhuWJslxuXG4gIHZhciBpbmRleCA9IGtleXMubGFzdEluZGV4T2YoJycpOyAvLyDlv6vmjbfplK7lj6/og73ljIXlkKsnLCfvvIzpnIDnibnmrorlpITnkIZcblxuICBmb3IgKDsgaW5kZXggPj0gMDspIHtcbiAgICBrZXlzW2luZGV4IC0gMV0gKz0gJywnO1xuICAgIGtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBpbmRleCA9IGtleXMubGFzdEluZGV4T2YoJycpO1xuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59IC8vIOavlOi+g+S/rumlsOmUrueahOaVsOe7hFxuXG5cbmZ1bmN0aW9uIGNvbXBhcmVBcnJheShhMSwgYTIpIHtcbiAgdmFyIGFycjEgPSBhMS5sZW5ndGggPj0gYTIubGVuZ3RoID8gYTEgOiBhMjtcbiAgdmFyIGFycjIgPSBhMS5sZW5ndGggPj0gYTIubGVuZ3RoID8gYTIgOiBhMTtcbiAgdmFyIGlzSW5kZXggPSB0cnVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyMS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnIyLmluZGV4T2YoYXJyMVtpXSkgPT09IC0xKSBpc0luZGV4ID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNJbmRleDtcbn1cblxudmFyIF9rZXlNYXAgPSB7XG4gIGJhY2tzcGFjZTogOCxcbiAgdGFiOiA5LFxuICBjbGVhcjogMTIsXG4gIGVudGVyOiAxMyxcbiAgcmV0dXJuOiAxMyxcbiAgZXNjOiAyNyxcbiAgZXNjYXBlOiAyNyxcbiAgc3BhY2U6IDMyLFxuICBsZWZ0OiAzNyxcbiAgdXA6IDM4LFxuICByaWdodDogMzksXG4gIGRvd246IDQwLFxuICBkZWw6IDQ2LFxuICBkZWxldGU6IDQ2LFxuICBpbnM6IDQ1LFxuICBpbnNlcnQ6IDQ1LFxuICBob21lOiAzNixcbiAgZW5kOiAzNSxcbiAgcGFnZXVwOiAzMyxcbiAgcGFnZWRvd246IDM0LFxuICBjYXBzbG9jazogMjAsXG4gICfih6onOiAyMCxcbiAgJywnOiAxODgsXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICctJzogaXNmZiA/IDE3MyA6IDE4OSxcbiAgJz0nOiBpc2ZmID8gNjEgOiAxODcsXG4gICc7JzogaXNmZiA/IDU5IDogMTg2LFxuICAnXFwnJzogMjIyLFxuICAnWyc6IDIxOSxcbiAgJ10nOiAyMjEsXG4gICdcXFxcJzogMjIwXG59OyAvLyBNb2RpZmllciBLZXlzXG5cbnZhciBfbW9kaWZpZXIgPSB7XG4gIC8vIHNoaWZ0S2V5XG4gICfih6cnOiAxNixcbiAgc2hpZnQ6IDE2LFxuICAvLyBhbHRLZXlcbiAgJ+KMpSc6IDE4LFxuICBhbHQ6IDE4LFxuICBvcHRpb246IDE4LFxuICAvLyBjdHJsS2V5XG4gICfijIMnOiAxNyxcbiAgY3RybDogMTcsXG4gIGNvbnRyb2w6IDE3LFxuICAvLyBtZXRhS2V5XG4gICfijJgnOiA5MSxcbiAgY21kOiA5MSxcbiAgY29tbWFuZDogOTFcbn07XG52YXIgbW9kaWZpZXJNYXAgPSB7XG4gIDE2OiAnc2hpZnRLZXknLFxuICAxODogJ2FsdEtleScsXG4gIDE3OiAnY3RybEtleScsXG4gIDkxOiAnbWV0YUtleScsXG4gIHNoaWZ0S2V5OiAxNixcbiAgY3RybEtleTogMTcsXG4gIGFsdEtleTogMTgsXG4gIG1ldGFLZXk6IDkxXG59O1xudmFyIF9tb2RzID0ge1xuICAxNjogZmFsc2UsXG4gIDE4OiBmYWxzZSxcbiAgMTc6IGZhbHNlLFxuICA5MTogZmFsc2Vcbn07XG52YXIgX2hhbmRsZXJzID0ge307IC8vIEYxfkYxMiBzcGVjaWFsIGtleVxuXG5mb3IgKHZhciBrID0gMTsgayA8IDIwOyBrKyspIHtcbiAgX2tleU1hcFtcImZcIi5jb25jYXQoayldID0gMTExICsgaztcbn1cblxudmFyIF9kb3duS2V5cyA9IFtdOyAvLyDorrDlvZXmkYHkuIvnmoTnu5HlrprplK5cblxudmFyIF9zY29wZSA9ICdhbGwnOyAvLyDpu5jorqTng63plK7ojIPlm7RcblxudmFyIGVsZW1lbnRIYXNCaW5kRXZlbnQgPSBbXTsgLy8g5bey57uR5a6a5LqL5Lu255qE6IqC54K56K6w5b2VXG4vLyDov5Tlm57plK7noIFcblxudmFyIGNvZGUgPSBmdW5jdGlvbiBjb2RlKHgpIHtcbiAgcmV0dXJuIF9rZXlNYXBbeC50b0xvd2VyQ2FzZSgpXSB8fCBfbW9kaWZpZXJbeC50b0xvd2VyQ2FzZSgpXSB8fCB4LnRvVXBwZXJDYXNlKCkuY2hhckNvZGVBdCgwKTtcbn07IC8vIOiuvue9ruiOt+WPluW9k+WJjeiMg+WbtO+8iOm7mOiupOS4uifmiYDmnIkn77yJXG5cblxuZnVuY3Rpb24gc2V0U2NvcGUoc2NvcGUpIHtcbiAgX3Njb3BlID0gc2NvcGUgfHwgJ2FsbCc7XG59IC8vIOiOt+WPluW9k+WJjeiMg+WbtFxuXG5cbmZ1bmN0aW9uIGdldFNjb3BlKCkge1xuICByZXR1cm4gX3Njb3BlIHx8ICdhbGwnO1xufSAvLyDojrflj5bmkYHkuIvnu5HlrprplK7nmoTplK7lgLxcblxuXG5mdW5jdGlvbiBnZXRQcmVzc2VkS2V5Q29kZXMoKSB7XG4gIHJldHVybiBfZG93bktleXMuc2xpY2UoMCk7XG59IC8vIOihqOWNleaOp+S7tuaOp+S7tuWIpOaWrSDov5Tlm54gQm9vbGVhblxuLy8gaG90a2V5IGlzIGVmZmVjdGl2ZSBvbmx5IHdoZW4gZmlsdGVyIHJldHVybiB0cnVlXG5cblxuZnVuY3Rpb24gZmlsdGVyKGV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgdmFyIHRhZ05hbWUgPSB0YXJnZXQudGFnTmFtZTtcbiAgdmFyIGZsYWcgPSB0cnVlOyAvLyBpZ25vcmU6IGlzQ29udGVudEVkaXRhYmxlID09PSAndHJ1ZScsIDxpbnB1dD4gYW5kIDx0ZXh0YXJlYT4gd2hlbiByZWFkT25seSBzdGF0ZSBpcyBmYWxzZSwgPHNlbGVjdD5cblxuICBpZiAodGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlIHx8ICh0YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhZ05hbWUgPT09ICdURVhUQVJFQScgfHwgdGFnTmFtZSA9PT0gJ1NFTEVDVCcpICYmICF0YXJnZXQucmVhZE9ubHkpIHtcbiAgICBmbGFnID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZmxhZztcbn0gLy8g5Yik5pat5pGB5LiL55qE6ZSu5piv5ZCm5Li65p+Q5Liq6ZSu77yM6L+U5ZuedHJ1ZeaIluiAhWZhbHNlXG5cblxuZnVuY3Rpb24gaXNQcmVzc2VkKGtleUNvZGUpIHtcbiAgaWYgKHR5cGVvZiBrZXlDb2RlID09PSAnc3RyaW5nJykge1xuICAgIGtleUNvZGUgPSBjb2RlKGtleUNvZGUpOyAvLyDovazmjaLmiJDplK7noIFcbiAgfVxuXG4gIHJldHVybiBfZG93bktleXMuaW5kZXhPZihrZXlDb2RlKSAhPT0gLTE7XG59IC8vIOW+queOr+WIoOmZpGhhbmRsZXJz5Lit55qE5omA5pyJIHNjb3BlKOiMg+WbtClcblxuXG5mdW5jdGlvbiBkZWxldGVTY29wZShzY29wZSwgbmV3U2NvcGUpIHtcbiAgdmFyIGhhbmRsZXJzO1xuICB2YXIgaTsgLy8g5rKh5pyJ5oyH5a6ac2NvcGXvvIzojrflj5ZzY29wZVxuXG4gIGlmICghc2NvcGUpIHNjb3BlID0gZ2V0U2NvcGUoKTtcblxuICBmb3IgKHZhciBrZXkgaW4gX2hhbmRsZXJzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfaGFuZGxlcnMsIGtleSkpIHtcbiAgICAgIGhhbmRsZXJzID0gX2hhbmRsZXJzW2tleV07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7KSB7XG4gICAgICAgIGlmIChoYW5kbGVyc1tpXS5zY29wZSA9PT0gc2NvcGUpIGhhbmRsZXJzLnNwbGljZShpLCAxKTtlbHNlIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8g5aaC5p6cc2NvcGXooqvliKDpmaTvvIzlsIZzY29wZemHjee9ruS4umFsbFxuXG5cbiAgaWYgKGdldFNjb3BlKCkgPT09IHNjb3BlKSBzZXRTY29wZShuZXdTY29wZSB8fCAnYWxsJyk7XG59IC8vIOa4hemZpOS/rumlsOmUrlxuXG5cbmZ1bmN0aW9uIGNsZWFyTW9kaWZpZXIoZXZlbnQpIHtcbiAgdmFyIGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2ggfHwgZXZlbnQuY2hhckNvZGU7XG5cbiAgdmFyIGkgPSBfZG93bktleXMuaW5kZXhPZihrZXkpOyAvLyDku47liJfooajkuK3muIXpmaTmjInljovov4fnmoTplK5cblxuXG4gIGlmIChpID49IDApIHtcbiAgICBfZG93bktleXMuc3BsaWNlKGksIDEpO1xuICB9IC8vIOeJueauiuWkhOeQhiBjbW1hbmQg6ZSu77yM5ZyoIGNtbWFuZCDnu4TlkIjlv6vmjbfplK4ga2V5dXAg5Y+q5omn6KGM5LiA5qyh55qE6Zeu6aKYXG5cblxuICBpZiAoZXZlbnQua2V5ICYmIGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpID09PSAnbWV0YScpIHtcbiAgICBfZG93bktleXMuc3BsaWNlKDAsIF9kb3duS2V5cy5sZW5ndGgpO1xuICB9IC8vIOS/rumlsOmUriBzaGlmdEtleSBhbHRLZXkgY3RybEtleSAoY29tbWFuZHx8bWV0YUtleSkg5riF6ZmkXG5cblxuICBpZiAoa2V5ID09PSA5MyB8fCBrZXkgPT09IDIyNCkga2V5ID0gOTE7XG5cbiAgaWYgKGtleSBpbiBfbW9kcykge1xuICAgIF9tb2RzW2tleV0gPSBmYWxzZTsgLy8g5bCG5L+u6aWw6ZSu6YeN572u5Li6ZmFsc2VcblxuICAgIGZvciAodmFyIGsgaW4gX21vZGlmaWVyKSB7XG4gICAgICBpZiAoX21vZGlmaWVyW2tdID09PSBrZXkpIGhvdGtleXNba10gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5iaW5kKGtleXNJbmZvKSB7XG4gIC8vIHVuYmluZCgpLCB1bmJpbmQgYWxsIGtleXNcbiAgaWYgKCFrZXlzSW5mbykge1xuICAgIE9iamVjdC5rZXlzKF9oYW5kbGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gZGVsZXRlIF9oYW5kbGVyc1trZXldO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoa2V5c0luZm8pKSB7XG4gICAgLy8gc3VwcG9ydCBsaWtlIDogdW5iaW5kKFt7a2V5OiAnY3RybCthJywgc2NvcGU6ICdzMSd9LCB7a2V5OiAnY3RybC1hJywgc2NvcGU6ICdzMicsIHNwbGl0S2V5OiAnLSd9XSlcbiAgICBrZXlzSW5mby5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICBpZiAoaW5mby5rZXkpIGVhY2hVbmJpbmQoaW5mbyk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGtleXNJbmZvID09PSAnb2JqZWN0Jykge1xuICAgIC8vIHN1cHBvcnQgbGlrZSB1bmJpbmQoe2tleTogJ2N0cmwrYSwgY3RybCtiJywgc2NvcGU6J2FiYyd9KVxuICAgIGlmIChrZXlzSW5mby5rZXkpIGVhY2hVbmJpbmQoa2V5c0luZm8pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBrZXlzSW5mbyA9PT0gJ3N0cmluZycpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IG9sZCBtZXRob2RcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgdmFyIHNjb3BlID0gYXJnc1swXSxcbiAgICAgICAgbWV0aG9kID0gYXJnc1sxXTtcblxuICAgIGlmICh0eXBlb2Ygc2NvcGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1ldGhvZCA9IHNjb3BlO1xuICAgICAgc2NvcGUgPSAnJztcbiAgICB9XG5cbiAgICBlYWNoVW5iaW5kKHtcbiAgICAgIGtleToga2V5c0luZm8sXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHNwbGl0S2V5OiAnKydcbiAgICB9KTtcbiAgfVxufSAvLyDop6PpmaTnu5Hlrprmn5DkuKrojIPlm7TnmoTlv6vmjbfplK5cblxuXG52YXIgZWFjaFVuYmluZCA9IGZ1bmN0aW9uIGVhY2hVbmJpbmQoX3JlZikge1xuICB2YXIga2V5ID0gX3JlZi5rZXksXG4gICAgICBzY29wZSA9IF9yZWYuc2NvcGUsXG4gICAgICBtZXRob2QgPSBfcmVmLm1ldGhvZCxcbiAgICAgIF9yZWYkc3BsaXRLZXkgPSBfcmVmLnNwbGl0S2V5LFxuICAgICAgc3BsaXRLZXkgPSBfcmVmJHNwbGl0S2V5ID09PSB2b2lkIDAgPyAnKycgOiBfcmVmJHNwbGl0S2V5O1xuICB2YXIgbXVsdGlwbGVLZXlzID0gZ2V0S2V5cyhrZXkpO1xuICBtdWx0aXBsZUtleXMuZm9yRWFjaChmdW5jdGlvbiAob3JpZ2luS2V5KSB7XG4gICAgdmFyIHVuYmluZEtleXMgPSBvcmlnaW5LZXkuc3BsaXQoc3BsaXRLZXkpO1xuICAgIHZhciBsZW4gPSB1bmJpbmRLZXlzLmxlbmd0aDtcbiAgICB2YXIgbGFzdEtleSA9IHVuYmluZEtleXNbbGVuIC0gMV07XG4gICAgdmFyIGtleUNvZGUgPSBsYXN0S2V5ID09PSAnKicgPyAnKicgOiBjb2RlKGxhc3RLZXkpO1xuICAgIGlmICghX2hhbmRsZXJzW2tleUNvZGVdKSByZXR1cm47IC8vIOWIpOaWreaYr+WQpuS8oOWFpeiMg+WbtO+8jOayoeacieWwseiOt+WPluiMg+WbtFxuXG4gICAgaWYgKCFzY29wZSkgc2NvcGUgPSBnZXRTY29wZSgpO1xuICAgIHZhciBtb2RzID0gbGVuID4gMSA/IGdldE1vZHMoX21vZGlmaWVyLCB1bmJpbmRLZXlzKSA6IFtdO1xuICAgIF9oYW5kbGVyc1trZXlDb2RlXSA9IF9oYW5kbGVyc1trZXlDb2RlXS5tYXAoZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgLy8g6YCa6L+H5Ye95pWw5Yik5pat77yM5piv5ZCm6Kej6Zmk57uR5a6a77yM5Ye95pWw55u4562J55u05o6l6L+U5ZueXG4gICAgICB2YXIgaXNNYXRjaGluZ01ldGhvZCA9IG1ldGhvZCA/IHJlY29yZC5tZXRob2QgPT09IG1ldGhvZCA6IHRydWU7XG5cbiAgICAgIGlmIChpc01hdGNoaW5nTWV0aG9kICYmIHJlY29yZC5zY29wZSA9PT0gc2NvcGUgJiYgY29tcGFyZUFycmF5KHJlY29yZC5tb2RzLCBtb2RzKSkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfSk7XG4gIH0pO1xufTsgLy8g5a+555uR5ZCs5a+55bqU5b+r5o236ZSu55qE5Zue6LCD5Ye95pWw6L+b6KGM5aSE55CGXG5cblxuZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50LCBoYW5kbGVyLCBzY29wZSkge1xuICB2YXIgbW9kaWZpZXJzTWF0Y2g7IC8vIOeci+Wug+aYr+WQpuWcqOW9k+WJjeiMg+WbtFxuXG4gIGlmIChoYW5kbGVyLnNjb3BlID09PSBzY29wZSB8fCBoYW5kbGVyLnNjb3BlID09PSAnYWxsJykge1xuICAgIC8vIOajgOafpeaYr+WQpuWMuemFjeS/rumlsOespu+8iOWmguaenOaciei/lOWbnnRydWXvvIlcbiAgICBtb2RpZmllcnNNYXRjaCA9IGhhbmRsZXIubW9kcy5sZW5ndGggPiAwO1xuXG4gICAgZm9yICh2YXIgeSBpbiBfbW9kcykge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfbW9kcywgeSkpIHtcbiAgICAgICAgaWYgKCFfbW9kc1t5XSAmJiBoYW5kbGVyLm1vZHMuaW5kZXhPZigreSkgPiAtMSB8fCBfbW9kc1t5XSAmJiBoYW5kbGVyLm1vZHMuaW5kZXhPZigreSkgPT09IC0xKSB7XG4gICAgICAgICAgbW9kaWZpZXJzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8g6LCD55So5aSE55CG56iL5bqP77yM5aaC5p6c5piv5L+u6aWw6ZSu5LiN5YGa5aSE55CGXG5cblxuICAgIGlmIChoYW5kbGVyLm1vZHMubGVuZ3RoID09PSAwICYmICFfbW9kc1sxNl0gJiYgIV9tb2RzWzE4XSAmJiAhX21vZHNbMTddICYmICFfbW9kc1s5MV0gfHwgbW9kaWZpZXJzTWF0Y2ggfHwgaGFuZGxlci5zaG9ydGN1dCA9PT0gJyonKSB7XG4gICAgICBpZiAoaGFuZGxlci5tZXRob2QoZXZlbnQsIGhhbmRsZXIpID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7ZWxzZSBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSkgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0gLy8g5aSE55CGa2V5ZG93buS6i+S7tlxuXG5cbmZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50KSB7XG4gIHZhciBhc3RlcmlzayA9IF9oYW5kbGVyc1snKiddO1xuICB2YXIga2V5ID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaCB8fCBldmVudC5jaGFyQ29kZTsgLy8g6KGo5Y2V5o6n5Lu26L+H5rukIOm7mOiupOihqOWNleaOp+S7tuS4jeinpuWPkeW/q+aNt+mUrlxuXG4gIGlmICghaG90a2V5cy5maWx0ZXIuY2FsbCh0aGlzLCBldmVudCkpIHJldHVybjsgLy8gR2Vja28oRmlyZWZveCnnmoRjb21tYW5k6ZSu5YC8MjI077yM5ZyoV2Via2l0KENocm9tZSnkuK3kv53mjIHkuIDoh7RcbiAgLy8gV2Via2l05bem5Y+zIGNvbW1hbmQg6ZSu5YC85LiN5LiA5qC3XG5cbiAgaWYgKGtleSA9PT0gOTMgfHwga2V5ID09PSAyMjQpIGtleSA9IDkxO1xuICAvKipcbiAgICogQ29sbGVjdCBib3VuZCBrZXlzXG4gICAqIElmIGFuIElucHV0IE1ldGhvZCBFZGl0b3IgaXMgcHJvY2Vzc2luZyBrZXkgaW5wdXQgYW5kIHRoZSBldmVudCBpcyBrZXlkb3duLCByZXR1cm4gMjI5LlxuICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNTA0MzkzNC9pcy1pdC1vay10by1pZ25vcmUta2V5ZG93bi1ldmVudHMtd2l0aC1rZXljb2RlLTIyOVxuICAgKiBodHRwOi8vbGlzdHMudzMub3JnL0FyY2hpdmVzL1B1YmxpYy93d3ctZG9tLzIwMTBKdWxTZXAvYXR0LTAxODIva2V5Q29kZS1zcGVjLmh0bWxcbiAgICovXG5cbiAgaWYgKF9kb3duS2V5cy5pbmRleE9mKGtleSkgPT09IC0xICYmIGtleSAhPT0gMjI5KSBfZG93bktleXMucHVzaChrZXkpO1xuICAvKipcbiAgICogSmVzdCB0ZXN0IGNhc2VzIGFyZSByZXF1aXJlZC5cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBbJ2N0cmxLZXknLCAnYWx0S2V5JywgJ3NoaWZ0S2V5JywgJ21ldGFLZXknXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlOYW1lKSB7XG4gICAgdmFyIGtleU51bSA9IG1vZGlmaWVyTWFwW2tleU5hbWVdO1xuXG4gICAgaWYgKGV2ZW50W2tleU5hbWVdICYmIF9kb3duS2V5cy5pbmRleE9mKGtleU51bSkgPT09IC0xKSB7XG4gICAgICBfZG93bktleXMucHVzaChrZXlOdW0pO1xuICAgIH0gZWxzZSBpZiAoIWV2ZW50W2tleU5hbWVdICYmIF9kb3duS2V5cy5pbmRleE9mKGtleU51bSkgPiAtMSkge1xuICAgICAgX2Rvd25LZXlzLnNwbGljZShfZG93bktleXMuaW5kZXhPZihrZXlOdW0pLCAxKTtcbiAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT09ICdtZXRhS2V5JyAmJiBldmVudFtrZXlOYW1lXSAmJiBfZG93bktleXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpeCBpZiBDb21tYW5kIGlzIHByZXNzZWQ6XG4gICAgICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgKi9cbiAgICAgIGlmICghKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KSkge1xuICAgICAgICBfZG93bktleXMgPSBfZG93bktleXMuc2xpY2UoX2Rvd25LZXlzLmluZGV4T2Yoa2V5TnVtKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgaWYgKGtleSBpbiBfbW9kcykge1xuICAgIF9tb2RzW2tleV0gPSB0cnVlOyAvLyDlsIbnibnmrorlrZfnrKbnmoRrZXnms6jlhozliLAgaG90a2V5cyDkuIpcblxuICAgIGZvciAodmFyIGsgaW4gX21vZGlmaWVyKSB7XG4gICAgICBpZiAoX21vZGlmaWVyW2tdID09PSBrZXkpIGhvdGtleXNba10gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghYXN0ZXJpc2spIHJldHVybjtcbiAgfSAvLyDlsIYgbW9kaWZpZXJNYXAg6YeM6Z2i55qE5L+u6aWw6ZSu57uR5a6a5YiwIGV2ZW50IOS4rVxuXG5cbiAgZm9yICh2YXIgZSBpbiBfbW9kcykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX21vZHMsIGUpKSB7XG4gICAgICBfbW9kc1tlXSA9IGV2ZW50W21vZGlmaWVyTWFwW2VdXTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXl3Y2psb3ZlL2hvdGtleXMvcHVsbC8xMjlcbiAgICogVGhpcyBzb2x2ZXMgdGhlIGlzc3VlIGluIEZpcmVmb3ggb24gV2luZG93cyB3aGVyZSBob3RrZXlzIGNvcnJlc3BvbmRpbmcgdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHdvdWxkIG5vdCB0cmlnZ2VyLlxuICAgKiBBbiBleGFtcGxlIG9mIHRoaXMgaXMgY3RybCthbHQrbSBvbiBhIFN3ZWRpc2gga2V5Ym9hcmQgd2hpY2ggaXMgdXNlZCB0byB0eXBlIM68LlxuICAgKiBCcm93c2VyIHN1cHBvcnQ6IGh0dHBzOi8vY2FuaXVzZS5jb20vI2ZlYXQ9a2V5Ym9hcmRldmVudC1nZXRtb2RpZmllcnN0YXRlXG4gICAqL1xuXG5cbiAgaWYgKGV2ZW50LmdldE1vZGlmaWVyU3RhdGUgJiYgIShldmVudC5hbHRLZXkgJiYgIWV2ZW50LmN0cmxLZXkpICYmIGV2ZW50LmdldE1vZGlmaWVyU3RhdGUoJ0FsdEdyYXBoJykpIHtcbiAgICBpZiAoX2Rvd25LZXlzLmluZGV4T2YoMTcpID09PSAtMSkge1xuICAgICAgX2Rvd25LZXlzLnB1c2goMTcpO1xuICAgIH1cblxuICAgIGlmIChfZG93bktleXMuaW5kZXhPZigxOCkgPT09IC0xKSB7XG4gICAgICBfZG93bktleXMucHVzaCgxOCk7XG4gICAgfVxuXG4gICAgX21vZHNbMTddID0gdHJ1ZTtcbiAgICBfbW9kc1sxOF0gPSB0cnVlO1xuICB9IC8vIOiOt+WPluiMg+WbtCDpu5jorqTkuLogYGFsbGBcblxuXG4gIHZhciBzY29wZSA9IGdldFNjb3BlKCk7IC8vIOWvueS7u+S9leW/q+aNt+mUrumDvemcgOimgeWBmueahOWkhOeQhlxuXG4gIGlmIChhc3Rlcmlzaykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN0ZXJpc2subGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhc3Rlcmlza1tpXS5zY29wZSA9PT0gc2NvcGUgJiYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJyAmJiBhc3Rlcmlza1tpXS5rZXlkb3duIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgYXN0ZXJpc2tbaV0ua2V5dXApKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlcihldmVudCwgYXN0ZXJpc2tbaV0sIHNjb3BlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8ga2V5IOS4jeWcqCBfaGFuZGxlcnMg5Lit6L+U5ZueXG5cblxuICBpZiAoIShrZXkgaW4gX2hhbmRsZXJzKSkgcmV0dXJuO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBfaGFuZGxlcnNba2V5XS5sZW5ndGg7IF9pKyspIHtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nICYmIF9oYW5kbGVyc1trZXldW19pXS5rZXlkb3duIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgX2hhbmRsZXJzW2tleV1bX2ldLmtleXVwKSB7XG4gICAgICBpZiAoX2hhbmRsZXJzW2tleV1bX2ldLmtleSkge1xuICAgICAgICB2YXIgcmVjb3JkID0gX2hhbmRsZXJzW2tleV1bX2ldO1xuICAgICAgICB2YXIgc3BsaXRLZXkgPSByZWNvcmQuc3BsaXRLZXk7XG4gICAgICAgIHZhciBrZXlTaG9ydGN1dCA9IHJlY29yZC5rZXkuc3BsaXQoc3BsaXRLZXkpO1xuICAgICAgICB2YXIgX2Rvd25LZXlzQ3VycmVudCA9IFtdOyAvLyDorrDlvZXlvZPliY3mjInplK7plK7lgLxcblxuICAgICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGtleVNob3J0Y3V0Lmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgX2Rvd25LZXlzQ3VycmVudC5wdXNoKGNvZGUoa2V5U2hvcnRjdXRbYV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZG93bktleXNDdXJyZW50LnNvcnQoKS5qb2luKCcnKSA9PT0gX2Rvd25LZXlzLnNvcnQoKS5qb2luKCcnKSkge1xuICAgICAgICAgIC8vIOaJvuWIsOWkhOeQhuWGheWuuVxuICAgICAgICAgIGV2ZW50SGFuZGxlcihldmVudCwgcmVjb3JkLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0gLy8g5Yik5patIGVsZW1lbnQg5piv5ZCm5bey57uP57uR5a6a5LqL5Lu2XG5cblxuZnVuY3Rpb24gaXNFbGVtZW50QmluZChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50SGFzQmluZEV2ZW50LmluZGV4T2YoZWxlbWVudCkgPiAtMTtcbn1cblxuZnVuY3Rpb24gaG90a2V5cyhrZXksIG9wdGlvbiwgbWV0aG9kKSB7XG4gIF9kb3duS2V5cyA9IFtdO1xuICB2YXIga2V5cyA9IGdldEtleXMoa2V5KTsgLy8g6ZyA6KaB5aSE55CG55qE5b+r5o236ZSu5YiX6KGoXG5cbiAgdmFyIG1vZHMgPSBbXTtcbiAgdmFyIHNjb3BlID0gJ2FsbCc7IC8vIHNjb3Bl6buY6K6k5Li6YWxs77yM5omA5pyJ6IyD5Zu06YO95pyJ5pWIXG5cbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudDsgLy8g5b+r5o236ZSu5LqL5Lu257uR5a6a6IqC54K5XG5cbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5dXAgPSBmYWxzZTtcbiAgdmFyIGtleWRvd24gPSB0cnVlO1xuICB2YXIgc3BsaXRLZXkgPSAnKyc7IC8vIOWvueS4uuiuvuWumuiMg+WbtOeahOWIpOaWrVxuXG4gIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbWV0aG9kID0gb3B0aW9uO1xuICB9XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb24pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGlmIChvcHRpb24uc2NvcGUpIHNjb3BlID0gb3B0aW9uLnNjb3BlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAob3B0aW9uLmVsZW1lbnQpIGVsZW1lbnQgPSBvcHRpb24uZWxlbWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgaWYgKG9wdGlvbi5rZXl1cCkga2V5dXAgPSBvcHRpb24ua2V5dXA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGlmIChvcHRpb24ua2V5ZG93biAhPT0gdW5kZWZpbmVkKSBrZXlkb3duID0gb3B0aW9uLmtleWRvd247IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9uLnNwbGl0S2V5ID09PSAnc3RyaW5nJykgc3BsaXRLZXkgPSBvcHRpb24uc3BsaXRLZXk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykgc2NvcGUgPSBvcHRpb247IC8vIOWvueS6juavj+S4quW/q+aNt+mUrui/m+ihjOWkhOeQhlxuXG4gIGZvciAoOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IGtleXNbaV0uc3BsaXQoc3BsaXRLZXkpOyAvLyDmjInplK7liJfooahcblxuICAgIG1vZHMgPSBbXTsgLy8g5aaC5p6c5piv57uE5ZCI5b+r5o236ZSu5Y+W5b6X57uE5ZCI5b+r5o236ZSuXG5cbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEpIG1vZHMgPSBnZXRNb2RzKF9tb2RpZmllciwga2V5KTsgLy8g5bCG6Z2e5L+u6aWw6ZSu6L2s5YyW5Li66ZSu56CBXG5cbiAgICBrZXkgPSBrZXlba2V5Lmxlbmd0aCAtIDFdO1xuICAgIGtleSA9IGtleSA9PT0gJyonID8gJyonIDogY29kZShrZXkpOyAvLyAq6KGo56S65Yy56YWN5omA5pyJ5b+r5o236ZSuXG4gICAgLy8g5Yik5pata2V55piv5ZCm5ZyoX2hhbmRsZXJz5Lit77yM5LiN5Zyo5bCx6LWL5LiA5Liq56m65pWw57uEXG5cbiAgICBpZiAoIShrZXkgaW4gX2hhbmRsZXJzKSkgX2hhbmRsZXJzW2tleV0gPSBbXTtcblxuICAgIF9oYW5kbGVyc1trZXldLnB1c2goe1xuICAgICAga2V5dXA6IGtleXVwLFxuICAgICAga2V5ZG93bjoga2V5ZG93bixcbiAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIG1vZHM6IG1vZHMsXG4gICAgICBzaG9ydGN1dDoga2V5c1tpXSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAga2V5OiBrZXlzW2ldLFxuICAgICAgc3BsaXRLZXk6IHNwbGl0S2V5XG4gICAgfSk7XG4gIH0gLy8g5Zyo5YWo5bGAZG9jdW1lbnTkuIrorr7nva7lv6vmjbfplK5cblxuXG4gIGlmICh0eXBlb2YgZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzRWxlbWVudEJpbmQoZWxlbWVudCkgJiYgd2luZG93KSB7XG4gICAgZWxlbWVudEhhc0JpbmRFdmVudC5wdXNoKGVsZW1lbnQpO1xuICAgIGFkZEV2ZW50KGVsZW1lbnQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRpc3BhdGNoKGUpO1xuICAgIH0pO1xuICAgIGFkZEV2ZW50KHdpbmRvdywgJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgX2Rvd25LZXlzID0gW107XG4gICAgfSk7XG4gICAgYWRkRXZlbnQoZWxlbWVudCwgJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRpc3BhdGNoKGUpO1xuICAgICAgY2xlYXJNb2RpZmllcihlKTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgX2FwaSA9IHtcbiAgc2V0U2NvcGU6IHNldFNjb3BlLFxuICBnZXRTY29wZTogZ2V0U2NvcGUsXG4gIGRlbGV0ZVNjb3BlOiBkZWxldGVTY29wZSxcbiAgZ2V0UHJlc3NlZEtleUNvZGVzOiBnZXRQcmVzc2VkS2V5Q29kZXMsXG4gIGlzUHJlc3NlZDogaXNQcmVzc2VkLFxuICBmaWx0ZXI6IGZpbHRlcixcbiAgdW5iaW5kOiB1bmJpbmRcbn07XG5cbmZvciAodmFyIGEgaW4gX2FwaSkge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9hcGksIGEpKSB7XG4gICAgaG90a2V5c1thXSA9IF9hcGlbYV07XG4gIH1cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHZhciBfaG90a2V5cyA9IHdpbmRvdy5ob3RrZXlzO1xuXG4gIGhvdGtleXMubm9Db25mbGljdCA9IGZ1bmN0aW9uIChkZWVwKSB7XG4gICAgaWYgKGRlZXAgJiYgd2luZG93LmhvdGtleXMgPT09IGhvdGtleXMpIHtcbiAgICAgIHdpbmRvdy5ob3RrZXlzID0gX2hvdGtleXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvdGtleXM7XG4gIH07XG5cbiAgd2luZG93LmhvdGtleXMgPSBob3RrZXlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBob3RrZXlzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaG90a2V5c19qc18xID0gcmVxdWlyZShcImhvdGtleXMtanNcIik7XHJcbmNvbnN0IHRpbWVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3RpbWVcIik7XHJcbi8vIEJ5IGRlZmF1bHQgaG90a2V5cyBhcmUgbm90IGVuYWJsZWQgZm9yIElOUFVULCBTRUxFQ1QsIFRFWFRBUkVBIGVsZW1lbnRzLlxyXG5ob3RrZXlzX2pzXzEuZGVmYXVsdC5maWx0ZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5jaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7XHJcbiAgICBob3RrZXlzOiBbXSxcclxuICAgIGNhbGNUb3RhbFRpbWU6IHRydWUsXHJcbn0sIGZ1bmN0aW9uICh7IGhvdGtleXMsIGNhbGNUb3RhbFRpbWUgfSkge1xyXG4gICAgLy8gU3RhcnQgY2FsY3VsYXRlIHRvdGFsIHRpbWVcclxuICAgIGlmIChjYWxjVG90YWxUaW1lKSB7XHJcbiAgICAgICAgdGltZV8xLmhpZ2hsaWdodCgpO1xyXG4gICAgICAgIHRpbWVfMS5yZW5kZXJUb3RhbFRpbWUoKTtcclxuICAgICAgICB0aW1lXzEuY3JlYXRlT2JzZXJ2ZXIoKTtcclxuICAgIH1cclxuICAgIC8vIFN0YXJ0IGhvdGtleXNcclxuICAgIGZvciAoY29uc3QgaG90a2V5IG9mIGhvdGtleXMpIHtcclxuICAgICAgICBob3RrZXlzX2pzXzEuZGVmYXVsdChgJHtob3RrZXkuc3BlY2lhbEtleX0rJHtob3RrZXkua2V5fWAsIGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IHJlZnJlc2ggZXZlbnQgdW5kZXIgV0lORE9XUyBzeXN0ZW1cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGhvdGtleS5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID1cclxuICAgICAgICAgICAgICAgICAgICBcIj9xPVwiICsgaG90a2V5Lmhhc2guc3BsaXQoXCIgXCIpLnJlZHVjZSgoYWNjLCB2YWwpID0+IGAke2FjY30jJHt2YWx9IGAsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaGlnaGxpZ2h0ID0gZXhwb3J0cy5yZW5kZXJUb3RhbFRpbWUgPSBleHBvcnRzLmdldFRhZ1NlY29uZHMgPSBleHBvcnRzLmNyZWF0ZU9ic2VydmVyID0gdm9pZCAwO1xyXG5jb25zdCBISUdITElHSFRfQ09MT1IgPSBcIiMxM2NiZDNcIjtcclxuY29uc3QgQ09VTlRFUl9JRCA9IFwiY3RlLWNvdW50ZXJcIjtcclxuLyoqXHJcbiAqIE9ic2VydmUgdG8gY2hhbmdlIHRhZ3NcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKCkge1xyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zTGlzdCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFkZGVkTm9kZSBvZiBtdXRhdGlvbi5hZGRlZE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlLmNsYXNzTGlzdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJpbm5lckNvbnRlbnRDb250YWluZXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50VGFnID0gYWRkZWROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFRhZ1RleHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclRvdGFsVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZU9ic2VydmVyID0gY3JlYXRlT2JzZXJ2ZXI7XHJcbi8qKlxyXG4gKiBQYXJzZSBhbmQgY2FsY3VsYXRlIHRvdGFsIHNlY29uZHMgZnJvbSB0YWcgc3RyaW5nXHJcbiAqIEBleGFtcGxlIFwiIzJoMjBtXCIgLT4gODQwMFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VGFnU2Vjb25kcyhzdHIpIHtcclxuICAgIC8vIFRlc3QgdG8gZml0IHN0cmluZ1xyXG4gICAgY29uc3QgcmVnRXhwID0gL14jKFxcZCsoZHxofG18cykpKyQvO1xyXG4gICAgaWYgKCFyZWdFeHAudGVzdChzdHIpKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMDtcclxuICAgIGNvbnN0IGRheXMgPSBzdHIubWF0Y2goLyhcXGQrKVxccypkLyk7XHJcbiAgICBjb25zdCBob3VycyA9IHN0ci5tYXRjaCgvKFxcZCspXFxzKmgvKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBzdHIubWF0Y2goLyhcXGQrKVxccyptLyk7XHJcbiAgICBjb25zdCBzZWNvbmRzID0gc3RyLm1hdGNoKC8oXFxkKylcXHMqcy8pO1xyXG4gICAgaWYgKGRheXMpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMgKz0gcGFyc2VJbnQoZGF5c1sxXSkgKiA4NjQwMDtcclxuICAgIH1cclxuICAgIGlmIChob3Vycykge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcyArPSBwYXJzZUludChob3Vyc1sxXSkgKiAzNjAwO1xyXG4gICAgfVxyXG4gICAgaWYgKG1pbnV0ZXMpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMgKz0gcGFyc2VJbnQobWludXRlc1sxXSkgKiA2MDtcclxuICAgIH1cclxuICAgIGlmIChzZWNvbmRzKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzICs9IHBhcnNlSW50KHNlY29uZHNbMV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsU2Vjb25kcztcclxufVxyXG5leHBvcnRzLmdldFRhZ1NlY29uZHMgPSBnZXRUYWdTZWNvbmRzO1xyXG4vKipcclxuICogUmVuZGVyIHRvdGFsIHJlY29nbml6ZWQgdGltZSBpbiBoZWFkZXJcclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlclRvdGFsVGltZSgpIHtcclxuICAgIC8vIFRyeSBmaW5kIGhlYWRlclxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIik7XHJcbiAgICBpZiAoIWhlYWRlcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIENhbGN1bGF0ZSB0b3RhbCB0aW1lXHJcbiAgICBjb25zdCB0YWdzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29udGVudFRhZ1wiKV0ubWFwKChlbCkgPT4gZWwuaW5uZXJUZXh0KTtcclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSB0YWdzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIGdldFRhZ1NlY29uZHModmFsKSwgMCk7XHJcbiAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyA4NjQwMCk7XHJcbiAgICBpZiAoZGF5cyA+IDApIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMgLT0gZGF5cyAqIDg2NDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDM2MDApO1xyXG4gICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcyAtPSBob3VycyAqIDM2MDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyA2MCk7XHJcbiAgICBpZiAobWludXRlcyA+IDApIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMgLT0gbWludXRlcyAqIDYwO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcztcclxuICAgIGNvbnN0IHRvdGFsSHRtbCA9IChkYXlzID4gMCA/IGRheXMgKyBcImQgXCIgOiBcIlwiKSArXHJcbiAgICAgICAgKGhvdXJzID4gMCA/IGhvdXJzICsgXCJoIFwiIDogXCJcIikgK1xyXG4gICAgICAgIChtaW51dGVzID4gMCA/IG1pbnV0ZXMgKyBcIm0gXCIgOiBcIlwiKSArXHJcbiAgICAgICAgKHNlY29uZHMgPiAwID8gc2Vjb25kcyArIFwic1wiIDogXCJcIik7XHJcbiAgICAvLyBUcnkgZmluZCBhbHJlYWR5IGFkZGVkIGNvdW50ZXJcclxuICAgIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChDT1VOVEVSX0lEKTtcclxuICAgIGlmIChjb3VudGVyKSB7XHJcbiAgICAgICAgY291bnRlci5pbm5lckhUTUwgPSB0b3RhbEh0bWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSB0b3RhbEh0bWw7XHJcbiAgICAgICAgZGl2LmlkID0gQ09VTlRFUl9JRDtcclxuICAgICAgICBkaXYuc3R5bGUuZm9udFNpemUgPSAxMyArIFwicHhcIjtcclxuICAgICAgICBjb25zdCBicmVhZGNydW1icyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmJyZWFkY3J1bWJzXCIpO1xyXG4gICAgICAgIGhlYWRlci5pbnNlcnRCZWZvcmUoZGl2LCBicmVhZGNydW1icy5uZXh0U2libGluZyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZW5kZXJUb3RhbFRpbWUgPSByZW5kZXJUb3RhbFRpbWU7XHJcbi8qKlxyXG4gKiBIaWdobGlnaHQgcmVjb2duaXplZCB0YWdzXHJcbiAqL1xyXG5mdW5jdGlvbiBoaWdobGlnaHQoKSB7XHJcbiAgICBjb25zdCB0YWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb250ZW50VGFnXCIpO1xyXG4gICAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xyXG4gICAgICAgIGlmIChnZXRUYWdTZWNvbmRzKHRhZy5pbm5lclRleHQpID4gMCkge1xyXG4gICAgICAgICAgICB0YWcuc3R5bGUub3V0bGluZSA9IGAxcHggZGFzaGVkICR7SElHSExJR0hUX0NPTE9SfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9