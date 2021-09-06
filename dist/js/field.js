/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/Shapes/Point.js":
/*!***********************************!*\
  !*** ./assets/js/Shapes/Point.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Point; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  /**
   * Create an instance of Point.
   *
   * @param $field
   */
  function Point($field) {
    _classCallCheck(this, Point);

    this.$field = {
      element: $field,
      image: $field.find('img'),
      point: $field.find('.acfImageMapPoint__point'),
      input: $field.find('.acfImageMapPoint__input')
    };
    var fieldSelector = this.$field.image.attr('data-label');
    this.$field.selector = "[data-name=\"".concat(fieldSelector, "\"]");
    this.$field.settings = {
      percentage: parseInt(this.$field.image.attr('data-percent-based'))
    };
    this.$linkedImage = this._getLinkedImage();
  }
  /**
   * Get the linked image according to user choice.
   *
   * @returns {boolean|*}
   * @private
   */


  _createClass(Point, [{
    key: "_getLinkedImage",
    value: function _getLinkedImage() {
      var $imgCon = this.$field.element.siblings(this.$field.selector);
      var $repeaterParent = this.$field.element.parents('.acf-field-repeater');

      while (!$imgCon.length) {
        if (!$repeaterParent.length) {
          console.error('Could not find a match for the linked image');
          return false;
        }

        $imgCon = $repeaterParent.siblings(this.$field.selector); // Get the next repeater parent

        $repeaterParent = $repeaterParent.parents('.acf-field-repeater');
      }

      return $imgCon.find('img[data-name="image"]');
    }
    /**
     * Load the image downloaded by user to the image map field.
     *
     * @private
     */

  }, {
    key: "_loadImage",
    value: function _loadImage() {
      var src = this.$linkedImage.attr('src');

      if (!src) {
        return;
      }

      this.$field.image.attr('src', src);
    }
    /**
     * When user clicks on the image.
     *
     * @param e
     * @private
     */

  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      var _this$_imageDimension = this._imageDimensions(),
          width = _this$_imageDimension.width,
          height = _this$_imageDimension.height;

      var x = "".concat(e.offsetX, "px");
      var y = "".concat(e.offsetY, "px");

      if (this.$field.settings.percentage) {
        x = "".concat((parseInt(x) / width * 100).toFixed(2), "%");
        y = "".concat((parseInt(y) / height * 100).toFixed(2), "%");
      }

      this._movePoint(x, y);

      this.$field.input.val("".concat(x, ",").concat(y));
      this.$field.input.change();
    }
    /**
     * Move the point on the image.
     *
     * @param x
     * @param y
     * @private
     */

  }, {
    key: "_movePoint",
    value: function _movePoint(x, y) {
      this.$field.point.css('left', x).css('top', y).addClass('isActive');
    }
    /**
     * Return width and height of the image.
     *
     * @returns {{width, height}}
     * @private
     */

  }, {
    key: "_imageDimensions",
    value: function _imageDimensions() {
      return {
        width: this.$field.image.width(),
        height: this.$field.image.height()
      };
    }
    /**
     * When the input with coords change.
     *
     * @private
     */

  }, {
    key: "_handleInputChange",
    value: function _handleInputChange() {
      var coordinates = this.$field.input.val().split(',');

      if (coordinates.length !== 2) {
        return;
      }

      var tempX = coordinates[0];
      var tempY = coordinates[1];

      if ( // @formatter:off
      isNaN(parseInt(tempX)) || tempX.indexOf('%') === -1 && tempX.indexOf('px') === -1 || isNaN(parseInt(tempY)) || tempY.indexOf('%') === -1 && tempY.indexOf('px') === -1 // @formatter:on
      ) {
        return;
      }

      this._movePoint(tempX, tempY);
    }
    /**
     * Set up the object.
     */

  }, {
    key: "init",
    value: function init() {
      if (!this.$linkedImage) {
        return;
      }

      this._loadImage();

      this.$linkedImage.on('load', this._loadImage.bind(this));
      this.$field.image.on('click', this._handleClick.bind(this));
      this.$field.input.on('change input', this._handleInputChange.bind(this));
    }
  }]);

  return Point;
}();



/***/ }),

