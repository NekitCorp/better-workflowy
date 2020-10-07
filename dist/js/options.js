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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/options.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/options.ts":
/*!************************!*\
  !*** ./src/options.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = __webpack_require__(/*! ./utils/dom */ "./src/utils/dom.ts");
// Saves options to chrome.storage
function saveOptions() {
    const calcTotalTime = document.getElementById("calc-total-time").checked;
    const hotkeys = [...document.getElementById("hotkeys").childNodes].map((node) => {
        const specialKey = node.querySelector(".skselect")
            .value;
        const key = node.querySelector(".kselect").value;
        const hash = node.querySelector("input").value;
        return { specialKey, key, hash };
    });
    chrome.storage.sync.set({
        calcTotalTime,
        hotkeys,
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById("status");
        status.innerText = "Options saved!";
        setTimeout(function () {
            status.textContent = "";
        }, 1500);
    });
}
// Restores options from chrome.storage
function restoreOptions() {
    chrome.storage.sync.get({
        hotkeys: [],
        calcTotalTime: true,
    }, function ({ hotkeys, calcTotalTime }) {
        document.getElementById("calc-total-time").checked = calcTotalTime;
        for (const hotkey of hotkeys) {
            document.getElementById("hotkeys").appendChild(dom_1.createHotKeyBlock(hotkey));
        }
    });
}
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("add-hotkey").addEventListener("click", () => {
    document
        .getElementById("hotkeys")
        .appendChild(dom_1.createHotKeyBlock({ specialKey: "shift", key: "home", hash: "" }));
});
document.addEventListener("DOMContentLoaded", restoreOptions);


/***/ }),

/***/ "./src/utils/dom.ts":
/*!**************************!*\
  !*** ./src/utils/dom.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotKeyBlock = void 0;
const keyboard_keys_1 = __webpack_require__(/*! ./keyboard-keys */ "./src/utils/keyboard-keys.ts");
function createSelect(options, className, defaultValue) {
    const select = document.createElement("select");
    select.classList.add(className);
    for (const key of options) {
        const option = document.createElement("option");
        option.innerText = key;
        option.value = key;
        select.appendChild(option);
    }
    select.value = defaultValue;
    return select;
}
function createHotKeyBlock(hotkeyOption) {
    const { hash, key, specialKey } = hotkeyOption;
    // Selects
    const specialKeysSelect = createSelect(keyboard_keys_1.specialKeys, "skselect", specialKey);
    const keysSelect = createSelect(keyboard_keys_1.keys, "kselect", key);
    // Input
    const input = document.createElement("input");
    input.value = hash;
    // Remove button
    const button = document.createElement("button");
    button.classList.add("emoji-button");
    button.innerText = String.fromCodePoint(0x2796);
    // Wrapper
    const div = document.createElement("div");
    div.classList.add("hotkey-block");
    div.appendChild(specialKeysSelect);
    div.appendChild(keysSelect);
    div.appendChild(input);
    div.appendChild(button);
    // Remove listener
    button.addEventListener("click", () => div.remove());
    return div;
}
exports.createHotKeyBlock = createHotKeyBlock;


/***/ }),

