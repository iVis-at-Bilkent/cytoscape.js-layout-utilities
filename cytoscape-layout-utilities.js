(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeLayoutUtilities"] = factory();
	else
		root["cytoscapeLayoutUtilities"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polyomino = function () {
    /**
     * @param { number } width width of the polyomino in pixels
     * @param { number } height height of the polyomino in pixels
     * @param { number } index index in according to the input
     * @param { number } x1
     * @param { number } y1
     * @param { number } gridStep width and height of a grid square
     * 
     * @description 
     * Note: width and height are added to establish centering according to old layout center
     * 
     * Since width divided by the grid step can be calclated from raw step instead of adding new
     * variables I changed width and height and added gridStep variable so that stepWith and stepHeight can be calculated
     * from these. 
     * 
     * Old width and height properties were containing actually width and height divided by grid step, so I thought stepWidth and
     * stepHeight are more convenient names for them. 
     */
    function Polyomino(x1, y1, width, height, gridStep, index) {
        _classCallCheck(this, Polyomino);

        this.width = width;
        this.height = height;
        this.gridStep = gridStep;
        this.grid = new Array(this.stepWidth);
        for (var i = 0; i < this.stepWidth; i++) {
            this.grid[i] = new Array(this.stepHeight);
            for (var j = 0; j < this.stepHeight; j++) {
                this.grid[i][j] = false;
            }
        }
        this.index = index; //index of polyomino in the input of the packing function
        this.x1 = x1; //kept to determine the amount of shift in the output
        this.y1 = y1; //kept to determine the amount of shift in the output
        this.location = new Point(-1, -1); //the grid cell coordinates where the polyomino was placed
        /** inner center */
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2)); // center of polyomino
        this.numberOfOccupiredCells = 0;
    }

    /**
     * width of the polyomino divided by grid steps
     */


    _createClass(Polyomino, [{
        key: "getBoundingRectangle",
        value: function getBoundingRectangle() {
            var polyx1 = this.location.x - this.center.x;
            var polyy1 = this.location.y - this.center.y;

            return new BoundingRectangle(polyx1, polyy1,
            // -1 because if length == 1 then x2 == x1
            polyx1 + this.stepWidth - 1, polyy1 + this.stepHeight - 1);
        }
    }, {
        key: "stepWidth",
        get: function get() {
            return Math.floor(this.width / this.gridStep) + 1;
        }

        /**
         * height of the polyomino divided by grid steps
         */

    }, {
        key: "stepHeight",
        get: function get() {
            return Math.floor(this.height / this.gridStep) + 1;
        }
    }, {
        key: "x2",
        get: function get() {
            return this.x1 + this.width;
        }
    }, {
        key: "y2",
        get: function get() {
            return this.y1 + this.height;
        }

        /**
         * returns the center relative to location inside the grid
         */

    }, {
        key: "gridStepCenter",
        get: function get() {
            return this.center.diff(this.location);
        }
    }]);

    return Polyomino;
}();

var Point = function () {
    /**
     * 
     * @param { number } x 
     * @param { number } y 
     */
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    /**
     * Returns other - this for x and y
     * @param { Point } other
     */


    _createClass(Point, [{
        key: "diff",
        value: function diff(other) {
            return new Point(other.x - this.x, other.y - this.y);
        }
    }]);

    return Point;
}();

