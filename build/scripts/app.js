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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/scripts/app.js":
/*!****************************!*\
  !*** ./app/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var progress = document.createElement('div');\nprogress.classList.add('progress-bar');\nprogress.style.position = 'fixed';\nprogress.style.left = 0;\nprogress.style.top = 0;\nprogress.style.width = '0%';\nprogress.style.height = '4px';\nprogress.style.zIndex = '100000';\nprogress.style.backgroundColor = '#ffc000';\ndocument.body.appendChild(progress);\nwindow.addEventListener('scroll', function () {\n  var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;\n  var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;\n  var peer = windowScroll / windowHeight * 100;\n  progress.style.width = peer + '%';\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9hcHAuanM/YTdiNSJdLCJuYW1lcyI6WyJwcm9ncmVzcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93U2Nyb2xsIiwic2Nyb2xsVG9wIiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicGVlciJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTUEsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQUYsUUFBUSxDQUFDRyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixjQUF2QjtBQUNBSixRQUFRLENBQUNLLEtBQVQsQ0FBZUMsUUFBZixHQUEwQixPQUExQjtBQUNBTixRQUFRLENBQUNLLEtBQVQsQ0FBZUUsSUFBZixHQUFzQixDQUF0QjtBQUNBUCxRQUFRLENBQUNLLEtBQVQsQ0FBZUcsR0FBZixHQUFxQixDQUFyQjtBQUNBUixRQUFRLENBQUNLLEtBQVQsQ0FBZUksS0FBZixHQUF1QixJQUF2QjtBQUNBVCxRQUFRLENBQUNLLEtBQVQsQ0FBZUssTUFBZixHQUF3QixLQUF4QjtBQUNBVixRQUFRLENBQUNLLEtBQVQsQ0FBZU0sTUFBZixHQUF3QixRQUF4QjtBQUNBWCxRQUFRLENBQUNLLEtBQVQsQ0FBZU8sZUFBZixHQUFpQyxTQUFqQztBQUNBWCxRQUFRLENBQUNZLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmQsUUFBMUI7QUFFQWUsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0FBQ3BDLE1BQUlDLFlBQVksR0FBR2hCLFFBQVEsQ0FBQ1ksSUFBVCxDQUFjSyxTQUFkLElBQTJCakIsUUFBUSxDQUFDa0IsZUFBVCxDQUF5QkQsU0FBdkU7QUFDQSxNQUFJRSxZQUFZLEdBQUduQixRQUFRLENBQUNrQixlQUFULENBQXlCRSxZQUF6QixHQUF3Q3BCLFFBQVEsQ0FBQ2tCLGVBQVQsQ0FBeUJHLFlBQXBGO0FBQ0EsTUFBSUMsSUFBSSxHQUFHTixZQUFZLEdBQUdHLFlBQWYsR0FBOEIsR0FBekM7QUFDQXBCLFVBQVEsQ0FBQ0ssS0FBVCxDQUFlSSxLQUFmLEdBQXVCYyxJQUFJLEdBQUcsR0FBOUI7QUFDSCxDQUxEIiwiZmlsZSI6Ii4vYXBwL3NjcmlwdHMvYXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxucHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3MtYmFyJyk7XHJcbnByb2dyZXNzLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxucHJvZ3Jlc3Muc3R5bGUubGVmdCA9IDA7XHJcbnByb2dyZXNzLnN0eWxlLnRvcCA9IDA7XHJcbnByb2dyZXNzLnN0eWxlLndpZHRoID0gJzAlJztcclxucHJvZ3Jlc3Muc3R5bGUuaGVpZ2h0ID0gJzRweCc7XHJcbnByb2dyZXNzLnN0eWxlLnpJbmRleCA9ICcxMDAwMDAnXHJcbnByb2dyZXNzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZjMDAwJztcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm9ncmVzcyk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgbGV0IHdpbmRvd1Njcm9sbCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICBsZXQgcGVlciA9IHdpbmRvd1Njcm9sbCAvIHdpbmRvd0hlaWdodCAqIDEwMDtcclxuICAgIHByb2dyZXNzLnN0eWxlLndpZHRoID0gcGVlciArICclJztcclxufSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/scripts/app.js\n");

/***/ })

/******/ });