/***/ "./assets/js/Shapes/Poly.js":
/*!**********************************!*\
  !*** ./assets/js/Shapes/Poly.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Poly; }
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./assets/js/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Poly = /*#__PURE__*/function () {
  /**
   * Create an instance of Poly.
   *
   * @param $field
   */
  function Poly($field) {
    var _this = this;

    _classCallCheck(this, Poly);

    this.$field = {
      element: $field,
      image: $field.find('img'),
      svg: $field.find('.acfImageMapPoly__svg'),
      input: $field.find('.acfImageMapPoly__input'),
      resetButton: $field.find('.acfImageMapPoly__reset'),
      imageWidthInput: $field.find('.acfImageMapPoly__imageWidth'),
      areaInput: $field.find('.acfImageMapPoly__areaInput')
    };
    var fieldSelector = this.$field.image.attr('data-label');
    this.$field.selector = "[data-name=\"".concat(fieldSelector, "\"]");
    this.$linkedImage = this._getLinkedImage();
    this.pointCoords = [];

    if (this.$field.input.val()) {
      var imageWidth = parseInt(this.$field.imageWidthInput.val());
      (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.chunk)(this.$field.input.val().split(','), 2).forEach(function (coords) {
        //@formatter:off
        var x = parseInt(coords[0]);
        var y = parseInt(coords[1]); //@formatter:on

        var $point = _this._createPointElement();

        _this.pointCoords.push({
          imageWidth: imageWidth,
          $el: $point,
          x: x,
          y: y
        });

        _this._movePoint(x, y, $point);
      });
    }

    this.polygon = this._createPolygon();
  }
  /**
   * Create a polygon.
   *
   * @private
   */


  _createClass(Poly, [{
    key: "_createPolygon",
    value: function _createPolygon() {
      var $polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      $polygon.classList.add('acfImageMapPoly__polygon');
      return $polygon;
    }
    /**
     * Get the linked image according to user choice.
     *
     * @returns {boolean|*}
     * @private
     */

  }, {
    key: "_getLinkedImage",
    value: function _getLinkedImage() {
      var $imgCon = this.$field.element.siblings(this.$field.selector);
      var $repeaterParent = this.$field.element.parents('.acf-field-repeater');

      while (!$imgCon.length) {
        if (!$repeaterParent.length) {
          console.error('Could not find a match for the linked image');
          return false;
        }

        $imgCon = $repeaterParent.siblings(this.$field.selector); // Get the next repeater parent

        $repeaterParent = $repeaterParent.parents('.acf-field-repeater');
      }

      return $imgCon.find('img[data-name="image"]');
    }
    /**
     * Load the image downloaded by user to the image map field.
     *
     * @private
     */

  }, {
    key: "_loadImage",
    value: function _loadImage() {
      var src = this.$linkedImage.attr('src');

      if (!src) {
        return;
      }

      this.$field.image.attr('src', src);
    }
    /**
     * Create a point element.
     *
     * @private
     */

  }, {
    key: "_createPointElement",
    value: function _createPointElement() {
      var $point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      $point.classList.add('acfImageMapPoly__point');
      $point.setAttribute('r', '5');
      return $point;
    }
    /**
     * Update the polygon
     *
     * @private
     */

  }, {
    key: "_updatePolygon",
    value: function _updatePolygon() {
      var points = '';
      this.pointCoords.forEach(function (pointCoord, index) {
        if (index > 0) {
          points += ',';
        }

        points += "".concat(pointCoord.x, ",").concat(pointCoord.y);
      });
      this.polygon.setAttribute('points', points);
      this.$field.svg.prepend(this.polygon);
    }
    /**
     * When user clicks on the image.
     *
     * @param e
     * @private
     */

  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      var x = e.offsetX;
      var y = e.offsetY;

      var $point = this._createPointElement();

      this.pointCoords.push({
        imageWidth: this._imageDimensions().width,
        $el: $point,
        x: x,
        y: y
      });

      this._movePoint(x, y, $point);

      this._update(x, y);
    }
    /**
     * Recalculate everything
     *
     * @private
     */

  }, {
    key: "recalculate",
    value: function recalculate() {
      var _this2 = this;

      if (this.pointCoords.length === 0) {
        return;
      }

      var _this$_imageDimension = this._imageDimensions(),
          width = _this$_imageDimension.width;

      this.pointCoords.map(function (pointCoord) {
        //@formatter:off
        pointCoord.x = Math.round(pointCoord.x * (width / pointCoord.imageWidth));
        pointCoord.y = Math.round(pointCoord.y * (width / pointCoord.imageWidth)); //@formatter:on

        pointCoord.imageWidth = width;

        _this2._movePoint(pointCoord.x, pointCoord.y, pointCoord.$el, false);
      });

      this._update();
    }
    /**
     * Reset the image map.
     *
     * @private
     */

  }, {
    key: "_reset",
    value: function _reset() {
      this.pointCoords = [];
      this.$field.svg.empty();
      this.$field.input.val('');
      this.$field.areaInput.val('');
      this.polygon = this._createPolygon();
    }
    /**
     * Update everything about coords (polygon, area)
     *
     * @private
     */

  }, {
    key: "_update",
    value: function _update() {
      this._updatePolygon();

      this.$field.input.val(this.polygon.getAttribute('points'));
      this.$field.imageWidthInput.val(this._imageDimensions().width);

      this._updateArea();
    }
    /**
     * Update area input with area coords.
     * (Will be sent to the front end later)
     *
     * @private
     */

  }, {
    key: "_updateArea",
    value: function _updateArea() {
      var _this$_imageDimension2 = this._imageDimensions(),
          width = _this$_imageDimension2.width,
          naturalWidth = _this$_imageDimension2.naturalWidth;

      var ratio = naturalWidth / width;
      var points = this.polygon.getAttribute('points').split(','); //@formatter:off

      this.$field.areaInput.val(points.map(function (point) {
        return Math.round(point * ratio);
      }).join(',')); //@formatter:on
    }
    /**
     * Move the point on the image.
     *
     * @param x
     * @param y
     * @param $point
     * @param append
     * @private
     */

  }, {
    key: "_movePoint",
    value: function _movePoint(x, y, $point) {
      var append = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      $point.setAttribute('cx', x);
      $point.setAttribute('cy', y);

      if (append) {
        this.$field.svg.append($point);
      }
    }
    /**
     * Return width and height of the image.
     *
     * @returns {{width, height}}
     * @private
     */

  }, {
    key: "_imageDimensions",
    value: function _imageDimensions() {
      return {
        width: this.$field.image.width(),
        height: this.$field.image.height(),
        naturalWidth: this.$field.image[0].naturalWidth,
        naturalHeight: this.$field.image[0].naturalHeight
      };
    }
    /**
     * Set up the object.
     */

  }, {
    key: "init",
    value: function init() {
      if (!this.$linkedImage) {
        return;
      }

      this._loadImage();

      this.$linkedImage.on('load', this._loadImage.bind(this));
      this.$field.svg.on('click', this._handleClick.bind(this));
      this.$field.resetButton.on('click', this._reset.bind(this));
      window.addEventListener('resize', this.recalculate.bind(this));
      window.addEventListener('load', this.recalculate.bind(this));
    }
  }]);

  return Poly;
}();