var BoundingRectangle = function () {
    /**
     * @param { number } x1
     * @param { number } y1
     * @param { number } x2
     * @param { number } y2
     */
    function BoundingRectangle(x1, y1, x2, y2) {
        _classCallCheck(this, BoundingRectangle);

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    _createClass(BoundingRectangle, [{
        key: "center",
        value: function center() {
            return new Point((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
        }
    }]);

    return BoundingRectangle;
}();

var Cell =
/**
 * 
 * @param { boolean } occupied 
 * @param { boolean } visited 
 */
function Cell(occupied, visited) {
    _classCallCheck(this, Cell);

    this.occupied = occupied; //boolean to determine if the cell is occupied
    this.visited = visited; //boolean to determine if the cell was visited before while traversing the cells
};

var Grid = function () {
    /** 
     * @param { number } width 
     * @param { number } height 
     * @param { number } step 
     */
    function Grid(width, height, step) {
        var _this = this;

        _classCallCheck(this, Grid);

        this.width = width;
        this.height = height;
        this.step = step;
        //create and intialize the grid
        this.grid = Array.from({ length: this.stepWidth }, function (_) {
            return Array.from({ length: _this.stepHeight }, function (_) {
                return new Cell(false, false);
            });
        });
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
        this.occupiedRectangle = new BoundingRectangle(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE); // the bounding rectanble of the occupied cells in the grid
        this.numberOfOccupiredCells = 0;
    }

    /**
     * returns the width in terms of grid steps
     */


    _createClass(Grid, [{
        key: "getDirectNeighbors",


        /**
         * function given a list of cells it returns the direct unvisited unoccupied neighboring cells 
         */
        value: function getDirectNeighbors(cells, level) {
            var resultPoints = [];
            if (cells.length == 0) {
                for (var i = 0; i < this.stepWidth; i++) {
                    for (var j = 0; j < this.stepHeight; j++) {
                        if (this.grid[i][j].occupied) {
                            resultPoints = resultPoints.concat(this.getCellNeighbors(i, j));
                        }
                    }
                }
                var startIndex = 0;
                var endIndex = resultPoints.length - 1;

                for (var i = 2; i <= level; i++) {
                    if (endIndex >= startIndex) {
                        for (var j = startIndex; j <= endIndex; j++) {
                            resultPoints = resultPoints.concat(this.getCellNeighbors(resultPoints[j].x, resultPoints[j].y));
                        }
                    }
                    startIndex = endIndex + 1;
                    endIndex = resultPoints.length - 1;
                }
            } else {
                cells.forEach(function (cell) {
                    resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x, cell.y));
                }.bind(this));
            }
            return resultPoints;
        }

        /**
         * given a cell at locatoin i,j get the unvistied unoccupied neighboring cell
         * @param { number } i
         * @param { number } j
         */

    }, {
        key: "getCellNeighbors",
        value: function getCellNeighbors(i, j) {
            var resultPoints = [];
            //check all the 8 surrounding cells 
            if (i - 1 >= 0) {
                if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
                    resultPoints.push({ x: i - 1, y: j });
                    this.grid[i - 1][j].visited = true;
                }
            }
            if (i + 1 < this.stepWidth) {
                if (!this.grid[i + 1][j].occupied && !this.grid[i + 1][j].visited) {
                    resultPoints.push({ x: i + 1, y: j });
                    this.grid[i + 1][j].visited = true;
                }
            }
            if (j - 1 >= 0) {
                if (!this.grid[i][j - 1].occupied && !this.grid[i][j - 1].visited) {
                    resultPoints.push({ x: i, y: j - 1 });
                    this.grid[i][j - 1].visited = true;
                }
            }
            if (j + 1 < this.stepHeight) {
                if (!this.grid[i][j + 1].occupied && !this.grid[i][j + 1].visited) {
                    resultPoints.push({ x: i, y: j + 1 });
                    this.grid[i][j + 1].visited = true;
                }
            }
            if (i - 1 >= 0) {
                if (!this.grid[i - 1][j].occupied && !this.grid[i - 1][j].visited) {
                    resultPoints.push({ x: i - 1, y: j });
                    this.grid[i - 1][j].visited = true;
                }
            }
            if (i - 1 >= 0 && j - 1 >= 0) {
                if (!this.grid[i - 1][j - 1].occupied && !this.grid[i - 1][j - 1].visited) {
                    resultPoints.push({ x: i - 1, y: j - 1 });
                    this.grid[i - 1][j - 1].visited = true;
                }
            }

            if (i + 1 < this.stepWidth && j - 1 >= 0) {
                if (!this.grid[i + 1][j - 1].occupied && !this.grid[i + 1][j - 1].visited) {
                    resultPoints.push({ x: i + 1, y: j - 1 });
                    this.grid[i + 1][j - 1].visited = true;
                }
            }

            if (i - 1 >= 0 && j + 1 < this.stepHeight) {
                if (!this.grid[i - 1][j + 1].occupied && !this.grid[i - 1][j + 1].visited) {
                    resultPoints.push({ x: i - 1, y: j + 1 });
                    this.grid[i - 1][j + 1].visited = true;
                }
            }
            if (i + 1 < this.stepWidth && j + 1 < this.stepHeight) {
                if (!this.grid[i + 1][j + 1].occupied && !this.grid[i + 1][j + 1].visited) {
                    resultPoints.push({ x: i + 1, y: j + 1 });
                    this.grid[i + 1][j + 1].visited = true;
                }
            }

            return resultPoints;
        }

        /**
         * a function to place a given polyomino in the cell i j on the grid
         * @param { Polyomino } polyomino 
         * @param { number } i 
         * @param { number } j 
         */

    }, {
        key: "placePolyomino",
        value: function placePolyomino(polyomino, i, j) {
            polyomino.location.x = i;
            polyomino.location.y = j;
            for (var k = 0; k < polyomino.stepWidth; k++) {
                for (var l = 0; l < polyomino.stepHeight; l++) {
                    if (polyomino.grid[k][l]) {
                        //if [k] [l] cell is occupied in polyomino
                        this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied = true;
                    }
                }
            }

            //update number of occupired cells
            this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;

            this.updateBounds(polyomino);

            // reset visited cells to none
            for (var x = 0; x < this.stepWidth; x++) {
                for (var y = 0; y < this.stepHeight; y++) {
                    this.grid[x][y].visited = false;
                }
            }
        }

        /**
         * Updates step rectangle bounds so that the `polyomino` fits
         * @param { Polyomino } polyomino
         */

    }, {
        key: "updateBounds",
        value: function updateBounds(polyomino) {
            var polyRect = polyomino.getBoundingRectangle();

            this.occupiedRectangle.x1 = Math.min(this.occupiedRectangle.x1, polyRect.x1);
            this.occupiedRectangle.x2 = Math.max(this.occupiedRectangle.x2, polyRect.x2);
            this.occupiedRectangle.y1 = Math.min(this.occupiedRectangle.y1, polyRect.y1);
            this.occupiedRectangle.y2 = Math.max(this.occupiedRectangle.y2, polyRect.y2);
        }

        /**
         * a function to determine if a polyomino can be placed on the given cell i,j
         * @param { Polyomino } polyomino 
         * @param { number } i 
         * @param { number } j 
         */

    }, {
        key: "tryPlacingPolyomino",
        value: function tryPlacingPolyomino(polyomino, i, j) {
            for (var k = 0; k < polyomino.stepWidth; k++) {
                for (var l = 0; l < polyomino.stepHeight; l++) {
                    //return false if polyomino goes outside the grid when placed on i,j
                    if (k - polyomino.center.x + i >= this.stepWidth || k - polyomino.center.x + i < 0 || l - polyomino.center.y + j >= this.stepHeight || l - polyomino.center.y + j < 0) {
                        return false;
                    }
                    //return false if the  polymino cell and the corrosponding main grid cell are both occupied
                    if (polyomino.grid[k][l] && this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * calculates the value of the utility (aspect ratio) of placing a polyomino on cell i,j
         * @param { Polyomino } polyomino
         * @param { number } i
         * @param { number } j
         * @param { number } desiredAspectRatio
         */

    }, {
        key: "calculateUtilityOfPlacing",
        value: function calculateUtilityOfPlacing(polyomino, i, j, desiredAspectRatio) {
            var result = {};
            var actualAspectRatio = 1;
            var fullness = 1;
            var adjustedFullness = 1;
            var x1 = this.occupiedRectangle.x1;
            var x2 = this.occupiedRectangle.x2;
            var y1 = this.occupiedRectangle.y1;
            var y2 = this.occupiedRectangle.y2;
            if (i - polyomino.center.x < x1) x1 = i - polyomino.center.x;
            if (j - polyomino.center.y < y1) y1 = j - polyomino.center.y;
            if (polyomino.stepWidth - 1 - polyomino.center.x + i > x2) x2 = polyomino.stepWidth - 1 - polyomino.center.x + i;
            if (polyomino.stepHeight - 1 - polyomino.center.y + j > y2) y2 = polyomino.stepHeight - 1 - polyomino.center.y + j;
            var width = x2 - x1 + 1;
            var height = y2 - y1 + 1;
            actualAspectRatio = width / height;
            fullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * height);

            if (actualAspectRatio > desiredAspectRatio) {
                adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * (width / desiredAspectRatio));
                // height = width / desiredAspectRatio;
            } else {
                adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (height * desiredAspectRatio * height);
                // width = height * desiredAspectRatio;
            }

            result.actualAspectRatio = actualAspectRatio;
            result.fullness = fullness;
            result.adjustedFullness = adjustedFullness;

            return result;
        }
    }, {
        key: "stepWidth",
        get: function get() {
            return Math.floor(this.width / this.step) + 1;
        }

        /**
         * returns the height in terms of grid steps
         */

    }, {
        key: "stepHeight",
        get: function get() {
            return Math.floor(this.height / this.step) + 1;
        }
    }]);

    return Grid;
}();

module.exports = {
    Grid: Grid,
    Polyomino: Polyomino,
    BoundingRectangle: BoundingRectangle,
    Point: Point
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var generalUtils = {};
var polyominoPacking = __webpack_require__(0);

var _require = __webpack_require__(0),
    Point = _require.Point;

//a function to remove duplicate object in array


generalUtils.uniqueArray = function (ar) {
  var j = {};
  ar.forEach(function (v) {
    j[v + '::' + (typeof v === 'undefined' ? 'undefined' : _typeof(v))] = v;
  });
  return Object.keys(j).map(function (v) {
    return j[v];
  });
};

//a function to determine the grid cells where a line between point p0 and p1 pass through
generalUtils.LineSuperCover = function (p0, p1) {
  var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
  var nx = Math.floor(Math.abs(dx)),
      ny = Math.floor(Math.abs(dy));
  var sign_x = dx > 0 ? 1 : -1,
      sign_y = dy > 0 ? 1 : -1;

  var p = new polyominoPacking.Point(p0.x, p0.y);
  var points = [new polyominoPacking.Point(p.x, p.y)];
  for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
    if ((0.5 + ix) / nx == (0.5 + iy) / ny) {
      // next step is diagonal
      p.x += sign_x;
      p.y += sign_y;
      ix++;
      iy++;
    } else if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += sign_x;
      ix++;
    } else {
      // next step is vertical
      p.y += sign_y;
      iy++;
    }
    points.push(new polyominoPacking.Point(p.x, p.y));
  }
  return points;
};

/**
 * finds the current center of components
 * @param { Array } components 
 */
generalUtils.getCenter = function (components) {
  // In case the platform doesn't have flatMap function
  if (typeof Array.prototype['flatMap'] === 'undefined') {
    Array.prototype['flatMap'] = function (f) {
      var concat = function concat(x, y) {
        return x.concat(y);
      };
      var flatMap = function flatMap(f, xs) {
        return xs.map(f).reduce(concat, []);
      };

      return flatMap(f, this);
    };
  }

  // @ts-ignore
  var bounds = components.flatMap(function (component) {
    return component.nodes;
  }).map(function (node) {
    return {
      left: node.x,
      top: node.y,
      right: node.x + node.width - 1,
      bottom: node.y + node.height - 1
    };
  }).reduce(function (bounds, currNode) {
    return {
      left: Math.min(currNode.left, bounds.left),
      right: Math.max(currNode.right, bounds.right),
      top: Math.min(currNode.top, bounds.top),
      bottom: Math.max(currNode.bottom, bounds.bottom)
    };
  }, {
    left: Number.MAX_VALUE,
    right: -Number.MAX_VALUE,
    top: Number.MAX_VALUE,
    bottom: -Number.MAX_VALUE
  });

  return new Point((bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2);
};

module.exports = generalUtils;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generalUtils = __webpack_require__(1);
var polyominoPacking = __webpack_require__(0);

var _require = __webpack_require__(0),
    Point = _require.Point,
    Polyomino = _require.Polyomino;

var _require2 = __webpack_require__(1),
    getCenter = _require2.getCenter;

var layoutUtilities = function layoutUtilities(cy, options) {

  /*  var defaults = {
     idealEdgeLength : 50,
     offset : 20,
     desiredAspectRatio : 1,
     polyominoGridSizeFactor : 1,
     utilityFunction : 1
   };
     function extend(defaults, options) {
     var obj = {};
       for (var i in defaults) {
       obj[i] = defaults[i];
     }
       for (var i in options) {      
       obj[i] = options[i];
     }
       return obj;
   };
     options = extend(defaults, options); */
  var instance = {};

  instance.placeHiddenNodes = function (mainEles) {
    mainEles.forEach(function (mainEle) {
      var hiddenEles = mainEle.neighborhood().nodes(":hidden");
      hiddenEles.forEach(function (hiddenEle) {
        var neighbors = hiddenEle.neighborhood().nodes(":visible");
        if (neighbors.length > 1) {
          instance.nodeWithMultipleNeighbors(hiddenEle);
        } else instance.nodeWithOneNeighbor(mainEle, hiddenEle);
      });
    });
  };

  instance.placeNewNodes = function (eles) {
    var components = this.findComponents(eles);
    var disconnectedComp = [];
    for (var i = 0; i < components.length; i++) {
      var oneNeig = false;
      var multNeig = false;
      var mainEle;
      var multneighbors = [];
      var positioned = [];
      var x = 0;
      var y = 0;
      var isPositioned = false;
      for (var j = 0; j < components[i].length; j++) {
        var neighbors = components[i][j].neighborhood().nodes().difference(eles);
        positioned.push(false);
        if (neighbors.length > 1 && !isPositioned) {
          multNeig = true;
          positioned[j] = true;
          multneighbors = neighbors;
          instance.nodeWithMultipleNeighbors(components[i][j], multneighbors);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        } else if (neighbors.length == 1 && !isPositioned) {
          oneNeig = true;
          mainEle = neighbors[0];
          positioned[j] = true;
          instance.nodeWithOneNeighbor(mainEle, components[i][j]);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        }
      }

      if (oneNeig || multNeig) {
        for (var j = 0; j < components[i].length; j++) {
          if (positioned[j] == false) {
            var neighbors = components[i][j].neighborhood().nodes();
            var positionedNeigbors = [];
            var curr = components[i][j].neighborhood().nodes().difference(eles);
            curr.forEach(function (ele) {
              positionedNeigbors.push(ele);
            });

            for (var k = 0; k < neighbors.length; k++) {
              if (positioned[components[i].indexOf(neighbors[k])]) {
                positionedNeigbors.push(neighbors[k]);
              }
            }
            if (positionedNeigbors.length > 1) {
              instance.nodeWithMultipleNeighbors(components[i][j], positionedNeigbors);
            } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], components[i][j]);else {
              var horizontalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              var verticalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              components[i][j].position("x", x + horizontalP);
              components[i][j].position("y", y + verticalP);
            }
            positioned[j] = true;
          }
        }
      } else {
        disconnectedComp.push(components[i]);
      }
    }

    if (disconnectedComp.length >= 1) {
      instance.disconnectedNodes(disconnectedComp);
    }
  };

  instance.disconnectedNodes = function (components) {
    var leftX = Number.MAX_VALUE;
    var rightX = -Number.MAX_VALUE;
    var topY = Number.MAX_VALUE;
    var bottomY = -Number.MAX_VALUE;
    // Check the x and y limits of all hidden elements and store them in the variables above
    cy.nodes(':visible').forEach(function (node) {
      var halfWidth = node.outerWidth() / 2;
      var halfHeight = node.outerHeight() / 2;
      if (node.position("x") - halfWidth < leftX) leftX = node.position("x") - halfWidth;
      if (node.position("x") + halfWidth > rightX) rightX = node.position("x") + halfWidth;
      if (node.position("y") - halfHeight < topY) topY = node.position("y") - halfHeight;
      if (node.position("y") + halfHeight > bottomY) bottomY = node.position("y") + halfHeight;
    });

    var radiusy = topY - bottomY;
    var radiusx = rightX - leftX;
    var innerRadius = Math.sqrt(radiusx * radiusx + radiusy * radiusy) / 2;
    var centerX = (leftX + rightX) / 2;
    var centerY = (topY + bottomY) / 2;
    //var components = this.findComponents(newEles);
    var numOfComponents = components.length;
    var angle = 360 / numOfComponents;
    var count = 1;

    components.forEach(function (component) {

      var distFromCenter = instance.generateRandom(innerRadius + options.offset * 6, innerRadius + options.offset * 8, 1);
      var curAngle = angle * count;
      var angleInRadians = curAngle * Math.PI / 180;
      var x = centerX + distFromCenter * Math.cos(angleInRadians);
      var y = centerY + distFromCenter * Math.sin(angleInRadians);

      if (component.length == 1) {
        component[0].position("x", x);
        component[0].position("y", y);
      } else {
        var positioned = [];
        for (var i = 0; i < component.length; i++) {
          positioned.push(false);
        }

        positioned[0] = true;
        component[0].position("x", x);
        component[0].position("y", y);

        for (var i = 1; i < component.length; i++) {
          var neighbors = component[i].neighborhood().nodes();
          var positionedNeigbors = [];
          for (var j = 0; j < neighbors.length; j++) {
            if (positioned[component.indexOf(neighbors[j])]) {
              positionedNeigbors.push(neighbors[j]);
            }
          }
          if (positionedNeigbors.length > 1) {
            instance.nodeWithMultipleNeighbors(component[i], positionedNeigbors);
          } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], component[i]);else {
            var horizontalP = instance.generateRandom(options.offset, options.offset * 2, 0);
            var verticalP = instance.generateRandom(options.offset, options.offset * 2, 0);
            component[i].position("x", x + horizontalP);
            component[i].position("y", y + verticalP);
          }
          positioned[i] = true;
        }
      }
      count++;
    });
  };

  instance.findComponents = function (newEles) {

    var adjListArray = [];
    var current = cy.nodes().difference(newEles);
    newEles.forEach(function (ele) {
      var neighbors = ele.neighborhood().nodes().difference(current);
      var listOfIndexes = [];
      neighbors.forEach(function (neigbor) {
        var index = newEles.indexOf(neigbor);
        listOfIndexes.push(index);
      });
      adjListArray.push(listOfIndexes);
    });

    // Mark all the vertices as not visited 
    var visited = [];
    for (var v = 0; v < newEles.length; v++) {
      visited.push(false);
    }

    var listOfComponents = [];

    for (var v = 0; v < newEles.length; v++) {
      var elesOfComponent = [];
      if (visited[v] == false) {
        // print all reachable vertices 
        // from v 
        this.DFSUtil(v, visited, adjListArray, newEles, elesOfComponent);
        listOfComponents.push(elesOfComponent);
      }
    }

    return listOfComponents;
  };

  instance.DFSUtil = function (v, visited, adjListArray, newEles, elesOfComponent) {
    // Mark the current node as visited and print it 
    visited[v] = true;
    elesOfComponent.push(newEles[v]);
    // Recur for all the vertices 
    // adjacent to this vertex 
    for (var i = 0; i < adjListArray[v].length; i++) {
      if (!visited[adjListArray[v][i]]) this.DFSUtil(adjListArray[v][i], visited, adjListArray, newEles, elesOfComponent);
    }
  };

  instance.nodeWithOneNeighbor = function (mainEle, hiddenEle) {
    var quadrants = instance.checkOccupiedQuadrants(mainEle, hiddenEle);
    var freeQuadrants = [];
    for (var property in quadrants) {
      if (quadrants[property] === "free") freeQuadrants.push(property);
    }
    //Can take values 1 and -1 and are used to place the hidden nodes in the random quadrant
    var horizontalMult;
    var verticalMult;
    if (freeQuadrants.length > 0) {
      if (freeQuadrants.length === 3) {
        if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('third')) {
          horizontalMult = -1;
          verticalMult = -1;
        } else if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = -1;
        } else if (freeQuadrants.includes('first') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = 1;
        } else if (freeQuadrants.includes('second') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = -1;
          verticalMult = 1;
        }
      } else {
        //Randomly picks one quadrant from the free quadrants
        var randomQuadrant = freeQuadrants[Math.floor(Math.random() * freeQuadrants.length)];

        if (randomQuadrant === "first") {
          horizontalMult = 1;
          verticalMult = -1;
        } else if (randomQuadrant === "second") {
          horizontalMult = -1;
          verticalMult = -1;
        } else if (randomQuadrant === "third") {
          horizontalMult = -1;
          verticalMult = 1;
        } else if (randomQuadrant === "fourth") {
          horizontalMult = 1;
          verticalMult = 1;
        }
      }
    } else {
      horizontalMult = 0;
      verticalMult = 0;
    }
    //Change the position of hidden elements

    var horizontalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, horizontalMult);
    var verticalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, verticalMult);
    var newCenterX = mainEle.position("x") + horizontalParam;
    var newCenterY = mainEle.position("y") + verticalParam;
    hiddenEle.position("x", newCenterX);
    hiddenEle.position("y", newCenterY);
  };

  instance.nodeWithMultipleNeighbors = function (ele, neighbors) {
    if (neighbors == null) {
      var neighbors = ele.neighborhood().nodes(":visible");
    }
    var x = 0;
    var y = 0;
    var count = 0;
    neighbors.forEach(function (ele1) {
      x += ele1.position("x");
      y += ele1.position("y");
      count++;
    });
    x = x / count;
    y = y / count;
    var diffx = instance.generateRandom(0, options.offset / 2, 0);
    var diffy = instance.generateRandom(0, options.offset / 2, 0);
    ele.position("x", x + diffx);
    ele.position("y", y + diffy);
  };

  instance.generateRandom = function (min, max, mult) {
    var val = [-1, 1];
    if (mult === 0) mult = val[Math.floor(Math.random() * val.length)];
    return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
  };

  instance.checkOccupiedQuadrants = function (mainEle, hiddenEles) {
    var visibleEles = mainEle.neighborhood().difference(hiddenEles).nodes();
    var occupiedQuadrants = { first: "free", second: "free", third: "free", fourth: "free" };

    visibleEles.forEach(function (ele) {
      if (ele.data('class') != 'compartment' && ele.data('class') != 'complex') {
        if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.second = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.first = "occupied";else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.third = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.fourth = "occupied";
      }
    });
    return occupiedQuadrants;
  };

  /**
   * @param { { nodes: any[] }[] } components
   * @param { { dx: number, dy: number }[] } shifts
   */
  function calculatePackingCenter(components, shifts) {
    components.forEach(function (component, index) {
      component.nodes.forEach(function (node) {
        node.x += shifts[index].dx;
        node.y += shifts[index].dy;
      });
    });

    return getCenter(components);
  }

  /**
   * @param { any[] } components 
   */
  instance.packComponents = function (components) {
    var currentCenter = generalUtils.getCenter(components);

    var gridStep = 0;
    var totalNodes = 0;
    components.forEach(function (component) {
      totalNodes += component.nodes.length;
      component.nodes.forEach(function (node) {
        gridStep += node.width + node.height;
      });
    });

    gridStep = gridStep / (2 * totalNodes);
    gridStep = Math.floor(gridStep * options.polyominoGridSizeFactor);

    if (options.componentSpacing > 0) {
      var spacingAmount = options.componentSpacing;
      components.forEach(function (component) {
        component.nodes.forEach(function (node) {
          node.x = node.x - spacingAmount;
          node.y = node.y - spacingAmount;
          node.width = node.width + 2 * spacingAmount;
          node.height = node.height + 2 * spacingAmount;
        });
      });
    }
    var gridWidth = 0,
        gridHeight = 0;
    /** @type { Polyomino[] } */
    var polyominos = [];
    var globalX1 = Number.MAX_VALUE,
        globalX2 = -Number.MAX_VALUE,
        globalY1 = Number.MAX_VALUE,
        globalY2 = -Number.MAX_VALUE;
    //create polyominos for components
    components.forEach(function (component, index) {
      var x1 = Number.MAX_VALUE,
          x2 = -Number.MAX_VALUE,
          y1 = Number.MAX_VALUE,
          y2 = -Number.MAX_VALUE;
      component.nodes.forEach(function (node) {
        if (node.x <= x1) x1 = node.x;
        if (node.y <= y1) y1 = node.y;
        if (node.x + node.width >= x2) x2 = node.x + node.width;
        if (node.y + node.height >= y2) y2 = node.y + node.height;
      });

      component.edges.forEach(function (edge) {
        if (edge.startX <= x1) x1 = edge.startX;
        if (edge.startY <= y1) y1 = edge.startY;
        if (edge.endX >= x2) x2 = edge.endX;
        if (edge.endY >= y2) y2 = edge.endY;
      });

      if (x1 < globalX1) globalX1 = x1;
      if (x2 > globalX2) globalX2 = x2;
      if (y1 < globalY1) globalY1 = y1;
      if (y2 > globalY2) globalY2 = y2;

      var componentWidth = x2 - x1;
      var componentHeight = y2 - y1;
      gridWidth += componentWidth;
      gridHeight += componentHeight;

      var componentPolyomino = new polyominoPacking.Polyomino(x1, y1, componentWidth, componentHeight, gridStep, index);

      //fill nodes to polyomino cells
      component.nodes.forEach(function (node) {
        //top left cell of a node
        var topLeftX = Math.floor((node.x - x1) / gridStep);
        var topLeftY = Math.floor((node.y - y1) / gridStep);

        //bottom right cell of a node
        var bottomRightX = Math.floor((node.x + node.width - x1) / gridStep);
        var bottomRightY = Math.floor((node.y + node.height - y1) / gridStep);

        //all cells between topleft cell and bottom right cell should be occupied
        for (var i = topLeftX; i <= bottomRightX; i++) {
          for (var j = topLeftY; j <= bottomRightY; j++) {
            componentPolyomino.grid[i][j] = true;
          }
        }
      });

      //fill cells where edges pass 
      component.edges.forEach(function (edge) {
        var p0 = {},
            p1 = {};
        p0.x = (edge.startX - x1) / gridStep;
        p0.y = (edge.startY - y1) / gridStep;
        p1.x = (edge.endX - x1) / gridStep;
        p1.y = (edge.endY - y1) / gridStep;
        //for every edge calculate the super cover 
        var points = generalUtils.LineSuperCover(p0, p1);
        points.forEach(function (point) {
          var indexX = Math.floor(point.x);
          var indexY = Math.floor(point.y);
          if (indexX >= 0 && indexX < componentPolyomino.stepWidth && indexY >= 0 && indexY < componentPolyomino.stepHeight) {
            componentPolyomino.grid[Math.floor(point.x)][Math.floor(point.y)] = true;
          }
        });
      });

      //update number of occupied cells in polyomino
      for (var i = 0; i < componentPolyomino.stepWidth; i++) {
        for (var j = 0; j < componentPolyomino.stepHeight; j++) {
          if (componentPolyomino.grid[i][j]) componentPolyomino.numberOfOccupiredCells++;
        }
      }
      polyominos.push(componentPolyomino);
    });

    //order plyominos non-increasing order
    polyominos.sort(function (a, b) {
      var aSize = a.stepWidth * a.stepHeight;
      var bSize = b.stepWidth * b.stepHeight;
      // a should come before b in the sorted order
      if (aSize > bSize) {
        return -1;
        // a should come after b in the sorted order
      } else if (aSize < bSize) {
        return 1;
        // a and b are the same
      } else {
        return 0;
      }
    });

    //main grid width and height is two the times the sum of all components widths and heights (worst case scenario)
    //intialize the grid add 1 to avoid insufficient grid space due to divisin by 2 in calcuations
    var mainGrid = new polyominoPacking.Grid(gridWidth * 2 + gridStep, gridHeight * 2 + gridStep, gridStep);

    //place first (biggest) polyomino in the center
    mainGrid.placePolyomino(polyominos[0], mainGrid.center.x, mainGrid.center.y);

    //for every polyomino try placeing it in first neighbors and calculate utility if none then second neighbor and so on..
    for (var i = 1; i < polyominos.length; i++) {
      var fullnessMax = 0;
      var adjustedFullnessMax = 0;
      var weigthFullnessAspectRatio = 0;
      var minAspectRatioDiff = 1000000;
      var placementFound = false;
      var cells = [];
      var resultLocation = {};
      while (!placementFound) {

        cells = mainGrid.getDirectNeighbors(cells, Math.ceil(Math.max(polyominos[i].stepWidth, polyominos[i].stepHeight) / 2));
        cells.forEach(function (cell) {
          if (mainGrid.tryPlacingPolyomino(polyominos[i], cell.x, cell.y)) {
            placementFound = true;
            var utilityValue = mainGrid.calculateUtilityOfPlacing(polyominos[i], cell.x, cell.y, options.desiredAspectRatio);
            var cellChosen = false;
            if (options.utilityFunction == 1) {
              if (utilityValue.adjustedFullness > adjustedFullnessMax) {
                cellChosen = true;
              } else if (utilityValue.adjustedFullness == adjustedFullnessMax) {
                if (utilityValue.fullness > fullnessMax) {
                  cellChosen = true;
                } else if (utilityValue.fullness == fullnessMax) {
                  if (Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio) <= minAspectRatioDiff) {
                    cellChosen = true;
                  }
                }
              }
              if (cellChosen) {
                adjustedFullnessMax = utilityValue.adjustedFullness;
                minAspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio);
                fullnessMax = utilityValue.fullness;
                resultLocation.x = cell.x;
                resultLocation.y = cell.y;
              }
            } else if (options.utilityFunction == 2) {
              var aspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio);
              var weightedUtility = utilityValue.fullness * .5 + (1 - aspectRatioDiff / Math.max(utilityValue.actualAspectRatio, options.desiredAspectRatio) * .5);
              if (weightedUtility > weigthFullnessAspectRatio) {
                weigthFullnessAspectRatio = weightedUtility;
                resultLocation.x = cell.x;
                resultLocation.y = cell.y;
              }
            }
          }
        });
      }

      mainGrid.placePolyomino(polyominos[i], resultLocation.x, resultLocation.y);
    }

    //sort polyominos according to index of input to return correct output order
    polyominos.sort(function (a, b) {
      if (a.index < b.index) {
        return -1;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return 0;
      }
    });

    var packingResult = {
      shifts: []
    };

    /*  var shiftX = componentsCenter.x - ((mainGrid.center.x - mainGrid.occupiedRectangle.x1)*gridStep); 
     var shiftY = componentsCenter.y - ((mainGrid.center.y - mainGrid.occupiedRectangle.y1)*gridStep); 
     var occupiedCenterX = Math.floor((mainGrid.occupiedRectangle.x1 + mainGrid.occupiedRectangle.x2)/2);
     var occupiedCenterY = Math.floor((mainGrid.occupiedRectangle.y1 + mainGrid.occupiedRectangle.y2)/2); */

    polyominos.forEach(function (pol) {
      var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1; //+shiftX;
      var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1; // + shiftY;
      //var dx = (pol.location.x -occupiedCenterX) * gridStep + componentsCenter.x- pol.leftMostCoord;//+shiftX;
      //var dy = (pol.location.y -occupiedCenterY) * gridStep + componentsCenter.y-pol.topMostCoord;// + shiftY;
      packingResult.shifts.push({ dx: dx, dy: dy });
    });

    // Calculate what would be the center of the packed layout
    var packingCenter = calculatePackingCenter(components, packingResult.shifts);
    // Calculate the neccessary  additional shift to re-center
    var centerShift = packingCenter.diff(currentCenter);

    // Add the center shift
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = packingResult.shifts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var shift = _step.value;

        shift.dx += centerShift.x;
        shift.dy += centerShift.y;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    packingResult.aspectRatio = Math.round((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1) * 1e2) / 1e2;
    packingResult.fullness = Math.round(mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 100 * 1e2) / 1e2;

    if (packingResult.aspectRatio > options.desiredAspectRatio) {
      var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
      packingResult.adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridWidth * (mainGridWidth / options.desiredAspectRatio)) * 100 * 1e2) / 1e2;
      // height = width / desiredAspectRatio;
    } else {
      var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
      packingResult.adjustedFullness = Math.round(mainGrid.numberOfOccupiredCells / (mainGridheight * options.desiredAspectRatio * mainGridheight) * 100 * 1e2) / 1e2;
      // width = height * desiredAspectRatio;
    }

    return packingResult;
  };

  return instance;
};