/***/ "./src/utils/keyboard-keys.ts":
/*!************************************!*\
  !*** ./src/utils/keyboard-keys.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = exports.specialKeys = void 0;
exports.specialKeys = ["ctrl", "shift", "alt"];
exports.keys = [
    "escape",
    "pageup",
    "space",
    "pagedown",
    "end",
    "home",
    "left",
    "up",
    "right",
    "down",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "f10",
    "f11",
    "f12",
];


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RvbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMva2V5Ym9hcmQta2V5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsY0FBYyxtQkFBTyxDQUFDLHVDQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGFBQWEseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNkNBQTZDO0FBQzNGLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzNDYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMscURBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3QkFBd0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9vcHRpb25zLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi91dGlscy9kb21cIik7XHJcbi8vIFNhdmVzIG9wdGlvbnMgdG8gY2hyb21lLnN0b3JhZ2VcclxuZnVuY3Rpb24gc2F2ZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBjYWxjVG90YWxUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWxjLXRvdGFsLXRpbWVcIikuY2hlY2tlZDtcclxuICAgIGNvbnN0IGhvdGtleXMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3RrZXlzXCIpLmNoaWxkTm9kZXNdLm1hcCgobm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNwZWNpYWxLZXkgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCIuc2tzZWxlY3RcIilcclxuICAgICAgICAgICAgLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IG5vZGUucXVlcnlTZWxlY3RvcihcIi5rc2VsZWN0XCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGhhc2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICByZXR1cm4geyBzcGVjaWFsS2V5LCBrZXksIGhhc2ggfTtcclxuICAgIH0pO1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG4gICAgICAgIGNhbGNUb3RhbFRpbWUsXHJcbiAgICAgICAgaG90a2V5cyxcclxuICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIHRvIGxldCB1c2VyIGtub3cgb3B0aW9ucyB3ZXJlIHNhdmVkLlxyXG4gICAgICAgIHZhciBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKTtcclxuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gXCJPcHRpb25zIHNhdmVkIVwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgfSk7XHJcbn1cclxuLy8gUmVzdG9yZXMgb3B0aW9ucyBmcm9tIGNocm9tZS5zdG9yYWdlXHJcbmZ1bmN0aW9uIHJlc3RvcmVPcHRpb25zKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xyXG4gICAgICAgIGhvdGtleXM6IFtdLFxyXG4gICAgICAgIGNhbGNUb3RhbFRpbWU6IHRydWUsXHJcbiAgICB9LCBmdW5jdGlvbiAoeyBob3RrZXlzLCBjYWxjVG90YWxUaW1lIH0pIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGMtdG90YWwtdGltZVwiKS5jaGVja2VkID0gY2FsY1RvdGFsVGltZTtcclxuICAgICAgICBmb3IgKGNvbnN0IGhvdGtleSBvZiBob3RrZXlzKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG90a2V5c1wiKS5hcHBlbmRDaGlsZChkb21fMS5jcmVhdGVIb3RLZXlCbG9jayhob3RrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhdmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVPcHRpb25zKTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtaG90a2V5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChcImhvdGtleXNcIilcclxuICAgICAgICAuYXBwZW5kQ2hpbGQoZG9tXzEuY3JlYXRlSG90S2V5QmxvY2soeyBzcGVjaWFsS2V5OiBcInNoaWZ0XCIsIGtleTogXCJob21lXCIsIGhhc2g6IFwiXCIgfSkpO1xyXG59KTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcmVzdG9yZU9wdGlvbnMpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNyZWF0ZUhvdEtleUJsb2NrID0gdm9pZCAwO1xyXG5jb25zdCBrZXlib2FyZF9rZXlzXzEgPSByZXF1aXJlKFwiLi9rZXlib2FyZC1rZXlzXCIpO1xyXG5mdW5jdGlvbiBjcmVhdGVTZWxlY3Qob3B0aW9ucywgY2xhc3NOYW1lLCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2Ygb3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGtleTtcclxuICAgICAgICBvcHRpb24udmFsdWUgPSBrZXk7XHJcbiAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBzZWxlY3QudmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICByZXR1cm4gc2VsZWN0O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZUhvdEtleUJsb2NrKGhvdGtleU9wdGlvbikge1xyXG4gICAgY29uc3QgeyBoYXNoLCBrZXksIHNwZWNpYWxLZXkgfSA9IGhvdGtleU9wdGlvbjtcclxuICAgIC8vIFNlbGVjdHNcclxuICAgIGNvbnN0IHNwZWNpYWxLZXlzU2VsZWN0ID0gY3JlYXRlU2VsZWN0KGtleWJvYXJkX2tleXNfMS5zcGVjaWFsS2V5cywgXCJza3NlbGVjdFwiLCBzcGVjaWFsS2V5KTtcclxuICAgIGNvbnN0IGtleXNTZWxlY3QgPSBjcmVhdGVTZWxlY3Qoa2V5Ym9hcmRfa2V5c18xLmtleXMsIFwia3NlbGVjdFwiLCBrZXkpO1xyXG4gICAgLy8gSW5wdXRcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXQudmFsdWUgPSBoYXNoO1xyXG4gICAgLy8gUmVtb3ZlIGJ1dHRvblxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZW1vamktYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLmlubmVyVGV4dCA9IFN0cmluZy5mcm9tQ29kZVBvaW50KDB4Mjc5Nik7XHJcbiAgICAvLyBXcmFwcGVyXHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJob3RrZXktYmxvY2tcIik7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoc3BlY2lhbEtleXNTZWxlY3QpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGtleXNTZWxlY3QpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgLy8gUmVtb3ZlIGxpc3RlbmVyXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRpdi5yZW1vdmUoKSk7XHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlSG90S2V5QmxvY2sgPSBjcmVhdGVIb3RLZXlCbG9jaztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5rZXlzID0gZXhwb3J0cy5zcGVjaWFsS2V5cyA9IHZvaWQgMDtcclxuZXhwb3J0cy5zcGVjaWFsS2V5cyA9IFtcImN0cmxcIiwgXCJzaGlmdFwiLCBcImFsdFwiXTtcclxuZXhwb3J0cy5rZXlzID0gW1xyXG4gICAgXCJlc2NhcGVcIixcclxuICAgIFwicGFnZXVwXCIsXHJcbiAgICBcInNwYWNlXCIsXHJcbiAgICBcInBhZ2Vkb3duXCIsXHJcbiAgICBcImVuZFwiLFxyXG4gICAgXCJob21lXCIsXHJcbiAgICBcImxlZnRcIixcclxuICAgIFwidXBcIixcclxuICAgIFwicmlnaHRcIixcclxuICAgIFwiZG93blwiLFxyXG4gICAgXCIwXCIsXHJcbiAgICBcIjFcIixcclxuICAgIFwiMlwiLFxyXG4gICAgXCIzXCIsXHJcbiAgICBcIjRcIixcclxuICAgIFwiNVwiLFxyXG4gICAgXCI2XCIsXHJcbiAgICBcIjdcIixcclxuICAgIFwiOFwiLFxyXG4gICAgXCI5XCIsXHJcbiAgICBcImFcIixcclxuICAgIFwiYlwiLFxyXG4gICAgXCJjXCIsXHJcbiAgICBcImRcIixcclxuICAgIFwiZVwiLFxyXG4gICAgXCJmXCIsXHJcbiAgICBcImdcIixcclxuICAgIFwiaFwiLFxyXG4gICAgXCJpXCIsXHJcbiAgICBcImpcIixcclxuICAgIFwia1wiLFxyXG4gICAgXCJsXCIsXHJcbiAgICBcIm1cIixcclxuICAgIFwiblwiLFxyXG4gICAgXCJvXCIsXHJcbiAgICBcInBcIixcclxuICAgIFwicVwiLFxyXG4gICAgXCJyXCIsXHJcbiAgICBcInNcIixcclxuICAgIFwidFwiLFxyXG4gICAgXCJ1XCIsXHJcbiAgICBcInZcIixcclxuICAgIFwid1wiLFxyXG4gICAgXCJ4XCIsXHJcbiAgICBcInlcIixcclxuICAgIFwielwiLFxyXG4gICAgXCJmMVwiLFxyXG4gICAgXCJmMlwiLFxyXG4gICAgXCJmM1wiLFxyXG4gICAgXCJmNFwiLFxyXG4gICAgXCJmNVwiLFxyXG4gICAgXCJmNlwiLFxyXG4gICAgXCJmN1wiLFxyXG4gICAgXCJmOFwiLFxyXG4gICAgXCJmOVwiLFxyXG4gICAgXCJmMTBcIixcclxuICAgIFwiZjExXCIsXHJcbiAgICBcImYxMlwiLFxyXG5dO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9