/***/ }),

/***/ "./assets/js/helpers.js":
/*!******************************!*\
  !*** ./assets/js/helpers.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chunk": function() { return /* binding */ chunk; }
/* harmony export */ });
var chunk = function chunk(arr, size) {
  return Array.from({
    length: Math.ceil(arr.length / size)
  }, function (v, i) {
    return arr.slice(i * size, i * size + size);
  });
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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./assets/js/field.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Shapes_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shapes/Point */ "./assets/js/Shapes/Point.js");
/* harmony import */ var _Shapes_Poly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shapes/Poly */ "./assets/js/Shapes/Poly.js");


/* eslint-disable */

(function ($) {
  if (typeof acf.add_action === 'undefined') {
    return;
  }
  /**
   * Ready Append
   *
   * These are 2 events which are fired during the page load.
   * ready = on page load similar to $(document).ready()
   * append = on new DOM elements appended via repeater field
   *
   * @param    element jQuery element which contains the ACF fields
   * @return void
   */


  acf.add_action('ready append', function (element) {
    acf.get_fields({
      type: 'image_map'
    }, element).each(function () {
      if ($(this).find('.acfImageMapPoint').length === 1) {
        var point = new _Shapes_Point__WEBPACK_IMPORTED_MODULE_0__["default"]($(this));
        point.init();
      } else if ($(this).find('.acfImageMapPoly').length === 1) {
        var poly = new _Shapes_Poly__WEBPACK_IMPORTED_MODULE_1__["default"]($(this));
        poly.init();
      }
    });
  });
})(jQuery);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2YsVUFBSUwsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRL0YsSUFBUixDQUFhLG1CQUFiLEVBQWtDZSxNQUFsQyxLQUE2QyxDQUFqRCxFQUFvRDtBQUNoRCxZQUFNZCxLQUFLLEdBQUcsSUFBSUwscURBQUosQ0FBVW1HLENBQUMsQ0FBQyxJQUFELENBQVgsQ0FBZDtBQUNBOUYsUUFBQUEsS0FBSyxDQUFDb0csSUFBTjtBQUNILE9BSEQsTUFHTyxJQUFJTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVEvRixJQUFSLENBQWEsa0JBQWIsRUFBaUNlLE1BQWpDLEtBQTRDLENBQWhELEVBQW1EO0FBQ3RELFlBQU11RixJQUFJLEdBQUcsSUFBSXpELG9EQUFKLENBQVNrRCxDQUFDLENBQUMsSUFBRCxDQUFWLENBQWI7QUFDQU8sUUFBQUEsSUFBSSxDQUFDRCxJQUFMO0FBQ0g7QUFDSixLQWJEO0FBY0gsR0FmRDtBQWdCSCxDQWhDSCxFQWlDRUUsTUFqQ0YsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZi1pbWFnZS1tYXAvLi9hc3NldHMvanMvU2hhcGVzL1BvaW50LmpzIiwid2VicGFjazovL2FjZi1pbWFnZS1tYXAvLi9hc3NldHMvanMvU2hhcGVzL1BvbHkuanMiLCJ3ZWJwYWNrOi8vYWNmLWltYWdlLW1hcC8uL2Fzc2V0cy9qcy9oZWxwZXJzLmpzIiwid2VicGFjazovL2FjZi1pbWFnZS1tYXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWNmLWltYWdlLW1hcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWNmLWltYWdlLW1hcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FjZi1pbWFnZS1tYXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hY2YtaW1hZ2UtbWFwLy4vYXNzZXRzL2pzL2ZpZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgUG9pbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gJGZpZWxkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoJGZpZWxkKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkID0ge1xuICAgICAgICAgICAgZWxlbWVudDogJGZpZWxkLFxuICAgICAgICAgICAgaW1hZ2U6ICRmaWVsZC5maW5kKCdpbWcnKSxcbiAgICAgICAgICAgIHBvaW50OiAkZmllbGQuZmluZCgnLmFjZkltYWdlTWFwUG9pbnRfX3BvaW50JyksXG4gICAgICAgICAgICBpbnB1dDogJGZpZWxkLmZpbmQoJy5hY2ZJbWFnZU1hcFBvaW50X19pbnB1dCcpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaWVsZFNlbGVjdG9yID0gdGhpcy4kZmllbGQuaW1hZ2UuYXR0cignZGF0YS1sYWJlbCcpO1xuICAgICAgICB0aGlzLiRmaWVsZC5zZWxlY3RvciA9IGBbZGF0YS1uYW1lPVwiJHtmaWVsZFNlbGVjdG9yfVwiXWA7XG4gICAgICAgIHRoaXMuJGZpZWxkLnNldHRpbmdzID0ge1xuICAgICAgICAgICAgcGVyY2VudGFnZTogcGFyc2VJbnQodGhpcy4kZmllbGQuaW1hZ2UuYXR0cignZGF0YS1wZXJjZW50LWJhc2VkJykpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJGxpbmtlZEltYWdlID0gdGhpcy5fZ2V0TGlua2VkSW1hZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxpbmtlZCBpbWFnZSBhY2NvcmRpbmcgdG8gdXNlciBjaG9pY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnwqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldExpbmtlZEltYWdlKCkge1xuICAgICAgICBsZXQgJGltZ0NvbiA9IHRoaXMuJGZpZWxkLmVsZW1lbnQuc2libGluZ3ModGhpcy4kZmllbGQuc2VsZWN0b3IpO1xuICAgICAgICBsZXQgJHJlcGVhdGVyUGFyZW50ID0gdGhpcy4kZmllbGQuZWxlbWVudC5wYXJlbnRzKCcuYWNmLWZpZWxkLXJlcGVhdGVyJyk7XG5cbiAgICAgICAgd2hpbGUgKCEkaW1nQ29uLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEkcmVwZWF0ZXJQYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IGZpbmQgYSBtYXRjaCBmb3IgdGhlIGxpbmtlZCBpbWFnZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGltZ0NvbiA9ICRyZXBlYXRlclBhcmVudC5zaWJsaW5ncyh0aGlzLiRmaWVsZC5zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgbmV4dCByZXBlYXRlciBwYXJlbnRcbiAgICAgICAgICAgICRyZXBlYXRlclBhcmVudCA9ICRyZXBlYXRlclBhcmVudC5wYXJlbnRzKCcuYWNmLWZpZWxkLXJlcGVhdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJGltZ0Nvbi5maW5kKCdpbWdbZGF0YS1uYW1lPVwiaW1hZ2VcIl0nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBpbWFnZSBkb3dubG9hZGVkIGJ5IHVzZXIgdG8gdGhlIGltYWdlIG1hcCBmaWVsZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2xvYWRJbWFnZSgpIHtcbiAgICAgICAgY29uc3Qgc3JjID0gdGhpcy4kbGlua2VkSW1hZ2UuYXR0cignc3JjJyk7XG4gICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRmaWVsZC5pbWFnZS5hdHRyKCdzcmMnLCBzcmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdXNlciBjbGlja3Mgb24gdGhlIGltYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9oYW5kbGVDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5faW1hZ2VEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgbGV0IHggPSBgJHtlLm9mZnNldFh9cHhgO1xuICAgICAgICBsZXQgeSA9IGAke2Uub2Zmc2V0WX1weGA7XG5cbiAgICAgICAgaWYgKHRoaXMuJGZpZWxkLnNldHRpbmdzLnBlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAgIHggPSBgJHsoKHBhcnNlSW50KHgpIC8gd2lkdGgpICogMTAwKS50b0ZpeGVkKDIpfSVgO1xuICAgICAgICAgICAgeSA9IGAkeygocGFyc2VJbnQoeSkgLyBoZWlnaHQpICogMTAwKS50b0ZpeGVkKDIpfSVgO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZVBvaW50KHgsIHkpO1xuXG4gICAgICAgIHRoaXMuJGZpZWxkLmlucHV0LnZhbChgJHt4fSwke3l9YCk7XG4gICAgICAgIHRoaXMuJGZpZWxkLmlucHV0LmNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdGhlIHBvaW50IG9uIHRoZSBpbWFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9tb3ZlUG9pbnQoeCwgeSkge1xuICAgICAgICB0aGlzLiRmaWVsZC5wb2ludC5jc3MoJ2xlZnQnLCB4KS5jc3MoJ3RvcCcsIHkpLmFkZENsYXNzKCdpc0FjdGl2ZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBpbWFnZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHt7d2lkdGgsIGhlaWdodH19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW1hZ2VEaW1lbnNpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuJGZpZWxkLmltYWdlLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuJGZpZWxkLmltYWdlLmhlaWdodCgpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIGlucHV0IHdpdGggY29vcmRzIGNoYW5nZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlKCkge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuJGZpZWxkLmlucHV0LnZhbCgpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGVtcFggPSBjb29yZGluYXRlc1swXTtcbiAgICAgICAgY29uc3QgdGVtcFkgPSBjb29yZGluYXRlc1sxXTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBAZm9ybWF0dGVyOm9mZlxuICAgICAgICAgICAgaXNOYU4ocGFyc2VJbnQodGVtcFgpKSB8fFxuICAgICAgICAgICAgKHRlbXBYLmluZGV4T2YoJyUnKSA9PT0gLTEgJiYgdGVtcFguaW5kZXhPZigncHgnKSA9PT0gLTEpIHx8XG4gICAgICAgICAgICBpc05hTihwYXJzZUludCh0ZW1wWSkpIHx8XG4gICAgICAgICAgICAodGVtcFkuaW5kZXhPZignJScpID09PSAtMSAmJiB0ZW1wWS5pbmRleE9mKCdweCcpID09PSAtMSlcbiAgICAgICAgICAgIC8vIEBmb3JtYXR0ZXI6b25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tb3ZlUG9pbnQodGVtcFgsIHRlbXBZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgdGhlIG9iamVjdC5cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuJGxpbmtlZEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2FkSW1hZ2UoKTtcbiAgICAgICAgdGhpcy4kbGlua2VkSW1hZ2Uub24oJ2xvYWQnLCB0aGlzLl9sb2FkSW1hZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy4kZmllbGQuaW1hZ2Uub24oJ2NsaWNrJywgdGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuJGZpZWxkLmlucHV0Lm9uKCdjaGFuZ2UgaW5wdXQnLCB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjaHVuayB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgUG9seS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAkZmllbGRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigkZmllbGQpIHtcbiAgICAgICAgdGhpcy4kZmllbGQgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiAkZmllbGQsXG4gICAgICAgICAgICBpbWFnZTogJGZpZWxkLmZpbmQoJ2ltZycpLFxuICAgICAgICAgICAgc3ZnOiAkZmllbGQuZmluZCgnLmFjZkltYWdlTWFwUG9seV9fc3ZnJyksXG4gICAgICAgICAgICBpbnB1dDogJGZpZWxkLmZpbmQoJy5hY2ZJbWFnZU1hcFBvbHlfX2lucHV0JyksXG4gICAgICAgICAgICByZXNldEJ1dHRvbjogJGZpZWxkLmZpbmQoJy5hY2ZJbWFnZU1hcFBvbHlfX3Jlc2V0JyksXG4gICAgICAgICAgICBpbWFnZVdpZHRoSW5wdXQ6ICRmaWVsZC5maW5kKCcuYWNmSW1hZ2VNYXBQb2x5X19pbWFnZVdpZHRoJyksXG4gICAgICAgICAgICBhcmVhSW5wdXQ6ICRmaWVsZC5maW5kKCcuYWNmSW1hZ2VNYXBQb2x5X19hcmVhSW5wdXQnKVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaWVsZFNlbGVjdG9yID0gdGhpcy4kZmllbGQuaW1hZ2UuYXR0cignZGF0YS1sYWJlbCcpO1xuICAgICAgICB0aGlzLiRmaWVsZC5zZWxlY3RvciA9IGBbZGF0YS1uYW1lPVwiJHtmaWVsZFNlbGVjdG9yfVwiXWA7XG5cbiAgICAgICAgdGhpcy4kbGlua2VkSW1hZ2UgPSB0aGlzLl9nZXRMaW5rZWRJbWFnZSgpO1xuXG4gICAgICAgIHRoaXMucG9pbnRDb29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuJGZpZWxkLmlucHV0LnZhbCgpKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVdpZHRoID0gcGFyc2VJbnQodGhpcy4kZmllbGQuaW1hZ2VXaWR0aElucHV0LnZhbCgpKTtcblxuICAgICAgICAgICAgY2h1bmsodGhpcy4kZmllbGQuaW5wdXQudmFsKCkuc3BsaXQoJywnKSwgMikuZm9yRWFjaChjb29yZHMgPT4ge1xuICAgICAgICAgICAgICAgIC8vQGZvcm1hdHRlcjpvZmZcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KGNvb3Jkc1swXSk7XG4gICAgICAgICAgICAgICAgbGV0IHkgPXBhcnNlSW50KGNvb3Jkc1sxXSk7XG4gICAgICAgICAgICAgICAgLy9AZm9ybWF0dGVyOm9uXG5cbiAgICAgICAgICAgICAgICBjb25zdCAkcG9pbnQgPSB0aGlzLl9jcmVhdGVQb2ludEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRDb29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGg6IGltYWdlV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICRlbDogJHBvaW50LFxuICAgICAgICAgICAgICAgICAgICB4LFxuICAgICAgICAgICAgICAgICAgICB5XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUG9pbnQoeCwgeSwgJHBvaW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uID0gdGhpcy5fY3JlYXRlUG9seWdvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jcmVhdGVQb2x5Z29uKCkge1xuICAgICAgICBjb25zdCAkcG9seWdvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncG9seWdvbicpO1xuICAgICAgICAkcG9seWdvbi5jbGFzc0xpc3QuYWRkKCdhY2ZJbWFnZU1hcFBvbHlfX3BvbHlnb24nKTtcbiAgICAgICAgcmV0dXJuICRwb2x5Z29uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGlua2VkIGltYWdlIGFjY29yZGluZyB0byB1c2VyIGNob2ljZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufCp9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0TGlua2VkSW1hZ2UoKSB7XG4gICAgICAgIGxldCAkaW1nQ29uID0gdGhpcy4kZmllbGQuZWxlbWVudC5zaWJsaW5ncyh0aGlzLiRmaWVsZC5zZWxlY3Rvcik7XG4gICAgICAgIGxldCAkcmVwZWF0ZXJQYXJlbnQgPSB0aGlzLiRmaWVsZC5lbGVtZW50LnBhcmVudHMoJy5hY2YtZmllbGQtcmVwZWF0ZXInKTtcblxuICAgICAgICB3aGlsZSAoISRpbWdDb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISRyZXBlYXRlclBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZmluZCBhIG1hdGNoIGZvciB0aGUgbGlua2VkIGltYWdlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkaW1nQ29uID0gJHJlcGVhdGVyUGFyZW50LnNpYmxpbmdzKHRoaXMuJGZpZWxkLnNlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSBuZXh0IHJlcGVhdGVyIHBhcmVudFxuICAgICAgICAgICAgJHJlcGVhdGVyUGFyZW50ID0gJHJlcGVhdGVyUGFyZW50LnBhcmVudHMoJy5hY2YtZmllbGQtcmVwZWF0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAkaW1nQ29uLmZpbmQoJ2ltZ1tkYXRhLW5hbWU9XCJpbWFnZVwiXScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIGltYWdlIGRvd25sb2FkZWQgYnkgdXNlciB0byB0aGUgaW1hZ2UgbWFwIGZpZWxkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbG9hZEltYWdlKCkge1xuICAgICAgICBjb25zdCBzcmMgPSB0aGlzLiRsaW5rZWRJbWFnZS5hdHRyKCdzcmMnKTtcbiAgICAgICAgaWYgKCFzcmMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGZpZWxkLmltYWdlLmF0dHIoJ3NyYycsIHNyYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcG9pbnQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NyZWF0ZVBvaW50RWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgJHBvaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdjaXJjbGUnKTtcbiAgICAgICAgJHBvaW50LmNsYXNzTGlzdC5hZGQoJ2FjZkltYWdlTWFwUG9seV9fcG9pbnQnKTtcbiAgICAgICAgJHBvaW50LnNldEF0dHJpYnV0ZSgncicsICc1Jyk7XG4gICAgICAgIHJldHVybiAkcG9pbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwb2x5Z29uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGRhdGVQb2x5Z29uKCkge1xuICAgICAgICBsZXQgcG9pbnRzID0gJyc7XG4gICAgICAgIHRoaXMucG9pbnRDb29yZHMuZm9yRWFjaCgocG9pbnRDb29yZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICBwb2ludHMgKz0gJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9pbnRzICs9IGAke3BvaW50Q29vcmQueH0sJHtwb2ludENvb3JkLnl9YDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wb2x5Z29uLnNldEF0dHJpYnV0ZSgncG9pbnRzJywgcG9pbnRzKTtcbiAgICAgICAgdGhpcy4kZmllbGQuc3ZnLnByZXBlbmQodGhpcy5wb2x5Z29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHVzZXIgY2xpY2tzIG9uIHRoZSBpbWFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBsZXQgeCA9IGUub2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSBlLm9mZnNldFk7XG4gICAgICAgIGNvbnN0ICRwb2ludCA9IHRoaXMuX2NyZWF0ZVBvaW50RWxlbWVudCgpO1xuXG4gICAgICAgIHRoaXMucG9pbnRDb29yZHMucHVzaCh7XG4gICAgICAgICAgICBpbWFnZVdpZHRoOiB0aGlzLl9pbWFnZURpbWVuc2lvbnMoKS53aWR0aCxcbiAgICAgICAgICAgICRlbDogJHBvaW50LFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbW92ZVBvaW50KHgsIHksICRwb2ludCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZSh4LCB5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWNhbGN1bGF0ZSBldmVyeXRoaW5nXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY2FsY3VsYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5wb2ludENvb3Jkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt3aWR0aH0gPSB0aGlzLl9pbWFnZURpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLnBvaW50Q29vcmRzLm1hcChwb2ludENvb3JkID0+IHtcbiAgICAgICAgICAgIC8vQGZvcm1hdHRlcjpvZmZcbiAgICAgICAgICAgIHBvaW50Q29vcmQueCA9IE1hdGgucm91bmQocG9pbnRDb29yZC54ICogKHdpZHRoIC8gcG9pbnRDb29yZC5pbWFnZVdpZHRoKSk7XG4gICAgICAgICAgICBwb2ludENvb3JkLnkgPSBNYXRoLnJvdW5kKHBvaW50Q29vcmQueSAqICh3aWR0aCAvIHBvaW50Q29vcmQuaW1hZ2VXaWR0aCkpO1xuICAgICAgICAgICAgLy9AZm9ybWF0dGVyOm9uXG4gICAgICAgICAgICBwb2ludENvb3JkLmltYWdlV2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX21vdmVQb2ludChwb2ludENvb3JkLngsIHBvaW50Q29vcmQueSwgcG9pbnRDb29yZC4kZWwsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIGltYWdlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jlc2V0KCkge1xuICAgICAgICB0aGlzLnBvaW50Q29vcmRzID0gW107XG4gICAgICAgIHRoaXMuJGZpZWxkLnN2Zy5lbXB0eSgpO1xuICAgICAgICB0aGlzLiRmaWVsZC5pbnB1dC52YWwoJycpO1xuICAgICAgICB0aGlzLiRmaWVsZC5hcmVhSW5wdXQudmFsKCcnKTtcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gdGhpcy5fY3JlYXRlUG9seWdvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBldmVyeXRoaW5nIGFib3V0IGNvb3JkcyAocG9seWdvbiwgYXJlYSlcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUG9seWdvbigpO1xuICAgICAgICB0aGlzLiRmaWVsZC5pbnB1dC52YWwodGhpcy5wb2x5Z29uLmdldEF0dHJpYnV0ZSgncG9pbnRzJykpO1xuICAgICAgICB0aGlzLiRmaWVsZC5pbWFnZVdpZHRoSW5wdXQudmFsKHRoaXMuX2ltYWdlRGltZW5zaW9ucygpLndpZHRoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQXJlYSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhcmVhIGlucHV0IHdpdGggYXJlYSBjb29yZHMuXG4gICAgICogKFdpbGwgYmUgc2VudCB0byB0aGUgZnJvbnQgZW5kIGxhdGVyKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBkYXRlQXJlYSgpIHtcbiAgICAgICAgY29uc3Qge3dpZHRoLCBuYXR1cmFsV2lkdGh9ID0gdGhpcy5faW1hZ2VEaW1lbnNpb25zKCk7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gbmF0dXJhbFdpZHRoIC8gd2lkdGg7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2x5Z29uLmdldEF0dHJpYnV0ZSgncG9pbnRzJykuc3BsaXQoJywnKTtcblxuICAgICAgICAvL0Bmb3JtYXR0ZXI6b2ZmXG4gICAgICAgIHRoaXMuJGZpZWxkLmFyZWFJbnB1dC52YWwocG9pbnRzLm1hcChwb2ludCA9PiBNYXRoLnJvdW5kKHBvaW50ICogcmF0aW8pKS5qb2luKCcsJykpO1xuICAgICAgICAvL0Bmb3JtYXR0ZXI6b25cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBwb2ludCBvbiB0aGUgaW1hZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHBhcmFtICRwb2ludFxuICAgICAqIEBwYXJhbSBhcHBlbmRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9tb3ZlUG9pbnQoeCwgeSwgJHBvaW50LCBhcHBlbmQgPSB0cnVlKSB7XG4gICAgICAgICRwb2ludC5zZXRBdHRyaWJ1dGUoJ2N4JywgeCk7XG4gICAgICAgICRwb2ludC5zZXRBdHRyaWJ1dGUoJ2N5JywgeSk7XG4gICAgICAgIGlmIChhcHBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZpZWxkLnN2Zy5hcHBlbmQoJHBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBpbWFnZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHt7d2lkdGgsIGhlaWdodH19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW1hZ2VEaW1lbnNpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuJGZpZWxkLmltYWdlLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuJGZpZWxkLmltYWdlLmhlaWdodCgpLFxuICAgICAgICAgICAgbmF0dXJhbFdpZHRoOiB0aGlzLiRmaWVsZC5pbWFnZVswXS5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiB0aGlzLiRmaWVsZC5pbWFnZVswXS5uYXR1cmFsSGVpZ2h0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHRoZSBvYmplY3QuXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRsaW5rZWRJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZEltYWdlKCk7XG4gICAgICAgIHRoaXMuJGxpbmtlZEltYWdlLm9uKCdsb2FkJywgdGhpcy5fbG9hZEltYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuJGZpZWxkLnN2Zy5vbignY2xpY2snLCB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy4kZmllbGQucmVzZXRCdXR0b24ub24oJ2NsaWNrJywgdGhpcy5fcmVzZXQuYmluZCh0aGlzKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlY2FsY3VsYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMucmVjYWxjdWxhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGNodW5rID0gKGFyciwgc2l6ZSkgPT5cbiAgQXJyYXkuZnJvbShcbiAgICAgIHtsZW5ndGg6IE1hdGguY2VpbChhcnIubGVuZ3RoIC8gc2l6ZSl9LFxuICAgICAgKHYsIGkpID0+XG4gICAgICBhcnIuc2xpY2UoaSAqIHNpemUsIGkgKiBzaXplICsgc2l6ZSlcbiAgKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi9TaGFwZXMvUG9pbnQnO1xuaW1wb3J0IFBvbHkgZnJvbSAnLi9TaGFwZXMvUG9seSc7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbihcbiAgZnVuY3Rpb24gKCQpIHtcbiAgICAgIGlmICh0eXBlb2YgYWNmLmFkZF9hY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFJlYWR5IEFwcGVuZFxuICAgICAgICpcbiAgICAgICAqIFRoZXNlIGFyZSAyIGV2ZW50cyB3aGljaCBhcmUgZmlyZWQgZHVyaW5nIHRoZSBwYWdlIGxvYWQuXG4gICAgICAgKiByZWFkeSA9IG9uIHBhZ2UgbG9hZCBzaW1pbGFyIHRvICQoZG9jdW1lbnQpLnJlYWR5KClcbiAgICAgICAqIGFwcGVuZCA9IG9uIG5ldyBET00gZWxlbWVudHMgYXBwZW5kZWQgdmlhIHJlcGVhdGVyIGZpZWxkXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtICAgIGVsZW1lbnQgalF1ZXJ5IGVsZW1lbnQgd2hpY2ggY29udGFpbnMgdGhlIEFDRiBmaWVsZHNcbiAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICovXG4gICAgICBhY2YuYWRkX2FjdGlvbigncmVhZHkgYXBwZW5kJywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICBhY2YuZ2V0X2ZpZWxkcyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2VfbWFwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICApLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYWNmSW1hZ2VNYXBQb2ludCcpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBuZXcgUG9pbnQoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICBwb2ludC5pbml0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5maW5kKCcuYWNmSW1hZ2VNYXBQb2x5JykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwb2x5ID0gbmV3IFBvbHkoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICBwb2x5LmluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbikoalF1ZXJ5KTtcbiJdLCJuYW1lcyI6WyJQb2ludCIsIiRmaWVsZCIsImVsZW1lbnQiLCJpbWFnZSIsImZpbmQiLCJwb2ludCIsImlucHV0IiwiZmllbGRTZWxlY3RvciIsImF0dHIiLCJzZWxlY3RvciIsInNldHRpbmdzIiwicGVyY2VudGFnZSIsInBhcnNlSW50IiwiJGxpbmtlZEltYWdlIiwiX2dldExpbmtlZEltYWdlIiwiJGltZ0NvbiIsInNpYmxpbmdzIiwiJHJlcGVhdGVyUGFyZW50IiwicGFyZW50cyIsImxlbmd0aCIsImNvbnNvbGUiLCJlcnJvciIsInNyYyIsImUiLCJfaW1hZ2VEaW1lbnNpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJ4Iiwib2Zmc2V0WCIsInkiLCJvZmZzZXRZIiwidG9GaXhlZCIsIl9tb3ZlUG9pbnQiLCJ2YWwiLCJjaGFuZ2UiLCJjc3MiLCJhZGRDbGFzcyIsImNvb3JkaW5hdGVzIiwic3BsaXQiLCJ0ZW1wWCIsInRlbXBZIiwiaXNOYU4iLCJpbmRleE9mIiwiX2xvYWRJbWFnZSIsIm9uIiwiYmluZCIsIl9oYW5kbGVDbGljayIsIl9oYW5kbGVJbnB1dENoYW5nZSIsImNodW5rIiwiUG9seSIsInN2ZyIsInJlc2V0QnV0dG9uIiwiaW1hZ2VXaWR0aElucHV0IiwiYXJlYUlucHV0IiwicG9pbnRDb29yZHMiLCJpbWFnZVdpZHRoIiwiZm9yRWFjaCIsImNvb3JkcyIsIiRwb2ludCIsIl9jcmVhdGVQb2ludEVsZW1lbnQiLCJwdXNoIiwiJGVsIiwicG9seWdvbiIsIl9jcmVhdGVQb2x5Z29uIiwiJHBvbHlnb24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnROUyIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsInBvaW50cyIsInBvaW50Q29vcmQiLCJpbmRleCIsInByZXBlbmQiLCJfdXBkYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiZW1wdHkiLCJfdXBkYXRlUG9seWdvbiIsImdldEF0dHJpYnV0ZSIsIl91cGRhdGVBcmVhIiwibmF0dXJhbFdpZHRoIiwicmF0aW8iLCJqb2luIiwiYXBwZW5kIiwibmF0dXJhbEhlaWdodCIsIl9yZXNldCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWNhbGN1bGF0ZSIsImFyciIsInNpemUiLCJBcnJheSIsImZyb20iLCJjZWlsIiwidiIsImkiLCJzbGljZSIsIiQiLCJhY2YiLCJhZGRfYWN0aW9uIiwiZ2V0X2ZpZWxkcyIsInR5cGUiLCJlYWNoIiwiaW5pdCIsInBvbHkiLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9