module.exports = layoutUtilities;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  'use strict';

  // registers the extension on a cytoscape lib ref

  var register = function register(cytoscape) {

    if (!cytoscape) {
      return;
    } // can't register if cytoscape unspecified

    var options = {
      idealEdgeLength: 50,
      offset: 20,
      desiredAspectRatio: 1,
      polyominoGridSizeFactor: 1,
      utilityFunction: 1, // Maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
      componentSpacing: 30
    };

    /*  function extend(defaults, options) {
       var obj = {};
         for (var i in defaults) {
         obj[i] = defaults[i];
       }
         for (var i in options) {
         if(i == "desiredAspectRatio"){
           var value = options[i];
            if(!isNaN(value))
            {
               if(value >= 0 && value <= 20){
                 obj[i] = options[i];
               }else if(value < 0){
                 obj[i] = 0
               }else{
                 obj[i] = 20
               }
            }
         }else{
           obj[i] = options[i];
         }
         }
         return obj;
      }; */
    var layoutUtilities = __webpack_require__(2);

    cytoscape('core', 'layoutUtilities', function (opts) {
      var cy = this;

      // If 'get' is given as the param then return the extension instance
      if (opts === 'get') {
        return getScratch(cy).instance;
      }

      /**
      * Deep copy or merge objects - replacement for jQuery deep extend
      * Taken from http://youmightnotneedjquery.com/#deep_extend
      * and bug related to deep copy of Arrays is fixed.
      * Usage:Object.extend({}, objA, objB)
      */
      function extendOptions(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];

          if (!obj) continue;

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (Array.isArray(obj[key])) {
                out[key] = obj[key].slice();
              } else if (_typeof(obj[key]) === 'object') {
                out[key] = extendOptions(out[key], obj[key]);
              } else {
                out[key] = obj[key];
              }
            }
          }
        }

        return out;
      }

      options = extendOptions({}, options, opts);

      function getScratch(eleOrCy) {
        if (!eleOrCy.scratch("_layoutUtilities")) {
          eleOrCy.scratch("_layoutUtilities", {});
        }

        return eleOrCy.scratch("_layoutUtilities");
      }

      // create a view utilities instance
      var instance = layoutUtilities(cy, options);

      // set the instance on the scratch pad
      getScratch(cy).instance = instance;

      if (!getScratch(cy).initialized) {
        getScratch(cy).initialized = true;

        var shiftKeyDown = false;
        document.addEventListener('keydown', function (event) {
          if (event.key == "Shift") {
            shiftKeyDown = true;
          }
        });
        document.addEventListener('keyup', function (event) {
          if (event.key == "Shift") {
            shiftKeyDown = false;
          }
        });
        //Select the desired neighbors after taphold-and-free
        /*  cy.on('taphold', 'node', function(event){
           var target = event.target || event.cyTarget;
           var tapheld = false;
           var neighborhood;
           var timeout = setTimeout(function(){
             if(shiftKeyDown){
               cy.elements().unselect();
               neighborhood = options.neighbor(target);
               if(neighborhood)
                 neighborhood.select();
               target.lock();
               tapheld = true;
             }
           }, options.neighborSelectTime - 500);
           cy.on('free', 'node', function(){
             var targetTapheld = event.target || event.cyTarget;
             if(target == targetTapheld && tapheld === true){
               tapheld = false;
               if(neighborhood)
                 neighborhood.select();
               target.unlock();
             }
             else{
               clearTimeout(timeout);
             }
           });
           cy.on('drag', 'node', function(){
             var targetDragged = event.target || event.cyTarget;
             if(target == targetDragged && tapheld === false){
               clearTimeout(timeout);
             }
           })
         }); */
      }

      // return the instance of extension
      return getScratch(cy).instance;
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    // expose as a commonjs module
    module.exports = register;
  }

  if (true) {
    // expose as an amd/requirejs module
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return register;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  if (typeof cytoscape !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape);
  }
})();

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNWI0ZGM0N2EzNWNjZGNhNzA4ZCIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9wb2x5b21pbm8tcGFja2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9nZW5lcmFsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2xheW91dC11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXguanMiXSwibmFtZXMiOlsiUG9seW9taW5vIiwieDEiLCJ5MSIsIndpZHRoIiwiaGVpZ2h0IiwiZ3JpZFN0ZXAiLCJpbmRleCIsImdyaWQiLCJBcnJheSIsInN0ZXBXaWR0aCIsImkiLCJzdGVwSGVpZ2h0IiwiaiIsImxvY2F0aW9uIiwiUG9pbnQiLCJjZW50ZXIiLCJNYXRoIiwiZmxvb3IiLCJudW1iZXJPZk9jY3VwaXJlZENlbGxzIiwicG9seXgxIiwieCIsInBvbHl5MSIsInkiLCJCb3VuZGluZ1JlY3RhbmdsZSIsImRpZmYiLCJvdGhlciIsIngyIiwieTIiLCJDZWxsIiwib2NjdXBpZWQiLCJ2aXNpdGVkIiwiR3JpZCIsInN0ZXAiLCJmcm9tIiwibGVuZ3RoIiwiXyIsIm9jY3VwaWVkUmVjdGFuZ2xlIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY2VsbHMiLCJsZXZlbCIsInJlc3VsdFBvaW50cyIsImNvbmNhdCIsImdldENlbGxOZWlnaGJvcnMiLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJmb3JFYWNoIiwiY2VsbCIsImJpbmQiLCJwdXNoIiwicG9seW9taW5vIiwiayIsImwiLCJ1cGRhdGVCb3VuZHMiLCJwb2x5UmVjdCIsImdldEJvdW5kaW5nUmVjdGFuZ2xlIiwibWluIiwibWF4IiwiZGVzaXJlZEFzcGVjdFJhdGlvIiwicmVzdWx0IiwiYWN0dWFsQXNwZWN0UmF0aW8iLCJmdWxsbmVzcyIsImFkanVzdGVkRnVsbG5lc3MiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2VuZXJhbFV0aWxzIiwicG9seW9taW5vUGFja2luZyIsInJlcXVpcmUiLCJ1bmlxdWVBcnJheSIsImFyIiwidiIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJMaW5lU3VwZXJDb3ZlciIsInAwIiwicDEiLCJkeCIsImR5IiwibngiLCJhYnMiLCJueSIsInNpZ25feCIsInNpZ25feSIsInAiLCJwb2ludHMiLCJpeCIsIml5IiwiZ2V0Q2VudGVyIiwiY29tcG9uZW50cyIsInByb3RvdHlwZSIsImYiLCJmbGF0TWFwIiwieHMiLCJyZWR1Y2UiLCJib3VuZHMiLCJjb21wb25lbnQiLCJub2RlcyIsImxlZnQiLCJub2RlIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJjdXJyTm9kZSIsImxheW91dFV0aWxpdGllcyIsImN5Iiwib3B0aW9ucyIsImluc3RhbmNlIiwicGxhY2VIaWRkZW5Ob2RlcyIsIm1haW5FbGVzIiwibWFpbkVsZSIsImhpZGRlbkVsZXMiLCJuZWlnaGJvcmhvb2QiLCJoaWRkZW5FbGUiLCJuZWlnaGJvcnMiLCJub2RlV2l0aE11bHRpcGxlTmVpZ2hib3JzIiwibm9kZVdpdGhPbmVOZWlnaGJvciIsInBsYWNlTmV3Tm9kZXMiLCJlbGVzIiwiZmluZENvbXBvbmVudHMiLCJkaXNjb25uZWN0ZWRDb21wIiwib25lTmVpZyIsIm11bHROZWlnIiwibXVsdG5laWdoYm9ycyIsInBvc2l0aW9uZWQiLCJpc1Bvc2l0aW9uZWQiLCJkaWZmZXJlbmNlIiwicG9zaXRpb24iLCJwb3NpdGlvbmVkTmVpZ2JvcnMiLCJjdXJyIiwiZWxlIiwiaW5kZXhPZiIsImhvcml6b250YWxQIiwiZ2VuZXJhdGVSYW5kb20iLCJvZmZzZXQiLCJ2ZXJ0aWNhbFAiLCJkaXNjb25uZWN0ZWROb2RlcyIsImxlZnRYIiwicmlnaHRYIiwidG9wWSIsImJvdHRvbVkiLCJoYWxmV2lkdGgiLCJvdXRlcldpZHRoIiwiaGFsZkhlaWdodCIsIm91dGVySGVpZ2h0IiwicmFkaXVzeSIsInJhZGl1c3giLCJpbm5lclJhZGl1cyIsInNxcnQiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm51bU9mQ29tcG9uZW50cyIsImFuZ2xlIiwiY291bnQiLCJkaXN0RnJvbUNlbnRlciIsImN1ckFuZ2xlIiwiYW5nbGVJblJhZGlhbnMiLCJQSSIsImNvcyIsInNpbiIsIm5ld0VsZXMiLCJhZGpMaXN0QXJyYXkiLCJjdXJyZW50IiwibGlzdE9mSW5kZXhlcyIsIm5laWdib3IiLCJsaXN0T2ZDb21wb25lbnRzIiwiZWxlc09mQ29tcG9uZW50IiwiREZTVXRpbCIsInF1YWRyYW50cyIsImNoZWNrT2NjdXBpZWRRdWFkcmFudHMiLCJmcmVlUXVhZHJhbnRzIiwicHJvcGVydHkiLCJob3Jpem9udGFsTXVsdCIsInZlcnRpY2FsTXVsdCIsImluY2x1ZGVzIiwicmFuZG9tUXVhZHJhbnQiLCJyYW5kb20iLCJob3Jpem9udGFsUGFyYW0iLCJpZGVhbEVkZ2VMZW5ndGgiLCJ2ZXJ0aWNhbFBhcmFtIiwibmV3Q2VudGVyWCIsIm5ld0NlbnRlclkiLCJlbGUxIiwiZGlmZngiLCJkaWZmeSIsIm11bHQiLCJ2YWwiLCJ2aXNpYmxlRWxlcyIsIm9jY3VwaWVkUXVhZHJhbnRzIiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsImZvdXJ0aCIsImRhdGEiLCJjYWxjdWxhdGVQYWNraW5nQ2VudGVyIiwic2hpZnRzIiwicGFja0NvbXBvbmVudHMiLCJjdXJyZW50Q2VudGVyIiwidG90YWxOb2RlcyIsInBvbHlvbWlub0dyaWRTaXplRmFjdG9yIiwiY29tcG9uZW50U3BhY2luZyIsInNwYWNpbmdBbW91bnQiLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0IiwicG9seW9taW5vcyIsImdsb2JhbFgxIiwiZ2xvYmFsWDIiLCJnbG9iYWxZMSIsImdsb2JhbFkyIiwiZWRnZXMiLCJlZGdlIiwic3RhcnRYIiwic3RhcnRZIiwiZW5kWCIsImVuZFkiLCJjb21wb25lbnRXaWR0aCIsImNvbXBvbmVudEhlaWdodCIsImNvbXBvbmVudFBvbHlvbWlubyIsInRvcExlZnRYIiwidG9wTGVmdFkiLCJib3R0b21SaWdodFgiLCJib3R0b21SaWdodFkiLCJwb2ludCIsImluZGV4WCIsImluZGV4WSIsInNvcnQiLCJhIiwiYiIsImFTaXplIiwiYlNpemUiLCJtYWluR3JpZCIsInBsYWNlUG9seW9taW5vIiwiZnVsbG5lc3NNYXgiLCJhZGp1c3RlZEZ1bGxuZXNzTWF4Iiwid2VpZ3RoRnVsbG5lc3NBc3BlY3RSYXRpbyIsIm1pbkFzcGVjdFJhdGlvRGlmZiIsInBsYWNlbWVudEZvdW5kIiwicmVzdWx0TG9jYXRpb24iLCJnZXREaXJlY3ROZWlnaGJvcnMiLCJjZWlsIiwidHJ5UGxhY2luZ1BvbHlvbWlubyIsInV0aWxpdHlWYWx1ZSIsImNhbGN1bGF0ZVV0aWxpdHlPZlBsYWNpbmciLCJjZWxsQ2hvc2VuIiwidXRpbGl0eUZ1bmN0aW9uIiwiYXNwZWN0UmF0aW9EaWZmIiwid2VpZ2h0ZWRVdGlsaXR5IiwicGFja2luZ1Jlc3VsdCIsInBvbCIsInBhY2tpbmdDZW50ZXIiLCJjZW50ZXJTaGlmdCIsInNoaWZ0IiwiYXNwZWN0UmF0aW8iLCJyb3VuZCIsIm1haW5HcmlkV2lkdGgiLCJtYWluR3JpZGhlaWdodCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIiwib3B0cyIsImdldFNjcmF0Y2giLCJleHRlbmRPcHRpb25zIiwib3V0IiwiYXJndW1lbnRzIiwib2JqIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5Iiwic2xpY2UiLCJlbGVPckN5Iiwic2NyYXRjaCIsImluaXRpYWxpemVkIiwic2hpZnRLZXlEb3duIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJkZWZpbmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlDRDs7QUFFRDtBQUNBLGFBQU9aLFdBQVcxSixFQUFYLEVBQWVFLFFBQXRCO0FBQ0QsS0E1R0Q7QUE4R0QsR0E1SkQ7O0FBOEpBLE1BQUksT0FBTzVDLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE9BQU9DLE9BQTVDLEVBQXFEO0FBQUU7QUFDckRELFdBQU9DLE9BQVAsR0FBaUJnTSxRQUFqQjtBQUNEOztBQUVELE1BQUksSUFBSixFQUFpRDtBQUFFO0FBQ2pEbUIsc0NBQW1DLFlBQVk7QUFDN0MsYUFBT25CLFFBQVA7QUFDRCxLQUZEO0FBQUE7QUFHRDs7QUFFRCxNQUFJLE9BQU9DLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFBRTtBQUN0Q0QsYUFBU0MsU0FBVDtBQUNEO0FBRUYsQ0FoTEQsSSIsImZpbGUiOiJjeXRvc2NhcGUtbGF5b3V0LXV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUxheW91dFV0aWxpdGllc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVMYXlvdXRVdGlsaXRpZXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNWI0ZGM0N2EzNWNjZGNhNzA4ZCIsImNsYXNzIFBvbHlvbWlubyB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gd2lkdGggd2lkdGggb2YgdGhlIHBvbHlvbWlubyBpbiBwaXhlbHNcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBoZWlnaHQgaGVpZ2h0IG9mIHRoZSBwb2x5b21pbm8gaW4gcGl4ZWxzXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaW5kZXggaW5kZXggaW4gYWNjb3JkaW5nIHRvIHRoZSBpbnB1dFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHgxXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geTFcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBncmlkU3RlcCB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgZ3JpZCBzcXVhcmVcbiAgICAgKiBcbiAgICAgKiBAZGVzY3JpcHRpb24gXG4gICAgICogTm90ZTogd2lkdGggYW5kIGhlaWdodCBhcmUgYWRkZWQgdG8gZXN0YWJsaXNoIGNlbnRlcmluZyBhY2NvcmRpbmcgdG8gb2xkIGxheW91dCBjZW50ZXJcbiAgICAgKiBcbiAgICAgKiBTaW5jZSB3aWR0aCBkaXZpZGVkIGJ5IHRoZSBncmlkIHN0ZXAgY2FuIGJlIGNhbGNsYXRlZCBmcm9tIHJhdyBzdGVwIGluc3RlYWQgb2YgYWRkaW5nIG5ld1xuICAgICAqIHZhcmlhYmxlcyBJIGNoYW5nZWQgd2lkdGggYW5kIGhlaWdodCBhbmQgYWRkZWQgZ3JpZFN0ZXAgdmFyaWFibGUgc28gdGhhdCBzdGVwV2l0aCBhbmQgc3RlcEhlaWdodCBjYW4gYmUgY2FsY3VsYXRlZFxuICAgICAqIGZyb20gdGhlc2UuIFxuICAgICAqIFxuICAgICAqIE9sZCB3aWR0aCBhbmQgaGVpZ2h0IHByb3BlcnRpZXMgd2VyZSBjb250YWluaW5nIGFjdHVhbGx5IHdpZHRoIGFuZCBoZWlnaHQgZGl2aWRlZCBieSBncmlkIHN0ZXAsIHNvIEkgdGhvdWdodCBzdGVwV2lkdGggYW5kXG4gICAgICogc3RlcEhlaWdodCBhcmUgbW9yZSBjb252ZW5pZW50IG5hbWVzIGZvciB0aGVtLiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHdpZHRoLCBoZWlnaHQsIGdyaWRTdGVwLCBpbmRleCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmdyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSh0aGlzLnN0ZXBXaWR0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGVwV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ncmlkW2ldID0gbmV3IEFycmF5KHRoaXMuc3RlcEhlaWdodCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc3RlcEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2ldW2pdID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4OyAvL2luZGV4IG9mIHBvbHlvbWlubyBpbiB0aGUgaW5wdXQgb2YgdGhlIHBhY2tpbmcgZnVuY3Rpb25cbiAgICAgICAgdGhpcy54MSA9IHgxOyAvL2tlcHQgdG8gZGV0ZXJtaW5lIHRoZSBhbW91bnQgb2Ygc2hpZnQgaW4gdGhlIG91dHB1dFxuICAgICAgICB0aGlzLnkxID0geTE7Ly9rZXB0IHRvIGRldGVybWluZSB0aGUgYW1vdW50IG9mIHNoaWZ0IGluIHRoZSBvdXRwdXRcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5ldyBQb2ludCgtMSwgLTEpOyAgLy90aGUgZ3JpZCBjZWxsIGNvb3JkaW5hdGVzIHdoZXJlIHRoZSBwb2x5b21pbm8gd2FzIHBsYWNlZFxuICAgICAgICAvKiogaW5uZXIgY2VudGVyICovXG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IFBvaW50KE1hdGguZmxvb3IodGhpcy5zdGVwV2lkdGggLyAyKSwgTWF0aC5mbG9vcih0aGlzLnN0ZXBIZWlnaHQgLyAyKSk7Ly8gY2VudGVyIG9mIHBvbHlvbWlub1xuICAgICAgICB0aGlzLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdpZHRoIG9mIHRoZSBwb2x5b21pbm8gZGl2aWRlZCBieSBncmlkIHN0ZXBzXG4gICAgICovXG4gICAgZ2V0IHN0ZXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRoaXMuZ3JpZFN0ZXApICsgMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoZWlnaHQgb2YgdGhlIHBvbHlvbWlubyBkaXZpZGVkIGJ5IGdyaWQgc3RlcHNcbiAgICAgKi9cbiAgICBnZXQgc3RlcEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyB0aGlzLmdyaWRTdGVwKSArIDE7XG4gICAgfVxuXG4gICAgZ2V0IHgyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54MSArIHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IHkyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55MSArIHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIGNlbnRlciByZWxhdGl2ZSB0byBsb2NhdGlvbiBpbnNpZGUgdGhlIGdyaWRcbiAgICAgKi9cbiAgICBnZXQgZ3JpZFN0ZXBDZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbnRlci5kaWZmKHRoaXMubG9jYXRpb24pO1xuICAgIH1cblxuICAgIGdldEJvdW5kaW5nUmVjdGFuZ2xlKCkge1xuICAgICAgICBjb25zdCBwb2x5eDEgPSB0aGlzLmxvY2F0aW9uLnggLSB0aGlzLmNlbnRlci54OyBcbiAgICAgICAgY29uc3QgcG9seXkxID0gdGhpcy5sb2NhdGlvbi55IC0gdGhpcy5jZW50ZXIueTtcblxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nUmVjdGFuZ2xlKFxuICAgICAgICAgICAgcG9seXgxLFxuICAgICAgICAgICAgcG9seXkxLFxuICAgICAgICAgICAgLy8gLTEgYmVjYXVzZSBpZiBsZW5ndGggPT0gMSB0aGVuIHgyID09IHgxXG4gICAgICAgICAgICBwb2x5eDEgKyB0aGlzLnN0ZXBXaWR0aCAtIDEsXG4gICAgICAgICAgICBwb2x5eTEgKyB0aGlzLnN0ZXBIZWlnaHQgLSAxIFxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgUG9pbnQge1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHggXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBvdGhlciAtIHRoaXMgZm9yIHggYW5kIHlcbiAgICAgKiBAcGFyYW0geyBQb2ludCB9IG90aGVyXG4gICAgICovXG4gICAgZGlmZihvdGhlcikge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgICAgICAgb3RoZXIueCAtIHRoaXMueCxcbiAgICAgICAgICAgIG90aGVyLnkgLSB0aGlzLnlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEJvdW5kaW5nUmVjdGFuZ2xlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSB4MVxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHkxXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0geDJcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSB5MlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgICB0aGlzLnkxID0geTE7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9XG5cbiAgICBjZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICAodGhpcy54MiAtIHRoaXMueDEpIC8gMixcbiAgICAgICAgICAgICh0aGlzLnkyIC0gdGhpcy55MSkgLyAyXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBDZWxsIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyBib29sZWFuIH0gb2NjdXBpZWQgXG4gICAgICogQHBhcmFtIHsgYm9vbGVhbiB9IHZpc2l0ZWQgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2NjdXBpZWQsIHZpc2l0ZWQpIHtcbiAgICAgICAgdGhpcy5vY2N1cGllZCA9IG9jY3VwaWVkOyAvL2Jvb2xlYW4gdG8gZGV0ZXJtaW5lIGlmIHRoZSBjZWxsIGlzIG9jY3VwaWVkXG4gICAgICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7IC8vYm9vbGVhbiB0byBkZXRlcm1pbmUgaWYgdGhlIGNlbGwgd2FzIHZpc2l0ZWQgYmVmb3JlIHdoaWxlIHRyYXZlcnNpbmcgdGhlIGNlbGxzXG4gICAgfVxufVxuXG5jbGFzcyBHcmlkIHtcbiAgICAvKiogXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gd2lkdGggXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaGVpZ2h0IFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IHN0ZXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgc3RlcCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgICAgICAvL2NyZWF0ZSBhbmQgaW50aWFsaXplIHRoZSBncmlkXG4gICAgICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuc3RlcFdpZHRoIH0sXG4gICAgICAgICAgICAoKF8pID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuc3RlcEhlaWdodCB9LFxuICAgICAgICAgICAgICAgICgoXykgPT4gbmV3IENlbGwoZmFsc2UsIGZhbHNlKSkpKSk7XG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IFBvaW50KE1hdGguZmxvb3IodGhpcy5zdGVwV2lkdGggLyAyKSwgTWF0aC5mbG9vcih0aGlzLnN0ZXBIZWlnaHQgLyAyKSk7XG4gICAgICAgIHRoaXMub2NjdXBpZWRSZWN0YW5nbGUgPSBuZXcgQm91bmRpbmdSZWN0YW5nbGUoXG4gICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFLCBOdW1iZXIuTUFYX1ZBTFVFLCBcbiAgICAgICAgICAgIC1OdW1iZXIuTUFYX1ZBTFVFLCAtTnVtYmVyLk1BWF9WQUxVRVxuICAgICAgICApOyAgLy8gdGhlIGJvdW5kaW5nIHJlY3RhbmJsZSBvZiB0aGUgb2NjdXBpZWQgY2VsbHMgaW4gdGhlIGdyaWRcbiAgICAgICAgdGhpcy5udW1iZXJPZk9jY3VwaXJlZENlbGxzID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHRoZSB3aWR0aCBpbiB0ZXJtcyBvZiBncmlkIHN0ZXBzXG4gICAgICovXG4gICAgZ2V0IHN0ZXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRoaXMuc3RlcCkgKyAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIGhlaWdodCBpbiB0ZXJtcyBvZiBncmlkIHN0ZXBzXG4gICAgICovXG4gICAgZ2V0IHN0ZXBIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGhpcy5zdGVwKSArIDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gZ2l2ZW4gYSBsaXN0IG9mIGNlbGxzIGl0IHJldHVybnMgdGhlIGRpcmVjdCB1bnZpc2l0ZWQgdW5vY2N1cGllZCBuZWlnaGJvcmluZyBjZWxscyBcbiAgICAgKi9cbiAgICBnZXREaXJlY3ROZWlnaGJvcnMoY2VsbHMsIGxldmVsKSB7XG4gICAgICAgIHZhciByZXN1bHRQb2ludHMgPSBbXTtcbiAgICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RlcFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc3RlcEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbaV1bal0ub2NjdXBpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cyA9IHJlc3VsdFBvaW50cy5jb25jYXQodGhpcy5nZXRDZWxsTmVpZ2hib3JzKGksIGopKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdGFydEluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBlbmRJbmRleCA9IHJlc3VsdFBvaW50cy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMjsgaSA8PSBsZXZlbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4ID49IHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHN0YXJ0SW5kZXg7IGogPD0gZW5kSW5kZXg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzID0gcmVzdWx0UG9pbnRzLmNvbmNhdCh0aGlzLmdldENlbGxOZWlnaGJvcnMocmVzdWx0UG9pbnRzW2pdLngsIHJlc3VsdFBvaW50c1tqXS55KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnRJbmRleCA9IGVuZEluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBlbmRJbmRleCA9IHJlc3VsdFBvaW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cyA9IHJlc3VsdFBvaW50cy5jb25jYXQodGhpcy5nZXRDZWxsTmVpZ2hib3JzKGNlbGwueCwgY2VsbC55KSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRQb2ludHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSBjZWxsIGF0IGxvY2F0b2luIGksaiBnZXQgdGhlIHVudmlzdGllZCB1bm9jY3VwaWVkIG5laWdoYm9yaW5nIGNlbGxcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBpXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0galxuICAgICAqL1xuICAgIGdldENlbGxOZWlnaGJvcnMoaSwgaikge1xuICAgICAgICB2YXIgcmVzdWx0UG9pbnRzID0gW107XG4gICAgICAgIC8vY2hlY2sgYWxsIHRoZSA4IHN1cnJvdW5kaW5nIGNlbGxzIFxuICAgICAgICBpZiAoaSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSAtIDFdW2pdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaSAtIDFdW2pdLnZpc2l0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRQb2ludHMucHVzaCh7IHg6IGkgLSAxLCB5OiBqIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpIC0gMV1bal0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgKyAxIDwgdGhpcy5zdGVwV2lkdGgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkW2kgKyAxXVtqXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgKyAxXVtqXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpICsgMSwgeTogaiB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaSArIDFdW2pdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChqIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpXVtqIC0gMV0ub2NjdXBpZWQgJiYgIXRoaXMuZ3JpZFtpXVtqIC0gMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSwgeTogaiAtIDEgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2ldW2ogLSAxXS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaiArIDEgPCB0aGlzLnN0ZXBIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkW2ldW2ogKyAxXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2ldW2ogKyAxXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpLCB5OiBqICsgMSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbaV1baiArIDFdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpIC0gMV1bal0ub2NjdXBpZWQgJiYgIXRoaXMuZ3JpZFtpIC0gMV1bal0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSAtIDEsIHk6IGogfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2kgLSAxXVtqXS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSAtIDEgPj0gMCAmJiBqIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpIC0gMV1baiAtIDFdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaSAtIDFdW2ogLSAxXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpIC0gMSwgeTogaiAtIDEgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2kgLSAxXVtqIC0gMV0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSArIDEgPCB0aGlzLnN0ZXBXaWR0aCAmJiBqIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpICsgMV1baiAtIDFdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaSArIDFdW2ogLSAxXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpICsgMSwgeTogaiAtIDEgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2kgKyAxXVtqIC0gMV0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAtIDEgPj0gMCAmJiBqICsgMSA8IHRoaXMuc3RlcEhlaWdodCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaSAtIDFdW2ogKyAxXS5vY2N1cGllZCAmJiAhdGhpcy5ncmlkW2kgLSAxXVtqICsgMV0udmlzaXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBvaW50cy5wdXNoKHsgeDogaSAtIDEsIHk6IGogKyAxIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtpIC0gMV1baiArIDFdLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpICsgMSA8IHRoaXMuc3RlcFdpZHRoICYmIGogKyAxIDwgdGhpcy5zdGVwSGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZFtpICsgMV1baiArIDFdLm9jY3VwaWVkICYmICF0aGlzLmdyaWRbaSArIDFdW2ogKyAxXS52aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnRzLnB1c2goeyB4OiBpICsgMSwgeTogaiArIDEgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW2kgKyAxXVtqICsgMV0udmlzaXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0UG9pbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGEgZnVuY3Rpb24gdG8gcGxhY2UgYSBnaXZlbiBwb2x5b21pbm8gaW4gdGhlIGNlbGwgaSBqIG9uIHRoZSBncmlkXG4gICAgICogQHBhcmFtIHsgUG9seW9taW5vIH0gcG9seW9taW5vIFxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGkgXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaiBcbiAgICAgKi9cbiAgICBwbGFjZVBvbHlvbWlubyhwb2x5b21pbm8sIGksIGopIHtcbiAgICAgICAgcG9seW9taW5vLmxvY2F0aW9uLnggPSBpO1xuICAgICAgICBwb2x5b21pbm8ubG9jYXRpb24ueSA9IGo7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcG9seW9taW5vLnN0ZXBXaWR0aDsgaysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHBvbHlvbWluby5zdGVwSGVpZ2h0OyBsKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocG9seW9taW5vLmdyaWRba11bbF0pIHsgLy9pZiBba10gW2xdIGNlbGwgaXMgb2NjdXBpZWQgaW4gcG9seW9taW5vXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFtrIC0gcG9seW9taW5vLmNlbnRlci54ICsgaV1bbCAtIHBvbHlvbWluby5jZW50ZXIueSArIGpdLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBudW1iZXIgb2Ygb2NjdXBpcmVkIGNlbGxzXG4gICAgICAgIHRoaXMubnVtYmVyT2ZPY2N1cGlyZWRDZWxscyArPSBwb2x5b21pbm8ubnVtYmVyT2ZPY2N1cGlyZWRDZWxscztcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlQm91bmRzKHBvbHlvbWlubyk7XG4gICAgICAgIFxuICAgICAgICAvLyByZXNldCB2aXNpdGVkIGNlbGxzIHRvIG5vbmVcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnN0ZXBXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc3RlcEhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW3hdW3ldLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgc3RlcCByZWN0YW5nbGUgYm91bmRzIHNvIHRoYXQgdGhlIGBwb2x5b21pbm9gIGZpdHNcbiAgICAgKiBAcGFyYW0geyBQb2x5b21pbm8gfSBwb2x5b21pbm9cbiAgICAgKi9cbiAgICB1cGRhdGVCb3VuZHMocG9seW9taW5vKSB7XG4gICAgICAgIGxldCBwb2x5UmVjdCA9IHBvbHlvbWluby5nZXRCb3VuZGluZ1JlY3RhbmdsZSgpO1xuXG4gICAgICAgIHRoaXMub2NjdXBpZWRSZWN0YW5nbGUueDEgPSBNYXRoLm1pbih0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngxLCBwb2x5UmVjdC54MSk7XG4gICAgICAgIHRoaXMub2NjdXBpZWRSZWN0YW5nbGUueDIgPSBNYXRoLm1heCh0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngyLCBwb2x5UmVjdC54Mik7XG4gICAgICAgIHRoaXMub2NjdXBpZWRSZWN0YW5nbGUueTEgPSBNYXRoLm1pbih0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkxLCBwb2x5UmVjdC55MSk7XG4gICAgICAgIHRoaXMub2NjdXBpZWRSZWN0YW5nbGUueTIgPSBNYXRoLm1heCh0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkyLCBwb2x5UmVjdC55Mik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgYSBwb2x5b21pbm8gY2FuIGJlIHBsYWNlZCBvbiB0aGUgZ2l2ZW4gY2VsbCBpLGpcbiAgICAgKiBAcGFyYW0geyBQb2x5b21pbm8gfSBwb2x5b21pbm8gXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaSBcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBqIFxuICAgICAqL1xuICAgIHRyeVBsYWNpbmdQb2x5b21pbm8ocG9seW9taW5vLCBpLCBqKSB7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcG9seW9taW5vLnN0ZXBXaWR0aDsgaysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHBvbHlvbWluby5zdGVwSGVpZ2h0OyBsKyspIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBmYWxzZSBpZiBwb2x5b21pbm8gZ29lcyBvdXRzaWRlIHRoZSBncmlkIHdoZW4gcGxhY2VkIG9uIGksalxuICAgICAgICAgICAgICAgIGlmIChrIC0gcG9seW9taW5vLmNlbnRlci54ICsgaSA+PSB0aGlzLnN0ZXBXaWR0aCB8fCBrIC0gcG9seW9taW5vLmNlbnRlci54ICsgaSA8IDAgfHwgbCAtIHBvbHlvbWluby5jZW50ZXIueSArIGogPj0gdGhpcy5zdGVwSGVpZ2h0IHx8IGwgLSBwb2x5b21pbm8uY2VudGVyLnkgKyBqIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlIGlmIHRoZSAgcG9seW1pbm8gY2VsbCBhbmQgdGhlIGNvcnJvc3BvbmRpbmcgbWFpbiBncmlkIGNlbGwgYXJlIGJvdGggb2NjdXBpZWRcbiAgICAgICAgICAgICAgICBpZiAocG9seW9taW5vLmdyaWRba11bbF0gJiYgdGhpcy5ncmlkW2sgLSBwb2x5b21pbm8uY2VudGVyLnggKyBpXVtsIC0gcG9seW9taW5vLmNlbnRlci55ICsgal0ub2NjdXBpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYWxjdWxhdGVzIHRoZSB2YWx1ZSBvZiB0aGUgdXRpbGl0eSAoYXNwZWN0IHJhdGlvKSBvZiBwbGFjaW5nIGEgcG9seW9taW5vIG9uIGNlbGwgaSxqXG4gICAgICogQHBhcmFtIHsgUG9seW9taW5vIH0gcG9seW9taW5vXG4gICAgICogQHBhcmFtIHsgbnVtYmVyIH0gaVxuICAgICAqIEBwYXJhbSB7IG51bWJlciB9IGpcbiAgICAgKiBAcGFyYW0geyBudW1iZXIgfSBkZXNpcmVkQXNwZWN0UmF0aW9cbiAgICAgKi9cbiAgICBjYWxjdWxhdGVVdGlsaXR5T2ZQbGFjaW5nKHBvbHlvbWlubywgaSwgaiwgZGVzaXJlZEFzcGVjdFJhdGlvKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIGFjdHVhbEFzcGVjdFJhdGlvID0gMTtcbiAgICAgICAgdmFyIGZ1bGxuZXNzID0gMTtcbiAgICAgICAgdmFyIGFkanVzdGVkRnVsbG5lc3MgPSAxO1xuICAgICAgICB2YXIgeDEgPSB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngxO1xuICAgICAgICB2YXIgeDIgPSB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLngyO1xuICAgICAgICB2YXIgeTEgPSB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkxO1xuICAgICAgICB2YXIgeTIgPSB0aGlzLm9jY3VwaWVkUmVjdGFuZ2xlLnkyO1xuICAgICAgICBpZiAoaSAtIHBvbHlvbWluby5jZW50ZXIueCA8IHgxKSB4MSA9IGkgLSBwb2x5b21pbm8uY2VudGVyLng7XG4gICAgICAgIGlmIChqIC0gcG9seW9taW5vLmNlbnRlci55IDwgeTEpIHkxID0gaiAtIHBvbHlvbWluby5jZW50ZXIueTtcbiAgICAgICAgaWYgKHBvbHlvbWluby5zdGVwV2lkdGggLSAxIC0gcG9seW9taW5vLmNlbnRlci54ICsgaSA+IHgyKSB4MiA9IHBvbHlvbWluby5zdGVwV2lkdGggLSAxIC0gcG9seW9taW5vLmNlbnRlci54ICsgaTtcbiAgICAgICAgaWYgKHBvbHlvbWluby5zdGVwSGVpZ2h0IC0gMSAtIHBvbHlvbWluby5jZW50ZXIueSArIGogPiB5MikgeTIgPSBwb2x5b21pbm8uc3RlcEhlaWdodCAtIDEgLSBwb2x5b21pbm8uY2VudGVyLnkgKyBqO1xuICAgICAgICB2YXIgd2lkdGggPSB4MiAtIHgxICsgMTtcbiAgICAgICAgdmFyIGhlaWdodCA9IHkyIC0geTEgKyAxO1xuICAgICAgICBhY3R1YWxBc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBmdWxsbmVzcyA9ICh0aGlzLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMgKyBwb2x5b21pbm8ubnVtYmVyT2ZPY2N1cGlyZWRDZWxscykgLyAod2lkdGggKiBoZWlnaHQpO1xuXG4gICAgICAgIGlmIChhY3R1YWxBc3BlY3RSYXRpbyA+IGRlc2lyZWRBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgYWRqdXN0ZWRGdWxsbmVzcyA9ICh0aGlzLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMgKyBwb2x5b21pbm8ubnVtYmVyT2ZPY2N1cGlyZWRDZWxscykgLyAod2lkdGggKiAod2lkdGggLyBkZXNpcmVkQXNwZWN0UmF0aW8pKTtcbiAgICAgICAgICAgIC8vIGhlaWdodCA9IHdpZHRoIC8gZGVzaXJlZEFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRqdXN0ZWRGdWxsbmVzcyA9ICh0aGlzLm51bWJlck9mT2NjdXBpcmVkQ2VsbHMgKyBwb2x5b21pbm8ubnVtYmVyT2ZPY2N1cGlyZWRDZWxscykgLyAoKGhlaWdodCAqIGRlc2lyZWRBc3BlY3RSYXRpbykgKiBoZWlnaHQpO1xuICAgICAgICAgICAgLy8gd2lkdGggPSBoZWlnaHQgKiBkZXNpcmVkQXNwZWN0UmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuYWN0dWFsQXNwZWN0UmF0aW8gPSBhY3R1YWxBc3BlY3RSYXRpbztcbiAgICAgICAgcmVzdWx0LmZ1bGxuZXNzID0gZnVsbG5lc3M7XG4gICAgICAgIHJlc3VsdC5hZGp1c3RlZEZ1bGxuZXNzID0gYWRqdXN0ZWRGdWxsbmVzcztcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgR3JpZDogR3JpZCxcbiAgICBQb2x5b21pbm86IFBvbHlvbWlubyxcbiAgICBCb3VuZGluZ1JlY3RhbmdsZTogQm91bmRpbmdSZWN0YW5nbGUsXG4gICAgUG9pbnQ6IFBvaW50XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3BvbHlvbWluby1wYWNraW5nLmpzIiwidmFyIGdlbmVyYWxVdGlscyA9IHt9O1xudmFyIHBvbHlvbWlub1BhY2tpbmcgPSByZXF1aXJlKCcuL3BvbHlvbWluby1wYWNraW5nJyk7XG5jb25zdCB7IFBvaW50IH0gPSByZXF1aXJlKCcuL3BvbHlvbWluby1wYWNraW5nJyk7XG5cblxuLy9hIGZ1bmN0aW9uIHRvIHJlbW92ZSBkdXBsaWNhdGUgb2JqZWN0IGluIGFycmF5XG5nZW5lcmFsVXRpbHMudW5pcXVlQXJyYXkgPSBmdW5jdGlvbiAoYXIpIHtcbiAgdmFyIGogPSB7fTtcbiAgYXIuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIGpbdiArICc6OicgKyB0eXBlb2Ygdl0gPSB2O1xuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGopLm1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiBqW3ZdO1xuICB9KTtcbn07XG5cbi8vYSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgdGhlIGdyaWQgY2VsbHMgd2hlcmUgYSBsaW5lIGJldHdlZW4gcG9pbnQgcDAgYW5kIHAxIHBhc3MgdGhyb3VnaFxuZ2VuZXJhbFV0aWxzLkxpbmVTdXBlckNvdmVyID0gZnVuY3Rpb24gKHAwLCBwMSkge1xuICB2YXIgZHggPSBwMS54IC0gcDAueCwgZHkgPSBwMS55IC0gcDAueTtcbiAgdmFyIG54ID0gTWF0aC5mbG9vcihNYXRoLmFicyhkeCkpLCBueSA9IE1hdGguZmxvb3IoTWF0aC5hYnMoZHkpKTtcbiAgdmFyIHNpZ25feCA9IGR4ID4gMCA/IDEgOiAtMSwgc2lnbl95ID0gZHkgPiAwID8gMSA6IC0xO1xuXG4gIHZhciBwID0gbmV3IHBvbHlvbWlub1BhY2tpbmcuUG9pbnQocDAueCwgcDAueSk7XG4gIHZhciBwb2ludHMgPSBbbmV3IHBvbHlvbWlub1BhY2tpbmcuUG9pbnQocC54LCBwLnkpXTtcbiAgZm9yICh2YXIgaXggPSAwLCBpeSA9IDA7IGl4IDwgbnggfHwgaXkgPCBueTspIHtcbiAgICBpZiAoKDAuNSArIGl4KSAvIG54ID09ICgwLjUgKyBpeSkgLyBueSkge1xuICAgICAgLy8gbmV4dCBzdGVwIGlzIGRpYWdvbmFsXG4gICAgICBwLnggKz0gc2lnbl94O1xuICAgICAgcC55ICs9IHNpZ25feTtcbiAgICAgIGl4Kys7XG4gICAgICBpeSsrO1xuICAgIH0gZWxzZSBpZiAoKDAuNSArIGl4KSAvIG54IDwgKDAuNSArIGl5KSAvIG55KSB7XG4gICAgICAvLyBuZXh0IHN0ZXAgaXMgaG9yaXpvbnRhbFxuICAgICAgcC54ICs9IHNpZ25feDtcbiAgICAgIGl4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5leHQgc3RlcCBpcyB2ZXJ0aWNhbFxuICAgICAgcC55ICs9IHNpZ25feTtcbiAgICAgIGl5Kys7XG4gICAgfVxuICAgIHBvaW50cy5wdXNoKG5ldyBwb2x5b21pbm9QYWNraW5nLlBvaW50KHAueCwgcC55KSk7XG4gIH1cbiAgcmV0dXJuIHBvaW50cztcbn07XG5cbi8qKlxuICogZmluZHMgdGhlIGN1cnJlbnQgY2VudGVyIG9mIGNvbXBvbmVudHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gY29tcG9uZW50cyBcbiAqL1xuZ2VuZXJhbFV0aWxzLmdldENlbnRlciA9IGZ1bmN0aW9uIChjb21wb25lbnRzKSB7XG4gIC8vIEluIGNhc2UgdGhlIHBsYXRmb3JtIGRvZXNuJ3QgaGF2ZSBmbGF0TWFwIGZ1bmN0aW9uXG4gIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlWydmbGF0TWFwJ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgQXJyYXkucHJvdG90eXBlWydmbGF0TWFwJ10gPSBmdW5jdGlvbiAoZikge1xuICAgICAgY29uc3QgY29uY2F0ID0gKHgsIHkpID0+IHguY29uY2F0KHkpO1xuICAgICAgY29uc3QgZmxhdE1hcCA9IChmLCB4cykgPT4geHMubWFwKGYpLnJlZHVjZShjb25jYXQsIFtdKTtcblxuICAgICAgcmV0dXJuIGZsYXRNYXAoZiwgdGhpcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEB0cy1pZ25vcmVcbiAgbGV0IGJvdW5kcyA9IGNvbXBvbmVudHMuZmxhdE1hcChjb21wb25lbnQgPT4gY29tcG9uZW50Lm5vZGVzKVxuICAgIC5tYXAobm9kZSA9PiAoe1xuICAgICAgbGVmdDogbm9kZS54LFxuICAgICAgdG9wOiBub2RlLnksXG4gICAgICByaWdodDogbm9kZS54ICsgbm9kZS53aWR0aCAtIDEsXG4gICAgICBib3R0b206IG5vZGUueSArIG5vZGUuaGVpZ2h0IC0gMSxcbiAgICB9KSlcbiAgICAucmVkdWNlKChib3VuZHMsIGN1cnJOb2RlKSA9PiAoe1xuICAgICAgICBsZWZ0OiBNYXRoLm1pbihjdXJyTm9kZS5sZWZ0LCBib3VuZHMubGVmdCksXG4gICAgICAgIHJpZ2h0OiBNYXRoLm1heChjdXJyTm9kZS5yaWdodCwgYm91bmRzLnJpZ2h0KSxcbiAgICAgICAgdG9wOiBNYXRoLm1pbihjdXJyTm9kZS50b3AsIGJvdW5kcy50b3ApLFxuICAgICAgICBib3R0b206IE1hdGgubWF4KGN1cnJOb2RlLmJvdHRvbSwgYm91bmRzLmJvdHRvbSlcbiAgICB9KSwge1xuICAgICAgbGVmdDogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgIHJpZ2h0OiAtTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgIHRvcDogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgIGJvdHRvbTogLU51bWJlci5NQVhfVkFMVUVcbiAgICB9KTtcblxuICByZXR1cm4gbmV3IFBvaW50KChib3VuZHMubGVmdCArIGJvdW5kcy5yaWdodCkgLyAyLCAoYm91bmRzLnRvcCArIGJvdW5kcy5ib3R0b20pIC8gMik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYWxVdGlscztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9nZW5lcmFsLXV0aWxzLmpzIiwiXG52YXIgZ2VuZXJhbFV0aWxzID0gcmVxdWlyZSgnLi9nZW5lcmFsLXV0aWxzLmpzJyk7XG52YXIgcG9seW9taW5vUGFja2luZyA9IHJlcXVpcmUoJy4vcG9seW9taW5vLXBhY2tpbmcnKTtcbmNvbnN0IHsgUG9pbnQsIFBvbHlvbWlubyB9ID0gcmVxdWlyZSgnLi9wb2x5b21pbm8tcGFja2luZycpO1xuY29uc3QgeyBnZXRDZW50ZXIgfSA9IHJlcXVpcmUoJy4vZ2VuZXJhbC11dGlscy5qcycpO1xudmFyIGxheW91dFV0aWxpdGllcyA9IGZ1bmN0aW9uIChjeSwgb3B0aW9ucykge1xuXG4gIC8qICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgIGlkZWFsRWRnZUxlbmd0aCA6IDUwLFxuICAgICBvZmZzZXQgOiAyMCxcbiAgICAgZGVzaXJlZEFzcGVjdFJhdGlvIDogMSxcbiAgICAgcG9seW9taW5vR3JpZFNpemVGYWN0b3IgOiAxLFxuICAgICB1dGlsaXR5RnVuY3Rpb24gOiAxXG4gICB9O1xuIFxuICAgZnVuY3Rpb24gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgIHZhciBvYmogPSB7fTtcbiBcbiAgICAgZm9yICh2YXIgaSBpbiBkZWZhdWx0cykge1xuICAgICAgIG9ialtpXSA9IGRlZmF1bHRzW2ldO1xuICAgICB9XG4gXG4gICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykgeyAgICAgIFxuICAgICAgIG9ialtpXSA9IG9wdGlvbnNbaV07XG4gICAgIH1cbiBcbiAgICAgcmV0dXJuIG9iajtcbiAgIH07XG4gXG4gICBvcHRpb25zID0gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTsgKi9cbiAgdmFyIGluc3RhbmNlID0ge307XG5cbiAgaW5zdGFuY2UucGxhY2VIaWRkZW5Ob2RlcyA9IGZ1bmN0aW9uIChtYWluRWxlcykge1xuICAgIG1haW5FbGVzLmZvckVhY2goZnVuY3Rpb24gKG1haW5FbGUpIHtcbiAgICAgIHZhciBoaWRkZW5FbGVzID0gbWFpbkVsZS5uZWlnaGJvcmhvb2QoKS5ub2RlcyhcIjpoaWRkZW5cIik7XG4gICAgICBoaWRkZW5FbGVzLmZvckVhY2goZnVuY3Rpb24gKGhpZGRlbkVsZSkge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gaGlkZGVuRWxlLm5laWdoYm9yaG9vZCgpLm5vZGVzKFwiOnZpc2libGVcIik7XG4gICAgICAgIGlmIChuZWlnaGJvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGluc3RhbmNlLm5vZGVXaXRoTXVsdGlwbGVOZWlnaGJvcnMoaGlkZGVuRWxlKTtcbiAgICAgICAgfSBlbHNlIGluc3RhbmNlLm5vZGVXaXRoT25lTmVpZ2hib3IobWFpbkVsZSwgaGlkZGVuRWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGluc3RhbmNlLnBsYWNlTmV3Tm9kZXMgPSBmdW5jdGlvbiAoZWxlcykge1xuICAgIHZhciBjb21wb25lbnRzID0gdGhpcy5maW5kQ29tcG9uZW50cyhlbGVzKTtcbiAgICB2YXIgZGlzY29ubmVjdGVkQ29tcCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG9uZU5laWcgPSBmYWxzZTtcbiAgICAgIHZhciBtdWx0TmVpZyA9IGZhbHNlO1xuICAgICAgdmFyIG1haW5FbGU7XG4gICAgICB2YXIgbXVsdG5laWdoYm9ycyA9IFtdO1xuICAgICAgdmFyIHBvc2l0aW9uZWQgPSBbXTtcbiAgICAgIHZhciB4ID0gMDtcbiAgICAgIHZhciB5ID0gMDtcbiAgICAgIHZhciBpc1Bvc2l0aW9uZWQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29tcG9uZW50c1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gY29tcG9uZW50c1tpXVtqXS5uZWlnaGJvcmhvb2QoKS5ub2RlcygpLmRpZmZlcmVuY2UoZWxlcyk7XG4gICAgICAgIHBvc2l0aW9uZWQucHVzaChmYWxzZSk7XG4gICAgICAgIGlmIChuZWlnaGJvcnMubGVuZ3RoID4gMSAmJiAhaXNQb3NpdGlvbmVkKSB7XG4gICAgICAgICAgbXVsdE5laWcgPSB0cnVlO1xuICAgICAgICAgIHBvc2l0aW9uZWRbal0gPSB0cnVlO1xuICAgICAgICAgIG11bHRuZWlnaGJvcnMgPSBuZWlnaGJvcnM7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZVdpdGhNdWx0aXBsZU5laWdoYm9ycyhjb21wb25lbnRzW2ldW2pdLCBtdWx0bmVpZ2hib3JzKTtcbiAgICAgICAgICB4ID0gY29tcG9uZW50c1tpXVtqXS5wb3NpdGlvbihcInhcIik7XG4gICAgICAgICAgeSA9IGNvbXBvbmVudHNbaV1bal0ucG9zaXRpb24oXCJ5XCIpO1xuICAgICAgICAgIGlzUG9zaXRpb25lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmVpZ2hib3JzLmxlbmd0aCA9PSAxICYmICFpc1Bvc2l0aW9uZWQpIHtcbiAgICAgICAgICBvbmVOZWlnID0gdHJ1ZTtcbiAgICAgICAgICBtYWluRWxlID0gbmVpZ2hib3JzWzBdO1xuICAgICAgICAgIHBvc2l0aW9uZWRbal0gPSB0cnVlO1xuICAgICAgICAgIGluc3RhbmNlLm5vZGVXaXRoT25lTmVpZ2hib3IobWFpbkVsZSwgY29tcG9uZW50c1tpXVtqXSk7XG4gICAgICAgICAgeCA9IGNvbXBvbmVudHNbaV1bal0ucG9zaXRpb24oXCJ4XCIpO1xuICAgICAgICAgIHkgPSBjb21wb25lbnRzW2ldW2pdLnBvc2l0aW9uKFwieVwiKTtcbiAgICAgICAgICBpc1Bvc2l0aW9uZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvbmVOZWlnIHx8IG11bHROZWlnKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29tcG9uZW50c1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChwb3NpdGlvbmVkW2pdID09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3JzID0gY29tcG9uZW50c1tpXVtqXS5uZWlnaGJvcmhvb2QoKS5ub2RlcygpO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uZWROZWlnYm9ycyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBjb21wb25lbnRzW2ldW2pdLm5laWdoYm9yaG9vZCgpLm5vZGVzKCkuZGlmZmVyZW5jZShlbGVzKTtcbiAgICAgICAgICAgIGN1cnIuZm9yRWFjaChmdW5jdGlvbiAoZWxlKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uZWROZWlnYm9ycy5wdXNoKGVsZSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG5laWdoYm9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICBpZiAocG9zaXRpb25lZFtjb21wb25lbnRzW2ldLmluZGV4T2YobmVpZ2hib3JzW2tdKV0pIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbmVkTmVpZ2JvcnMucHVzaChuZWlnaGJvcnNba10pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9zaXRpb25lZE5laWdib3JzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZVdpdGhNdWx0aXBsZU5laWdoYm9ycyhjb21wb25lbnRzW2ldW2pdLCBwb3NpdGlvbmVkTmVpZ2JvcnMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbmVkTmVpZ2JvcnMubGVuZ3RoID09IDEpIGluc3RhbmNlLm5vZGVXaXRoT25lTmVpZ2hib3IocG9zaXRpb25lZE5laWdib3JzWzBdLCBjb21wb25lbnRzW2ldW2pdKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgaG9yaXpvbnRhbFAgPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbShvcHRpb25zLm9mZnNldCwgb3B0aW9ucy5vZmZzZXQgKiAyLCAwKTtcbiAgICAgICAgICAgICAgdmFyIHZlcnRpY2FsUCA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKG9wdGlvbnMub2Zmc2V0LCBvcHRpb25zLm9mZnNldCAqIDIsIDApO1xuICAgICAgICAgICAgICBjb21wb25lbnRzW2ldW2pdLnBvc2l0aW9uKFwieFwiLCB4ICsgaG9yaXpvbnRhbFApO1xuICAgICAgICAgICAgICBjb21wb25lbnRzW2ldW2pdLnBvc2l0aW9uKFwieVwiLCB5ICsgdmVydGljYWxQKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc2l0aW9uZWRbal0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpc2Nvbm5lY3RlZENvbXAucHVzaChjb21wb25lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlzY29ubmVjdGVkQ29tcC5sZW5ndGggPj0gMSkge1xuICAgICAgaW5zdGFuY2UuZGlzY29ubmVjdGVkTm9kZXMoZGlzY29ubmVjdGVkQ29tcCk7XG4gICAgfVxuICB9O1xuXG4gIGluc3RhbmNlLmRpc2Nvbm5lY3RlZE5vZGVzID0gZnVuY3Rpb24gKGNvbXBvbmVudHMpIHtcbiAgICB2YXIgbGVmdFggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHZhciByaWdodFggPSAtTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgdG9wWSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIGJvdHRvbVkgPSAtTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAvLyBDaGVjayB0aGUgeCBhbmQgeSBsaW1pdHMgb2YgYWxsIGhpZGRlbiBlbGVtZW50cyBhbmQgc3RvcmUgdGhlbSBpbiB0aGUgdmFyaWFibGVzIGFib3ZlXG4gICAgY3kubm9kZXMoJzp2aXNpYmxlJykuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIGhhbGZXaWR0aCA9IG5vZGUub3V0ZXJXaWR0aCgpIC8gMjtcbiAgICAgIHZhciBoYWxmSGVpZ2h0ID0gbm9kZS5vdXRlckhlaWdodCgpIC8gMjtcbiAgICAgIGlmIChub2RlLnBvc2l0aW9uKFwieFwiKSAtIGhhbGZXaWR0aCA8IGxlZnRYKVxuICAgICAgICBsZWZ0WCA9IG5vZGUucG9zaXRpb24oXCJ4XCIpIC0gaGFsZldpZHRoO1xuICAgICAgaWYgKG5vZGUucG9zaXRpb24oXCJ4XCIpICsgaGFsZldpZHRoID4gcmlnaHRYKVxuICAgICAgICByaWdodFggPSBub2RlLnBvc2l0aW9uKFwieFwiKSArIGhhbGZXaWR0aDtcbiAgICAgIGlmIChub2RlLnBvc2l0aW9uKFwieVwiKSAtIGhhbGZIZWlnaHQgPCB0b3BZKVxuICAgICAgICB0b3BZID0gbm9kZS5wb3NpdGlvbihcInlcIikgLSBoYWxmSGVpZ2h0O1xuICAgICAgaWYgKG5vZGUucG9zaXRpb24oXCJ5XCIpICsgaGFsZkhlaWdodCA+IGJvdHRvbVkpXG4gICAgICAgIGJvdHRvbVkgPSBub2RlLnBvc2l0aW9uKFwieVwiKSArIGhhbGZIZWlnaHQ7XG4gICAgfSk7XG5cbiAgICB2YXIgcmFkaXVzeSA9IHRvcFkgLSBib3R0b21ZO1xuICAgIHZhciByYWRpdXN4ID0gcmlnaHRYIC0gbGVmdFg7XG4gICAgdmFyIGlubmVyUmFkaXVzID0gKE1hdGguc3FydChyYWRpdXN4ICogcmFkaXVzeCArIHJhZGl1c3kgKiByYWRpdXN5KSkgLyAyO1xuICAgIHZhciBjZW50ZXJYID0gKGxlZnRYICsgcmlnaHRYKSAvIDI7XG4gICAgdmFyIGNlbnRlclkgPSAodG9wWSArIGJvdHRvbVkpIC8gMjtcbiAgICAvL3ZhciBjb21wb25lbnRzID0gdGhpcy5maW5kQ29tcG9uZW50cyhuZXdFbGVzKTtcbiAgICB2YXIgbnVtT2ZDb21wb25lbnRzID0gY29tcG9uZW50cy5sZW5ndGg7XG4gICAgdmFyIGFuZ2xlID0gMzYwIC8gbnVtT2ZDb21wb25lbnRzO1xuICAgIHZhciBjb3VudCA9IDE7XG5cbiAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXG4gICAgICB2YXIgZGlzdEZyb21DZW50ZXIgPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbShpbm5lclJhZGl1cyArIG9wdGlvbnMub2Zmc2V0ICogNiwgaW5uZXJSYWRpdXMgKyBvcHRpb25zLm9mZnNldCAqIDgsIDEpO1xuICAgICAgdmFyIGN1ckFuZ2xlID0gYW5nbGUgKiBjb3VudDtcbiAgICAgIHZhciBhbmdsZUluUmFkaWFucyA9IGN1ckFuZ2xlICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIHZhciB4ID0gY2VudGVyWCArIGRpc3RGcm9tQ2VudGVyICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xuICAgICAgdmFyIHkgPSBjZW50ZXJZICsgZGlzdEZyb21DZW50ZXIgKiBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XG5cbiAgICAgIGlmIChjb21wb25lbnQubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29tcG9uZW50WzBdLnBvc2l0aW9uKFwieFwiLCB4KTtcbiAgICAgICAgY29tcG9uZW50WzBdLnBvc2l0aW9uKFwieVwiLCB5KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgcG9zaXRpb25lZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvbmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHBvc2l0aW9uZWQucHVzaChmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwb3NpdGlvbmVkWzBdID0gdHJ1ZTtcbiAgICAgICAgY29tcG9uZW50WzBdLnBvc2l0aW9uKFwieFwiLCB4KTtcbiAgICAgICAgY29tcG9uZW50WzBdLnBvc2l0aW9uKFwieVwiLCB5KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNvbXBvbmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBuZWlnaGJvcnMgPSBjb21wb25lbnRbaV0ubmVpZ2hib3Job29kKCkubm9kZXMoKTtcbiAgICAgICAgICB2YXIgcG9zaXRpb25lZE5laWdib3JzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZWlnaGJvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbmVkW2NvbXBvbmVudC5pbmRleE9mKG5laWdoYm9yc1tqXSldKSB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uZWROZWlnYm9ycy5wdXNoKG5laWdoYm9yc1tqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwb3NpdGlvbmVkTmVpZ2JvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZVdpdGhNdWx0aXBsZU5laWdoYm9ycyhjb21wb25lbnRbaV0sIHBvc2l0aW9uZWROZWlnYm9ycyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbmVkTmVpZ2JvcnMubGVuZ3RoID09IDEpIGluc3RhbmNlLm5vZGVXaXRoT25lTmVpZ2hib3IocG9zaXRpb25lZE5laWdib3JzWzBdLCBjb21wb25lbnRbaV0pO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGhvcml6b250YWxQID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20ob3B0aW9ucy5vZmZzZXQsIG9wdGlvbnMub2Zmc2V0ICogMiwgMCk7XG4gICAgICAgICAgICB2YXIgdmVydGljYWxQID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20ob3B0aW9ucy5vZmZzZXQsIG9wdGlvbnMub2Zmc2V0ICogMiwgMCk7XG4gICAgICAgICAgICBjb21wb25lbnRbaV0ucG9zaXRpb24oXCJ4XCIsIHggKyBob3Jpem9udGFsUCk7XG4gICAgICAgICAgICBjb21wb25lbnRbaV0ucG9zaXRpb24oXCJ5XCIsIHkgKyB2ZXJ0aWNhbFApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbmVkW2ldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY291bnQrKztcbiAgICB9KTtcbiAgfTtcblxuICBpbnN0YW5jZS5maW5kQ29tcG9uZW50cyA9IGZ1bmN0aW9uIChuZXdFbGVzKSB7XG5cbiAgICB2YXIgYWRqTGlzdEFycmF5ID0gW107XG4gICAgdmFyIGN1cnJlbnQgPSBjeS5ub2RlcygpLmRpZmZlcmVuY2UobmV3RWxlcyk7XG4gICAgbmV3RWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGUpIHtcbiAgICAgIHZhciBuZWlnaGJvcnMgPSBlbGUubmVpZ2hib3Job29kKCkubm9kZXMoKS5kaWZmZXJlbmNlKGN1cnJlbnQpO1xuICAgICAgdmFyIGxpc3RPZkluZGV4ZXMgPSBbXTtcbiAgICAgIG5laWdoYm9ycy5mb3JFYWNoKGZ1bmN0aW9uIChuZWlnYm9yKSB7XG4gICAgICAgIHZhciBpbmRleCA9IG5ld0VsZXMuaW5kZXhPZihuZWlnYm9yKTtcbiAgICAgICAgbGlzdE9mSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH0pO1xuICAgICAgYWRqTGlzdEFycmF5LnB1c2gobGlzdE9mSW5kZXhlcyk7XG4gICAgfSk7XG5cbiAgICAvLyBNYXJrIGFsbCB0aGUgdmVydGljZXMgYXMgbm90IHZpc2l0ZWQgXG4gICAgdmFyIHZpc2l0ZWQgPSBbXTtcbiAgICBmb3IgKHZhciB2ID0gMDsgdiA8IG5ld0VsZXMubGVuZ3RoOyB2KyspIHtcbiAgICAgIHZpc2l0ZWQucHVzaChmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RPZkNvbXBvbmVudHMgPSBbXTtcblxuXG4gICAgZm9yICh2YXIgdiA9IDA7IHYgPCBuZXdFbGVzLmxlbmd0aDsgdisrKSB7XG4gICAgICB2YXIgZWxlc09mQ29tcG9uZW50ID0gW107XG4gICAgICBpZiAodmlzaXRlZFt2XSA9PSBmYWxzZSkge1xuICAgICAgICAvLyBwcmludCBhbGwgcmVhY2hhYmxlIHZlcnRpY2VzIFxuICAgICAgICAvLyBmcm9tIHYgXG4gICAgICAgIHRoaXMuREZTVXRpbCh2LCB2aXNpdGVkLCBhZGpMaXN0QXJyYXksIG5ld0VsZXMsIGVsZXNPZkNvbXBvbmVudCk7XG4gICAgICAgIGxpc3RPZkNvbXBvbmVudHMucHVzaChlbGVzT2ZDb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaXN0T2ZDb21wb25lbnRzO1xuICB9O1xuXG4gIGluc3RhbmNlLkRGU1V0aWwgPSBmdW5jdGlvbiAodiwgdmlzaXRlZCwgYWRqTGlzdEFycmF5LCBuZXdFbGVzLCBlbGVzT2ZDb21wb25lbnQpIHtcbiAgICAvLyBNYXJrIHRoZSBjdXJyZW50IG5vZGUgYXMgdmlzaXRlZCBhbmQgcHJpbnQgaXQgXG4gICAgdmlzaXRlZFt2XSA9IHRydWU7XG4gICAgZWxlc09mQ29tcG9uZW50LnB1c2gobmV3RWxlc1t2XSk7XG4gICAgLy8gUmVjdXIgZm9yIGFsbCB0aGUgdmVydGljZXMgXG4gICAgLy8gYWRqYWNlbnQgdG8gdGhpcyB2ZXJ0ZXggXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGpMaXN0QXJyYXlbdl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdmlzaXRlZFthZGpMaXN0QXJyYXlbdl1baV1dKSB0aGlzLkRGU1V0aWwoYWRqTGlzdEFycmF5W3ZdW2ldLCB2aXNpdGVkLCBhZGpMaXN0QXJyYXksIG5ld0VsZXMsIGVsZXNPZkNvbXBvbmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGluc3RhbmNlLm5vZGVXaXRoT25lTmVpZ2hib3IgPSBmdW5jdGlvbiAobWFpbkVsZSwgaGlkZGVuRWxlKSB7XG4gICAgdmFyIHF1YWRyYW50cyA9IGluc3RhbmNlLmNoZWNrT2NjdXBpZWRRdWFkcmFudHMobWFpbkVsZSwgaGlkZGVuRWxlKTtcbiAgICB2YXIgZnJlZVF1YWRyYW50cyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHF1YWRyYW50cykge1xuICAgICAgaWYgKHF1YWRyYW50c1twcm9wZXJ0eV0gPT09IFwiZnJlZVwiKVxuICAgICAgICBmcmVlUXVhZHJhbnRzLnB1c2gocHJvcGVydHkpO1xuICAgIH1cbiAgICAvL0NhbiB0YWtlIHZhbHVlcyAxIGFuZCAtMSBhbmQgYXJlIHVzZWQgdG8gcGxhY2UgdGhlIGhpZGRlbiBub2RlcyBpbiB0aGUgcmFuZG9tIHF1YWRyYW50XG4gICAgdmFyIGhvcml6b250YWxNdWx0O1xuICAgIHZhciB2ZXJ0aWNhbE11bHQ7XG4gICAgaWYgKGZyZWVRdWFkcmFudHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGZyZWVRdWFkcmFudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGlmIChmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdmaXJzdCcpICYmIGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ3NlY29uZCcpICYmIGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ3RoaXJkJykpIHtcbiAgICAgICAgICBob3Jpem9udGFsTXVsdCA9IC0xO1xuICAgICAgICAgIHZlcnRpY2FsTXVsdCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ2ZpcnN0JykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnc2Vjb25kJykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnZm91cnRoJykpIHtcbiAgICAgICAgICBob3Jpem9udGFsTXVsdCA9IDE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnZmlyc3QnKSAmJiBmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCd0aGlyZCcpICYmIGZyZWVRdWFkcmFudHMuaW5jbHVkZXMoJ2ZvdXJ0aCcpKSB7XG4gICAgICAgICAgaG9yaXpvbnRhbE11bHQgPSAxO1xuICAgICAgICAgIHZlcnRpY2FsTXVsdCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJlZVF1YWRyYW50cy5pbmNsdWRlcygnc2Vjb25kJykgJiYgZnJlZVF1YWRyYW50cy5pbmNsdWRlcygndGhpcmQnKSAmJiBmcmVlUXVhZHJhbnRzLmluY2x1ZGVzKCdmb3VydGgnKSkge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gLTE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vUmFuZG9tbHkgcGlja3Mgb25lIHF1YWRyYW50IGZyb20gdGhlIGZyZWUgcXVhZHJhbnRzXG4gICAgICAgIHZhciByYW5kb21RdWFkcmFudCA9IGZyZWVRdWFkcmFudHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZnJlZVF1YWRyYW50cy5sZW5ndGgpXTtcblxuICAgICAgICBpZiAocmFuZG9tUXVhZHJhbnQgPT09IFwiZmlyc3RcIikge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYW5kb21RdWFkcmFudCA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gLTE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmFuZG9tUXVhZHJhbnQgPT09IFwidGhpcmRcIikge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gLTE7XG4gICAgICAgICAgdmVydGljYWxNdWx0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYW5kb21RdWFkcmFudCA9PT0gXCJmb3VydGhcIikge1xuICAgICAgICAgIGhvcml6b250YWxNdWx0ID0gMTtcbiAgICAgICAgICB2ZXJ0aWNhbE11bHQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaG9yaXpvbnRhbE11bHQgPSAwO1xuICAgICAgdmVydGljYWxNdWx0ID0gMDtcbiAgICB9XG4gICAgLy9DaGFuZ2UgdGhlIHBvc2l0aW9uIG9mIGhpZGRlbiBlbGVtZW50c1xuXG4gICAgdmFyIGhvcml6b250YWxQYXJhbSA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKG9wdGlvbnMuaWRlYWxFZGdlTGVuZ3RoIC0gb3B0aW9ucy5vZmZzZXQsIG9wdGlvbnMuaWRlYWxFZGdlTGVuZ3RoICsgb3B0aW9ucy5vZmZzZXQsIGhvcml6b250YWxNdWx0KTtcbiAgICB2YXIgdmVydGljYWxQYXJhbSA9IGluc3RhbmNlLmdlbmVyYXRlUmFuZG9tKG9wdGlvbnMuaWRlYWxFZGdlTGVuZ3RoIC0gb3B0aW9ucy5vZmZzZXQsIG9wdGlvbnMuaWRlYWxFZGdlTGVuZ3RoICsgb3B0aW9ucy5vZmZzZXQsIHZlcnRpY2FsTXVsdCk7XG4gICAgdmFyIG5ld0NlbnRlclggPSBtYWluRWxlLnBvc2l0aW9uKFwieFwiKSArIGhvcml6b250YWxQYXJhbTtcbiAgICB2YXIgbmV3Q2VudGVyWSA9IG1haW5FbGUucG9zaXRpb24oXCJ5XCIpICsgdmVydGljYWxQYXJhbTtcbiAgICBoaWRkZW5FbGUucG9zaXRpb24oXCJ4XCIsIG5ld0NlbnRlclgpO1xuICAgIGhpZGRlbkVsZS5wb3NpdGlvbihcInlcIiwgbmV3Q2VudGVyWSk7XG4gIH07XG5cbiAgaW5zdGFuY2Uubm9kZVdpdGhNdWx0aXBsZU5laWdoYm9ycyA9IGZ1bmN0aW9uIChlbGUsIG5laWdoYm9ycykge1xuICAgIGlmIChuZWlnaGJvcnMgPT0gbnVsbCkge1xuICAgICAgdmFyIG5laWdoYm9ycyA9IGVsZS5uZWlnaGJvcmhvb2QoKS5ub2RlcyhcIjp2aXNpYmxlXCIpO1xuICAgIH1cbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHkgPSAwO1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgbmVpZ2hib3JzLmZvckVhY2goZnVuY3Rpb24gKGVsZTEpIHtcbiAgICAgIHggKz0gZWxlMS5wb3NpdGlvbihcInhcIik7XG4gICAgICB5ICs9IGVsZTEucG9zaXRpb24oXCJ5XCIpO1xuICAgICAgY291bnQrKztcbiAgICB9KTtcbiAgICB4ID0geCAvIGNvdW50O1xuICAgIHkgPSB5IC8gY291bnQ7XG4gICAgdmFyIGRpZmZ4ID0gaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20oMCwgb3B0aW9ucy5vZmZzZXQgLyAyLCAwKTtcbiAgICB2YXIgZGlmZnkgPSBpbnN0YW5jZS5nZW5lcmF0ZVJhbmRvbSgwLCBvcHRpb25zLm9mZnNldCAvIDIsIDApO1xuICAgIGVsZS5wb3NpdGlvbihcInhcIiwgeCArIGRpZmZ4KTtcbiAgICBlbGUucG9zaXRpb24oXCJ5XCIsIHkgKyBkaWZmeSk7XG4gIH07XG5cbiAgaW5zdGFuY2UuZ2VuZXJhdGVSYW5kb20gPSBmdW5jdGlvbiAobWluLCBtYXgsIG11bHQpIHtcbiAgICB2YXIgdmFsID0gWy0xLCAxXTtcbiAgICBpZiAobXVsdCA9PT0gMClcbiAgICAgIG11bHQgPSB2YWxbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsLmxlbmd0aCldO1xuICAgIHJldHVybiAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbikgKiBtdWx0O1xuICB9O1xuXG4gIGluc3RhbmNlLmNoZWNrT2NjdXBpZWRRdWFkcmFudHMgPSBmdW5jdGlvbiAobWFpbkVsZSwgaGlkZGVuRWxlcykge1xuICAgIHZhciB2aXNpYmxlRWxlcyA9IG1haW5FbGUubmVpZ2hib3Job29kKCkuZGlmZmVyZW5jZShoaWRkZW5FbGVzKS5ub2RlcygpO1xuICAgIHZhciBvY2N1cGllZFF1YWRyYW50cyA9IHsgZmlyc3Q6IFwiZnJlZVwiLCBzZWNvbmQ6IFwiZnJlZVwiLCB0aGlyZDogXCJmcmVlXCIsIGZvdXJ0aDogXCJmcmVlXCIgfTtcblxuICAgIHZpc2libGVFbGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZSkge1xuICAgICAgaWYgKGVsZS5kYXRhKCdjbGFzcycpICE9ICdjb21wYXJ0bWVudCcgJiYgZWxlLmRhdGEoJ2NsYXNzJykgIT0gJ2NvbXBsZXgnKSB7XG4gICAgICAgIGlmIChlbGUucG9zaXRpb24oXCJ4XCIpIDwgbWFpbkVsZS5wb3NpdGlvbihcInhcIikgJiYgZWxlLnBvc2l0aW9uKFwieVwiKSA8IG1haW5FbGUucG9zaXRpb24oXCJ5XCIpKVxuICAgICAgICAgIG9jY3VwaWVkUXVhZHJhbnRzLnNlY29uZCA9IFwib2NjdXBpZWRcIjtcbiAgICAgICAgZWxzZSBpZiAoZWxlLnBvc2l0aW9uKFwieFwiKSA+IG1haW5FbGUucG9zaXRpb24oXCJ4XCIpICYmIGVsZS5wb3NpdGlvbihcInlcIikgPCBtYWluRWxlLnBvc2l0aW9uKFwieVwiKSlcbiAgICAgICAgICBvY2N1cGllZFF1YWRyYW50cy5maXJzdCA9IFwib2NjdXBpZWRcIjtcbiAgICAgICAgZWxzZSBpZiAoZWxlLnBvc2l0aW9uKFwieFwiKSA8IG1haW5FbGUucG9zaXRpb24oXCJ4XCIpICYmIGVsZS5wb3NpdGlvbihcInlcIikgPiBtYWluRWxlLnBvc2l0aW9uKFwieVwiKSlcbiAgICAgICAgICBvY2N1cGllZFF1YWRyYW50cy50aGlyZCA9IFwib2NjdXBpZWRcIjtcbiAgICAgICAgZWxzZSBpZiAoZWxlLnBvc2l0aW9uKFwieFwiKSA+IG1haW5FbGUucG9zaXRpb24oXCJ4XCIpICYmIGVsZS5wb3NpdGlvbihcInlcIikgPiBtYWluRWxlLnBvc2l0aW9uKFwieVwiKSlcbiAgICAgICAgICBvY2N1cGllZFF1YWRyYW50cy5mb3VydGggPSBcIm9jY3VwaWVkXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9jY3VwaWVkUXVhZHJhbnRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geyB7IG5vZGVzOiBhbnlbXSB9W10gfSBjb21wb25lbnRzXG4gICAqIEBwYXJhbSB7IHsgZHg6IG51bWJlciwgZHk6IG51bWJlciB9W10gfSBzaGlmdHNcbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVBhY2tpbmdDZW50ZXIoY29tcG9uZW50cywgc2hpZnRzKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbXBvbmVudC5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgIG5vZGUueCArPSBzaGlmdHNbaW5kZXhdLmR4O1xuICAgICAgICAgIG5vZGUueSArPSBzaGlmdHNbaW5kZXhdLmR5O1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBnZXRDZW50ZXIoY29tcG9uZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsgYW55W10gfSBjb21wb25lbnRzIFxuICAgKi9cbiAgaW5zdGFuY2UucGFja0NvbXBvbmVudHMgPSBmdW5jdGlvbiAoY29tcG9uZW50cykgeyAgICBcbiAgICBsZXQgY3VycmVudENlbnRlciA9IGdlbmVyYWxVdGlscy5nZXRDZW50ZXIoY29tcG9uZW50cyk7XG4gICAgXG4gICAgdmFyIGdyaWRTdGVwID0gMDtcbiAgICB2YXIgdG90YWxOb2RlcyA9IDA7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgIHRvdGFsTm9kZXMgKz0gY29tcG9uZW50Lm5vZGVzLmxlbmd0aDtcbiAgICAgIGNvbXBvbmVudC5ub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGdyaWRTdGVwICs9IG5vZGUud2lkdGggKyBub2RlLmhlaWdodDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGdyaWRTdGVwID0gZ3JpZFN0ZXAgLyAoMiAqIHRvdGFsTm9kZXMpO1xuICAgIGdyaWRTdGVwID0gTWF0aC5mbG9vcihncmlkU3RlcCAqIG9wdGlvbnMucG9seW9taW5vR3JpZFNpemVGYWN0b3IpO1xuXG5cbiAgICBpZiAob3B0aW9ucy5jb21wb25lbnRTcGFjaW5nID4gMCkge1xuICAgICAgdmFyIHNwYWNpbmdBbW91bnQgPSBvcHRpb25zLmNvbXBvbmVudFNwYWNpbmc7XG4gICAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIG5vZGUueCA9IG5vZGUueCAtIHNwYWNpbmdBbW91bnQ7XG4gICAgICAgICAgbm9kZS55ID0gbm9kZS55IC0gc3BhY2luZ0Ftb3VudDtcbiAgICAgICAgICBub2RlLndpZHRoID0gbm9kZS53aWR0aCArICgyICogc3BhY2luZ0Ftb3VudCk7XG4gICAgICAgICAgbm9kZS5oZWlnaHQgPSBub2RlLmhlaWdodCArICgyICogc3BhY2luZ0Ftb3VudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBncmlkV2lkdGggPSAwLCBncmlkSGVpZ2h0ID0gMDtcbiAgICAvKiogQHR5cGUgeyBQb2x5b21pbm9bXSB9ICovXG4gICAgdmFyIHBvbHlvbWlub3MgPSBbXTtcbiAgICB2YXIgZ2xvYmFsWDEgPSBOdW1iZXIuTUFYX1ZBTFVFLCBnbG9iYWxYMiA9IC1OdW1iZXIuTUFYX1ZBTFVFLCBnbG9iYWxZMSA9IE51bWJlci5NQVhfVkFMVUUsIGdsb2JhbFkyID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgLy9jcmVhdGUgcG9seW9taW5vcyBmb3IgY29tcG9uZW50c1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50LCBpbmRleCkge1xuICAgICAgdmFyIHgxID0gTnVtYmVyLk1BWF9WQUxVRSwgeDIgPSAtTnVtYmVyLk1BWF9WQUxVRSwgeTEgPSBOdW1iZXIuTUFYX1ZBTFVFLCB5MiA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgY29tcG9uZW50Lm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUueCA8PSB4MSkgeDEgPSBub2RlLng7XG4gICAgICAgIGlmIChub2RlLnkgPD0geTEpIHkxID0gbm9kZS55O1xuICAgICAgICBpZiAobm9kZS54ICsgbm9kZS53aWR0aCA+PSB4MikgeDIgPSBub2RlLnggKyBub2RlLndpZHRoO1xuICAgICAgICBpZiAobm9kZS55ICsgbm9kZS5oZWlnaHQgPj0geTIpIHkyID0gbm9kZS55ICsgbm9kZS5oZWlnaHQ7XG4gICAgICB9KTtcblxuICAgICAgY29tcG9uZW50LmVkZ2VzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgaWYgKGVkZ2Uuc3RhcnRYIDw9IHgxKSB4MSA9IGVkZ2Uuc3RhcnRYO1xuICAgICAgICBpZiAoZWRnZS5zdGFydFkgPD0geTEpIHkxID0gZWRnZS5zdGFydFk7XG4gICAgICAgIGlmIChlZGdlLmVuZFggPj0geDIpIHgyID0gZWRnZS5lbmRYO1xuICAgICAgICBpZiAoZWRnZS5lbmRZID49IHkyKSB5MiA9IGVkZ2UuZW5kWTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoeDEgPCBnbG9iYWxYMSkgZ2xvYmFsWDEgPSB4MTtcbiAgICAgIGlmICh4MiA+IGdsb2JhbFgyKSBnbG9iYWxYMiA9IHgyO1xuICAgICAgaWYgKHkxIDwgZ2xvYmFsWTEpIGdsb2JhbFkxID0geTE7XG4gICAgICBpZiAoeTIgPiBnbG9iYWxZMikgZ2xvYmFsWTIgPSB5MjtcblxuICAgICAgbGV0IGNvbXBvbmVudFdpZHRoID0geDIgLSB4MTtcbiAgICAgIGxldCBjb21wb25lbnRIZWlnaHQgPSB5MiAtIHkxO1xuICAgICAgZ3JpZFdpZHRoICs9IGNvbXBvbmVudFdpZHRoO1xuICAgICAgZ3JpZEhlaWdodCArPSBjb21wb25lbnRIZWlnaHQ7XG5cbiAgICAgIHZhciBjb21wb25lbnRQb2x5b21pbm8gPSBuZXcgcG9seW9taW5vUGFja2luZy5Qb2x5b21pbm8oeDEsIHkxLCBjb21wb25lbnRXaWR0aCwgY29tcG9uZW50SGVpZ2h0LCBncmlkU3RlcCwgaW5kZXgpO1xuXG4gICAgICAvL2ZpbGwgbm9kZXMgdG8gcG9seW9taW5vIGNlbGxzXG4gICAgICBjb21wb25lbnQubm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAvL3RvcCBsZWZ0IGNlbGwgb2YgYSBub2RlXG4gICAgICAgIHZhciB0b3BMZWZ0WCA9IE1hdGguZmxvb3IoKG5vZGUueCAtIHgxKSAvIGdyaWRTdGVwKTtcbiAgICAgICAgdmFyIHRvcExlZnRZID0gTWF0aC5mbG9vcigobm9kZS55IC0geTEpIC8gZ3JpZFN0ZXApO1xuXG4gICAgICAgIC8vYm90dG9tIHJpZ2h0IGNlbGwgb2YgYSBub2RlXG4gICAgICAgIHZhciBib3R0b21SaWdodFggPSBNYXRoLmZsb29yKChub2RlLnggKyBub2RlLndpZHRoIC0geDEpIC8gZ3JpZFN0ZXApO1xuICAgICAgICB2YXIgYm90dG9tUmlnaHRZID0gTWF0aC5mbG9vcigobm9kZS55ICsgbm9kZS5oZWlnaHQgLSB5MSkgLyBncmlkU3RlcCk7XG5cbiAgICAgICAgLy9hbGwgY2VsbHMgYmV0d2VlbiB0b3BsZWZ0IGNlbGwgYW5kIGJvdHRvbSByaWdodCBjZWxsIHNob3VsZCBiZSBvY2N1cGllZFxuICAgICAgICBmb3IgKHZhciBpID0gdG9wTGVmdFg7IGkgPD0gYm90dG9tUmlnaHRYOyBpKyspIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gdG9wTGVmdFk7IGogPD0gYm90dG9tUmlnaHRZOyBqKyspIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFBvbHlvbWluby5ncmlkW2ldW2pdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvL2ZpbGwgY2VsbHMgd2hlcmUgZWRnZXMgcGFzcyBcbiAgICAgIGNvbXBvbmVudC5lZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgIHZhciBwMCA9IHt9LCBwMSA9IHt9O1xuICAgICAgICBwMC54ID0gKGVkZ2Uuc3RhcnRYIC0geDEpIC8gZ3JpZFN0ZXA7XG4gICAgICAgIHAwLnkgPSAoZWRnZS5zdGFydFkgLSB5MSkgLyBncmlkU3RlcDtcbiAgICAgICAgcDEueCA9IChlZGdlLmVuZFggLSB4MSkgLyBncmlkU3RlcDtcbiAgICAgICAgcDEueSA9IChlZGdlLmVuZFkgLSB5MSkgLyBncmlkU3RlcDtcbiAgICAgICAgLy9mb3IgZXZlcnkgZWRnZSBjYWxjdWxhdGUgdGhlIHN1cGVyIGNvdmVyIFxuICAgICAgICB2YXIgcG9pbnRzID0gZ2VuZXJhbFV0aWxzLkxpbmVTdXBlckNvdmVyKHAwLCBwMSk7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgIHZhciBpbmRleFggPSBNYXRoLmZsb29yKHBvaW50LngpO1xuICAgICAgICAgIHZhciBpbmRleFkgPSBNYXRoLmZsb29yKHBvaW50LnkpO1xuICAgICAgICAgIGlmIChpbmRleFggPj0gMCAmJiBpbmRleFggPCBjb21wb25lbnRQb2x5b21pbm8uc3RlcFdpZHRoICYmIGluZGV4WSA+PSAwICYmIGluZGV4WSA8IGNvbXBvbmVudFBvbHlvbWluby5zdGVwSGVpZ2h0KSB7XG4gICAgICAgICAgICBjb21wb25lbnRQb2x5b21pbm8uZ3JpZFtNYXRoLmZsb29yKHBvaW50LngpXVtNYXRoLmZsb29yKHBvaW50LnkpXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3VwZGF0ZSBudW1iZXIgb2Ygb2NjdXBpZWQgY2VsbHMgaW4gcG9seW9taW5vXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvbmVudFBvbHlvbWluby5zdGVwV2lkdGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbXBvbmVudFBvbHlvbWluby5zdGVwSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50UG9seW9taW5vLmdyaWRbaV1bal0pIGNvbXBvbmVudFBvbHlvbWluby5udW1iZXJPZk9jY3VwaXJlZENlbGxzKys7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcG9seW9taW5vcy5wdXNoKGNvbXBvbmVudFBvbHlvbWlubyk7XG4gICAgfSk7XG5cbiAgICAvL29yZGVyIHBseW9taW5vcyBub24taW5jcmVhc2luZyBvcmRlclxuICAgIHBvbHlvbWlub3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgdmFyIGFTaXplID0gYS5zdGVwV2lkdGggKiBhLnN0ZXBIZWlnaHQ7XG4gICAgICB2YXIgYlNpemUgPSBiLnN0ZXBXaWR0aCAqIGIuc3RlcEhlaWdodDtcbiAgICAgIC8vIGEgc2hvdWxkIGNvbWUgYmVmb3JlIGIgaW4gdGhlIHNvcnRlZCBvcmRlclxuICAgICAgaWYgKGFTaXplID4gYlNpemUpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAvLyBhIHNob3VsZCBjb21lIGFmdGVyIGIgaW4gdGhlIHNvcnRlZCBvcmRlclxuICAgICAgfSBlbHNlIGlmIChhU2l6ZSA8IGJTaXplKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgICAvLyBhIGFuZCBiIGFyZSB0aGUgc2FtZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9tYWluIGdyaWQgd2lkdGggYW5kIGhlaWdodCBpcyB0d28gdGhlIHRpbWVzIHRoZSBzdW0gb2YgYWxsIGNvbXBvbmVudHMgd2lkdGhzIGFuZCBoZWlnaHRzICh3b3JzdCBjYXNlIHNjZW5hcmlvKVxuICAgIC8vaW50aWFsaXplIHRoZSBncmlkIGFkZCAxIHRvIGF2b2lkIGluc3VmZmljaWVudCBncmlkIHNwYWNlIGR1ZSB0byBkaXZpc2luIGJ5IDIgaW4gY2FsY3VhdGlvbnNcbiAgICBsZXQgbWFpbkdyaWQgPSBuZXcgcG9seW9taW5vUGFja2luZy5HcmlkKChncmlkV2lkdGggKiAyKSArIGdyaWRTdGVwLCAoZ3JpZEhlaWdodCAqIDIpICsgZ3JpZFN0ZXAsIGdyaWRTdGVwKTtcblxuICAgIC8vcGxhY2UgZmlyc3QgKGJpZ2dlc3QpIHBvbHlvbWlubyBpbiB0aGUgY2VudGVyXG4gICAgbWFpbkdyaWQucGxhY2VQb2x5b21pbm8ocG9seW9taW5vc1swXSwgbWFpbkdyaWQuY2VudGVyLngsIG1haW5HcmlkLmNlbnRlci55KTtcblxuICAgIC8vZm9yIGV2ZXJ5IHBvbHlvbWlubyB0cnkgcGxhY2VpbmcgaXQgaW4gZmlyc3QgbmVpZ2hib3JzIGFuZCBjYWxjdWxhdGUgdXRpbGl0eSBpZiBub25lIHRoZW4gc2Vjb25kIG5laWdoYm9yIGFuZCBzbyBvbi4uXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwb2x5b21pbm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZnVsbG5lc3NNYXggPSAwO1xuICAgICAgdmFyIGFkanVzdGVkRnVsbG5lc3NNYXggPSAwO1xuICAgICAgdmFyIHdlaWd0aEZ1bGxuZXNzQXNwZWN0UmF0aW8gPSAwO1xuICAgICAgdmFyIG1pbkFzcGVjdFJhdGlvRGlmZiA9IDEwMDAwMDA7XG4gICAgICB2YXIgcGxhY2VtZW50Rm91bmQgPSBmYWxzZTtcbiAgICAgIHZhciBjZWxscyA9IFtdO1xuICAgICAgdmFyIHJlc3VsdExvY2F0aW9uID0ge307XG4gICAgICB3aGlsZSAoIXBsYWNlbWVudEZvdW5kKSB7XG5cbiAgICAgICAgY2VsbHMgPSBtYWluR3JpZC5nZXREaXJlY3ROZWlnaGJvcnMoY2VsbHMsIE1hdGguY2VpbChNYXRoLm1heChwb2x5b21pbm9zW2ldLnN0ZXBXaWR0aCwgcG9seW9taW5vc1tpXS5zdGVwSGVpZ2h0KSAvIDIpKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIGlmIChtYWluR3JpZC50cnlQbGFjaW5nUG9seW9taW5vKHBvbHlvbWlub3NbaV0sIGNlbGwueCwgY2VsbC55KSkge1xuICAgICAgICAgICAgcGxhY2VtZW50Rm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHV0aWxpdHlWYWx1ZSA9IG1haW5HcmlkLmNhbGN1bGF0ZVV0aWxpdHlPZlBsYWNpbmcocG9seW9taW5vc1tpXSwgY2VsbC54LCBjZWxsLnksIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKTtcbiAgICAgICAgICAgIHZhciBjZWxsQ2hvc2VuID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy51dGlsaXR5RnVuY3Rpb24gPT0gMSkge1xuICAgICAgICAgICAgICBpZiAodXRpbGl0eVZhbHVlLmFkanVzdGVkRnVsbG5lc3MgPiBhZGp1c3RlZEZ1bGxuZXNzTWF4KSB7XG4gICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbGl0eVZhbHVlLmFkanVzdGVkRnVsbG5lc3MgPT0gYWRqdXN0ZWRGdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsaXR5VmFsdWUuZnVsbG5lc3MgPiBmdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHV0aWxpdHlWYWx1ZS5mdWxsbmVzcyA9PSBmdWxsbmVzc01heCkge1xuICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHV0aWxpdHlWYWx1ZS5hY3R1YWxBc3BlY3RSYXRpbyAtIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKSA8PSBtaW5Bc3BlY3RSYXRpb0RpZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbENob3NlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjZWxsQ2hvc2VuKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRGdWxsbmVzc01heCA9IHV0aWxpdHlWYWx1ZS5hZGp1c3RlZEZ1bGxuZXNzO1xuICAgICAgICAgICAgICAgIG1pbkFzcGVjdFJhdGlvRGlmZiA9IE1hdGguYWJzKHV0aWxpdHlWYWx1ZS5hY3R1YWxBc3BlY3RSYXRpbyAtIG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKTtcbiAgICAgICAgICAgICAgICBmdWxsbmVzc01heCA9IHV0aWxpdHlWYWx1ZS5mdWxsbmVzcztcbiAgICAgICAgICAgICAgICByZXN1bHRMb2NhdGlvbi54ID0gY2VsbC54O1xuICAgICAgICAgICAgICAgIHJlc3VsdExvY2F0aW9uLnkgPSBjZWxsLnk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnV0aWxpdHlGdW5jdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgIHZhciBhc3BlY3RSYXRpb0RpZmYgPSBNYXRoLmFicyh1dGlsaXR5VmFsdWUuYWN0dWFsQXNwZWN0UmF0aW8gLSBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbyk7XG4gICAgICAgICAgICAgIHZhciB3ZWlnaHRlZFV0aWxpdHkgPSAodXRpbGl0eVZhbHVlLmZ1bGxuZXNzICogLjUpICsgKCgxIC0gYXNwZWN0UmF0aW9EaWZmIC8gTWF0aC5tYXgodXRpbGl0eVZhbHVlLmFjdHVhbEFzcGVjdFJhdGlvLCBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykgKiAuNSkpO1xuICAgICAgICAgICAgICBpZiAod2VpZ2h0ZWRVdGlsaXR5ID4gd2VpZ3RoRnVsbG5lc3NBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgICAgIHdlaWd0aEZ1bGxuZXNzQXNwZWN0UmF0aW8gPSB3ZWlnaHRlZFV0aWxpdHk7XG4gICAgICAgICAgICAgICAgcmVzdWx0TG9jYXRpb24ueCA9IGNlbGwueDtcbiAgICAgICAgICAgICAgICByZXN1bHRMb2NhdGlvbi55ID0gY2VsbC55O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbWFpbkdyaWQucGxhY2VQb2x5b21pbm8ocG9seW9taW5vc1tpXSwgcmVzdWx0TG9jYXRpb24ueCwgcmVzdWx0TG9jYXRpb24ueSk7XG4gICAgfVxuXG4gICAgLy9zb3J0IHBvbHlvbWlub3MgYWNjb3JkaW5nIHRvIGluZGV4IG9mIGlucHV0IHRvIHJldHVybiBjb3JyZWN0IG91dHB1dCBvcmRlclxuICAgIHBvbHlvbWlub3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGEuaW5kZXggPCBiLmluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSBpZiAoYS5pbmRleCA+IGIuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBwYWNraW5nUmVzdWx0ID0ge1xuICAgICAgc2hpZnRzOiBbXVxuICAgIH07XG5cbiAgICAvKiAgdmFyIHNoaWZ0WCA9IGNvbXBvbmVudHNDZW50ZXIueCAtICgobWFpbkdyaWQuY2VudGVyLnggLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSkqZ3JpZFN0ZXApOyBcbiAgICAgdmFyIHNoaWZ0WSA9IGNvbXBvbmVudHNDZW50ZXIueSAtICgobWFpbkdyaWQuY2VudGVyLnkgLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS55MSkqZ3JpZFN0ZXApOyBcbiAgICAgdmFyIG9jY3VwaWVkQ2VudGVyWCA9IE1hdGguZmxvb3IoKG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngxICsgbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDIpLzIpO1xuICAgICB2YXIgb2NjdXBpZWRDZW50ZXJZID0gTWF0aC5mbG9vcigobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS55MikvMik7ICovXG4gICAgXG4gICAgcG9seW9taW5vcy5mb3JFYWNoKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgIHZhciBkeCA9IChwb2wubG9jYXRpb24ueCAtIHBvbC5jZW50ZXIueCAtIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngxKSAqIGdyaWRTdGVwIC0gcG9sLngxOy8vK3NoaWZ0WDtcbiAgICAgIHZhciBkeSA9IChwb2wubG9jYXRpb24ueSAtIHBvbC5jZW50ZXIueSAtIG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkxKSAqIGdyaWRTdGVwIC0gcG9sLnkxOy8vICsgc2hpZnRZO1xuICAgICAgLy92YXIgZHggPSAocG9sLmxvY2F0aW9uLnggLW9jY3VwaWVkQ2VudGVyWCkgKiBncmlkU3RlcCArIGNvbXBvbmVudHNDZW50ZXIueC0gcG9sLmxlZnRNb3N0Q29vcmQ7Ly8rc2hpZnRYO1xuICAgICAgLy92YXIgZHkgPSAocG9sLmxvY2F0aW9uLnkgLW9jY3VwaWVkQ2VudGVyWSkgKiBncmlkU3RlcCArIGNvbXBvbmVudHNDZW50ZXIueS1wb2wudG9wTW9zdENvb3JkOy8vICsgc2hpZnRZO1xuICAgICAgcGFja2luZ1Jlc3VsdC5zaGlmdHMucHVzaCh7IGR4OiBkeCwgZHk6IGR5IH0pO1xuICAgIH0pO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHdoYXQgd291bGQgYmUgdGhlIGNlbnRlciBvZiB0aGUgcGFja2VkIGxheW91dFxuICAgIGxldCBwYWNraW5nQ2VudGVyID0gY2FsY3VsYXRlUGFja2luZ0NlbnRlcihjb21wb25lbnRzLCBwYWNraW5nUmVzdWx0LnNoaWZ0cyk7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBuZWNjZXNzYXJ5ICBhZGRpdGlvbmFsIHNoaWZ0IHRvIHJlLWNlbnRlclxuICAgIGxldCBjZW50ZXJTaGlmdCA9IHBhY2tpbmdDZW50ZXIuZGlmZihjdXJyZW50Q2VudGVyKTtcblxuICAgIC8vIEFkZCB0aGUgY2VudGVyIHNoaWZ0XG4gICAgZm9yIChsZXQgc2hpZnQgb2YgcGFja2luZ1Jlc3VsdC5zaGlmdHMpIHtcbiAgICAgIHNoaWZ0LmR4ICs9IGNlbnRlclNoaWZ0Lng7XG4gICAgICBzaGlmdC5keSArPSBjZW50ZXJTaGlmdC55O1xuICAgIH1cblxuICAgIHBhY2tpbmdSZXN1bHQuYXNwZWN0UmF0aW8gPSBNYXRoLnJvdW5kKCgobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDIgLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSArIDEpIC8gKG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxKSkgKiAxZTIpIC8gMWUyO1xuICAgIHBhY2tpbmdSZXN1bHQuZnVsbG5lc3MgPSBNYXRoLnJvdW5kKCgobWFpbkdyaWQubnVtYmVyT2ZPY2N1cGlyZWRDZWxscyAvICgobWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDIgLSBtYWluR3JpZC5vY2N1cGllZFJlY3RhbmdsZS54MSArIDEpICogKG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxKSkpICogMTAwKSAqIDFlMikgLyAxZTI7XG5cbiAgICBpZiAocGFja2luZ1Jlc3VsdC5hc3BlY3RSYXRpbyA+IG9wdGlvbnMuZGVzaXJlZEFzcGVjdFJhdGlvKSB7XG4gICAgICB2YXIgbWFpbkdyaWRXaWR0aCA9IG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLngyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueDEgKyAxO1xuICAgICAgcGFja2luZ1Jlc3VsdC5hZGp1c3RlZEZ1bGxuZXNzID0gTWF0aC5yb3VuZCgoKChtYWluR3JpZC5udW1iZXJPZk9jY3VwaXJlZENlbGxzKSAvIChtYWluR3JpZFdpZHRoICogKG1haW5HcmlkV2lkdGggLyBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykpICogMTAwKSkgKiAxZTIpIC8gMWUyO1xuICAgICAgLy8gaGVpZ2h0ID0gd2lkdGggLyBkZXNpcmVkQXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYWluR3JpZGhlaWdodCA9IG1haW5HcmlkLm9jY3VwaWVkUmVjdGFuZ2xlLnkyIC0gbWFpbkdyaWQub2NjdXBpZWRSZWN0YW5nbGUueTEgKyAxO1xuICAgICAgcGFja2luZ1Jlc3VsdC5hZGp1c3RlZEZ1bGxuZXNzID0gTWF0aC5yb3VuZCgoKChtYWluR3JpZC5udW1iZXJPZk9jY3VwaXJlZENlbGxzKSAvICgobWFpbkdyaWRoZWlnaHQgKiBvcHRpb25zLmRlc2lyZWRBc3BlY3RSYXRpbykgKiBtYWluR3JpZGhlaWdodCkpICogMTAwKSAqIDFlMikgLyAxZTI7XG4gICAgICAvLyB3aWR0aCA9IGhlaWdodCAqIGRlc2lyZWRBc3BlY3RSYXRpbztcbiAgICB9XG5cblxuICAgIHJldHVybiBwYWNraW5nUmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5b3V0VXRpbGl0aWVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbGF5b3V0LXV0aWxpdGllcy5qcyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG4gIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcblxuICAgIGlmICghY3l0b3NjYXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgaWRlYWxFZGdlTGVuZ3RoOiA1MCxcbiAgICAgIG9mZnNldDogMjAsXG4gICAgICBkZXNpcmVkQXNwZWN0UmF0aW86IDEsXG4gICAgICBwb2x5b21pbm9HcmlkU2l6ZUZhY3RvcjogMSxcbiAgICAgIHV0aWxpdHlGdW5jdGlvbjogMSwgIC8vIE1heGltaXplIGFkanVzdGVkIEZ1bGxuZXNzICAgMjogbWF4aW1pemVzIHdlaWdodGVkIGZ1bmN0aW9uIG9mIGZ1bGxuZXNzIGFuZCBhc3BlY3QgcmF0aW9cbiAgICAgIGNvbXBvbmVudFNwYWNpbmc6IDMwXG4gICAgfTtcblxuXG4gICAgLyogIGZ1bmN0aW9uIGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICAgIHZhciBvYmogPSB7fTtcbiBcbiAgICAgICBmb3IgKHZhciBpIGluIGRlZmF1bHRzKSB7XG4gICAgICAgICBvYmpbaV0gPSBkZWZhdWx0c1tpXTtcbiAgICAgICB9XG4gXG4gICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICBpZihpID09IFwiZGVzaXJlZEFzcGVjdFJhdGlvXCIpe1xuICAgICAgICAgICB2YXIgdmFsdWUgPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgaWYoIWlzTmFOKHZhbHVlKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIGlmKHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMjApe1xuICAgICAgICAgICAgICAgICBvYmpbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgfWVsc2UgaWYodmFsdWUgPCAwKXtcbiAgICAgICAgICAgICAgICAgb2JqW2ldID0gMFxuICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgIG9ialtpXSA9IDIwXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgb2JqW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgIH1cbiBcbiAgICAgICB9XG4gXG4gICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07ICovXG4gICAgdmFyIGxheW91dFV0aWxpdGllcyA9IHJlcXVpcmUoXCIuL2xheW91dC11dGlsaXRpZXNcIik7XG5cbiAgICBjeXRvc2NhcGUoJ2NvcmUnLCAnbGF5b3V0VXRpbGl0aWVzJywgZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgIHZhciBjeSA9IHRoaXM7XG5cbiAgICAgIC8vIElmICdnZXQnIGlzIGdpdmVuIGFzIHRoZSBwYXJhbSB0aGVuIHJldHVybiB0aGUgZXh0ZW5zaW9uIGluc3RhbmNlXG4gICAgICBpZiAob3B0cyA9PT0gJ2dldCcpIHtcbiAgICAgICAgcmV0dXJuIGdldFNjcmF0Y2goY3kpLmluc3RhbmNlO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICogRGVlcCBjb3B5IG9yIG1lcmdlIG9iamVjdHMgLSByZXBsYWNlbWVudCBmb3IgalF1ZXJ5IGRlZXAgZXh0ZW5kXG4gICAgICAqIFRha2VuIGZyb20gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI2RlZXBfZXh0ZW5kXG4gICAgICAqIGFuZCBidWcgcmVsYXRlZCB0byBkZWVwIGNvcHkgb2YgQXJyYXlzIGlzIGZpeGVkLlxuICAgICAgKiBVc2FnZTpPYmplY3QuZXh0ZW5kKHt9LCBvYmpBLCBvYmpCKVxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnMob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCB7fTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICBpZiAoIW9iailcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIG91dFtrZXldID0gb2JqW2tleV0uc2xpY2UoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgb3V0W2tleV0gPSBleHRlbmRPcHRpb25zKG91dFtrZXldLCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSBleHRlbmRPcHRpb25zKHt9LCBvcHRpb25zLCBvcHRzKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0U2NyYXRjaChlbGVPckN5KSB7XG4gICAgICAgIGlmICghZWxlT3JDeS5zY3JhdGNoKFwiX2xheW91dFV0aWxpdGllc1wiKSkge1xuICAgICAgICAgIGVsZU9yQ3kuc2NyYXRjaChcIl9sYXlvdXRVdGlsaXRpZXNcIiwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZU9yQ3kuc2NyYXRjaChcIl9sYXlvdXRVdGlsaXRpZXNcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBhIHZpZXcgdXRpbGl0aWVzIGluc3RhbmNlXG4gICAgICB2YXIgaW5zdGFuY2UgPSBsYXlvdXRVdGlsaXRpZXMoY3ksIG9wdGlvbnMpO1xuXG5cbiAgICAgIC8vIHNldCB0aGUgaW5zdGFuY2Ugb24gdGhlIHNjcmF0Y2ggcGFkXG4gICAgICBnZXRTY3JhdGNoKGN5KS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXG4gICAgICBpZiAoIWdldFNjcmF0Y2goY3kpLmluaXRpYWxpemVkKSB7XG4gICAgICAgIGdldFNjcmF0Y2goY3kpLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB2YXIgc2hpZnRLZXlEb3duID0gZmFsc2U7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09IFwiU2hpZnRcIikge1xuICAgICAgICAgICAgc2hpZnRLZXlEb3duID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5rZXkgPT0gXCJTaGlmdFwiKSB7XG4gICAgICAgICAgICBzaGlmdEtleURvd24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL1NlbGVjdCB0aGUgZGVzaXJlZCBuZWlnaGJvcnMgYWZ0ZXIgdGFwaG9sZC1hbmQtZnJlZVxuICAgICAgICAvKiAgY3kub24oJ3RhcGhvbGQnLCAnbm9kZScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5jeVRhcmdldDtcbiAgICAgICAgICAgdmFyIHRhcGhlbGQgPSBmYWxzZTtcbiAgICAgICAgICAgdmFyIG5laWdoYm9yaG9vZDtcbiAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgaWYoc2hpZnRLZXlEb3duKXtcbiAgICAgICAgICAgICAgIGN5LmVsZW1lbnRzKCkudW5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgIG5laWdoYm9yaG9vZCA9IG9wdGlvbnMubmVpZ2hib3IodGFyZ2V0KTtcbiAgICAgICAgICAgICAgIGlmKG5laWdoYm9yaG9vZClcbiAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgdGFyZ2V0LmxvY2soKTtcbiAgICAgICAgICAgICAgIHRhcGhlbGQgPSB0cnVlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSwgb3B0aW9ucy5uZWlnaGJvclNlbGVjdFRpbWUgLSA1MDApO1xuICAgICAgICAgICBjeS5vbignZnJlZScsICdub2RlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICB2YXIgdGFyZ2V0VGFwaGVsZCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5jeVRhcmdldDtcbiAgICAgICAgICAgICBpZih0YXJnZXQgPT0gdGFyZ2V0VGFwaGVsZCAmJiB0YXBoZWxkID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgIHRhcGhlbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgIGlmKG5laWdoYm9yaG9vZClcbiAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgdGFyZ2V0LnVubG9jaygpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIGN5Lm9uKCdkcmFnJywgJ25vZGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHZhciB0YXJnZXREcmFnZ2VkID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LmN5VGFyZ2V0O1xuICAgICAgICAgICAgIGlmKHRhcmdldCA9PSB0YXJnZXREcmFnZ2VkICYmIHRhcGhlbGQgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pXG4gICAgICAgICB9KTsgKi9cbiAgICAgIH1cblxuICAgICAgLy8gcmV0dXJuIHRoZSBpbnN0YW5jZSBvZiBleHRlbnNpb25cbiAgICAgIHJldHVybiBnZXRTY3JhdGNoKGN5KS5pbnN0YW5jZTtcbiAgICB9KTtcblxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvLyBleHBvc2UgYXMgYSBjb21tb25qcyBtb2R1bGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHsgLy8gZXhwb3NlIGFzIGFuIGFtZC9yZXF1aXJlanMgbW9kdWxlXG4gICAgZGVmaW5lKCdjeXRvc2NhcGUtdmlldy11dGlsaXRpZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXI7XG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgICByZWdpc3RlcihjeXRvc2NhcGUpO1xuICB9XG5cbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=