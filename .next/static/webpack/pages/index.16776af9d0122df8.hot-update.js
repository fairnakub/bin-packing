"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./utils/stringToColor.js":
/*!********************************!*\
  !*** ./utils/stringToColor.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\nfunction stringToColor(str) {\n  var hash = crypto.subtle.digest(\"SHA-256\", new TextEncoder().encode(str));\n  var hashArray = Array.from(new Uint8Array(hash));\n  var hashHex = hashArray.map(function (b) {\n    return b.toString(16).padStart(2, \"0\");\n  }).join(\"\");\n  var color = \"#\".concat(hashHex.slice(0, 6)); // Calculate the luminance of the color\n\n  var r = parseInt(color.slice(1, 3), 16);\n  var g = parseInt(color.slice(3, 5), 16);\n  var b = parseInt(color.slice(5), 16);\n  var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // If the color is too light, make it darker\n\n  if (luminance > 0.7) {\n    var factor = 0.5;\n    var newColor = color.replace(/^#(\\w\\w)(\\w\\w)(\\w\\w)$/, function (match, r, g, b) {\n      var newR = Math.max(0, parseInt(r, 16) * factor);\n      var newG = Math.max(0, parseInt(g, 16) * factor);\n      var newB = Math.max(0, parseInt(b, 16) * factor);\n      return \"#\".concat(newR.toString(16)).concat(newG.toString(16)).concat(newB.toString(16));\n    });\n    return newColor;\n  } // If the color is too dark, make it lighter\n\n\n  if (luminance < 0.3) {\n    var _factor = 1.5;\n\n    var _newColor = color.replace(/^#(\\w\\w)(\\w\\w)(\\w\\w)$/, function (match, r, g, b) {\n      var newR = Math.min(255, parseInt(r, 16) * _factor);\n      var newG = Math.min(255, parseInt(g, 16) * _factor);\n      var newB = Math.min(255, parseInt(b, 16) * _factor);\n      return \"#\".concat(newR.toString(16)).concat(newG.toString(16)).concat(newB.toString(16));\n    });\n\n    return _newColor;\n  }\n\n  return color;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stringToColor);\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUosQ0FBUixHQUFrQkksT0FBaEMsQ0FBYjtNQUNBLElBQU1PLElBQUksR0FBR0YsSUFBSSxDQUFDSSxHQUFMLENBQVMsR0FBVCxFQUFjWixRQUFRLENBQUNDLENBQUQsRUFBSSxFQUFKLENBQVIsR0FBa0JFLE9BQWhDLENBQWI7TUFDQSxJQUFNUSxJQUFJLEdBQUdILElBQUksQ0FBQ0ksR0FBTCxDQUFTLEdBQVQsRUFBY1osUUFBUSxDQUFDUCxDQUFELEVBQUksRUFBSixDQUFSLEdBQWtCVSxPQUFoQyxDQUFiO01BQ0Esa0JBQVdJLElBQUksQ0FBQ2IsUUFBTCxDQUFjLEVBQWQsQ0FBWCxTQUErQmdCLElBQUksQ0FBQ2hCLFFBQUwsQ0FBYyxFQUFkLENBQS9CLFNBQW1EaUIsSUFBSSxDQUFDakIsUUFBTCxDQUFjLEVBQWQsQ0FBbkQ7SUFDRCxDQVBjLENBQWpCOztJQVNBLE9BQU9VLFNBQVA7RUFDRDs7RUFFRCxPQUFPUCxLQUFQO0FBQ0Q7O0FBRUQsK0RBQWVsQixhQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3V0aWxzL3N0cmluZ1RvQ29sb3IuanM/YmNkNSJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzdHJpbmdUb0NvbG9yKHN0cikge1xuICBjb25zdCBoYXNoID0gY3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtMjU2XCIsIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdHIpKTtcbiAgY29uc3QgaGFzaEFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoKSk7XG4gIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXlcbiAgICAubWFwKChiKSA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpXG4gICAgLmpvaW4oXCJcIik7XG4gIGNvbnN0IGNvbG9yID0gYCMke2hhc2hIZXguc2xpY2UoMCwgNil9YDtcblxuICAvLyBDYWxjdWxhdGUgdGhlIGx1bWluYW5jZSBvZiB0aGUgY29sb3JcbiAgY29uc3QgciA9IHBhcnNlSW50KGNvbG9yLnNsaWNlKDEsIDMpLCAxNik7XG4gIGNvbnN0IGcgPSBwYXJzZUludChjb2xvci5zbGljZSgzLCA1KSwgMTYpO1xuICBjb25zdCBiID0gcGFyc2VJbnQoY29sb3Iuc2xpY2UoNSksIDE2KTtcbiAgY29uc3QgbHVtaW5hbmNlID0gKDAuMjk5ICogciArIDAuNTg3ICogZyArIDAuMTE0ICogYikgLyAyNTU7XG5cbiAgLy8gSWYgdGhlIGNvbG9yIGlzIHRvbyBsaWdodCwgbWFrZSBpdCBkYXJrZXJcbiAgaWYgKGx1bWluYW5jZSA+IDAuNykge1xuICAgIGNvbnN0IGZhY3RvciA9IDAuNTtcbiAgICBjb25zdCBuZXdDb2xvciA9IGNvbG9yLnJlcGxhY2UoXG4gICAgICAvXiMoXFx3XFx3KShcXHdcXHcpKFxcd1xcdykkLyxcbiAgICAgIChtYXRjaCwgciwgZywgYikgPT4ge1xuICAgICAgICBjb25zdCBuZXdSID0gTWF0aC5tYXgoMCwgcGFyc2VJbnQociwgMTYpICogZmFjdG9yKTtcbiAgICAgICAgY29uc3QgbmV3RyA9IE1hdGgubWF4KDAsIHBhcnNlSW50KGcsIDE2KSAqIGZhY3Rvcik7XG4gICAgICAgIGNvbnN0IG5ld0IgPSBNYXRoLm1heCgwLCBwYXJzZUludChiLCAxNikgKiBmYWN0b3IpO1xuICAgICAgICByZXR1cm4gYCMke25ld1IudG9TdHJpbmcoMTYpfSR7bmV3Ry50b1N0cmluZygxNil9JHtuZXdCLnRvU3RyaW5nKDE2KX1gO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIG5ld0NvbG9yO1xuICB9XG5cbiAgLy8gSWYgdGhlIGNvbG9yIGlzIHRvbyBkYXJrLCBtYWtlIGl0IGxpZ2h0ZXJcbiAgaWYgKGx1bWluYW5jZSA8IDAuMykge1xuICAgIGNvbnN0IGZhY3RvciA9IDEuNTtcbiAgICBjb25zdCBuZXdDb2xvciA9IGNvbG9yLnJlcGxhY2UoXG4gICAgICAvXiMoXFx3XFx3KShcXHdcXHcpKFxcd1xcdykkLyxcbiAgICAgIChtYXRjaCwgciwgZywgYikgPT4ge1xuICAgICAgICBjb25zdCBuZXdSID0gTWF0aC5taW4oMjU1LCBwYXJzZUludChyLCAxNikgKiBmYWN0b3IpO1xuICAgICAgICBjb25zdCBuZXdHID0gTWF0aC5taW4oMjU1LCBwYXJzZUludChnLCAxNikgKiBmYWN0b3IpO1xuICAgICAgICBjb25zdCBuZXdCID0gTWF0aC5taW4oMjU1LCBwYXJzZUludChiLCAxNikgKiBmYWN0b3IpO1xuICAgICAgICByZXR1cm4gYCMke25ld1IudG9TdHJpbmcoMTYpfSR7bmV3Ry50b1N0cmluZygxNil9JHtuZXdCLnRvU3RyaW5nKDE2KX1gO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIG5ld0NvbG9yO1xuICB9XG5cbiAgcmV0dXJuIGNvbG9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdUb0NvbG9yO1xuIl0sIm5hbWVzIjpbInN0cmluZ1RvQ29sb3IiLCJzdHIiLCJoYXNoIiwiY3J5cHRvIiwic3VidGxlIiwiZGlnZXN0IiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJoYXNoQXJyYXkiLCJBcnJheSIsImZyb20iLCJVaW50OEFycmF5IiwiaGFzaEhleCIsIm1hcCIsImIiLCJ0b1N0cmluZyIsInBhZFN0YXJ0Iiwiam9pbiIsImNvbG9yIiwic2xpY2UiLCJyIiwicGFyc2VJbnQiLCJnIiwibHVtaW5hbmNlIiwiZmFjdG9yIiwibmV3Q29sb3IiLCJyZXBsYWNlIiwibWF0Y2giLCJuZXdSIiwiTWF0aCIsIm1heCIsIm5ld0ciLCJuZXdCIiwibWluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/stringToColor.js\n"));

/***/ })

});