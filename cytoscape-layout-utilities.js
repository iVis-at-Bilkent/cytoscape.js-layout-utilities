(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeLayoutUtilities"] = factory();
	else
		root["cytoscapeLayoutUtilities"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Polyomino {
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
    constructor(x1, y1, width, height, gridStep, index) {
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
        this.y1 = y1;//kept to determine the amount of shift in the output
        this.location = new Point(-1, -1);  //the grid cell coordinates where the polyomino was placed
        /** inner center */
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));// center of polyomino
        this.numberOfOccupiredCells = 0;
    }

    /**
     * width of the polyomino divided by grid steps
     */
    get stepWidth() {
        return Math.floor(this.width / this.gridStep) + 1;
    }

    /**
     * height of the polyomino divided by grid steps
     */
    get stepHeight() {
        return Math.floor(this.height / this.gridStep) + 1;
    }

    get x2() {
        return this.x1 + this.width;
    }

    get y2() {
        return this.y1 + this.height;
    }

    /**
     * returns the center relative to location inside the grid
     */
    get gridStepCenter() {
        return this.center.diff(this.location);
    }

    getBoundingRectangle() {
        const polyx1 = this.location.x - this.center.x; 
        const polyy1 = this.location.y - this.center.y;

        return new BoundingRectangle(
            polyx1,
            polyy1,
            // -1 because if length == 1 then x2 == x1
            polyx1 + this.stepWidth - 1,
            polyy1 + this.stepHeight - 1 
        );
    }
}

class Point {
    /**
     * 
     * @param { number } x 
     * @param { number } y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns other - this for x and y
     * @param { Point } other
     */
    diff(other) {
        return new Point(
            other.x - this.x,
            other.y - this.y
        );
    }
}

class BoundingRectangle {
    /**
     * @param { number } x1
     * @param { number } y1
     * @param { number } x2
     * @param { number } y2
     */
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    center() {
        return new Point(
            (this.x2 - this.x1) / 2,
            (this.y2 - this.y1) / 2
        );
    }
}

class Cell {
    /**
     * 
     * @param { boolean } occupied 
     * @param { boolean } visited 
     */
    constructor(occupied, visited) {
        this.occupied = occupied; //boolean to determine if the cell is occupied
        this.visited = visited; //boolean to determine if the cell was visited before while traversing the cells
    }
}

class Grid {
    /** 
     * @param { number } width 
     * @param { number } height 
     * @param { number } step 
     */
    constructor(width, height, step) {
        this.width = width;
        this.height = height;
        this.step = step;
        //create and intialize the grid
        this.grid = Array.from({ length: this.stepWidth },
            ((_) => Array.from({ length: this.stepHeight },
                ((_) => new Cell(false, false)))));
        this.center = new Point(Math.floor(this.stepWidth / 2), Math.floor(this.stepHeight / 2));
        this.occupiedRectangle = new BoundingRectangle(
            Number.MAX_VALUE, Number.MAX_VALUE, 
            -Number.MAX_VALUE, -Number.MAX_VALUE
        );  // the bounding rectanble of the occupied cells in the grid
        this.numberOfOccupiredCells = 0;
    }

    /**
     * returns the width in terms of grid steps
     */
    get stepWidth() {
        return Math.floor(this.width / this.step) + 1;
    }

    /**
     * returns the height in terms of grid steps
     */
    get stepHeight() {
        return Math.floor(this.height / this.step) + 1;
    }

    /**
     * function given a list of cells it returns the direct unvisited unoccupied neighboring cells 
     */
    getDirectNeighbors(cells, level) {
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
    getCellNeighbors(i, j) {
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
    placePolyomino(polyomino, i, j) {
        polyomino.location.x = i;
        polyomino.location.y = j;
        for (let k = 0; k < polyomino.stepWidth; k++) {
            for (let l = 0; l < polyomino.stepHeight; l++) {
                if (polyomino.grid[k][l]) { //if [k] [l] cell is occupied in polyomino
                    this.grid[k - polyomino.center.x + i][l - polyomino.center.y + j].occupied = true;
                }
            }
        }

        //update number of occupired cells
        this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;
        
        this.updateBounds(polyomino);
        
        // reset visited cells to none
        for (let x = 0; x < this.stepWidth; x++) {
            for (let y = 0; y < this.stepHeight; y++) {
                this.grid[x][y].visited = false;
            }
        }
    }

    /**
     * Updates step rectangle bounds so that the `polyomino` fits
     * @param { Polyomino } polyomino
     */
    updateBounds(polyomino) {
        let polyRect = polyomino.getBoundingRectangle();

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
    tryPlacingPolyomino(polyomino, i, j) {
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
    calculateUtilityOfPlacing(polyomino, i, j, desiredAspectRatio) {
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
            adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / ((height * desiredAspectRatio) * height);
            // width = height * desiredAspectRatio;
        }

        result.actualAspectRatio = actualAspectRatio;
        result.fullness = fullness;
        result.adjustedFullness = adjustedFullness;

        return result;
    }
}

module.exports = {
    Grid: Grid,
    Polyomino: Polyomino,
    BoundingRectangle: BoundingRectangle,
    Point: Point
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var generalUtils = {};
var polyominoPacking = __webpack_require__(0);
const { Point } = __webpack_require__(0);


//a function to remove duplicate object in array
generalUtils.uniqueArray = function (ar) {
  var j = {};
  ar.forEach(function (v) {
    j[v + '::' + typeof v] = v;
  });
  return Object.keys(j).map(function (v) {
    return j[v];
  });
};

//a function to determine the grid cells where a line between point p0 and p1 pass through
generalUtils.LineSuperCover = function (p0, p1) {
  var dx = p1.x - p0.x, dy = p1.y - p0.y;
  var nx = Math.floor(Math.abs(dx)), ny = Math.floor(Math.abs(dy));
  var sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;

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
      const concat = (x, y) => x.concat(y);
      const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

      return flatMap(f, this);
    };
  }

  // @ts-ignore
  let bounds = components.flatMap(component => component.nodes)
    .map(node => ({
      left: node.x,
      top: node.y,
      right: node.x + node.width - 1,
      bottom: node.y + node.height - 1,
    }))
    .reduce((bounds, currNode) => ({
        left: Math.min(currNode.left, bounds.left),
        right: Math.max(currNode.right, bounds.right),
        top: Math.min(currNode.top, bounds.top),
        bottom: Math.max(currNode.bottom, bounds.bottom)
    }), {
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

var __WEBPACK_AMD_DEFINE_RESULT__;(function () {
  'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function (cytoscape) {

    if (!cytoscape) {
      return;
    } // can't register if cytoscape unspecified

    var options = {
      idealEdgeLength: 50,
      offset: 20,
      desiredAspectRatio: 1,
      polyominoGridSizeFactor: 1,
      utilityFunction: 1,  // Maximize adjusted Fullness   2: maximizes weighted function of fullness and aspect ratio
      componentSpacing: 80
    };

    var layoutUtilities = __webpack_require__(3);

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

          if (!obj)
            continue;

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (Array.isArray(obj[key])) {
                out[key] = obj[key].slice();
              } else if (typeof obj[key] === 'object') {
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
      }

      // return the instance of extension
      return getScratch(cy).instance;
    });

  };

  if ( true && module.exports) { // expose as a commonjs module
    module.exports = register;
  }

  if (true) { // expose as an amd/requirejs module
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return register;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape);
  }

})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var generalUtils = __webpack_require__(1);
var polyominoPacking = __webpack_require__(0);
const { Point, Polyomino } = __webpack_require__(0);
const { getCenter } = __webpack_require__(1);
const pose = __webpack_require__(4);

var layoutUtilities = function (cy, options) {
  
  const isFn = fn => typeof fn === 'function';
  
  var instance = {};
  
  instance.setOption = function (name, val) {
    options[name] = val;
  };

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
        }
        else if (neighbors.length == 1 && !isPositioned) {
          oneNeig = true;
          mainEle = neighbors[0];
          positioned[j] = true;
          instance.nodeWithOneNeighbor(mainEle, components[i][j], eles);
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
            })

            for (var k = 0; k < neighbors.length; k++) {
              if (positioned[components[i].indexOf(neighbors[k])]) {
                positionedNeigbors.push(neighbors[k]);
              }
            }
            if (positionedNeigbors.length > 1) {
              instance.nodeWithMultipleNeighbors(components[i][j], positionedNeigbors);
            } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], components[i][j]);
            else {
              var horizontalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              var verticalP = instance.generateRandom(options.offset, options.offset * 2, 0);
              components[i][j].position("x", x + horizontalP);
              components[i][j].position("y", y + verticalP);
            }
            positioned[j] = true;
          }
        }
      }
      else {
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
      if (node.position("x") - halfWidth < leftX)
        leftX = node.position("x") - halfWidth;
      if (node.position("x") + halfWidth > rightX)
        rightX = node.position("x") + halfWidth;
      if (node.position("y") - halfHeight < topY)
        topY = node.position("y") - halfHeight;
      if (node.position("y") + halfHeight > bottomY)
        bottomY = node.position("y") + halfHeight;
    });

    var radiusy = topY - bottomY;
    var radiusx = rightX - leftX;
    var innerRadius = (Math.sqrt(radiusx * radiusx + radiusy * radiusy)) / 2;
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
      }
      else {
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
          } else if (positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], component[i]);
          else {
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

  instance.nodeWithOneNeighbor = function (mainEle, unplacedEle, allUnplacedEles) {
    var quadrants = instance.checkOccupiedQuadrants(mainEle, unplacedEle, allUnplacedEles);
    var freeQuadrants = [];
    for (var property in quadrants) {
      if (quadrants[property] === "free")
        freeQuadrants.push(property);
    }
    //Can take values 1 and -1 and are used to place the hidden nodes in the random quadrant
    var horizontalMult;
    var verticalMult;
    if (freeQuadrants.length > 0) {
      if (freeQuadrants.length === 3) {
        if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('third')) {
          horizontalMult = -1;
          verticalMult = -1;
        }
        else if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = -1;
        }
        else if (freeQuadrants.includes('first') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = 1;
          verticalMult = 1;
        }
        else if (freeQuadrants.includes('second') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth')) {
          horizontalMult = -1;
          verticalMult = 1;
        }
      }
      else {
        //Randomly picks one quadrant from the free quadrants
        var randomQuadrant = freeQuadrants[Math.floor(Math.random() * freeQuadrants.length)];

        if (randomQuadrant === "first") {
          horizontalMult = 1;
          verticalMult = -1;
        }
        else if (randomQuadrant === "second") {
          horizontalMult = -1;
          verticalMult = -1;
        }
        else if (randomQuadrant === "third") {
          horizontalMult = -1;
          verticalMult = 1;
        }
        else if (randomQuadrant === "fourth") {
          horizontalMult = 1;
          verticalMult = 1;
        }
      }
    }
    else {
      horizontalMult = 0;
      verticalMult = 0;
    }
    //Change the position of hidden elements

    var horizontalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, horizontalMult);
    var verticalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, verticalMult);
    var newCenterX = mainEle.position("x") + horizontalParam;
    var newCenterY = mainEle.position("y") + verticalParam;
    unplacedEle.position("x", newCenterX);
    unplacedEle.position("y", newCenterY);
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
    if (mult === 0)
      mult = val[Math.floor(Math.random() * val.length)];
    return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
  };

  instance.checkOccupiedQuadrants = function (mainEle, unplacedEle, allUnplacedEles) {
    var visibleEles = mainEle.neighborhood().difference(unplacedEle).difference(allUnplacedEles).nodes();
    var occupiedQuadrants = { first: "free", second: "free", third: "free", fourth: "free" };

    visibleEles.forEach(function (ele) {
      if (ele.data('class') != 'compartment' && ele.data('class') != 'complex') {
        if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y"))
          occupiedQuadrants.second = "occupied";
        else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y"))
          occupiedQuadrants.first = "occupied";
        else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y"))
          occupiedQuadrants.third = "occupied";
        else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y"))
          occupiedQuadrants.fourth = "occupied";
      }
    });
    return occupiedQuadrants;
  };

  /**
   * @param { { nodes: any[] }[] } components
   * @param { { dx: number, dy: number }[] } shifts
   */
  function calculatePackingCenter(components, shifts) {
    components.forEach((component, index) => {
        component.nodes.forEach(node => {
          node.x += shifts[index].dx;
          node.y += shifts[index].dy;
        });
    });

    return getCenter(components);
  }

  /**
   * @param { any[] } components 
   */
  instance.packComponents = function (components, randomize = true) {
    
    var spacingAmount = options.componentSpacing;
    
    if(spacingAmount !== undefined) { // is spacingAmount is undefined, we expect it to be an incremental packing
      if (randomize) {
        spacingAmount = spacingAmount - 52; // subtract 52 to make it compatible with the incremental packing
      }
    
      spacingAmount = Math.max(1, spacingAmount); // incremental packing requires spacingAmount > 0
    }
    
    let currentCenter = generalUtils.getCenter(components);

    var packingResult;
    let mainGrid; // used in randomized packing

    if (!randomize) {
      
      packingResult = pose.packComponents(components, {
        componentSpacing: spacingAmount
      });
    }
    else {

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

      components.forEach(function (component) {
        component.nodes.forEach(function (node) {
          node.x = node.x - spacingAmount;
          node.y = node.y - spacingAmount;
          node.width = node.width + (2 * spacingAmount);
          node.height = node.height + (2 * spacingAmount);
        });
      });

      var gridWidth = 0, gridHeight = 0;
      /** @type { Polyomino[] } */
      var polyominos = [];
      var globalX1 = Number.MAX_VALUE, globalX2 = -Number.MAX_VALUE, globalY1 = Number.MAX_VALUE, globalY2 = -Number.MAX_VALUE;
      //create polyominos for components
      components.forEach(function (component, index) {
        var x1 = Number.MAX_VALUE, x2 = -Number.MAX_VALUE, y1 = Number.MAX_VALUE, y2 = -Number.MAX_VALUE;
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

        let componentWidth = x2 - x1;
        let componentHeight = y2 - y1;
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
          var p0 = {}, p1 = {};
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
      mainGrid = new polyominoPacking.Grid((gridWidth * 2) + gridStep, (gridHeight * 2) + gridStep, gridStep);

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
                var weightedUtility = (utilityValue.fullness * .5) + ((1 - aspectRatioDiff / Math.max(utilityValue.actualAspectRatio, options.desiredAspectRatio) * .5));
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

      packingResult = {
        shifts: []
      };

      /*  var shiftX = componentsCenter.x - ((mainGrid.center.x - mainGrid.occupiedRectangle.x1)*gridStep);
       var shiftY = componentsCenter.y - ((mainGrid.center.y - mainGrid.occupiedRectangle.y1)*gridStep);
       var occupiedCenterX = Math.floor((mainGrid.occupiedRectangle.x1 + mainGrid.occupiedRectangle.x2)/2);
       var occupiedCenterY = Math.floor((mainGrid.occupiedRectangle.y1 + mainGrid.occupiedRectangle.y2)/2); */

      polyominos.forEach(function (pol) {
        var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.x1;//+shiftX;
        var dy = (pol.location.y - pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.y1;// + shiftY;
        //var dx = (pol.location.x -occupiedCenterX) * gridStep + componentsCenter.x- pol.leftMostCoord;//+shiftX;
        //var dy = (pol.location.y -occupiedCenterY) * gridStep + componentsCenter.y-pol.topMostCoord;// + shiftY;
        packingResult.shifts.push({ dx: dx, dy: dy });
      });
    }
    
    // Calculate what would be the center of the packed layout
    let packingCenter = calculatePackingCenter(components, packingResult.shifts);
    // Calculate the neccessary  additional shift to re-center
    let centerShift = packingCenter.diff(currentCenter);

    // Add the center shift
    for (let shift of packingResult.shifts) {
      shift.dx += centerShift.x;
      shift.dy += centerShift.y;
    }

    if (randomize) {
      packingResult.aspectRatio = Math.round(((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) / (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 1e2) / 1e2;
      packingResult.fullness = Math.round(((mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1) * (mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1))) * 100) * 1e2) / 1e2;

      if (packingResult.aspectRatio > options.desiredAspectRatio) {
        var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
        packingResult.adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / (mainGridWidth * (mainGridWidth / options.desiredAspectRatio)) * 100)) * 1e2) / 1e2;
        // height = width / desiredAspectRatio;
      } else {
        var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
        packingResult.adjustedFullness = Math.round((((mainGrid.numberOfOccupiredCells) / ((mainGridheight * options.desiredAspectRatio) * mainGridheight)) * 100) * 1e2) / 1e2;
        // width = height * desiredAspectRatio;
      }
    }

    return packingResult;
  };

  return instance;
};

module.exports = layoutUtilities;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pose/pose.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@turf/helpers/main.es.js":
/*!***********************************************!*\
  !*** ./node_modules/@turf/helpers/main.es.js ***!
  \***********************************************/
/*! exports provided: earthRadius, factors, unitsFactors, areaFactors, feature, geometry, point, points, polygon, polygons, lineString, lineStrings, featureCollection, multiLineString, multiPoint, multiPolygon, geometryCollection, round, radiansToLength, lengthToRadians, lengthToDegrees, bearingToAzimuth, radiansToDegrees, degreesToRadians, convertLength, convertArea, isNumber, isObject, validateBBox, validateId, radians2degrees, degrees2radians, distanceToDegrees, distanceToRadians, radiansToDistance, bearingToAngle, convertDistance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "earthRadius", function() { return earthRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factors", function() { return factors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unitsFactors", function() { return unitsFactors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaFactors", function() { return areaFactors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "feature", function() { return feature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geometry", function() { return geometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "point", function() { return point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "points", function() { return points; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polygon", function() { return polygon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polygons", function() { return polygons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineString", function() { return lineString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineStrings", function() { return lineStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "featureCollection", function() { return featureCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiLineString", function() { return multiLineString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiPoint", function() { return multiPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiPolygon", function() { return multiPolygon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geometryCollection", function() { return geometryCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToLength", function() { return radiansToLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lengthToRadians", function() { return lengthToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lengthToDegrees", function() { return lengthToDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bearingToAzimuth", function() { return bearingToAzimuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDegrees", function() { return radiansToDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertLength", function() { return convertLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertArea", function() { return convertArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateBBox", function() { return validateBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateId", function() { return validateId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radians2degrees", function() { return radians2degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees2radians", function() { return degrees2radians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceToDegrees", function() { return distanceToDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceToRadians", function() { return distanceToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radiansToDistance", function() { return radiansToDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bearingToAngle", function() { return bearingToAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDistance", function() { return convertDistance; });
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 */
var earthRadius = 6371008.8;

/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
var factors = {
    meters: earthRadius,
    metres: earthRadius,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    miles: earthRadius / 1609.344,
    nauticalmiles: earthRadius / 1852,
    inches: earthRadius * 39.370,
    yards: earthRadius / 1.0936,
    feet: earthRadius * 3.28084,
    radians: 1,
    degrees: earthRadius / 111325,
};

/**
 * Units of measurement factors based on 1 meter.
 */
var unitsFactors = {
    meters: 1,
    metres: 1,
    millimeters: 1000,
    millimetres: 1000,
    centimeters: 100,
    centimetres: 100,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    miles: 1 / 1609.344,
    nauticalmiles: 1 / 1852,
    inches: 39.370,
    yards: 1 / 1.0936,
    feet: 3.28084,
    radians: 1 / earthRadius,
    degrees: 1 / 111325,
};

/**
 * Area of measurement factors based on 1 square meter.
 */
var areaFactors = {
    meters: 1,
    metres: 1,
    millimeters: 1000000,
    millimetres: 1000000,
    centimeters: 10000,
    centimetres: 10000,
    kilometers: 0.000001,
    kilometres: 0.000001,
    acres: 0.000247105,
    miles: 3.86e-7,
    yards: 1.195990046,
    feet: 10.763910417,
    inches: 1550.003100006
};

/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geometry, properties, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;

    // Validation
    if (geometry === undefined) throw new Error('geometry is required');
    if (properties && properties.constructor !== Object) throw new Error('properties must be an Object');
    if (bbox) validateBBox(bbox);
    if (id) validateId(id);

    // Main
    var feat = {type: 'Feature'};
    if (id) feat.id = id;
    if (bbox) feat.bbox = bbox;
    feat.properties = properties || {};
    feat.geometry = geometry;
    return feat;
}

/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<number>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Geometry
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = 'Point';
 * var coordinates = [110, 50];
 *
 * var geometry = turf.geometry(type, coordinates);
 *
 * //=geometry
 */
function geometry(type, coordinates, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;

    // Validation
    if (!type) throw new Error('type is required');
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (bbox) validateBBox(bbox);

    // Main
    var geom;
    switch (type) {
    case 'Point': geom = point(coordinates).geometry; break;
    case 'LineString': geom = lineString(coordinates).geometry; break;
    case 'Polygon': geom = polygon(coordinates).geometry; break;
    case 'MultiPoint': geom = multiPoint(coordinates).geometry; break;
    case 'MultiLineString': geom = multiLineString(coordinates).geometry; break;
    case 'MultiPolygon': geom = multiPolygon(coordinates).geometry; break;
    default: throw new Error(type + ' is invalid');
    }
    if (bbox) geom.bbox = bbox;
    return geom;
}

/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (coordinates.length < 2) throw new Error('coordinates must be at least 2 numbers long');
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) throw new Error('coordinates must contain numbers');

    return feature({
        type: 'Point',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}

/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (i === 0 && j === 0 && !isNumber(ring[0][0]) || !isNumber(ring[0][1])) throw new Error('coordinates must contain numbers');
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}

/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (coordinates.length < 2) throw new Error('coordinates must be an array of two or more positions');
    // Check if first point of LineString contains two numbers
    if (!isNumber(coordinates[0][1]) || !isNumber(coordinates[0][1])) throw new Error('coordinates must contain numbers');

    return feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<number>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}

/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;

    // Validation
    if (!features) throw new Error('No features passed');
    if (!Array.isArray(features)) throw new Error('features must be an Array');
    if (bbox) validateBBox(bbox);
    if (id) validateId(id);

    // Main
    var fc = {type: 'FeatureCollection'};
    if (id) fc.id = id;
    if (bbox) fc.bbox = bbox;
    fc.features = features;
    return fc;
}

/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = turf.geometryCollection([pt, line]);
 *
 * //=collection
 */
function geometryCollection(geometries, properties, options) {
    if (!geometries) throw new Error('geometries is required');
    if (!Array.isArray(geometries)) throw new Error('geometries must be an Array');

    return feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties, options);
}

/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (num === undefined || num === null || isNaN(num)) throw new Error('num is required');
    if (precision && !(precision >= 0)) throw new Error('precision must be a positive number');
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (radians === undefined || radians === null) throw new Error('radians is required');

    if (units && typeof units !== 'string') throw new Error('units must be a string');
    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error(units + ' units is invalid');
    return radians * factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (distance === undefined || distance === null) throw new Error('distance is required');

    if (units && typeof units !== 'string') throw new Error('units must be a string');
    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error(units + ' units is invalid');
    return distance / factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}

/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    if (bearing === null || bearing === undefined) throw new Error('bearing is required');

    var angle = bearing % 360;
    if (angle < 0) angle += 360;
    return angle;
}

/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    if (radians === null || radians === undefined) throw new Error('radians is required');

    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}

/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    if (degrees === null || degrees === undefined) throw new Error('degrees is required');

    var radians = degrees % 360;
    return radians * Math.PI / 180;
}

/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {string} originalUnit of the length
 * @param {string} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (length === null || length === undefined) throw new Error('length is required');
    if (!(length >= 0)) throw new Error('length must be a positive number');

    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit || 'kilometers');
}

/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {string} [originalUnit='meters'] of the distance
 * @param {string} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (area === null || area === undefined) throw new Error('area is required');
    if (!(area >= 0)) throw new Error('area must be a positive number');

    var startFactor = areaFactors[originalUnit || 'meters'];
    if (!startFactor) throw new Error('invalid original units');

    var finalFactor = areaFactors[finalUnit || 'kilometers'];
    if (!finalFactor) throw new Error('invalid final units');

    return (area / startFactor) * finalFactor;
}

/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}

/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) throw new Error('bbox is required');
    if (!Array.isArray(bbox)) throw new Error('bbox must be an Array');
    if (bbox.length !== 4 && bbox.length !== 6) throw new Error('bbox must be an Array of 4 or 6 numbers');
    bbox.forEach(function (num) {
        if (!isNumber(num)) throw new Error('bbox must only contain numbers');
    });
}

/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) throw new Error('id is required');
    if (['string', 'number'].indexOf(typeof id) === -1) throw new Error('id must be a number or a string');
}

// Deprecated methods
function radians2degrees() {
    throw new Error('method has been renamed to `radiansToDegrees`');
}

function degrees2radians() {
    throw new Error('method has been renamed to `degreesToRadians`');
}

function distanceToDegrees() {
    throw new Error('method has been renamed to `lengthToDegrees`');
}

function distanceToRadians() {
    throw new Error('method has been renamed to `lengthToRadians`');
}

function radiansToDistance() {
    throw new Error('method has been renamed to `radiansToLength`');
}

function bearingToAngle() {
    throw new Error('method has been renamed to `bearingToAzimuth`');
}

function convertDistance() {
    throw new Error('method has been renamed to `convertLength`');
}




/***/ }),

/***/ "./node_modules/d3-delaunay/src/delaunay.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-delaunay/src/delaunay.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delaunay; });
/* harmony import */ var delaunator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! delaunator */ "./node_modules/delaunator/index.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/d3-delaunay/src/path.js");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polygon.js */ "./node_modules/d3-delaunay/src/polygon.js");
/* harmony import */ var _voronoi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./voronoi.js */ "./node_modules/d3-delaunay/src/voronoi.js");





const tau = 2 * Math.PI, pow = Math.pow;

function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

// A triangulation is collinear if all its triangles have a non-null area
function collinear(d) {
  const {triangles, coords} = d;
  for (let i = 0; i < triangles.length; i += 3) {
    const a = 2 * triangles[i],
          b = 2 * triangles[i + 1],
          c = 2 * triangles[i + 2],
          cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1])
                - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
    if (cross > 1e-10) return false;
  }
  return true;
}

function jitter(x, y, r) {
  return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
}

class Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new Delaunay("length" in points
        ? flatArray(points, fx, fy, that)
        : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new delaunator__WEBPACK_IMPORTED_MODULE_0__["default"](points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d = this._delaunator, points = this.points;

    // check for collinear
    if (d.hull && d.hull.length > 2 && collinear(d)) {
      this.collinear = Int32Array.from({length: points.length/2}, (_,i) => i)
        .sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]); // for exact neighbors
      const e = this.collinear[0], f = this.collinear[this.collinear.length - 1],
        bounds = [ points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1] ],
        r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const p = jitter(points[2 * i], points[2 * i + 1], r);
        points[2 * i] = p[0];
        points[2 * i + 1] = p[1];
      }
      this._delaunator = new delaunator__WEBPACK_IMPORTED_MODULE_0__["default"](points);
    } else {
      delete this.collinear;
    }

    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);

    // Compute an index from each point to an (arbitrary) incoming halfedge
    // Used to give the first neighbor of each point; for this reason,
    // on the hull we give priority to exterior halfedges
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
      if (halfedges[e] === -1 || inedges[p] === -1) inedges[p] = e;
    }
    for (let i = 0, n = hull.length; i < n; ++i) {
      hullIndex[hull[i]] = i;
    }

    // degenerate case: 1 or 2 (distinct) points
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      this.triangles[1] = hull[1];
      this.triangles[2] = hull[1];
      inedges[hull[0]] = 1;
      if (hull.length === 2) inedges[hull[1]] = 0;
    }
  }
  voronoi(bounds) {
    return new _voronoi_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, bounds);
  }
  *neighbors(i) {
    const {inedges, hull, _hullIndex, halfedges, triangles, collinear} = this;

    // degenerate case with several collinear points
    if (collinear) {
      const l = collinear.indexOf(i);
      if (l > 0) yield collinear[l - 1];
      if (l < collinear.length - 1) yield collinear[l + 1];
      return;
    }

    const e0 = inedges[i];
    if (e0 === -1) return; // coincident point
    let e = e0, p0 = -1;
    do {
      yield p0 = triangles[e];
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) return; // bad triangulation
      e = halfedges[e];
      if (e === -1) {
        const p = hull[(_hullIndex[i] + 1) % hull.length];
        if (p !== p0) yield p;
        return;
      }
    } while (e !== e0);
  }
  find(x, y, i = 0) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
    const i0 = i;
    let c;
    while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0) i = c;
    return c;
  }
  _step(i, x, y) {
    const {inedges, hull, _hullIndex, halfedges, triangles, points} = this;
    if (inedges[i] === -1 || !points.length) return (i + 1) % (points.length >> 1);
    let c = i;
    let dc = pow(x - points[i * 2], 2) + pow(y - points[i * 2 + 1], 2);
    const e0 = inedges[i];
    let e = e0;
    do {
      let t = triangles[e];
      const dt = pow(x - points[t * 2], 2) + pow(y - points[t * 2 + 1], 2);
      if (dt < dc) dc = dt, c = t;
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break; // bad triangulation
      e = halfedges[e];
      if (e === -1) {
        e = hull[(_hullIndex[i] + 1) % hull.length];
        if (e !== t) {
          if (pow(x - points[e * 2], 2) + pow(y - points[e * 2 + 1], 2) < dc) return e;
        }
        break;
      }
    } while (e !== e0);
    return c;
  }
  render(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points, halfedges, triangles} = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = triangles[i] * 2;
      const tj = triangles[j] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r = 2) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points} = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, tau);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {hull, points} = this;
    const h = hull[0] * 2, n = hull.length;
    context.moveTo(points[h], points[h + 1]);
    for (let i = 1; i < n; ++i) {
      const h = 2 * hull[i];
      context.lineTo(points[h], points[h + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points, triangles} = this;
    const t0 = triangles[i *= 3] * 2;
    const t1 = triangles[i + 1] * 2;
    const t2 = triangles[i + 2] * 2;
    context.moveTo(points[t0], points[t0 + 1]);
    context.lineTo(points[t1], points[t1 + 1]);
    context.lineTo(points[t2], points[t2 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const {triangles} = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i) {
      yield this.trianglePolygon(i);
    }
  }
  trianglePolygon(i) {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.renderTriangle(i, polygon);
    return polygon.value();
  }
}

function flatArray(points, fx, fy, that) {
  const n = points.length;
  const array = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    const p = points[i];
    array[i * 2] = fx.call(that, p, i, points);
    array[i * 2 + 1] = fy.call(that, p, i, points);
  }
  return array;
}

function* flatIterable(points, fx, fy, that) {
  let i = 0;
  for (const p of points) {
    yield fx.call(that, p, i, points);
    yield fy.call(that, p, i, points);
    ++i;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-delaunay/src/index.js ***!
  \***********************************************/
/*! exports provided: Delaunay, Voronoi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _delaunay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delaunay.js */ "./node_modules/d3-delaunay/src/delaunay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Delaunay", function() { return _delaunay_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _voronoi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./voronoi.js */ "./node_modules/d3-delaunay/src/voronoi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Voronoi", function() { return _voronoi_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./node_modules/d3-delaunay/src/path.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-delaunay/src/path.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
const epsilon = 1e-6;

class Path {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }
  moveTo(x, y) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x, y) {
    this._ += `L${this._x1 = +x},${this._y1 = +y}`;
  }
  arc(x, y, r) {
    x = +x, y = +y, r = +r;
    const x0 = x + r;
    const y0 = y;
    if (r < 0) throw new Error("negative radius");
    if (this._x1 === null) this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
    if (!r) return;
    this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x, y, w, h) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
  }
  value() {
    return this._ || null;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/polygon.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-delaunay/src/polygon.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Polygon; });
class Polygon {
  constructor() {
    this._ = [];
  }
  moveTo(x, y) {
    this._.push([x, y]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x, y) {
    this._.push([x, y]);
  }
  value() {
    return this._.length ? this._ : null;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/voronoi.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-delaunay/src/voronoi.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Voronoi; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/d3-delaunay/src/path.js");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polygon.js */ "./node_modules/d3-delaunay/src/polygon.js");



class Voronoi {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const {delaunay: {points, hull, triangles}, vectors} = this;

    // Compute circumcenters.
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
      const t1 = triangles[i] * 2;
      const t2 = triangles[i + 1] * 2;
      const t3 = triangles[i + 2] * 2;
      const x1 = points[t1];
      const y1 = points[t1 + 1];
      const x2 = points[t2];
      const y2 = points[t2 + 1];
      const x3 = points[t3];
      const y3 = points[t3 + 1];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const ex = x3 - x1;
      const ey = y3 - y1;
      const bl = dx * dx + dy * dy;
      const cl = ex * ex + ey * ey;
      const ab = (dx * ey - dy * ex) * 2;

      if (!ab) {
        // degenerate case (collinear diagram)
        x = (x1 + x3) / 2 - 1e8 * ey;
        y = (y1 + y3) / 2 + 1e8 * ex;
      }
      else if (Math.abs(ab) < 1e-8) {
        // almost equal points (degenerate triangle)
        x = (x1 + x3) / 2;
        y = (y1 + y3) / 2;
      } else {
        const d = 1 / ab;
        x = x1 + (ey * bl - dy * cl) * d;
        y = y1 + (dx * cl - ex * bl) * d;
      }
      circumcenters[j] = x;
      circumcenters[j + 1] = y;
    }

    // Compute exterior cell rays.
    let h = hull[hull.length - 1];
    let p0, p1 = h * 4;
    let x0, x1 = points[2 * h];
    let y0, y1 = points[2 * h + 1];
    vectors.fill(0);
    for (let i = 0; i < hull.length; ++i) {
      h = hull[i];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    const {delaunay: {halfedges, inedges, hull}, circumcenters, vectors} = this;
    if (hull.length <= 1) return null;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = Math.floor(i / 3) * 2;
      const tj = Math.floor(j / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i = 0; i < hull.length; ++i) {
      h0 = h1, h1 = hull[i];
      const t = Math.floor(inedges[h1] / 3) * 2;
      const x = circumcenters[t];
      const y = circumcenters[t + 1];
      const v = h0 * 4;
      const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
      if (p) this._renderSegment(x, y, p[0], p[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    const points = this._clip(i);
    if (points === null || !points.length) return;
    context.moveTo(points[0], points[1]);
    let n = points.length;
    while (points[0] === points[n-2] && points[1] === points[n-1] && n > 1) n -= 2;
    for (let i = 2; i < n; i += 2) {
      if (points[i] !== points[i-2] || points[i+1] !== points[i-1])
        context.lineTo(points[i], points[i + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const {delaunay: {points}} = this;
    for (let i = 0, n = points.length / 2; i < n; ++i) {
      const cell = this.cellPolygon(i);
      if (cell) cell.index = i, yield cell;
    }
  }
  cellPolygon(i) {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.renderCell(i, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c1 = this._regioncode(x1, y1);
    if (c0 === 0 && c1 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i, x, y) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
    return this.delaunay._step(i, x, y) === i;
  }
  *neighbors(i) {
    const ci = this._clip(i);
    if (ci) for (const j of this.delaunay.neighbors(i)) {
      const cj = this._clip(j);
      // find the common edge
      if (cj) loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) {
        for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
          if (ci[ai] == cj[aj]
          && ci[ai + 1] == cj[aj + 1]
          && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj]
          && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]
          ) {
            yield j;
            break loop;
          }
        }
      }
    }
  }
  _cell(i) {
    const {circumcenters, delaunay: {inedges, halfedges, triangles}} = this;
    const e0 = inedges[i];
    if (e0 === -1) return null; // coincident point
    const points = [];
    let e = e0;
    do {
      const t = Math.floor(e / 3);
      points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break; // bad triangulation
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points;
  }
  _clip(i) {
    // degenerate case (1 valid point: return the box)
    if (i === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i);
    if (points === null) return null;
    const {vectors: V} = this;
    const v = i * 4;
    return V[v] || V[v + 1]
        ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3])
        : this._clipFinite(i, points);
  }
  _clipFinite(i, points) {
    const n = points.length;
    let P = null;
    let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
    let c0, c1 = this._regioncode(x1, y1);
    let e0, e1;
    for (let j = 0; j < n; j += 2) {
      x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
      c0 = c1, c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        e0 = e1, e1 = 0;
        if (P) P.push(x1, y1);
        else P = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1) this._edge(i, e0, e1, P, P.length);
          if (P) P.push(sx0, sy0);
          else P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1) this._edge(i, e0, e1, P, P.length);
        if (P) P.push(sx1, sy1);
        else P = [sx1, sy1];
      }
    }
    if (P) {
      e0 = e1, e1 = this._edgecode(P[0], P[1]);
      if (e0 && e1) this._edge(i, e0, e1, P, P.length);
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P;
  }
  _clipSegment(x0, y0, x1, y1, c0, c1) {
    while (true) {
      if (c0 === 0 && c1 === 0) return [x0, y0, x1, y1];
      if (c0 & c1) return null;
      let x, y, c = c0 || c1;
      if (c & 0b1000) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
      else if (c & 0b0100) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
      else if (c & 0b0010) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
      else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
      if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
      else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
    let P = Array.from(points), p;
    if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
    if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);
    if (P = this._clipFinite(i, P)) {
      for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
        c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
        if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
      }
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P;
  }
  _edge(i, e0, e1, P, j) {
    while (e0 !== e1) {
      let x, y;
      switch (e0) {
        case 0b0101: e0 = 0b0100; continue; // top-left
        case 0b0100: e0 = 0b0110, x = this.xmax, y = this.ymin; break; // top
        case 0b0110: e0 = 0b0010; continue; // top-right
        case 0b0010: e0 = 0b1010, x = this.xmax, y = this.ymax; break; // right
        case 0b1010: e0 = 0b1000; continue; // bottom-right
        case 0b1000: e0 = 0b1001, x = this.xmin, y = this.ymax; break; // bottom
        case 0b1001: e0 = 0b0001; continue; // bottom-left
        case 0b0001: e0 = 0b0101, x = this.xmin, y = this.ymin; break; // left
      }
      if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
        P.splice(j, 0, x, y), j += 2;
      }
    }
    if (P.length > 4) {
      for (let i = 0; i < P.length; i+= 2) {
        const j = (i + 2) % P.length, k = (i + 4) % P.length;
        if (P[i] === P[j] && P[j] === P[k]
        || P[i + 1] === P[j + 1] && P[j + 1] === P[k + 1])
          P.splice(j, 2), i -= 2;
      }
    }
    return j;
  }
  _project(x0, y0, vx, vy) {
    let t = Infinity, c, x, y;
    if (vy < 0) { // top
      if (y0 <= this.ymin) return null;
      if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
    } else if (vy > 0) { // bottom
      if (y0 >= this.ymax) return null;
      if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
    }
    if (vx > 0) { // right
      if (x0 >= this.xmax) return null;
      if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
    } else if (vx < 0) { // left
      if (x0 <= this.xmin) return null;
      if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
    }
    return [x, y];
  }
  _edgecode(x, y) {
    return (x === this.xmin ? 0b0001
        : x === this.xmax ? 0b0010 : 0b0000)
        | (y === this.ymin ? 0b0100
        : y === this.ymax ? 0b1000 : 0b0000);
  }
  _regioncode(x, y) {
    return (x < this.xmin ? 0b0001
        : x > this.xmax ? 0b0010 : 0b0000)
        | (y < this.ymin ? 0b0100
        : y > this.ymax ? 0b1000 : 0b0000);
  }
}


/***/ }),

/***/ "./node_modules/delaunator/index.js":
/*!******************************************!*\
  !*** ./node_modules/delaunator/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delaunator; });

const EPSILON = Math.pow(2, -52);
const EDGE_STACK = new Uint32Array(512);

class Delaunator {

    static from(points, getX = defaultGetX, getY = defaultGetY) {
        const n = points.length;
        const coords = new Float64Array(n * 2);

        for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
        }

        return new Delaunator(coords);
    }

    constructor(coords) {
        const n = coords.length >> 1;
        if (n > 0 && typeof coords[0] !== 'number') throw new Error('Expected coords to contain numbers.');

        this.coords = coords;

        // arrays that will store the triangulation graph
        const maxTriangles = Math.max(2 * n - 5, 0);
        this._triangles = new Uint32Array(maxTriangles * 3);
        this._halfedges = new Int32Array(maxTriangles * 3);

        // temporary arrays for tracking the edges of the advancing convex hull
        this._hashSize = Math.ceil(Math.sqrt(n));
        this._hullPrev = new Uint32Array(n); // edge to prev edge
        this._hullNext = new Uint32Array(n); // edge to next edge
        this._hullTri = new Uint32Array(n); // edge to adjacent triangle
        this._hullHash = new Int32Array(this._hashSize).fill(-1); // angular edge hash

        // temporary arrays for sorting points
        this._ids = new Uint32Array(n);
        this._dists = new Float64Array(n);

        this.update();
    }

    update() {
        const {coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash} =  this;
        const n = coords.length >> 1;

        // populate an array of point indices; calculate input data bbox
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            this._ids[i] = i;
        }
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let minDist = Infinity;
        let i0, i1, i2;

        // pick a seed point close to the center
        for (let i = 0; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
                i0 = i;
                minDist = d;
            }
        }
        const i0x = coords[2 * i0];
        const i0y = coords[2 * i0 + 1];

        minDist = Infinity;

        // find the point closest to the seed
        for (let i = 0; i < n; i++) {
            if (i === i0) continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
                i1 = i;
                minDist = d;
            }
        }
        let i1x = coords[2 * i1];
        let i1y = coords[2 * i1 + 1];

        let minRadius = Infinity;

        // find the third point which forms the smallest circumcircle with the first two
        for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1) continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
                i2 = i;
                minRadius = r;
            }
        }
        let i2x = coords[2 * i2];
        let i2y = coords[2 * i2 + 1];

        if (minRadius === Infinity) {
            // order collinear points by dx (or dy if all x are identical)
            // and return the list as a hull
            for (let i = 0; i < n; i++) {
                this._dists[i] = (coords[2 * i] - coords[0]) || (coords[2 * i + 1] - coords[1]);
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
                const id = this._ids[i];
                if (this._dists[id] > d0) {
                    hull[j++] = id;
                    d0 = this._dists[id];
                }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
        }

        // swap the order of the seed points for counter-clockwise orientation
        if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
        }

        const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
        this._cx = center.x;
        this._cy = center.y;

        for (let i = 0; i < n; i++) {
            this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
        }

        // sort the points by distance from the seed triangle circumcenter
        quicksort(this._ids, this._dists, 0, n - 1);

        // set up the seed triangle as the starting hull
        this._hullStart = i0;
        let hullSize = 3;

        hullNext[i0] = hullPrev[i2] = i1;
        hullNext[i1] = hullPrev[i0] = i2;
        hullNext[i2] = hullPrev[i1] = i0;

        hullTri[i0] = 0;
        hullTri[i1] = 1;
        hullTri[i2] = 2;

        hullHash.fill(-1);
        hullHash[this._hashKey(i0x, i0y)] = i0;
        hullHash[this._hashKey(i1x, i1y)] = i1;
        hullHash[this._hashKey(i2x, i2y)] = i2;

        this.trianglesLen = 0;
        this._addTriangle(i0, i1, i2, -1, -1, -1);

        for (let k = 0, xp, yp; k < this._ids.length; k++) {
            const i = this._ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];

            // skip near-duplicate points
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
            xp = x;
            yp = y;

            // skip seed triangle points
            if (i === i0 || i === i1 || i === i2) continue;

            // find a visible edge on the convex hull using edge hash
            let start = 0;
            for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
                start = hullHash[(key + j) % this._hashSize];
                if (start !== -1 && start !== hullNext[start]) break;
            }

            start = hullPrev[start];
            let e = start, q;
            while (q = hullNext[e], !orient(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1])) {
                e = q;
                if (e === start) {
                    e = -1;
                    break;
                }
            }
            if (e === -1) continue; // likely a near-duplicate point; skip it

            // add the first triangle from the point
            let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);

            // recursively flip triangles from the point until they satisfy the Delaunay condition
            hullTri[i] = this._legalize(t + 2);
            hullTri[e] = t; // keep track of boundary triangles on the hull
            hullSize++;

            // walk forward through the hull, adding more triangles and flipping recursively
            let n = hullNext[e];
            while (q = hullNext[n], orient(x, y, coords[2 * n], coords[2 * n + 1], coords[2 * q], coords[2 * q + 1])) {
                t = this._addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
                hullTri[i] = this._legalize(t + 2);
                hullNext[n] = n; // mark as removed
                hullSize--;
                n = q;
            }

            // walk backward from the other side, adding more triangles and flipping
            if (e === start) {
                while (q = hullPrev[e], orient(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1])) {
                    t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
                    this._legalize(t + 2);
                    hullTri[q] = t;
                    hullNext[e] = e; // mark as removed
                    hullSize--;
                    e = q;
                }
            }

            // update the hull indices
            this._hullStart = hullPrev[i] = e;
            hullNext[e] = hullPrev[n] = i;
            hullNext[i] = n;

            // save the two new edges in the hash table
            hullHash[this._hashKey(x, y)] = i;
            hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
        }

        this.hull = new Uint32Array(hullSize);
        for (let i = 0, e = this._hullStart; i < hullSize; i++) {
            this.hull[i] = e;
            e = hullNext[e];
        }

        // trim typed triangle mesh arrays
        this.triangles = this._triangles.subarray(0, this.trianglesLen);
        this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }

    _hashKey(x, y) {
        return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
    }

    _legalize(a) {
        const {_triangles: triangles, _halfedges: halfedges, coords} = this;

        let i = 0;
        let ar = 0;

        // recursion eliminated with a fixed-size stack
        while (true) {
            const b = halfedges[a];

            /* if the pair of triangles doesn't satisfy the Delaunay condition
             * (p1 is inside the circumcircle of [p0, pl, pr]), flip them,
             * then do the same check/flip recursively for the new pair of triangles
             *
             *           pl                    pl
             *          /||\                  /  \
             *       al/ || \bl            al/    \a
             *        /  ||  \              /      \
             *       /  a||b  \    flip    /___ar___\
             *     p0\   ||   /p1   =>   p0\---bl---/p1
             *        \  ||  /              \      /
             *       ar\ || /br             b\    /br
             *          \||/                  \  /
             *           pr                    pr
             */
            const a0 = a - a % 3;
            ar = a0 + (a + 2) % 3;

            if (b === -1) { // convex hull edge
                if (i === 0) break;
                a = EDGE_STACK[--i];
                continue;
            }

            const b0 = b - b % 3;
            const al = a0 + (a + 1) % 3;
            const bl = b0 + (b + 2) % 3;

            const p0 = triangles[ar];
            const pr = triangles[a];
            const pl = triangles[al];
            const p1 = triangles[bl];

            const illegal = inCircle(
                coords[2 * p0], coords[2 * p0 + 1],
                coords[2 * pr], coords[2 * pr + 1],
                coords[2 * pl], coords[2 * pl + 1],
                coords[2 * p1], coords[2 * p1 + 1]);

            if (illegal) {
                triangles[a] = p1;
                triangles[b] = p0;

                const hbl = halfedges[bl];

                // edge swapped on the other side of the hull (rare); fix the halfedge reference
                if (hbl === -1) {
                    let e = this._hullStart;
                    do {
                        if (this._hullTri[e] === bl) {
                            this._hullTri[e] = a;
                            break;
                        }
                        e = this._hullPrev[e];
                    } while (e !== this._hullStart);
                }
                this._link(a, hbl);
                this._link(b, halfedges[ar]);
                this._link(ar, bl);

                const br = b0 + (b + 1) % 3;

                // don't worry about hitting the cap: it can only happen on extremely degenerate input
                if (i < EDGE_STACK.length) {
                    EDGE_STACK[i++] = br;
                }
            } else {
                if (i === 0) break;
                a = EDGE_STACK[--i];
            }
        }

        return ar;
    }

    _link(a, b) {
        this._halfedges[a] = b;
        if (b !== -1) this._halfedges[b] = a;
    }

    // add a new triangle given vertex indices and adjacent half-edge ids
    _addTriangle(i0, i1, i2, a, b, c) {
        const t = this.trianglesLen;

        this._triangles[t] = i0;
        this._triangles[t + 1] = i1;
        this._triangles[t + 2] = i2;

        this._link(t, a);
        this._link(t + 1, b);
        this._link(t + 2, c);

        this.trianglesLen += 3;

        return t;
    }
}

// monotonically increases with real angle, but doesn't need expensive trigonometry
function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
}

function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

// return 2d orientation sign if we're confident in it through J. Shewchuk's error bound check
function orientIfSure(px, py, rx, ry, qx, qy) {
    const l = (ry - py) * (qx - px);
    const r = (rx - px) * (qy - py);
    return Math.abs(l - r) >= 3.3306690738754716e-16 * Math.abs(l + r) ? l - r : 0;
}

// a more robust orientation test that's stable in a given triangle (to fix robustness issues)
function orient(rx, ry, qx, qy, px, py) {
    const sign = orientIfSure(px, py, rx, ry, qx, qy) ||
    orientIfSure(rx, ry, qx, qy, px, py) ||
    orientIfSure(qx, qy, px, py, rx, ry);
    return sign < 0;
}

function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;

    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;

    return dx * (ey * cp - bp * fy) -
           dy * (ex * cp - bp * fx) +
           ap * (ex * fy - ey * fx) < 0;
}

function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = (ey * bl - dy * cl) * d;
    const y = (dx * cl - ex * bl) * d;

    return x * x + y * y;
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = ax + (ey * bl - dy * cl) * d;
    const y = ay + (dx * cl - ex * bl) * d;

    return {x, y};
}

function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
        for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
        }
    } else {
        const median = (left + right) >> 1;
        let i = left + 1;
        let j = right;
        swap(ids, median, i);
        if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
        if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
        if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);

        const temp = ids[i];
        const tempDist = dists[temp];
        while (true) {
            do i++; while (dists[ids[i]] < tempDist);
            do j--; while (dists[ids[j]] > tempDist);
            if (j < i) break;
            swap(ids, i, j);
        }
        ids[left + 1] = ids[j];
        ids[j] = temp;

        if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
        } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
        }
    }
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultGetX(p) {
    return p[0];
}
function defaultGetY(p) {
    return p[1];
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/pose/algorithms/convex-polygon-distance.ts":
/*!********************************************************!*\
  !*** ./src/pose/algorithms/convex-polygon-distance.ts ***!
  \********************************************************/
/*! exports provided: DistanceCalculationStrategy, convexPolygonDistance, angle, direction, above, below */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistanceCalculationStrategy", function() { return DistanceCalculationStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convexPolygonDistance", function() { return convexPolygonDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "direction", function() { return direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "above", function() { return above; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "below", function() { return below; });
/* harmony import */ var _models_polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/polygon */ "./src/pose/models/polygon.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/pose/utils.ts");
/* harmony import */ var _minkowski_sum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minkowski-sum */ "./src/pose/algorithms/minkowski-sum.ts");



var DistanceCalculationStrategy;
(function (DistanceCalculationStrategy) {
    DistanceCalculationStrategy[DistanceCalculationStrategy["BruteForce"] = 0] = "BruteForce";
    DistanceCalculationStrategy[DistanceCalculationStrategy["Linear"] = 1] = "Linear";
    DistanceCalculationStrategy[DistanceCalculationStrategy["Logarithmic"] = 2] = "Logarithmic"; // TODO
})(DistanceCalculationStrategy || (DistanceCalculationStrategy = {}));
/**
 * Returns the squared distance between two polygon and the direction
 */
var convexPolygonDistance = function (p, q, strategy) {
    if (strategy === void 0) { strategy = DistanceCalculationStrategy.BruteForce; }
    var qNeg = q.negative();
    switch (strategy) {
        case DistanceCalculationStrategy.BruteForce:
            var msum = Object(_minkowski_sum__WEBPACK_IMPORTED_MODULE_2__["convexMinkowskiSum"])(p, qNeg);
            // console.log(`minkowski sum: ${JSON.stringify(msum)}`);
            // Convert to polygon so points become sorted
            var poly_1 = _models_polygon__WEBPACK_IMPORTED_MODULE_0__["Polygon"].fromPoints(msum);
            var distancesWithDirections = poly_1.points.map(function (p, i) {
                var line = { from: p, to: poly_1.getNextPoint(i) };
                var shortestPoints = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["shortestPointLineToPoint"])(line, { x: 0, y: 0 });
                var distance = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["lengthFromOrigin"])(shortestPoints[0]);
                var sqrtDistance = Math.sqrt(distance);
                var unitVector = {
                    x: (shortestPoints[1].x - shortestPoints[0].x) / sqrtDistance,
                    y: (shortestPoints[1].y - shortestPoints[0].y) / sqrtDistance,
                };
                return { distance: distance, unitVector: unitVector };
            });
            return distancesWithDirections
                .reduce(function (min, dist) { return dist.distance < min.distance ? dist : min; });
        default:
            throw new Error("Strategy " + strategy + " has not implemented yet");
    }
};
var angle = function (from, to1, to2) {
    var dy1 = to1.y - from.y, dx1 = to1.x - from.x, dy2 = to2.y - from.y, dx2 = to2.x - from.x;
    var doty = dy1 * dy2;
    var dotx = dx1 * dx2;
    var len1 = Math.sqrt((dy1 * dy1) + (dx1 * dx1));
    var len2 = Math.sqrt((dy2 * dy2) + (dx2 * dx2));
    var ang = Math.acos((dotx + doty) / (len1 * len2));
    return above({ from: from, to: to1 }, to2) ? ang : -ang;
};
/**
 * returns positive number if point `p` is left of line `l`
 */
var direction = function (l, p) {
    return ((l.to.x - l.from.x) * (p.y - l.from.y)) -
        ((p.x - l.from.x) * (l.to.y - l.from.y));
};
var above = function (l, p) { return direction(l, p) > 0; };
var below = function (l, p) { return direction(l, p) < 0; };


/***/ }),

/***/ "./src/pose/algorithms/convex-polygon-intersection.ts":
/*!************************************************************!*\
  !*** ./src/pose/algorithms/convex-polygon-intersection.ts ***!
  \************************************************************/
/*! exports provided: AimState, getAimState, polygonIntersects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AimState", function() { return AimState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAimState", function() { return getAimState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polygonIntersects", function() { return polygonIntersects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _models_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/common */ "./src/pose/models/common.ts");

/**
 * This module implements O’Rourke-Chien-Olson-Naddor polygon intersection algorithm.
 * However, it only checks if there is an intersection.
 * Later it can be extended to calculate the intersection area as well.
 */

var AimState;
(function (AimState) {
    /** Only left edge aims to right edge */
    AimState["Left"] = "Left";
    AimState["Right"] = "Right";
    AimState["Both"] = "Both";
    AimState["Neither"] = "Neither";
})(AimState || (AimState = {}));
// TODO: test this
var getAimState = function (e1, e2) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(_models_common__WEBPACK_IMPORTED_MODULE_1__["intersectionCoefficients"])(e1, e2), 2), ɑ = _a[0], ɑ_ = _a[1];
    return (ɑ < 0) ?
        ((ɑ_ < 0) ?
            AimState.Both :
            AimState.Left) :
        ((ɑ_ < 0) ?
            AimState.Right :
            AimState.Neither);
};
/**
 * Selects which edge to advance based on the status
 * @returns True if the left edge should be advanced, false otherwise.
 */
var selectAdvance = function (e1, e2) {
    var aimState = getAimState(e1, e2);
    switch (aimState) {
        case AimState.Left:
            return true;
        case AimState.Right:
            return false;
        case AimState.Both: {
            var side = Object(_models_common__WEBPACK_IMPORTED_MODULE_1__["pointLineClassification"])(e1, e2.to);
            switch (side) {
                case _models_common__WEBPACK_IMPORTED_MODULE_1__["Side"].Right: return false;
                case _models_common__WEBPACK_IMPORTED_MODULE_1__["Side"].Left: return true;
            }
        }
        case AimState.Neither: {
            var side = Object(_models_common__WEBPACK_IMPORTED_MODULE_1__["pointLineClassification"])(e1, e2.to);
            switch (side) {
                case _models_common__WEBPACK_IMPORTED_MODULE_1__["Side"].Right: return false;
                // either e1 is right of e2, or neither. Either way we can select e1
                case _models_common__WEBPACK_IMPORTED_MODULE_1__["Side"].Left: return true;
            }
        }
    }
};
/**
 * Checks if two polygons has intersections or not.
 * Returns true if they intersect and false otherwise
 */
var polygonIntersects = function (p1, p2) {
    var pPoints = p1.points;
    var qPoints = p2.points;
    var pV = 1, qV = 1;
    var nextPIndex = function () { return (pV + 1) % pPoints.length; };
    var nextQIndex = function () { return (qV + 1) % qPoints.length; };
    var currPEdge = function () { return ({ from: pPoints[pV], to: pPoints[nextPIndex()] }); };
    var currQEdge = function () { return ({ from: qPoints[qV], to: qPoints[nextQIndex()] }); };
    var maxIterations = 3 * (pPoints.length + qPoints.length);
    for (var i = 0; i < maxIterations; i += 1) {
        if (Object(_models_common__WEBPACK_IMPORTED_MODULE_1__["edgeIntersects"])(currPEdge(), currQEdge())) {
            return true;
        }
        var advanceLeft = selectAdvance(currPEdge(), currQEdge());
        if (advanceLeft) {
            pV = nextPIndex();
        }
        else {
            qV = nextQIndex();
        }
    }
    return false;
};


/***/ }),

/***/ "./src/pose/algorithms/minkowski-sum.ts":
/*!**********************************************!*\
  !*** ./src/pose/algorithms/minkowski-sum.ts ***!
  \**********************************************/
/*! exports provided: convexMinkowskiSum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convexMinkowskiSum", function() { return convexMinkowskiSum; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function convexMinkowskiSum(A, B) {
    var e_1, _a, e_2, _b;
    var points = [];
    try {
        for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(A.points), _d = _c.next(); !_d.done; _d = _c.next()) {
            var p1 = _d.value;
            try {
                for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(B.points)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var p2 = _f.value;
                    var sumP = { x: p1.x + p2.x, y: p1.y + p2.y };
                    points.push(sumP);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return points;
}


/***/ }),

/***/ "./src/pose/algorithms/voronoi.ts":
/*!****************************************!*\
  !*** ./src/pose/algorithms/voronoi.ts ***!
  \****************************************/
/*! exports provided: findNeighbors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNeighbors", function() { return findNeighbors; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _helpers_turf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/turf */ "./src/pose/helpers/turf.ts");
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");



var findNeighbors = function (frame, centers) {
    var e_1, _a;
    var centersMapped = centers.map(_helpers_turf__WEBPACK_IMPORTED_MODULE_1__["pointToArray"]);
    // console.log(JSON.stringify(centersMapped));
    // console.log(JSON.stringify(frame));
    var neighbors = Array.from({ length: centers.length }, function () { return []; });
    var delaunay = d3_delaunay__WEBPACK_IMPORTED_MODULE_2__["Delaunay"].from(centersMapped);
    var voronoi = delaunay.voronoi([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    for (var i = 0; i < centers.length; ++i) {
        try {
            for (var _b = (e_1 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(voronoi.neighbors(i))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var neighbor = _c.value;
                neighbors[i].push(neighbor);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    // console.log(JSON.stringify(neighbors));
    return neighbors;
};
var rectToBbox = function (_) {
    return ({
        xl: Number.MIN_SAFE_INTEGER, xr: Number.MAX_SAFE_INTEGER,
        yl: Number.MIN_SAFE_INTEGER, yr: Number.MAX_SAFE_INTEGER,
    });
};


/***/ }),

/***/ "./src/pose/embedder/basic-embedder.ts":
/*!*********************************************!*\
  !*** ./src/pose/embedder/basic-embedder.ts ***!
  \*********************************************/
/*! exports provided: basicEmbed, expandLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basicEmbed", function() { return basicEmbed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandLine", function() { return expandLine; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _algorithms_convex_polygon_distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../algorithms/convex-polygon-distance */ "./src/pose/algorithms/convex-polygon-distance.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/pose/utils.ts");
/* harmony import */ var _pose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pose */ "./src/pose/pose.ts");
/* harmony import */ var _algorithms_convex_polygon_intersection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../algorithms/convex-polygon-intersection */ "./src/pose/algorithms/convex-polygon-intersection.ts");





var ForceType;
(function (ForceType) {
    ForceType[ForceType["Normal"] = 0] = "Normal";
    ForceType[ForceType["Intersection"] = 1] = "Intersection";
})(ForceType || (ForceType = {}));
var basicEmbed = function (components, options) {
    var ATTRACTIVE_CONSTANT = options.componentSpacing, REPULSIVE_CONSTANT = Math.pow(options.componentSpacing, 2);
    var CONVERGENCE_THRESHOLD = 1;
    var EDGE_THRESHOLD = 5;
    var MAX_FORCE = ATTRACTIVE_CONSTANT;
    var makeForce = function (multiplier) {
        return function (p1, p2) {
            var _a = Object(_algorithms_convex_polygon_distance__WEBPACK_IMPORTED_MODULE_1__["convexPolygonDistance"])(p1, p2), distance = _a.distance, unitVector = _a.unitVector;
            // console.log(`distance: ${distance}`);
            var calculatedForce = multiplier(distance);
            var force = Math.abs(calculatedForce) < MAX_FORCE ?
                calculatedForce :
                MAX_FORCE * Math.sign(calculatedForce);
            return { x: unitVector.x * force, y: unitVector.y * force };
        };
    };
    var attractiveForce = makeForce(function (n) { return 3 * Math.log2(Math.sqrt(n) / ATTRACTIVE_CONSTANT); });
    var repulsiveForce = makeForce(function (n) { return -((REPULSIVE_CONSTANT / n) - 1); });
    /**
     * Adds the intersection case
     * @param f displacement function without considering intersection
     */
    var displacementWrapper = function (p1Index, p2Index, f) {
        var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])([components.nodes[p1Index], components.nodes[p2Index]], 2), p1 = _a[0], p2 = _a[1];
        var hasIntersection = Object(_algorithms_convex_polygon_intersection__WEBPACK_IMPORTED_MODULE_4__["polygonIntersects"])(p1, p2);
        if (!hasIntersection) {
            return { force: f(p1, p2), type: ForceType.Normal };
        }
        else {
            // console.log(`intersection between ${p1Index} and ${p2Index}`);
            // Always move 5 units if intersection occurs
            var minForce = options.componentSpacing;
            var centerLine = { from: p1.center, to: p2.center };
            var dir = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["direction"])(centerLine);
            return {
                force: { x: -dir.x * minForce, y: -dir.y * minForce },
                type: ForceType.Intersection,
            };
        }
    };
    var applyAttractiveForces = function (components, forces, intersectionForces) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(components.edges.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_d.value, 2), from = _e[0], neighbors = _e[1];
                try {
                    for (var neighbors_1 = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(neighbors)), neighbors_1_1 = neighbors_1.next(); !neighbors_1_1.done; neighbors_1_1 = neighbors_1.next()) {
                        var to = neighbors_1_1.value;
                        var _f = displacementWrapper(from, to, attractiveForce), force = _f.force, type = _f.type;
                        var forceArray = type === ForceType.Normal ? forces : intersectionForces;
                        forceArray[from].x += force.x;
                        forceArray[from].y += force.y;
                        forceArray[to].x -= force.x;
                        forceArray[to].y -= force.y;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (neighbors_1_1 && !neighbors_1_1.done && (_b = neighbors_1.return)) _b.call(neighbors_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    var applyRepulsiveForces = function (components, forces, intersectionForces) {
        if (options.type === _pose__WEBPACK_IMPORTED_MODULE_3__["DistanceDetectionType"].BASIC) {
            var nodesLen = components.nodes.length;
            for (var i = 0; i < nodesLen; ++i) {
                var _loop_1 = function (j) {
                    // Not connected
                    if (components.edges[i].find(function (n) { return n === j; }) !== undefined) {
                        var _a = displacementWrapper(i, j, repulsiveForce), force = _a.force, type = _a.type;
                        var forceArray = type === ForceType.Normal ? forces : intersectionForces;
                        forceArray[i].x += force.x;
                        forceArray[i].y += force.y;
                        forceArray[j].x -= force.x;
                        forceArray[j].y -= force.y;
                    }
                };
                for (var j = i + 1; j < nodesLen; ++j) {
                    _loop_1(j);
                }
            }
        }
        else {
            throw new Error('Not implemented');
        }
    };
    var moveFn = options.type === _pose__WEBPACK_IMPORTED_MODULE_3__["DistanceDetectionType"].GRID_SQUARE ?
        options.detection.move :
        function (index, displacement) { components.nodes[index].move(displacement); };
    var turnForces = Array.from({ length: components.nodes.length }, function () { return ({ x: 0, y: 0 }); });
    var intersectionForces = Array.from({ length: components.nodes.length }, function () { return ({ x: 0, y: 0 }); });
    var singleStep = function () {
        var hasIntersectionForce = function (i) {
            return intersectionForces[i].x !== 0 || intersectionForces[i].y !== 0;
        };
        applyAttractiveForces(components, turnForces, intersectionForces);
        applyRepulsiveForces(components, turnForces, intersectionForces);
        var turnTotalForce = 0;
        // console.log(`forces: ${JSON.stringify(turnForces)}`);
        for (var i = 0; i < components.nodes.length; ++i) {
            var force = hasIntersectionForce(i) ? intersectionForces[i] : turnForces[i];
            moveFn(i, force);
            turnTotalForce += Object(_utils__WEBPACK_IMPORTED_MODULE_2__["lengthFromOrigin"])(force);
            turnForces[i].x = 0;
            turnForces[i].y = 0;
            intersectionForces[i].x = 0;
            intersectionForces[i].y = 0;
        }
        var averageForce = turnTotalForce / components.nodes.length;
        return averageForce;
    };
    if (options.step !== undefined) {
        var step = options.step;
        for (var i = 0; i < step; ++i) {
            singleStep();
        }
    }
    else {
        var edgeCounter = 0;
        var ITERATION = 100;
        for (var i = 0; i < ITERATION; i += 1) {
            var averageForce = singleStep();
            // console.log(`Average force: ${averageForce}`);
            edgeCounter += 1;
            /* if (!hasIntersection && averageForce <= CONVERGENCE_THRESHOLD) {
                return;
            } */
            if (edgeCounter >= EDGE_THRESHOLD) {
                // console.log("Recalculating edges...");
                components.edges = Object(_pose__WEBPACK_IMPORTED_MODULE_3__["constructEdges"])(components.nodes);
                edgeCounter = 0;
            }
        }
    }
};
var expandLine = function (line, bbox) {
    if (line.from.x !== line.to.x) {
        var lineSlope_1 = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["slope"])(line);
        if (line.from.x < line.to.x) {
            var leftP = line.from;
            var rightP = line.to;
            return {
                from: bbox.minX < leftP.x ?
                    ((function () {
                        var newX = bbox.minX;
                        var newY = line.to.y - lineSlope_1 * (line.to.x - newX);
                        return { x: newX, y: newY };
                    })()) :
                    leftP,
                to: bbox.maxX > rightP.x ?
                    ((function () {
                        var newX = bbox.maxX;
                        var newY = line.from.y + lineSlope_1 * (newX - line.from.x);
                        return { x: newX, y: newY };
                    })()) :
                    rightP,
            };
        }
        else {
            var leftP = line.to;
            var rightP = line.from;
            return {
                from: bbox.maxX > rightP.x ?
                    ((function () {
                        var newX = bbox.maxX;
                        var newY = line.to.y - lineSlope_1 * (line.to.x - newX);
                        return { x: newX, y: newY };
                    })()) :
                    rightP,
                to: bbox.minX < leftP.x ?
                    ((function () {
                        var newX = bbox.minX;
                        var newY = line.from.y + lineSlope_1 * (newX - line.from.x);
                        return { x: newX, y: newY };
                    })()) :
                    leftP,
            };
        }
    }
    else {
        // Edge case, if line is vertical, must expand vertically
        if (line.from.y < line.to.y) {
            var minYP = line.from;
            var maxYP = line.to;
            return {
                from: bbox.minY < minYP.y ?
                    { x: minYP.x, y: bbox.minY } :
                    minYP,
                to: bbox.maxY > maxYP.y ?
                    { x: maxYP.x, y: bbox.maxY } :
                    maxYP,
            };
        }
        else {
            var minYP = line.to;
            var maxYP = line.from;
            return {
                from: bbox.maxY > maxYP.y ?
                    { x: maxYP.x, y: bbox.maxY } :
                    maxYP,
                to: bbox.minY < minYP.y ?
                    { x: minYP.x, y: bbox.minY } :
                    minYP,
            };
        }
    }
};


/***/ }),

/***/ "./src/pose/helpers/turf.ts":
/*!**********************************!*\
  !*** ./src/pose/helpers/turf.ts ***!
  \**********************************/
/*! exports provided: pointToArray, arrayToPoint, toGeoJSON, turfLine, turfPoly, turfBboxToRectangle, fromTurfLine, fromTurfPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointToArray", function() { return pointToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToPoint", function() { return arrayToPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toGeoJSON", function() { return toGeoJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turfLine", function() { return turfLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turfPoly", function() { return turfPoly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turfBboxToRectangle", function() { return turfBboxToRectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTurfLine", function() { return fromTurfLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTurfPoint", function() { return fromTurfPoint; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/main.es.js");


var pointToArray = function (point) {
    return [point.x, point.y];
};
var arrayToPoint = function (_a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), x = _b[0], y = _b[1];
    return ({ x: x, y: y });
};
/**
 * converts [ { x, y } ] to [x, y] form
 * @param points
 */
var toGeoJSON = function (points) {
    return points.map(pointToArray);
};
var turfLine = function (line) {
    return Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_1__["lineString"])([pointToArray(line.from), pointToArray(line.to)]);
};
var turfPoly = function (poly) {
    var pPoints = poly.points;
    // For some reason poly.getPoint(0) is different then poly.points[0]
    return Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_1__["polygon"])([toGeoJSON(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(pPoints, [pPoints[0]]))]);
};
var turfBboxToRectangle = function (turfBbox) {
    return ({
        minX: turfBbox[0], minY: turfBbox[1],
        maxX: turfBbox[2], maxY: turfBbox[3],
    });
};
var fromTurfLine = function (turfLine) {
    var _a, _b;
    var coordinates = turfLine.features;
    if (coordinates.length < 2) {
        return null;
    }
    var fromCoord = (_a = coordinates[0].geometry) === null || _a === void 0 ? void 0 : _a.coordinates;
    var toCoord = (_b = coordinates[1].geometry) === null || _b === void 0 ? void 0 : _b.coordinates;
    if (fromCoord && toCoord) {
        return {
            from: arrayToPoint(fromCoord),
            to: arrayToPoint(toCoord),
        };
    }
    else {
        throw new Error('turfLine has null points');
    }
};
var fromTurfPoint = function (turfPoint) {
    var _a;
    var coordinates = (_a = turfPoint.geometry) === null || _a === void 0 ? void 0 : _a.coordinates;
    if (coordinates) {
        return { x: coordinates[0], y: coordinates[1] };
    }
    else {
        throw new Error('turfPoint.geometry is null');
    }
};


/***/ }),

/***/ "./src/pose/models/common.ts":
/*!***********************************!*\
  !*** ./src/pose/models/common.ts ***!
  \***********************************/
/*! exports provided: Side, pointMultScalar, pointAdd, diff, cross, pointLineClassification, edgeIntersects, intersectionCoefficients, lineIntersection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Side", function() { return Side; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointMultScalar", function() { return pointMultScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointAdd", function() { return pointAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diff", function() { return diff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointLineClassification", function() { return pointLineClassification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edgeIntersects", function() { return edgeIntersects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionCoefficients", function() { return intersectionCoefficients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineIntersection", function() { return lineIntersection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Side;
(function (Side) {
    Side["Left"] = "Left";
    Side["Right"] = "Right";
})(Side || (Side = {}));
var pointMultScalar = function (p, n) {
    return ({ x: p.x * n, y: p.y * n });
};
/** p1 + p2 */
var pointAdd = function (p1, p2) {
    return ({ x: p1.x + p2.x, y: p1.y + p2.y });
};
/** p1 - p2 */
var diff = function (p1, p2) {
    return ({ x: p1.x - p2.x, y: p1.y - p2.y });
};
var cross = function (_a, _b) {
    var x1 = _a.x, y1 = _a.y;
    var x2 = _b.x, y2 = _b.y;
    return ((x1 * y2) - (y1 * x2));
};
var pointLineClassification = function (edge, point) {
    var toRebased = diff(edge.to, edge.from);
    var pointRebased = diff(point, edge.from);
    return cross(pointRebased, toRebased) > 0 ?
        Side.Right :
        Side.Left;
};
var edgeIntersects = function (e1, e2) {
    var side1 = pointLineClassification(e1, e2.from);
    var side2 = pointLineClassification(e1, e2.to);
    var side3 = pointLineClassification(e2, e1.from);
    var side4 = pointLineClassification(e2, e1.to);
    return side1 !== side2 &&
        side3 !== side4;
    // TODO: handle edge cases
};
/**
 * Calculates coeffiencts of the parametric representations of the lines at the intersection point.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * @returns ɑ and ɑ' as a 2-tuple
 */
var intersectionCoefficients = function (e1, e2) {
    var _a = e1.from, x1 = _a.x, y1 = _a.y, _b = e1.to, x2 = _b.x, y2 = _b.y;
    var _c = e2.from, x1_ = _c.x, y1_ = _c.y, _d = e2.to, x2_ = _d.x, y2_ = _d.y;
    var ɑ_ = ((y2_ - y2) - ((x2_ - x2) / (x1 - x2) * (y1 - y2))) /
        ((x1_ - x2_) / (x1 - x2) * (y1 - y2) - (y1_ - y2_));
    var ɑ = (ɑ_ * (x1_ - x2_) + x2_ - x2) /
        (x1 - x2);
    return [ɑ, ɑ_];
};
/**
 * This function uses parametric representation of lines.
 * Let e1 = ɑ * p1 + (1 - ɑ) * p2
 * and e2 = ɑ' * p1' + (1 - ɑ') * p2'
 * We first calculate ɑ' by creating two equalities for each axis.
 * Then we can easily obtain the intersection point by substituting the value of these coefficients.
 * @returns point where the lines intersect
 */
var lineIntersection = function (e1, e2) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(intersectionCoefficients(e1, e2), 2), ɑ = _a[0], _ = _a[1];
    return pointAdd(pointMultScalar(e1.from, ɑ), pointMultScalar(e1.to, (1 - ɑ)));
};


/***/ }),

/***/ "./src/pose/models/polygon.ts":
/*!************************************!*\
  !*** ./src/pose/models/polygon.ts ***!
  \************************************/
/*! exports provided: Polygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return Polygon; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/pose/utils.ts");


/**
 * TODO: test if bbox working correctly after move
 */
var Polygon = /** @class */ (function () {
    function Polygon(mPoints) {
        var e_1, _a;
        this.mPoints = mPoints;
        this.mBase = { x: 0, y: 0 };
        // No need to calculate center of mass if only single point
        // this.mVerticeCenter = mPoints.length > 1 ? fromTurfPoint(centerOfMass(turfPoly(this))) : mPoints[0];
        this.mVerticeCenter = { x: 0, y: 0 };
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.mPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                this.mVerticeCenter.x += p.x;
                this.mVerticeCenter.y += p.y;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.mVerticeCenter.x /= this.mPoints.length;
        this.mVerticeCenter.y /= this.mPoints.length;
        this.mVerticesBbox = null;
    }
    Polygon.fromGraph = function (graph) {
        var e_2, _a;
        var points = [];
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(graph.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                points.push(node.min, node.max);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return this.fromPoints(points);
    };
    Polygon.fromPoints = function (points) {
        return new Polygon(this.convexHull(points));
    };
    /**
     * Initializes a polygon without converting points to a convex hull
     * Use only when you are sure that `points` are convex
     */
    Polygon.fromPointsUnsafe = function (points) {
        return new Polygon(points);
    };
    Polygon.prototype.withBase = function (point) {
        if (this.base.x == 0 && this.base.y == 0) {
            return point;
        }
        else {
            return { x: point.x + this.base.x, y: point.y + this.base.y };
        }
    };
    Polygon.prototype.move = function (disposition) {
        this.mBase.x += disposition.x;
        this.mBase.y += disposition.y;
    };
    Object.defineProperty(Polygon.prototype, "points", {
        /** Sorted by angle. Counterclockwise direction */
        get: function () {
            if (this.base.x == 0 && this.base.y == 0) {
                return this.mPoints;
            }
            else {
                // TODO: cache this
                return this.mPoints.map(this.withBase.bind(this));
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "pointCount", {
        get: function () {
            return this.mPoints.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "base", {
        /**
         * Origin of the vertices
         */
        get: function () {
            return this.mBase;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Polygon.prototype, "center", {
        get: function () {
            return {
                x: this.base.x + this.mVerticeCenter.x,
                y: this.base.y + this.mVerticeCenter.y,
            };
        },
        enumerable: false,
        configurable: true
    });
    Polygon.prototype.negative = function () {
        // Safe to use constructor because we know points are convex
        return new Polygon(this.points.map(function (p) { return ({ x: -p.x, y: -p.y }); }));
    };
    Polygon.prototype.getSafeIndex = function (index) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["mod"])(index, this.points.length);
    };
    Polygon.prototype.getPoint = function (index) {
        return this.withBase(this.points[this.getSafeIndex(index)]);
    };
    Polygon.prototype.getPrevPoint = function (index) {
        return this.withBase(this.getPoint(index - 1));
    };
    Polygon.prototype.getNextPoint = function (index) {
        return this.withBase(this.getPoint(index + 1));
    };
    Object.defineProperty(Polygon.prototype, "boundingBox", {
        get: function () {
            var e_3, _a;
            if (this.mVerticesBbox === null) {
                var bbox = {
                    minX: Number.MAX_SAFE_INTEGER,
                    maxX: Number.MIN_SAFE_INTEGER,
                    minY: Number.MAX_SAFE_INTEGER,
                    maxY: Number.MIN_SAFE_INTEGER,
                };
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.mPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var p = _c.value;
                        if (p.x < bbox.minX) {
                            bbox.minX = p.x;
                        }
                        if (p.x > bbox.maxX) {
                            bbox.maxX = p.x;
                        }
                        if (p.y < bbox.minY) {
                            bbox.minY = p.y;
                        }
                        if (p.y > bbox.maxY) {
                            bbox.maxY = p.y;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                this.mVerticesBbox = bbox;
            }
            var base = this.mBase;
            return {
                minX: this.mVerticesBbox.minX + base.x,
                maxX: this.mVerticesBbox.maxX + base.x,
                minY: this.mVerticesBbox.minY + base.y,
                maxY: this.mVerticesBbox.maxY + base.y,
            };
        },
        enumerable: false,
        configurable: true
    });
    Polygon.convexHull = function (points) {
        var e_4, _a;
        var stack = [];
        var topLeft = Polygon.topLeft(points);
        stack.push(topLeft);
        // Remove top left
        points.splice(points.findIndex(function (p) { return p === topLeft; }), 1);
        // Sort by their angle
        points.sort(function (a, b) { return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["slopeAngle"])(topLeft, a) - Object(_utils__WEBPACK_IMPORTED_MODULE_1__["slopeAngle"])(topLeft, b); });
        // Remove duplicates
        var uniques = this.removeDuplicates(points, topLeft);
        try {
            for (var uniques_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(uniques), uniques_1_1 = uniques_1.next(); !uniques_1_1.done; uniques_1_1 = uniques_1.next()) {
                var point = uniques_1_1.value;
                while (stack.length > 1 && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["orientation"])(stack[stack.length - 2], stack[stack.length - 1], point) === _utils__WEBPACK_IMPORTED_MODULE_1__["Orientation"].LEFT) {
                    stack.pop();
                }
                stack.push(point);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (uniques_1_1 && !uniques_1_1.done && (_a = uniques_1.return)) _a.call(uniques_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return stack;
    };
    Polygon.removeDuplicates = function (points, topLeft) {
        var uniques = [];
        for (var i = 0; i < points.length;) {
            var p = points[i];
            var j = i + 1;
            while (j < points.length && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["slopeAngle"])(topLeft, p) - Object(_utils__WEBPACK_IMPORTED_MODULE_1__["slopeAngle"])(topLeft, points[j]) === 0) {
                // Always keep the farthest point
                if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["distance"])(topLeft, points[j]) > Object(_utils__WEBPACK_IMPORTED_MODULE_1__["distance"])(topLeft, p)) {
                    p = points[j];
                }
                j += 1;
            }
            uniques.push(p);
            i = j;
        }
        return uniques;
    };
    Polygon.topLeft = function (points) {
        return points.reduce(function (topLeft, point) {
            if (topLeft.y < point.y) {
                return topLeft;
            }
            else if (topLeft.y == point.y) {
                return topLeft.x <= point.x ? topLeft : point;
            }
            else {
                return point;
            }
        }, { x: Number.MAX_VALUE, y: Number.MAX_VALUE });
    };
    return Polygon;
}());



/***/ }),

/***/ "./src/pose/pose.ts":
/*!**************************!*\
  !*** ./src/pose/pose.ts ***!
  \**************************/
/*! exports provided: DistanceDetectionType, DEFAULT_OPTIONS, packComponents, getFrame, constructEdges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistanceDetectionType", function() { return DistanceDetectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_OPTIONS", function() { return DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "packComponents", function() { return packComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFrame", function() { return getFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructEdges", function() { return constructEdges; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _embedder_basic_embedder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./embedder/basic-embedder */ "./src/pose/embedder/basic-embedder.ts");
/* harmony import */ var _models_polygon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/polygon */ "./src/pose/models/polygon.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/pose/utils.ts");
/* harmony import */ var _algorithms_voronoi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./algorithms/voronoi */ "./src/pose/algorithms/voronoi.ts");





var DistanceDetectionType;
(function (DistanceDetectionType) {
    DistanceDetectionType["BASIC"] = "BASIC";
    DistanceDetectionType["GRID_SQUARE"] = "GRID_SQUARE";
})(DistanceDetectionType || (DistanceDetectionType = {}));
var DEFAULT_OPTIONS = {
    type: DistanceDetectionType.BASIC,
    componentSpacing: 50,
};
/**
 * Packs regular disconnected graph components
 * @param components each component represents a connected graph in itself
 * @param options
 */
var packComponents = function (components, options) {
    if (options === void 0) { options = DEFAULT_OPTIONS; }
    if (options !== DEFAULT_OPTIONS) {
        options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_OPTIONS), options);
    }
    var embedderOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { componentSpacing: options.componentSpacing !== undefined ? options.componentSpacing : calculateIdealDistance(components) });
    // console.log(`component spacing: ${embedderOptions.componentSpacing}`);
    // console.log(`ideal distance: ${options.componentDistance}`);
    var polygons = components.map(function (c) { return componentToPolygon(c); });
    var edges = constructEdges(polygons);
    // console.log(JSON.stringify(edges));
    var polyGraph = {
        nodes: polygons,
        edges: edges,
    };
    Object(_embedder_basic_embedder__WEBPACK_IMPORTED_MODULE_1__["basicEmbed"])(polyGraph, embedderOptions);
    var shifts = polyGraph.nodes.map(function (p) {
        var base = p.base;
        return { dx: base.x, dy: base.y };
    });
    return { shifts: shifts, fullness: calculateFullness(polygons) };
};
var componentToPolygon = function (component) {
    var e_1, _a;
    var vertices = [];
    try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(component.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
            var node = _c.value;
            vertices.push({ x: node.x, y: node.y });
            vertices.push({ x: node.x + node.width, y: node.y });
            vertices.push({ x: node.x, y: node.y + node.height });
            vertices.push({ x: node.x + node.width, y: node.y + node.height });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return _models_polygon__WEBPACK_IMPORTED_MODULE_2__["Polygon"].fromPoints(vertices);
};
var getFrame = function (polygons) {
    var e_2, _a;
    var bbox = {
        minX: Number.MAX_SAFE_INTEGER,
        maxX: Number.MIN_SAFE_INTEGER,
        minY: Number.MAX_SAFE_INTEGER,
        maxY: Number.MIN_SAFE_INTEGER,
    };
    try {
        for (var polygons_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(polygons), polygons_1_1 = polygons_1.next(); !polygons_1_1.done; polygons_1_1 = polygons_1.next()) {
            var p = polygons_1_1.value;
            var pBbox = p.boundingBox;
            if (pBbox.minX < bbox.minX) {
                bbox.minX = pBbox.minX;
            }
            if (pBbox.maxX > bbox.maxX) {
                bbox.maxX = pBbox.maxX;
            }
            if (pBbox.minY < bbox.minY) {
                bbox.minY = pBbox.minY;
            }
            if (pBbox.maxY > bbox.maxY) {
                bbox.maxY = pBbox.maxY;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (polygons_1_1 && !polygons_1_1.done && (_a = polygons_1.return)) _a.call(polygons_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return bbox;
};
/**
 * Takes an array of polygons and returns which ones should be attractive to each other based on their center's voronoi diagrams
 * @param polygons
 */
var constructEdges = function (polygons) {
    var e_3, _a;
    var edges = Array.from({ length: polygons.length }, function () { return []; });
    // Bounding box of the polygons are their frame
    var bbox = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["boundingBox"])(polygons.map(function (p) { return p.boundingBox; }));
    var centers = polygons.map(function (p) { return p.center; });
    // console.log(`centers: ${JSON.stringify(centers)}`);
    var neighbors = Object(_algorithms_voronoi__WEBPACK_IMPORTED_MODULE_4__["findNeighbors"])(bbox, centers);
    for (var i = 0; i < neighbors.length; ++i) {
        try {
            // Neighbor of i-th polygon
            for (var _b = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(neighbors[i])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var neighbor = _c.value;
                // Only add bigger ones so we add only one for each
                if (neighbor > i) {
                    edges[i].push(neighbor);
                    // edges.push({ from: i, to: neighbor });                
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return edges;
};
var calculateIdealDistance = function (components) {
    var e_4, _a;
    var avgDistance = 0;
    var len = 0;
    try {
        for (var components_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
            var component = components_1_1.value;
            // Choose first edge of first node from each component
            if (component.edges.length > 0) {
                len += 1;
                var edge = component.edges[0];
                var edgeLength = Math.sqrt(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["distance"])({ x: edge.startX, y: edge.startY }, { x: edge.endX, y: edge.endY }));
                // console.log(`distance: ${edgeLength}`);
                avgDistance += edgeLength;
            }
            /* // Single components
            if (edge.length > 0) {
                len += 1;
    
                const node1 = component.nodes[0];
                const node2 = component.nodes[edge[0]];
        
                const nodeDistance = Math.sqrt(distance(node1, node2));
        
                // console.log(`distance: ${nodeDistance}`);
                
                avgDistance += nodeDistance;
            } */
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    // TODO: if all components are single 
    // console.log(avgDistance / len);
    return (avgDistance / len) * 1.5;
};
var calculateFullness = function (polygons) {
    var polygonBboxes = polygons.map(function (p) { return p.boundingBox; });
    var bbox = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["boundingBox"])(polygonBboxes);
    return (polygonBboxes.map(function (bb) { return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["area"])(bb); })
        .reduce(function (a, s) { return a + s; })
        / Object(_utils__WEBPACK_IMPORTED_MODULE_3__["area"])(bbox)) * 100;
};


/***/ }),

/***/ "./src/pose/utils.ts":
/*!***************************!*\
  !*** ./src/pose/utils.ts ***!
  \***************************/
/*! exports provided: Orientation, orientation, mod, anglePositive, inRange, negativeToAbsolute, shortestPointLineToPoint, lineToPointDistance, shortestPointLineToLine, lengthFromOrigin, length, zip, direction, clone, inspect, distance, slope, slopeAngle, area, boundingBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orientation", function() { return Orientation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orientation", function() { return orientation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anglePositive", function() { return anglePositive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inRange", function() { return inRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negativeToAbsolute", function() { return negativeToAbsolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortestPointLineToPoint", function() { return shortestPointLineToPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineToPointDistance", function() { return lineToPointDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortestPointLineToLine", function() { return shortestPointLineToLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lengthFromOrigin", function() { return lengthFromOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "direction", function() { return direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspect", function() { return inspect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slope", function() { return slope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slopeAngle", function() { return slopeAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "area", function() { return area; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundingBox", function() { return boundingBox; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Orientation;
(function (Orientation) {
    /** orientation > 0 */
    Orientation[Orientation["LEFT"] = 0] = "LEFT";
    /** orientation < 0 */
    Orientation[Orientation["RIGHT"] = 1] = "RIGHT";
    /** orientation = 0 */
    Orientation[Orientation["STRAIGHT"] = 2] = "STRAIGHT";
})(Orientation || (Orientation = {}));
/**
 * https://medium.com/@harshitsikchi/convex-hulls-explained-baab662c4e94
 * @param p
 * @param q
 * @param r
 */
var orientation = function (p, q, r) {
    var value = (q.x * r.y) - (q.y * r.x) - (p.x * r.y) + (p.x * q.y) + (p.y * r.x) - (p.y * q.x);
    if (value < 0) {
        return Orientation.LEFT;
    }
    else if (value > 0) {
        return Orientation.RIGHT;
    }
    else {
        return Orientation.STRAIGHT;
    }
};
/**
 * Return always positive remainder
 */
var mod = function (n, m) {
    return ((n % m) + m) % m;
};
/**
 * Always returns between [0, 2π]
 */
var anglePositive = function (y, x) {
    var angle = Math.atan2(y, x);
    return angle < 0 ?
        angle + (2 * Math.PI) :
        angle;
};
/**
 * Returns true if p has an orthogonal projection into l
 */
var inRange = function (p, l) {
    var dx = l.to.x - l.from.x;
    var dy = l.to.y - l.from.y;
    var innerProd = (p.x - l.from.x) * dx + (p.y - l.from.y) * dy;
    // console.log(`v.s: ${innerProd}, s.s: ${(dx * dx) + (dy * dy)}`);
    return 0 <= innerProd && innerProd <= (dx * dx) + (dy * dy);
};
/**
 * Converts -pi,pi range to 0,2pi
 */
var negativeToAbsolute = function (angle) {
    if (angle <= 0) {
        return (2 * Math.PI) + angle;
    }
    else {
        return angle;
    }
};
var shortestPointLineToPoint = function (l, p) {
    var A = p.x - l.from.x, B = p.y - l.from.y, C = l.to.x - l.from.x, D = l.to.y - l.from.y;
    var dot = A * C + B * D;
    var lenSq = C * C + D * D;
    var param = -1;
    if (lenSq !== 0) {
        param = dot / lenSq;
    }
    if (param < 0) {
        return [{ x: l.from.x, y: l.from.y }, p];
    }
    else if (param > 1) {
        return [{ x: l.to.x, y: l.to.y }, p];
    }
    else { // 0 <= param <= 1
        return [{ x: l.from.x + (param * C), y: l.from.y + (param * D) }, p];
    }
};
var lineToPointDistance = function (l, p) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(shortestPointLineToPoint(l, p), 2), p1 = _a[0], p2 = _a[1];
    return distance(p1, p2);
};
var shortestPointLineToLine = function (l1, l2) {
    var e_1, _a;
    var shortestPairs = [
        shortestPointLineToPoint(l1, l2.from),
        shortestPointLineToPoint(l1, l2.to),
        shortestPointLineToPoint(l2, l1.from),
        shortestPointLineToPoint(l2, l1.to),
    ];
    var minPair = shortestPairs[0];
    try {
        for (var shortestPairs_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(shortestPairs), shortestPairs_1_1 = shortestPairs_1.next(); !shortestPairs_1_1.done; shortestPairs_1_1 = shortestPairs_1.next()) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(shortestPairs_1_1.value, 2), p = _b[0], q = _b[1];
            if (distance(p, q) < distance(minPair[0], minPair[1])) {
                minPair = [p, q];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (shortestPairs_1_1 && !shortestPairs_1_1.done && (_a = shortestPairs_1.return)) _a.call(shortestPairs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return minPair;
};
/**
 * Returns the squared length from origin
 */
var lengthFromOrigin = function (p) {
    return (p.x * p.x) + (p.y * p.y);
};
/**
 * Squared length
 */
var length = function (l) {
    var dx = l.to.x - l.from.x;
    var dy = l.to.y - l.from.y;
    return (dx * dx) + (dy * dy);
};
/**
 * Combines two array elements as pairs \
 * **Example:** zip([a, b, c], [1, 2, 3]) = [ [ a, 1 ], [ b, 2 ], [ c, 3 ] ]
 */
var zip = function (arr1, arr2) {
    return arr1.map(function (v, i) { return [v, arr2[i]]; });
};
var direction = function (l) {
    var len = Math.sqrt(length(l));
    return {
        x: (l.to.x - l.from.x) / len,
        y: (l.to.y - l.from.y) / len,
    };
};
/**
 * Performs a deep copy on an object,
 * @param object object to be copied. Must not be recursive
 */
var clone = function (object) {
    return JSON.parse(JSON.stringify(object));
};
/**
 * Do something with array without mutating
 * Useful for debug purposes
 */
var inspect = function (arr, action) {
    var e_2, _a;
    try {
        for (var arr_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var item = arr_1_1.value;
            action(item);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return arr;
};
var distance = function (p0, p1) {
    var width = p0.x - p1.x;
    var height = p0.y - p1.y;
    return Math.pow(width, 2) + Math.pow(height, 2);
};
var slope = function (line) {
    var height = line.to.y - line.from.y;
    var width = line.to.x - line.from.x;
    return height / width;
};
/**
 * @param from
 * @param to
 */
var slopeAngle = function (from, to) {
    var height = to.y - from.y;
    var width = to.x - from.x;
    return Math.atan2(height, width);
};
var area = function (rect) {
    return Math.abs((rect.maxX - rect.minX) * (rect.maxY - rect.minY));
};
var boundingBox = function (rects) {
    return rects.reduce(function (bbox, current) { return ({
        minX: Math.min(bbox.minX, current.minX),
        maxX: Math.max(bbox.maxX, current.maxX),
        minY: Math.min(bbox.minY, current.minY),
        maxY: Math.max(bbox.maxY, current.maxY),
    }); }, {
        minX: Number.MAX_SAFE_INTEGER,
        maxX: Number.MIN_SAFE_INTEGER,
        minY: Number.MAX_SAFE_INTEGER,
        maxY: Number.MIN_SAFE_INTEGER,
    });
};


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3NlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9wb3NlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bvc2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvaGVscGVycy9tYWluLmVzLmpzIiwid2VicGFjazovL3Bvc2UvLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2RlbGF1bmF5LmpzIiwid2VicGFjazovL3Bvc2UvLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Bvc2UvLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BhdGguanMiLCJ3ZWJwYWNrOi8vcG9zZS8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcG9seWdvbi5qcyIsIndlYnBhY2s6Ly9wb3NlLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovL3Bvc2UvLi9ub2RlX21vZHVsZXMvZGVsYXVuYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9wb3NlLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvYWxnb3JpdGhtcy9jb252ZXgtcG9seWdvbi1kaXN0YW5jZS50cyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvYWxnb3JpdGhtcy9jb252ZXgtcG9seWdvbi1pbnRlcnNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcG9zZS8uL3NyYy9wb3NlL2FsZ29yaXRobXMvbWlua293c2tpLXN1bS50cyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvYWxnb3JpdGhtcy92b3Jvbm9pLnRzIiwid2VicGFjazovL3Bvc2UvLi9zcmMvcG9zZS9lbWJlZGRlci9iYXNpYy1lbWJlZGRlci50cyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvaGVscGVycy90dXJmLnRzIiwid2VicGFjazovL3Bvc2UvLi9zcmMvcG9zZS9tb2RlbHMvY29tbW9uLnRzIiwid2VicGFjazovL3Bvc2UvLi9zcmMvcG9zZS9tb2RlbHMvcG9seWdvbi50cyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvcG9zZS50cyIsIndlYnBhY2s6Ly9wb3NlLy4vc3JjL3Bvc2UvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZUFBZSxlQUFlLGNBQWM7QUFDaEU7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU8sZUFBZTtBQUNqQyxXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCwrREFBK0Q7QUFDL0QseURBQXlEO0FBQ3pELCtEQUErRDtBQUMvRCx5RUFBeUU7QUFDekUsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFlBQVksRUFBRSxjQUFjO0FBQzFDO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPLGVBQWU7QUFDakMsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsY0FBYyxZQUFZLEVBQUUsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLE9BQU8sZUFBZTtBQUNqQyxXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsY0FBYyxjQUFjLEVBQUUsY0FBYztBQUM1QztBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkMsV0FBVyxPQUFPLGVBQWU7QUFDakMsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixhQUFhLGlCQUFpQjtBQUM5QjtBQUNBLHFGQUFxRixnQkFBZ0I7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtDQUFrQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxjQUFjLGNBQWMsRUFBRSx3QkFBd0I7QUFDdEQ7QUFDQTtBQUNBLFdBQVcsbUNBQW1DO0FBQzlDLFdBQVcsT0FBTyxlQUFlO0FBQ2pDLFdBQVcsT0FBTyxZQUFZO0FBQzlCLFdBQVcsY0FBYztBQUN6QixXQUFXLGNBQWM7QUFDekIsYUFBYSwyQkFBMkI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsY0FBYyxpQkFBaUIsRUFBRSxjQUFjO0FBQy9DO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLE9BQU8sZUFBZTtBQUNqQyxXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0Esb0ZBQW9GLGVBQWU7QUFDbkcsb0ZBQW9GLGVBQWU7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGNBQWMsaUJBQWlCLEVBQUUsd0JBQXdCO0FBQ3pEO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLE9BQU8sZUFBZTtBQUNqQyxXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsOEJBQThCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLHNCQUFzQix1QkFBdUIsZ0JBQWdCLHdCQUF3QjtBQUNyRjtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTyxZQUFZO0FBQzlCLFdBQVcsY0FBYztBQUN6QixXQUFXLGNBQWM7QUFDekIsYUFBYSxrQkFBa0I7QUFDL0I7QUFDQSxrREFBa0QsbUJBQW1CO0FBQ3JFLGtEQUFrRCxtQkFBbUI7QUFDckUsa0RBQWtELG1CQUFtQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYywrQkFBK0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkMsV0FBVyxPQUFPLGVBQWU7QUFDakMsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixhQUFhLHlCQUF5QjtBQUN0QyxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsY0FBYywwQkFBMEI7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsV0FBVyxPQUFPLGVBQWU7QUFDakMsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixhQUFhLG9CQUFvQjtBQUNqQyxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQ0FBbUM7QUFDOUMsV0FBVyxPQUFPLGVBQWU7QUFDakMsV0FBVyxPQUFPLFlBQVk7QUFDOUIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsY0FBYztBQUN6QixhQUFhLHNCQUFzQjtBQUNuQyxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxjQUFjLGtDQUFrQztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQixXQUFXLE9BQU8sZUFBZTtBQUNqQyxXQUFXLE9BQU8sWUFBWTtBQUM5QixXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCLGFBQWEsNEJBQTRCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFaWhCOzs7Ozs7Ozs7Ozs7O0FDOXVCamhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNQO0FBQ007QUFDQTs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxrQkFBa0I7QUFDM0IsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLHdCQUF3QjtBQUNoRSxnR0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0RBQVU7QUFDdkMsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtREFBTztBQUN0QjtBQUNBO0FBQ0EsV0FBVywyREFBMkQ7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHdEQUF3RDtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnREFBSTtBQUN2RCxXQUFXLDZCQUE2QjtBQUN4Qyx5Q0FBeUMsT0FBTztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdEQUFJO0FBQ3ZELFdBQVcsT0FBTztBQUNsQixzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnREFBSTtBQUN2RCxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdEQUFJO0FBQ3ZELFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDblBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7QUNEaEQ7QUFBQTtBQUFBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCLEdBQUcseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYyxHQUFHLGNBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLEdBQUcsR0FBRyxHQUFHO0FBQ2xEO0FBQ0E7QUFDQSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsY0FBYyxHQUFHLGNBQWM7QUFDL0Y7QUFDQTtBQUNBLGtCQUFrQix5QkFBeUIsR0FBRyx5QkFBeUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUNNOztBQUVwQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsV0FBVyx3QkFBd0IsVUFBVTs7QUFFeEQ7QUFDQTtBQUNBLHNEQUFzRCxPQUFPO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdEQUFJO0FBQ3ZELFdBQVcsV0FBVyx5QkFBeUIseUJBQXlCO0FBQ3hFO0FBQ0EseUNBQXlDLE9BQU87QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnREFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnREFBSTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVcsUUFBUTtBQUM5QiwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0Qsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDBCQUEwQiwrQkFBK0I7QUFDcEU7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE9BQU87QUFDdkY7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsVUFBVTtBQUMzQywrREFBK0QsT0FBTztBQUN0RSxpQ0FBaUMsVUFBVTtBQUMzQywrREFBK0QsT0FBTztBQUN0RSxpQ0FBaUMsVUFBVTtBQUMzQywrREFBK0QsT0FBTztBQUN0RSxpQ0FBaUMsVUFBVTtBQUMzQywrREFBK0QsT0FBTztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSyxtQkFBbUI7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLLG1CQUFtQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5VEE7QUFDQTs7QUFFZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QztBQUM1Qyw0Q0FBNEM7QUFDNUMsMkNBQTJDO0FBQzNDLGlFQUFpRTs7QUFFakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHlGQUF5RjtBQUN4Rzs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0Isc0JBQXNCO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Qsb0JBQW9CO0FBQzFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0NBQWtDOztBQUVyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUscURBQXFEOztBQUVwRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixZQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5ZUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTs7QUFFTztBQUNQO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBOztBQUVPO0FBQ1A7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGNBQWM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUTtBQUNwRDtBQUNBOztBQUVPO0FBQ1AsbUNBQW1DLG9DQUFvQztBQUN2RTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUCwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1AsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVPO0FBQ1AsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRU87QUFDUCxpREFBaUQsUUFBUTtBQUN6RCx3Q0FBd0MsUUFBUTtBQUNoRCx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLGlCQUFpQixzRkFBc0YsYUFBYSxFQUFFO0FBQ3RILHNCQUFzQixnQ0FBZ0MscUNBQXFDLDBDQUEwQyxFQUFFLEVBQUUsR0FBRztBQUM1SSwyQkFBMkIsTUFBTSxlQUFlLEVBQUUsWUFBWSxvQkFBb0IsRUFBRTtBQUNwRixzQkFBc0Isb0dBQW9HO0FBQzFILDZCQUE2Qix1QkFBdUI7QUFDcEQsNEJBQTRCLHdCQUF3QjtBQUNwRCwyQkFBMkIseURBQXlEO0FBQ3BGOztBQUVPO0FBQ1A7QUFDQSxpQkFBaUIsNENBQTRDLFNBQVMsRUFBRSxxREFBcUQsYUFBYSxFQUFFO0FBQzVJLHlCQUF5Qiw2QkFBNkIsb0JBQW9CLGdEQUFnRCxnQkFBZ0IsRUFBRSxLQUFLO0FBQ2pKOztBQUVPO0FBQ1A7QUFDQTtBQUNBLDJHQUEyRyxzRkFBc0YsYUFBYSxFQUFFO0FBQ2hOLHNCQUFzQiw4QkFBOEIsZ0RBQWdELHVEQUF1RCxFQUFFLEVBQUUsR0FBRztBQUNsSyw0Q0FBNEMsc0NBQXNDLFVBQVUsb0JBQW9CLEVBQUUsRUFBRSxVQUFVO0FBQzlIOztBQUVPO0FBQ1AsZ0NBQWdDLHVDQUF1QyxhQUFhLEVBQUUsRUFBRSxPQUFPLGtCQUFrQjtBQUNqSDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsNENBQTRDO0FBQzVDOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUUwQjtBQUNqQjtBQUVyRCxJQUFZLDJCQUlYO0FBSkQsV0FBWSwyQkFBMkI7SUFDbkMseUZBQVU7SUFDVixpRkFBTTtJQUNOLDJGQUFXLEVBQUMsT0FBTztBQUN2QixDQUFDLEVBSlcsMkJBQTJCLEtBQTNCLDJCQUEyQixRQUl0QztBQUVEOztHQUVHO0FBQ0ksSUFBTSxxQkFBcUIsR0FBRyxVQUFDLENBQVUsRUFBRSxDQUFVLEVBQUUsUUFBOEU7SUFBOUUsc0NBQXdDLDJCQUEyQixDQUFDLFVBQVU7SUFLeEksSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRTFCLFFBQVEsUUFBUSxFQUFFO1FBQ2QsS0FBSywyQkFBMkIsQ0FBQyxVQUFVO1lBQ3ZDLElBQU0sSUFBSSxHQUFHLHlFQUFrQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV6Qyx5REFBeUQ7WUFFekQsNkNBQTZDO1lBQzdDLElBQU0sTUFBSSxHQUFHLHVEQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRDLElBQU0sdUJBQXVCLEdBQUcsTUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDakQsSUFBTSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBRW5ELElBQU0sY0FBYyxHQUFHLHVFQUF3QixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLElBQU0sUUFBUSxHQUFHLCtEQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxJQUFNLFVBQVUsR0FBRztvQkFDZixDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZO29CQUM3RCxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZO2lCQUNoRSxDQUFDO2dCQUVGLE9BQU8sRUFBRSxRQUFRLFlBQUUsVUFBVSxjQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLHVCQUF1QjtpQkFDekIsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksSUFBSyxXQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7UUFDMUU7WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGNBQVksUUFBUSw2QkFBMEIsQ0FBQyxDQUFDO0tBQ3ZFO0FBQ0wsQ0FBQztBQUVNLElBQU0sS0FBSyxHQUFHLFVBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3hELElBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU3QixJQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLElBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVsRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFckQsT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFJLFFBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3RELENBQUM7QUFFRDs7R0FFRztBQUNJLElBQU0sU0FBUyxHQUFHLFVBQUMsQ0FBUSxFQUFFLENBQVM7SUFDekMsUUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFEeEMsQ0FDd0MsQ0FBQztBQUV0QyxJQUFNLEtBQUssR0FBRyxVQUFDLENBQVEsRUFBRSxDQUFTLElBQUssZ0JBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFuQixD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QUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDMUMsQ0FBQyxFQUxxQyxDQUtyQyxFQUFFO1FBQ0EsSUFBSSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7S0FDaEMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsImZpbGUiOiJwb3NlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicG9zZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwb3NlXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wb3NlL3Bvc2UudHNcIik7XG4iLCIvKipcbiAqIEVhcnRoIFJhZGl1cyB1c2VkIHdpdGggdGhlIEhhcnZlc2luZSBmb3JtdWxhIGFuZCBhcHByb3hpbWF0ZXMgdXNpbmcgYSBzcGhlcmljYWwgKG5vbi1lbGxpcHNvaWQpIEVhcnRoLlxuICovXG52YXIgZWFydGhSYWRpdXMgPSA2MzcxMDA4Ljg7XG5cbi8qKlxuICogVW5pdCBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBlYXJ0aCByYWRpdXMuXG4gKi9cbnZhciBmYWN0b3JzID0ge1xuICAgIG1ldGVyczogZWFydGhSYWRpdXMsXG4gICAgbWV0cmVzOiBlYXJ0aFJhZGl1cyxcbiAgICBtaWxsaW1ldGVyczogZWFydGhSYWRpdXMgKiAxMDAwLFxuICAgIG1pbGxpbWV0cmVzOiBlYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgY2VudGltZXRlcnM6IGVhcnRoUmFkaXVzICogMTAwLFxuICAgIGNlbnRpbWV0cmVzOiBlYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBraWxvbWV0ZXJzOiBlYXJ0aFJhZGl1cyAvIDEwMDAsXG4gICAga2lsb21ldHJlczogZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIG1pbGVzOiBlYXJ0aFJhZGl1cyAvIDE2MDkuMzQ0LFxuICAgIG5hdXRpY2FsbWlsZXM6IGVhcnRoUmFkaXVzIC8gMTg1MixcbiAgICBpbmNoZXM6IGVhcnRoUmFkaXVzICogMzkuMzcwLFxuICAgIHlhcmRzOiBlYXJ0aFJhZGl1cyAvIDEuMDkzNixcbiAgICBmZWV0OiBlYXJ0aFJhZGl1cyAqIDMuMjgwODQsXG4gICAgcmFkaWFuczogMSxcbiAgICBkZWdyZWVzOiBlYXJ0aFJhZGl1cyAvIDExMTMyNSxcbn07XG5cbi8qKlxuICogVW5pdHMgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyBiYXNlZCBvbiAxIG1ldGVyLlxuICovXG52YXIgdW5pdHNGYWN0b3JzID0ge1xuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAsXG4gICAgY2VudGltZXRlcnM6IDEwMCxcbiAgICBjZW50aW1ldHJlczogMTAwLFxuICAgIGtpbG9tZXRlcnM6IDEgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IDEgLyAxMDAwLFxuICAgIG1pbGVzOiAxIC8gMTYwOS4zNDQsXG4gICAgbmF1dGljYWxtaWxlczogMSAvIDE4NTIsXG4gICAgaW5jaGVzOiAzOS4zNzAsXG4gICAgeWFyZHM6IDEgLyAxLjA5MzYsXG4gICAgZmVldDogMy4yODA4NCxcbiAgICByYWRpYW5zOiAxIC8gZWFydGhSYWRpdXMsXG4gICAgZGVncmVlczogMSAvIDExMTMyNSxcbn07XG5cbi8qKlxuICogQXJlYSBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgc3F1YXJlIG1ldGVyLlxuICovXG52YXIgYXJlYUZhY3RvcnMgPSB7XG4gICAgbWV0ZXJzOiAxLFxuICAgIG1ldHJlczogMSxcbiAgICBtaWxsaW1ldGVyczogMTAwMDAwMCxcbiAgICBtaWxsaW1ldHJlczogMTAwMDAwMCxcbiAgICBjZW50aW1ldGVyczogMTAwMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMDAwLFxuICAgIGtpbG9tZXRlcnM6IDAuMDAwMDAxLFxuICAgIGtpbG9tZXRyZXM6IDAuMDAwMDAxLFxuICAgIGFjcmVzOiAwLjAwMDI0NzEwNSxcbiAgICBtaWxlczogMy44NmUtNyxcbiAgICB5YXJkczogMS4xOTU5OTAwNDYsXG4gICAgZmVldDogMTAuNzYzOTEwNDE3LFxuICAgIGluY2hlczogMTU1MC4wMDMxMDAwMDZcbn07XG5cbi8qKlxuICogV3JhcHMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gaW4gYSBHZW9KU09OIHtAbGluayBGZWF0dXJlfS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeSBpbnB1dCBnZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlfSBhIEdlb0pTT04gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBnZW9tZXRyeSA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA1MF1cbiAqIH07XG4gKlxuICogdmFyIGZlYXR1cmUgPSB0dXJmLmZlYXR1cmUoZ2VvbWV0cnkpO1xuICpcbiAqIC8vPWZlYXR1cmVcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZShnZW9tZXRyeSwgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIWlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMgaXMgaW52YWxpZCcpO1xuICAgIHZhciBiYm94ID0gb3B0aW9ucy5iYm94O1xuICAgIHZhciBpZCA9IG9wdGlvbnMuaWQ7XG5cbiAgICAvLyBWYWxpZGF0aW9uXG4gICAgaWYgKGdlb21ldHJ5ID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignZ2VvbWV0cnkgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHRocm93IG5ldyBFcnJvcigncHJvcGVydGllcyBtdXN0IGJlIGFuIE9iamVjdCcpO1xuICAgIGlmIChiYm94KSB2YWxpZGF0ZUJCb3goYmJveCk7XG4gICAgaWYgKGlkKSB2YWxpZGF0ZUlkKGlkKTtcblxuICAgIC8vIE1haW5cbiAgICB2YXIgZmVhdCA9IHt0eXBlOiAnRmVhdHVyZSd9O1xuICAgIGlmIChpZCkgZmVhdC5pZCA9IGlkO1xuICAgIGlmIChiYm94KSBmZWF0LmJib3ggPSBiYm94O1xuICAgIGZlYXQucHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgZmVhdC5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgIHJldHVybiBmZWF0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gZnJvbSBhIEdlb21ldHJ5IHN0cmluZyB0eXBlICYgY29vcmRpbmF0ZXMuXG4gKiBGb3IgR2VvbWV0cnlDb2xsZWN0aW9uIHR5cGUgdXNlIGBoZWxwZXJzLmdlb21ldHJ5Q29sbGVjdGlvbmBcbiAqXG4gKiBAbmFtZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgR2VvbWV0cnkgVHlwZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZGluYXRlcyBDb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEdlb21ldHJ5XG4gKiBAcmV0dXJucyB7R2VvbWV0cnl9IGEgR2VvSlNPTiBHZW9tZXRyeVxuICogQGV4YW1wbGVcbiAqIHZhciB0eXBlID0gJ1BvaW50JztcbiAqIHZhciBjb29yZGluYXRlcyA9IFsxMTAsIDUwXTtcbiAqXG4gKiB2YXIgZ2VvbWV0cnkgPSB0dXJmLmdlb21ldHJ5KHR5cGUsIGNvb3JkaW5hdGVzKTtcbiAqXG4gKiAvLz1nZW9tZXRyeVxuICovXG5mdW5jdGlvbiBnZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcywgb3B0aW9ucykge1xuICAgIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIWlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoJ29wdGlvbnMgaXMgaW52YWxpZCcpO1xuICAgIHZhciBiYm94ID0gb3B0aW9ucy5iYm94O1xuXG4gICAgLy8gVmFsaWRhdGlvblxuICAgIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKCd0eXBlIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKCFjb29yZGluYXRlcykgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBpcyByZXF1aXJlZCcpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZGluYXRlcykpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBBcnJheScpO1xuICAgIGlmIChiYm94KSB2YWxpZGF0ZUJCb3goYmJveCk7XG5cbiAgICAvLyBNYWluXG4gICAgdmFyIGdlb207XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOiBnZW9tID0gcG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5OyBicmVhaztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzogZ2VvbSA9IGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpLmdlb21ldHJ5OyBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzogZ2VvbSA9IHBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5OyBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzogZ2VvbSA9IG11bHRpUG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5OyBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOiBnZW9tID0gbXVsdGlMaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTsgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzogZ2VvbSA9IG11bHRpUG9seWdvbihjb29yZGluYXRlcykuZ2VvbWV0cnk7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcih0eXBlICsgJyBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICAgIGlmIChiYm94KSBnZW9tLmJib3ggPSBiYm94O1xuICAgIHJldHVybiBnZW9tO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9pbnR9IHtAbGluayBGZWF0dXJlfSBmcm9tIGEgUG9zaXRpb24uXG4gKlxuICogQG5hbWUgcG9pbnRcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29vcmRpbmF0ZXMgbG9uZ2l0dWRlLCBsYXRpdHVkZSBwb3NpdGlvbiAoZWFjaCBpbiBkZWNpbWFsIGRlZ3JlZXMpXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9pbnQ+fSBhIFBvaW50IGZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB0dXJmLnBvaW50KFstNzUuMzQzLCAzOS45ODRdKTtcbiAqXG4gKiAvLz1wb2ludFxuICovXG5mdW5jdGlvbiBwb2ludChjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmICghY29vcmRpbmF0ZXMpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXknKTtcbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBtdXN0IGJlIGF0IGxlYXN0IDIgbnVtYmVycyBsb25nJyk7XG4gICAgaWYgKCFpc051bWJlcihjb29yZGluYXRlc1swXSkgfHwgIWlzTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBtdXN0IGNvbnRhaW4gbnVtYmVycycpO1xuXG4gICAgcmV0dXJuIGZlYXR1cmUoe1xuICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXNcbiAgICB9LCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9pbnQgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgcG9pbnRzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gVHJhbnNsYXRlIHRoZXNlIHByb3BlcnRpZXMgdG8gZWFjaCBGZWF0dXJlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvaW50Pn0gUG9pbnQgRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludHMgPSB0dXJmLnBvaW50cyhbXG4gKiAgIFstNzUsIDM5XSxcbiAqICAgWy04MCwgNDVdLFxuICogICBbLTc4LCA1MF1cbiAqIF0pO1xuICpcbiAqIC8vPXBvaW50c1xuICovXG5mdW5jdGlvbiBwb2ludHMoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvb3JkaW5hdGVzKSkgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBtdXN0IGJlIGFuIEFycmF5Jyk7XG5cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9seWdvbn0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgTGluZWFyUmluZ3MuXG4gKlxuICogQG5hbWUgcG9seWdvblxuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9seWdvbj59IFBvbHlnb24gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sIHsgbmFtZTogJ3BvbHkxJyB9KTtcbiAqXG4gKiAvLz1wb2x5Z29uXG4gKi9cbmZ1bmN0aW9uIHBvbHlnb24oY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIGlzIHJlcXVpcmVkJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByaW5nID0gY29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWFjaCBMaW5lYXJSaW5nIG9mIGEgUG9seWdvbiBtdXN0IGhhdmUgNCBvciBtb3JlIFBvc2l0aW9ucy4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJpbmdbcmluZy5sZW5ndGggLSAxXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZmlyc3QgcG9pbnQgb2YgUG9seWdvbiBjb250YWlucyB0d28gbnVtYmVyc1xuICAgICAgICAgICAgaWYgKGkgPT09IDAgJiYgaiA9PT0gMCAmJiAhaXNOdW1iZXIocmluZ1swXVswXSkgfHwgIWlzTnVtYmVyKHJpbmdbMF1bMV0pKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgY29udGFpbiBudW1iZXJzJyk7XG4gICAgICAgICAgICBpZiAocmluZ1tyaW5nLmxlbmd0aCAtIDFdW2pdICE9PSByaW5nWzBdW2pdKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhbmQgbGFzdCBQb3NpdGlvbiBhcmUgbm90IGVxdWl2YWxlbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmVhdHVyZSh7XG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzXG4gICAgfSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9seWdvbiBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlQ29sbGVjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29ucyA9IHR1cmYucG9seWdvbnMoW1xuICogICBbW1stNSwgNTJdLCBbLTQsIDU2XSwgWy0yLCA1MV0sIFstNywgNTRdLCBbLTUsIDUyXV1dLFxuICogICBbW1stMTUsIDQyXSwgWy0xNCwgNDZdLCBbLTEyLCA0MV0sIFstMTcsIDQ0XSwgWy0xNSwgNDJdXV0sXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2x5Z29uc1xuICovXG5mdW5jdGlvbiBwb2x5Z29ucyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmICghY29vcmRpbmF0ZXMpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXknKTtcblxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gcG9seWdvbihjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlfSBmcm9tIGFuIEFycmF5IG9mIFBvc2l0aW9ucy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gTGluZVN0cmluZyBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmcxID0gdHVyZi5saW5lU3RyaW5nKFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLCB7bmFtZTogJ2xpbmUgMSd9KTtcbiAqIHZhciBsaW5lc3RyaW5nMiA9IHR1cmYubGluZVN0cmluZyhbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXSwge25hbWU6ICdsaW5lIDInfSk7XG4gKlxuICogLy89bGluZXN0cmluZzFcbiAqIC8vPWxpbmVzdHJpbmcyXG4gKi9cbmZ1bmN0aW9uIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBhcnJheSBvZiB0d28gb3IgbW9yZSBwb3NpdGlvbnMnKTtcbiAgICAvLyBDaGVjayBpZiBmaXJzdCBwb2ludCBvZiBMaW5lU3RyaW5nIGNvbnRhaW5zIHR3byBudW1iZXJzXG4gICAgaWYgKCFpc051bWJlcihjb29yZGluYXRlc1swXVsxXSkgfHwgIWlzTnVtYmVyKGNvb3JkaW5hdGVzWzBdWzFdKSkgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBtdXN0IGNvbnRhaW4gbnVtYmVycycpO1xuXG4gICAgcmV0dXJuIGZlYXR1cmUoe1xuICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlc1xuICAgIH0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgTGluZVN0cmluZ30ge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBmcm9tIGFuIEFycmF5IG9mIExpbmVTdHJpbmcgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgbGluZVN0cmluZ3NcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248TGluZVN0cmluZz59IExpbmVTdHJpbmcgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZXN0cmluZ3MgPSB0dXJmLmxpbmVTdHJpbmdzKFtcbiAqICAgW1stMjQsIDYzXSwgWy0yMywgNjBdLCBbLTI1LCA2NV0sIFstMjAsIDY5XV0sXG4gKiAgIFtbLTE0LCA0M10sIFstMTMsIDQwXSwgWy0xNSwgNDVdLCBbLTEwLCA0OV1dXG4gKiBdKTtcbiAqXG4gKiAvLz1saW5lc3RyaW5nc1xuICovXG5mdW5jdGlvbiBsaW5lU3RyaW5ncyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmICghY29vcmRpbmF0ZXMpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB0aHJvdyBuZXcgRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXknKTtcblxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBUYWtlcyBvbmUgb3IgbW9yZSB7QGxpbmsgRmVhdHVyZXxGZWF0dXJlc30gYW5kIGNyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259LlxuICpcbiAqIEBuYW1lIGZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0ZlYXR1cmVbXX0gZmVhdHVyZXMgaW5wdXQgZmVhdHVyZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9ufSBGZWF0dXJlQ29sbGVjdGlvbiBvZiBGZWF0dXJlc1xuICogQGV4YW1wbGVcbiAqIHZhciBsb2NhdGlvbkEgPSB0dXJmLnBvaW50KFstNzUuMzQzLCAzOS45ODRdLCB7bmFtZTogJ0xvY2F0aW9uIEEnfSk7XG4gKiB2YXIgbG9jYXRpb25CID0gdHVyZi5wb2ludChbLTc1LjgzMywgMzkuMjg0XSwge25hbWU6ICdMb2NhdGlvbiBCJ30pO1xuICogdmFyIGxvY2F0aW9uQyA9IHR1cmYucG9pbnQoWy03NS41MzQsIDM5LjEyM10sIHtuYW1lOiAnTG9jYXRpb24gQyd9KTtcbiAqXG4gKiB2YXIgY29sbGVjdGlvbiA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICBsb2NhdGlvbkEsXG4gKiAgIGxvY2F0aW9uQixcbiAqICAgbG9jYXRpb25DXG4gKiBdKTtcbiAqXG4gKiAvLz1jb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzLCBvcHRpb25zKSB7XG4gICAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICghaXNPYmplY3Qob3B0aW9ucykpIHRocm93IG5ldyBFcnJvcignb3B0aW9ucyBpcyBpbnZhbGlkJyk7XG4gICAgdmFyIGJib3ggPSBvcHRpb25zLmJib3g7XG4gICAgdmFyIGlkID0gb3B0aW9ucy5pZDtcblxuICAgIC8vIFZhbGlkYXRpb25cbiAgICBpZiAoIWZlYXR1cmVzKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGZlYXR1cmVzIHBhc3NlZCcpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShmZWF0dXJlcykpIHRocm93IG5ldyBFcnJvcignZmVhdHVyZXMgbXVzdCBiZSBhbiBBcnJheScpO1xuICAgIGlmIChiYm94KSB2YWxpZGF0ZUJCb3goYmJveCk7XG4gICAgaWYgKGlkKSB2YWxpZGF0ZUlkKGlkKTtcblxuICAgIC8vIE1haW5cbiAgICB2YXIgZmMgPSB7dHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJ307XG4gICAgaWYgKGlkKSBmYy5pZCA9IGlkO1xuICAgIGlmIChiYm94KSBmYy5iYm94ID0gYmJveDtcbiAgICBmYy5mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICAgIHJldHVybiBmYztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlMaW5lU3RyaW5nPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aUxpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBMaW5lU3RyaW5nc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPE11bHRpTGluZVN0cmluZz59IGEgTXVsdGlMaW5lU3RyaW5nIGZlYXR1cmVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBubyBjb29yZGluYXRlcyBhcmUgcGFzc2VkXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtbWzAsMF0sWzEwLDEwXV1dKTtcbiAqXG4gKiAvLz1tdWx0aUxpbmVcbiAqL1xuZnVuY3Rpb24gbXVsdGlMaW5lU3RyaW5nKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb29yZGluYXRlcykgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBpcyByZXF1aXJlZCcpO1xuXG4gICAgcmV0dXJuIGZlYXR1cmUoe1xuICAgICAgICB0eXBlOiAnTXVsdGlMaW5lU3RyaW5nJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzXG4gICAgfSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpUG9pbnQ+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpUG9pbnRcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvc2l0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPE11bHRpUG9pbnQ+fSBhIE11bHRpUG9pbnQgZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQdCA9IHR1cmYubXVsdGlQb2ludChbWzAsMF0sWzEwLDEwXV0pO1xuICpcbiAqIC8vPW11bHRpUHRcbiAqL1xuZnVuY3Rpb24gbXVsdGlQb2ludChjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmICghY29vcmRpbmF0ZXMpIHRocm93IG5ldyBFcnJvcignY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWQnKTtcblxuICAgIHJldHVybiBmZWF0dXJlKHtcbiAgICAgICAgdHlwZTogJ011bHRpUG9pbnQnLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXNcbiAgICB9LCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aVBvbHlnb25cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9seWdvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aVBvbHlnb24+fSBhIG11bHRpcG9seWdvbiBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVBvbHkgPSB0dXJmLm11bHRpUG9seWdvbihbW1tbMCwwXSxbMCwxMF0sWzEwLDEwXSxbMTAsMF0sWzAsMF1dXV0pO1xuICpcbiAqIC8vPW11bHRpUG9seVxuICpcbiAqL1xuZnVuY3Rpb24gbXVsdGlQb2x5Z29uKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb29yZGluYXRlcykgdGhyb3cgbmV3IEVycm9yKCdjb29yZGluYXRlcyBpcyByZXF1aXJlZCcpO1xuXG4gICAgcmV0dXJuIGZlYXR1cmUoe1xuICAgICAgICB0eXBlOiAnTXVsdGlQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzXG4gICAgfSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPEdlb21ldHJ5Q29sbGVjdGlvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgZ2VvbWV0cnlDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PEdlb21ldHJ5Pn0gZ2VvbWV0cmllcyBhbiBhcnJheSBvZiBHZW9KU09OIEdlb21ldHJpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBhIEdlb0pTT04gR2VvbWV0cnlDb2xsZWN0aW9uIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcHQgPSB7XG4gKiAgICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgICAgIFwiY29vcmRpbmF0ZXNcIjogWzEwMCwgMF1cbiAqICAgICB9O1xuICogdmFyIGxpbmUgPSB7XG4gKiAgICAgXCJ0eXBlXCI6IFwiTGluZVN0cmluZ1wiLFxuICogICAgIFwiY29vcmRpbmF0ZXNcIjogWyBbMTAxLCAwXSwgWzEwMiwgMV0gXVxuICogICB9O1xuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmdlb21ldHJ5Q29sbGVjdGlvbihbcHQsIGxpbmVdKTtcbiAqXG4gKiAvLz1jb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdlb21ldHJ5Q29sbGVjdGlvbihnZW9tZXRyaWVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnZW9tZXRyaWVzKSB0aHJvdyBuZXcgRXJyb3IoJ2dlb21ldHJpZXMgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZ2VvbWV0cmllcykpIHRocm93IG5ldyBFcnJvcignZ2VvbWV0cmllcyBtdXN0IGJlIGFuIEFycmF5Jyk7XG5cbiAgICByZXR1cm4gZmVhdHVyZSh7XG4gICAgICAgIHR5cGU6ICdHZW9tZXRyeUNvbGxlY3Rpb24nLFxuICAgICAgICBnZW9tZXRyaWVzOiBnZW9tZXRyaWVzXG4gICAgfSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogUm91bmQgbnVtYmVyIHRvIHByZWNpc2lvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gTnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gW3ByZWNpc2lvbj0wXSBQcmVjaXNpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKiBAZXhhbXBsZVxuICogdHVyZi5yb3VuZCgxMjAuNDMyMSlcbiAqIC8vPTEyMFxuICpcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEsIDIpXG4gKiAvLz0xMjAuNDNcbiAqL1xuZnVuY3Rpb24gcm91bmQobnVtLCBwcmVjaXNpb24pIHtcbiAgICBpZiAobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSBudWxsIHx8IGlzTmFOKG51bSkpIHRocm93IG5ldyBFcnJvcignbnVtIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKHByZWNpc2lvbiAmJiAhKHByZWNpc2lvbiA+PSAwKSkgdGhyb3cgbmV3IEVycm9yKCdwcmVjaXNpb24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICAgIHZhciBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XG59XG5cbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSByYWRpYW5zIHRvIGEgbW9yZSBmcmllbmRseSB1bml0LlxuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAbmFtZSByYWRpYW5zVG9MZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zIGluIHJhZGlhbnMgYWNyb3NzIHRoZSBzcGhlcmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9J2tpbG9tZXRlcnMnXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIG9yIGtpbG9tZXRlcnMgaW5jaGVzLCB5YXJkcywgbWV0cmVzLCBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiByYWRpYW5zVG9MZW5ndGgocmFkaWFucywgdW5pdHMpIHtcbiAgICBpZiAocmFkaWFucyA9PT0gdW5kZWZpbmVkIHx8IHJhZGlhbnMgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcigncmFkaWFucyBpcyByZXF1aXJlZCcpO1xuXG4gICAgaWYgKHVuaXRzICYmIHR5cGVvZiB1bml0cyAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcigndW5pdHMgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIHZhciBmYWN0b3IgPSBmYWN0b3JzW3VuaXRzIHx8ICdraWxvbWV0ZXJzJ107XG4gICAgaWYgKCFmYWN0b3IpIHRocm93IG5ldyBFcnJvcih1bml0cyArICcgdW5pdHMgaXMgaW52YWxpZCcpO1xuICAgIHJldHVybiByYWRpYW5zICogZmFjdG9yO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gYSByZWFsLXdvcmxkIHVuaXQgaW50byByYWRpYW5zXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBuYW1lIGxlbmd0aFRvUmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIGluIHJlYWwgdW5pdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9J2tpbG9tZXRlcnMnXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIG9yIGtpbG9tZXRlcnMgaW5jaGVzLCB5YXJkcywgbWV0cmVzLCBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aFRvUmFkaWFucyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICBpZiAoZGlzdGFuY2UgPT09IHVuZGVmaW5lZCB8fCBkaXN0YW5jZSA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdkaXN0YW5jZSBpcyByZXF1aXJlZCcpO1xuXG4gICAgaWYgKHVuaXRzICYmIHR5cGVvZiB1bml0cyAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcigndW5pdHMgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIHZhciBmYWN0b3IgPSBmYWN0b3JzW3VuaXRzIHx8ICdraWxvbWV0ZXJzJ107XG4gICAgaWYgKCFmYWN0b3IpIHRocm93IG5ldyBFcnJvcih1bml0cyArICcgdW5pdHMgaXMgaW52YWxpZCcpO1xuICAgIHJldHVybiBkaXN0YW5jZSAvIGZhY3Rvcjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIGEgcmVhbC13b3JsZCB1bml0IGludG8gZGVncmVlc1xuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywgY2VudGltZXRlcnMsIGtpbG9tZXRyZXMsIGZlZXRcbiAqXG4gKiBAbmFtZSBsZW5ndGhUb0RlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSBpbiByZWFsIHVuaXRzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPSdraWxvbWV0ZXJzJ10gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBvciBraWxvbWV0ZXJzIGluY2hlcywgeWFyZHMsIG1ldHJlcywgbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICovXG5mdW5jdGlvbiBsZW5ndGhUb0RlZ3JlZXMoZGlzdGFuY2UsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHJhZGlhbnNUb0RlZ3JlZXMobGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFueSBiZWFyaW5nIGFuZ2xlIGZyb20gdGhlIG5vcnRoIGxpbmUgZGlyZWN0aW9uIChwb3NpdGl2ZSBjbG9ja3dpc2UpXG4gKiBhbmQgcmV0dXJucyBhbiBhbmdsZSBiZXR3ZWVuIDAtMzYwIGRlZ3JlZXMgKHBvc2l0aXZlIGNsb2Nrd2lzZSksIDAgYmVpbmcgdGhlIG5vcnRoIGxpbmVcbiAqXG4gKiBAbmFtZSBiZWFyaW5nVG9BemltdXRoXG4gKiBAcGFyYW0ge251bWJlcn0gYmVhcmluZyBhbmdsZSwgYmV0d2VlbiAtMTgwIGFuZCArMTgwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZnVuY3Rpb24gYmVhcmluZ1RvQXppbXV0aChiZWFyaW5nKSB7XG4gICAgaWYgKGJlYXJpbmcgPT09IG51bGwgfHwgYmVhcmluZyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ2JlYXJpbmcgaXMgcmVxdWlyZWQnKTtcblxuICAgIHZhciBhbmdsZSA9IGJlYXJpbmcgJSAzNjA7XG4gICAgaWYgKGFuZ2xlIDwgMCkgYW5nbGUgKz0gMzYwO1xuICAgIHJldHVybiBhbmdsZTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiByYWRpYW5zIHRvIGRlZ3JlZXNcbiAqXG4gKiBAbmFtZSByYWRpYW5zVG9EZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZnVuY3Rpb24gcmFkaWFuc1RvRGVncmVlcyhyYWRpYW5zKSB7XG4gICAgaWYgKHJhZGlhbnMgPT09IG51bGwgfHwgcmFkaWFucyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ3JhZGlhbnMgaXMgcmVxdWlyZWQnKTtcblxuICAgIHZhciBkZWdyZWVzID0gcmFkaWFucyAlICgyICogTWF0aC5QSSk7XG4gICAgcmV0dXJuIGRlZ3JlZXMgKiAxODAgLyBNYXRoLlBJO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIGFuZ2xlIGluIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICpcbiAqIEBuYW1lIGRlZ3JlZXNUb1JhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzIGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuZnVuY3Rpb24gZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSB7XG4gICAgaWYgKGRlZ3JlZXMgPT09IG51bGwgfHwgZGVncmVlcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ2RlZ3JlZXMgaXMgcmVxdWlyZWQnKTtcblxuICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAlIDM2MDtcbiAgICByZXR1cm4gcmFkaWFucyAqIE1hdGguUEkgLyAxODA7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBsZW5ndGggdG8gdGhlIHJlcXVlc3RlZCB1bml0LlxuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsVW5pdCBvZiB0aGUgbGVuZ3RoXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZpbmFsVW5pdD0na2lsb21ldGVycyddIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRMZW5ndGgobGVuZ3RoLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChsZW5ndGggPT09IG51bGwgfHwgbGVuZ3RoID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignbGVuZ3RoIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKCEobGVuZ3RoID49IDApKSB0aHJvdyBuZXcgRXJyb3IoJ2xlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG5cbiAgICByZXR1cm4gcmFkaWFuc1RvTGVuZ3RoKGxlbmd0aFRvUmFkaWFucyhsZW5ndGgsIG9yaWdpbmFsVW5pdCksIGZpbmFsVW5pdCB8fCAna2lsb21ldGVycycpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYXJlYSB0byB0aGUgcmVxdWVzdGVkIHVuaXQuXG4gKiBWYWxpZCB1bml0czoga2lsb21ldGVycywga2lsb21ldHJlcywgbWV0ZXJzLCBtZXRyZXMsIGNlbnRpbWV0cmVzLCBtaWxsaW1ldGVycywgYWNyZXMsIG1pbGVzLCB5YXJkcywgZmVldCwgaW5jaGVzXG4gKiBAcGFyYW0ge251bWJlcn0gYXJlYSB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3JpZ2luYWxVbml0PSdtZXRlcnMnXSBvZiB0aGUgZGlzdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmluYWxVbml0PSdraWxvbWV0ZXJzJ10gcmV0dXJuZWQgdW5pdFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGNvbnZlcnRlZCBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0QXJlYShhcmVhLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChhcmVhID09PSBudWxsIHx8IGFyZWEgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdhcmVhIGlzIHJlcXVpcmVkJyk7XG4gICAgaWYgKCEoYXJlYSA+PSAwKSkgdGhyb3cgbmV3IEVycm9yKCdhcmVhIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcblxuICAgIHZhciBzdGFydEZhY3RvciA9IGFyZWFGYWN0b3JzW29yaWdpbmFsVW5pdCB8fCAnbWV0ZXJzJ107XG4gICAgaWYgKCFzdGFydEZhY3RvcikgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG9yaWdpbmFsIHVuaXRzJyk7XG5cbiAgICB2YXIgZmluYWxGYWN0b3IgPSBhcmVhRmFjdG9yc1tmaW5hbFVuaXQgfHwgJ2tpbG9tZXRlcnMnXTtcbiAgICBpZiAoIWZpbmFsRmFjdG9yKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmluYWwgdW5pdHMnKTtcblxuICAgIHJldHVybiAoYXJlYSAvIHN0YXJ0RmFjdG9yKSAqIGZpbmFsRmFjdG9yO1xufVxuXG4vKipcbiAqIGlzTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSBudW0gTnVtYmVyIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICogQGV4YW1wbGVcbiAqIHR1cmYuaXNOdW1iZXIoMTIzKVxuICogLy89dHJ1ZVxuICogdHVyZi5pc051bWJlcignZm9vJylcbiAqIC8vPWZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKG51bSkge1xuICAgIHJldHVybiAhaXNOYU4obnVtKSAmJiBudW0gIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobnVtKTtcbn1cblxuLyoqXG4gKiBpc09iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdmFyaWFibGUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc09iamVjdCh7ZWxldmF0aW9uOiAxMH0pXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzT2JqZWN0KCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICByZXR1cm4gKCEhaW5wdXQpICYmIChpbnB1dC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBCQm94XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYmJveCBCQm94IHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgQkJveCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MCwgMTEwLCA1MF0pXG4gKiAvLz1PS1xuICogdmFsaWRhdGVCQm94KFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCgnRm9vJylcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3goNSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3gobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3godW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVCQm94KGJib3gpIHtcbiAgICBpZiAoIWJib3gpIHRocm93IG5ldyBFcnJvcignYmJveCBpcyByZXF1aXJlZCcpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYm94KSkgdGhyb3cgbmV3IEVycm9yKCdiYm94IG11c3QgYmUgYW4gQXJyYXknKTtcbiAgICBpZiAoYmJveC5sZW5ndGggIT09IDQgJiYgYmJveC5sZW5ndGggIT09IDYpIHRocm93IG5ldyBFcnJvcignYmJveCBtdXN0IGJlIGFuIEFycmF5IG9mIDQgb3IgNiBudW1iZXJzJyk7XG4gICAgYmJveC5mb3JFYWNoKGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKCFpc051bWJlcihudW0pKSB0aHJvdyBuZXcgRXJyb3IoJ2Jib3ggbXVzdCBvbmx5IGNvbnRhaW4gbnVtYmVycycpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIElkXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gaWQgSWQgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBFcnJvciBpZiBJZCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDAsIDExMCwgNTBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoWy0xODAsIC00MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVJZCgnRm9vJylcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUlkKDUpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZChudWxsKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQodW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVJZChpZCkge1xuICAgIGlmICghaWQpIHRocm93IG5ldyBFcnJvcignaWQgaXMgcmVxdWlyZWQnKTtcbiAgICBpZiAoWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgaWQpID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdpZCBtdXN0IGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nJyk7XG59XG5cbi8vIERlcHJlY2F0ZWQgbWV0aG9kc1xuZnVuY3Rpb24gcmFkaWFuczJkZWdyZWVzKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbWV0aG9kIGhhcyBiZWVuIHJlbmFtZWQgdG8gYHJhZGlhbnNUb0RlZ3JlZXNgJyk7XG59XG5cbmZ1bmN0aW9uIGRlZ3JlZXMycmFkaWFucygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21ldGhvZCBoYXMgYmVlbiByZW5hbWVkIHRvIGBkZWdyZWVzVG9SYWRpYW5zYCcpO1xufVxuXG5mdW5jdGlvbiBkaXN0YW5jZVRvRGVncmVlcygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21ldGhvZCBoYXMgYmVlbiByZW5hbWVkIHRvIGBsZW5ndGhUb0RlZ3JlZXNgJyk7XG59XG5cbmZ1bmN0aW9uIGRpc3RhbmNlVG9SYWRpYW5zKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbWV0aG9kIGhhcyBiZWVuIHJlbmFtZWQgdG8gYGxlbmd0aFRvUmFkaWFuc2AnKTtcbn1cblxuZnVuY3Rpb24gcmFkaWFuc1RvRGlzdGFuY2UoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXRob2QgaGFzIGJlZW4gcmVuYW1lZCB0byBgcmFkaWFuc1RvTGVuZ3RoYCcpO1xufVxuXG5mdW5jdGlvbiBiZWFyaW5nVG9BbmdsZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21ldGhvZCBoYXMgYmVlbiByZW5hbWVkIHRvIGBiZWFyaW5nVG9BemltdXRoYCcpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0RGlzdGFuY2UoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXRob2QgaGFzIGJlZW4gcmVuYW1lZCB0byBgY29udmVydExlbmd0aGAnKTtcbn1cblxuZXhwb3J0IHsgZWFydGhSYWRpdXMsIGZhY3RvcnMsIHVuaXRzRmFjdG9ycywgYXJlYUZhY3RvcnMsIGZlYXR1cmUsIGdlb21ldHJ5LCBwb2ludCwgcG9pbnRzLCBwb2x5Z29uLCBwb2x5Z29ucywgbGluZVN0cmluZywgbGluZVN0cmluZ3MsIGZlYXR1cmVDb2xsZWN0aW9uLCBtdWx0aUxpbmVTdHJpbmcsIG11bHRpUG9pbnQsIG11bHRpUG9seWdvbiwgZ2VvbWV0cnlDb2xsZWN0aW9uLCByb3VuZCwgcmFkaWFuc1RvTGVuZ3RoLCBsZW5ndGhUb1JhZGlhbnMsIGxlbmd0aFRvRGVncmVlcywgYmVhcmluZ1RvQXppbXV0aCwgcmFkaWFuc1RvRGVncmVlcywgZGVncmVlc1RvUmFkaWFucywgY29udmVydExlbmd0aCwgY29udmVydEFyZWEsIGlzTnVtYmVyLCBpc09iamVjdCwgdmFsaWRhdGVCQm94LCB2YWxpZGF0ZUlkLCByYWRpYW5zMmRlZ3JlZXMsIGRlZ3JlZXMycmFkaWFucywgZGlzdGFuY2VUb0RlZ3JlZXMsIGRpc3RhbmNlVG9SYWRpYW5zLCByYWRpYW5zVG9EaXN0YW5jZSwgYmVhcmluZ1RvQW5nbGUsIGNvbnZlcnREaXN0YW5jZSB9O1xuIiwiaW1wb3J0IERlbGF1bmF0b3IgZnJvbSBcImRlbGF1bmF0b3JcIjtcbmltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcbmltcG9ydCBWb3Jvbm9pIGZyb20gXCIuL3Zvcm9ub2kuanNcIjtcblxuY29uc3QgdGF1ID0gMiAqIE1hdGguUEksIHBvdyA9IE1hdGgucG93O1xuXG5mdW5jdGlvbiBwb2ludFgocCkge1xuICByZXR1cm4gcFswXTtcbn1cblxuZnVuY3Rpb24gcG9pbnRZKHApIHtcbiAgcmV0dXJuIHBbMV07XG59XG5cbi8vIEEgdHJpYW5ndWxhdGlvbiBpcyBjb2xsaW5lYXIgaWYgYWxsIGl0cyB0cmlhbmdsZXMgaGF2ZSBhIG5vbi1udWxsIGFyZWFcbmZ1bmN0aW9uIGNvbGxpbmVhcihkKSB7XG4gIGNvbnN0IHt0cmlhbmdsZXMsIGNvb3Jkc30gPSBkO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNvbnN0IGEgPSAyICogdHJpYW5nbGVzW2ldLFxuICAgICAgICAgIGIgPSAyICogdHJpYW5nbGVzW2kgKyAxXSxcbiAgICAgICAgICBjID0gMiAqIHRyaWFuZ2xlc1tpICsgMl0sXG4gICAgICAgICAgY3Jvc3MgPSAoY29vcmRzW2NdIC0gY29vcmRzW2FdKSAqIChjb29yZHNbYiArIDFdIC0gY29vcmRzW2EgKyAxXSlcbiAgICAgICAgICAgICAgICAtIChjb29yZHNbYl0gLSBjb29yZHNbYV0pICogKGNvb3Jkc1tjICsgMV0gLSBjb29yZHNbYSArIDFdKTtcbiAgICBpZiAoY3Jvc3MgPiAxZS0xMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBqaXR0ZXIoeCwgeSwgcikge1xuICByZXR1cm4gW3ggKyBNYXRoLnNpbih4ICsgeSkgKiByLCB5ICsgTWF0aC5jb3MoeCAtIHkpICogcl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF1bmF5IHtcbiAgc3RhdGljIGZyb20ocG9pbnRzLCBmeCA9IHBvaW50WCwgZnkgPSBwb2ludFksIHRoYXQpIHtcbiAgICByZXR1cm4gbmV3IERlbGF1bmF5KFwibGVuZ3RoXCIgaW4gcG9pbnRzXG4gICAgICAgID8gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KVxuICAgICAgICA6IEZsb2F0NjRBcnJheS5mcm9tKGZsYXRJdGVyYWJsZShwb2ludHMsIGZ4LCBmeSwgdGhhdCkpKTtcbiAgfVxuICBjb25zdHJ1Y3Rvcihwb2ludHMpIHtcbiAgICB0aGlzLl9kZWxhdW5hdG9yID0gbmV3IERlbGF1bmF0b3IocG9pbnRzKTtcbiAgICB0aGlzLmluZWRnZXMgPSBuZXcgSW50MzJBcnJheShwb2ludHMubGVuZ3RoIC8gMik7XG4gICAgdGhpcy5faHVsbEluZGV4ID0gbmV3IEludDMyQXJyYXkocG9pbnRzLmxlbmd0aCAvIDIpO1xuICAgIHRoaXMucG9pbnRzID0gdGhpcy5fZGVsYXVuYXRvci5jb29yZHM7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLl9kZWxhdW5hdG9yLnVwZGF0ZSgpO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBfaW5pdCgpIHtcbiAgICBjb25zdCBkID0gdGhpcy5fZGVsYXVuYXRvciwgcG9pbnRzID0gdGhpcy5wb2ludHM7XG5cbiAgICAvLyBjaGVjayBmb3IgY29sbGluZWFyXG4gICAgaWYgKGQuaHVsbCAmJiBkLmh1bGwubGVuZ3RoID4gMiAmJiBjb2xsaW5lYXIoZCkpIHtcbiAgICAgIHRoaXMuY29sbGluZWFyID0gSW50MzJBcnJheS5mcm9tKHtsZW5ndGg6IHBvaW50cy5sZW5ndGgvMn0sIChfLGkpID0+IGkpXG4gICAgICAgIC5zb3J0KChpLCBqKSA9PiBwb2ludHNbMiAqIGldIC0gcG9pbnRzWzIgKiBqXSB8fCBwb2ludHNbMiAqIGkgKyAxXSAtIHBvaW50c1syICogaiArIDFdKTsgLy8gZm9yIGV4YWN0IG5laWdoYm9yc1xuICAgICAgY29uc3QgZSA9IHRoaXMuY29sbGluZWFyWzBdLCBmID0gdGhpcy5jb2xsaW5lYXJbdGhpcy5jb2xsaW5lYXIubGVuZ3RoIC0gMV0sXG4gICAgICAgIGJvdW5kcyA9IFsgcG9pbnRzWzIgKiBlXSwgcG9pbnRzWzIgKiBlICsgMV0sIHBvaW50c1syICogZl0sIHBvaW50c1syICogZiArIDFdIF0sXG4gICAgICAgIHIgPSAxZS04ICogTWF0aC5oeXBvdChib3VuZHNbM10gLSBib3VuZHNbMV0sIGJvdW5kc1syXSAtIGJvdW5kc1swXSk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGggLyAyOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGNvbnN0IHAgPSBqaXR0ZXIocG9pbnRzWzIgKiBpXSwgcG9pbnRzWzIgKiBpICsgMV0sIHIpO1xuICAgICAgICBwb2ludHNbMiAqIGldID0gcFswXTtcbiAgICAgICAgcG9pbnRzWzIgKiBpICsgMV0gPSBwWzFdO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGVsYXVuYXRvciA9IG5ldyBEZWxhdW5hdG9yKHBvaW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbGxpbmVhcjtcbiAgICB9XG5cbiAgICBjb25zdCBoYWxmZWRnZXMgPSB0aGlzLmhhbGZlZGdlcyA9IHRoaXMuX2RlbGF1bmF0b3IuaGFsZmVkZ2VzO1xuICAgIGNvbnN0IGh1bGwgPSB0aGlzLmh1bGwgPSB0aGlzLl9kZWxhdW5hdG9yLmh1bGw7XG4gICAgY29uc3QgdHJpYW5nbGVzID0gdGhpcy50cmlhbmdsZXMgPSB0aGlzLl9kZWxhdW5hdG9yLnRyaWFuZ2xlcztcbiAgICBjb25zdCBpbmVkZ2VzID0gdGhpcy5pbmVkZ2VzLmZpbGwoLTEpO1xuICAgIGNvbnN0IGh1bGxJbmRleCA9IHRoaXMuX2h1bGxJbmRleC5maWxsKC0xKTtcblxuICAgIC8vIENvbXB1dGUgYW4gaW5kZXggZnJvbSBlYWNoIHBvaW50IHRvIGFuIChhcmJpdHJhcnkpIGluY29taW5nIGhhbGZlZGdlXG4gICAgLy8gVXNlZCB0byBnaXZlIHRoZSBmaXJzdCBuZWlnaGJvciBvZiBlYWNoIHBvaW50OyBmb3IgdGhpcyByZWFzb24sXG4gICAgLy8gb24gdGhlIGh1bGwgd2UgZ2l2ZSBwcmlvcml0eSB0byBleHRlcmlvciBoYWxmZWRnZXNcbiAgICBmb3IgKGxldCBlID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGUgPCBuOyArK2UpIHtcbiAgICAgIGNvbnN0IHAgPSB0cmlhbmdsZXNbZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxXTtcbiAgICAgIGlmIChoYWxmZWRnZXNbZV0gPT09IC0xIHx8IGluZWRnZXNbcF0gPT09IC0xKSBpbmVkZ2VzW3BdID0gZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBodWxsLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgaHVsbEluZGV4W2h1bGxbaV1dID0gaTtcbiAgICB9XG5cbiAgICAvLyBkZWdlbmVyYXRlIGNhc2U6IDEgb3IgMiAoZGlzdGluY3QpIHBvaW50c1xuICAgIGlmIChodWxsLmxlbmd0aCA8PSAyICYmIGh1bGwubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy50cmlhbmdsZXMgPSBuZXcgSW50MzJBcnJheSgzKS5maWxsKC0xKTtcbiAgICAgIHRoaXMuaGFsZmVkZ2VzID0gbmV3IEludDMyQXJyYXkoMykuZmlsbCgtMSk7XG4gICAgICB0aGlzLnRyaWFuZ2xlc1swXSA9IGh1bGxbMF07XG4gICAgICB0aGlzLnRyaWFuZ2xlc1sxXSA9IGh1bGxbMV07XG4gICAgICB0aGlzLnRyaWFuZ2xlc1syXSA9IGh1bGxbMV07XG4gICAgICBpbmVkZ2VzW2h1bGxbMF1dID0gMTtcbiAgICAgIGlmIChodWxsLmxlbmd0aCA9PT0gMikgaW5lZGdlc1todWxsWzFdXSA9IDA7XG4gICAgfVxuICB9XG4gIHZvcm9ub2koYm91bmRzKSB7XG4gICAgcmV0dXJuIG5ldyBWb3Jvbm9pKHRoaXMsIGJvdW5kcyk7XG4gIH1cbiAgKm5laWdoYm9ycyhpKSB7XG4gICAgY29uc3Qge2luZWRnZXMsIGh1bGwsIF9odWxsSW5kZXgsIGhhbGZlZGdlcywgdHJpYW5nbGVzLCBjb2xsaW5lYXJ9ID0gdGhpcztcblxuICAgIC8vIGRlZ2VuZXJhdGUgY2FzZSB3aXRoIHNldmVyYWwgY29sbGluZWFyIHBvaW50c1xuICAgIGlmIChjb2xsaW5lYXIpIHtcbiAgICAgIGNvbnN0IGwgPSBjb2xsaW5lYXIuaW5kZXhPZihpKTtcbiAgICAgIGlmIChsID4gMCkgeWllbGQgY29sbGluZWFyW2wgLSAxXTtcbiAgICAgIGlmIChsIDwgY29sbGluZWFyLmxlbmd0aCAtIDEpIHlpZWxkIGNvbGxpbmVhcltsICsgMV07XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZTAgPSBpbmVkZ2VzW2ldO1xuICAgIGlmIChlMCA9PT0gLTEpIHJldHVybjsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGxldCBlID0gZTAsIHAwID0gLTE7XG4gICAgZG8ge1xuICAgICAgeWllbGQgcDAgPSB0cmlhbmdsZXNbZV07XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgcmV0dXJuOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICAgIGlmIChlID09PSAtMSkge1xuICAgICAgICBjb25zdCBwID0gaHVsbFsoX2h1bGxJbmRleFtpXSArIDEpICUgaHVsbC5sZW5ndGhdO1xuICAgICAgICBpZiAocCAhPT0gcDApIHlpZWxkIHA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IHdoaWxlIChlICE9PSBlMCk7XG4gIH1cbiAgZmluZCh4LCB5LCBpID0gMCkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIC0xO1xuICAgIGNvbnN0IGkwID0gaTtcbiAgICBsZXQgYztcbiAgICB3aGlsZSAoKGMgPSB0aGlzLl9zdGVwKGksIHgsIHkpKSA+PSAwICYmIGMgIT09IGkgJiYgYyAhPT0gaTApIGkgPSBjO1xuICAgIHJldHVybiBjO1xuICB9XG4gIF9zdGVwKGksIHgsIHkpIHtcbiAgICBjb25zdCB7aW5lZGdlcywgaHVsbCwgX2h1bGxJbmRleCwgaGFsZmVkZ2VzLCB0cmlhbmdsZXMsIHBvaW50c30gPSB0aGlzO1xuICAgIGlmIChpbmVkZ2VzW2ldID09PSAtMSB8fCAhcG9pbnRzLmxlbmd0aCkgcmV0dXJuIChpICsgMSkgJSAocG9pbnRzLmxlbmd0aCA+PiAxKTtcbiAgICBsZXQgYyA9IGk7XG4gICAgbGV0IGRjID0gcG93KHggLSBwb2ludHNbaSAqIDJdLCAyKSArIHBvdyh5IC0gcG9pbnRzW2kgKiAyICsgMV0sIDIpO1xuICAgIGNvbnN0IGUwID0gaW5lZGdlc1tpXTtcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIGxldCB0ID0gdHJpYW5nbGVzW2VdO1xuICAgICAgY29uc3QgZHQgPSBwb3coeCAtIHBvaW50c1t0ICogMl0sIDIpICsgcG93KHkgLSBwb2ludHNbdCAqIDIgKyAxXSwgMik7XG4gICAgICBpZiAoZHQgPCBkYykgZGMgPSBkdCwgYyA9IHQ7XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgYnJlYWs7IC8vIGJhZCB0cmlhbmd1bGF0aW9uXG4gICAgICBlID0gaGFsZmVkZ2VzW2VdO1xuICAgICAgaWYgKGUgPT09IC0xKSB7XG4gICAgICAgIGUgPSBodWxsWyhfaHVsbEluZGV4W2ldICsgMSkgJSBodWxsLmxlbmd0aF07XG4gICAgICAgIGlmIChlICE9PSB0KSB7XG4gICAgICAgICAgaWYgKHBvdyh4IC0gcG9pbnRzW2UgKiAyXSwgMikgKyBwb3coeSAtIHBvaW50c1tlICogMiArIDFdLCAyKSA8IGRjKSByZXR1cm4gZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IHdoaWxlIChlICE9PSBlMCk7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50cywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSB0cmlhbmdsZXNbaV0gKiAyO1xuICAgICAgY29uc3QgdGogPSB0cmlhbmdsZXNbal0gKiAyO1xuICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW3RpXSwgcG9pbnRzW3RpICsgMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3RqXSwgcG9pbnRzW3RqICsgMV0pO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlckh1bGwoY29udGV4dCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJQb2ludHMoY29udGV4dCwgciA9IDIpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50c30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgY29uc3QgeCA9IHBvaW50c1tpXSwgeSA9IHBvaW50c1tpICsgMV07XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4ICsgciwgeSk7XG4gICAgICBjb250ZXh0LmFyYyh4LCB5LCByLCAwLCB0YXUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckh1bGwoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7aHVsbCwgcG9pbnRzfSA9IHRoaXM7XG4gICAgY29uc3QgaCA9IGh1bGxbMF0gKiAyLCBuID0gaHVsbC5sZW5ndGg7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW2hdLCBwb2ludHNbaCArIDFdKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaCA9IDIgKiBodWxsW2ldO1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2hdLCBwb2ludHNbaCArIDFdKTtcbiAgICB9XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIGh1bGxQb2x5Z29uKCkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlckh1bGwocG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxuICByZW5kZXJUcmlhbmdsZShpLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGNvbnN0IHQwID0gdHJpYW5nbGVzW2kgKj0gM10gKiAyO1xuICAgIGNvbnN0IHQxID0gdHJpYW5nbGVzW2kgKyAxXSAqIDI7XG4gICAgY29uc3QgdDIgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbdDBdLCBwb2ludHNbdDAgKyAxXSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3QxXSwgcG9pbnRzW3QxICsgMV0pO1xuICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0Ml0sIHBvaW50c1t0MiArIDFdKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgKnRyaWFuZ2xlUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge3RyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aCAvIDM7IGkgPCBuOyArK2kpIHtcbiAgICAgIHlpZWxkIHRoaXMudHJpYW5nbGVQb2x5Z29uKGkpO1xuICAgIH1cbiAgfVxuICB0cmlhbmdsZVBvbHlnb24oaSkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlclRyaWFuZ2xlKGksIHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICBjb25zdCBhcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkobiAqIDIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGNvbnN0IHAgPSBwb2ludHNbaV07XG4gICAgYXJyYXlbaSAqIDJdID0gZnguY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgIGFycmF5W2kgKiAyICsgMV0gPSBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiogZmxhdEl0ZXJhYmxlKHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChjb25zdCBwIG9mIHBvaW50cykge1xuICAgIHlpZWxkIGZ4LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICB5aWVsZCBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgKytpO1xuICB9XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgRGVsYXVuYXl9IGZyb20gXCIuL2RlbGF1bmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgVm9yb25vaX0gZnJvbSBcIi4vdm9yb25vaS5qc1wiO1xuIiwiY29uc3QgZXBzaWxvbiA9IDFlLTY7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl94MCA9IHRoaXMuX3kwID0gLy8gc3RhcnQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5feDEgPSB0aGlzLl95MSA9IG51bGw7IC8vIGVuZCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgICB0aGlzLl8gPSBcIlwiO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgY2xvc2VQYXRoKCkge1xuICAgIGlmICh0aGlzLl94MSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5feDEgPSB0aGlzLl94MCwgdGhpcy5feTEgPSB0aGlzLl95MDtcbiAgICAgIHRoaXMuXyArPSBcIlpcIjtcbiAgICB9XG4gIH1cbiAgbGluZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gYEwke3RoaXMuX3gxID0gK3h9LCR7dGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGFyYyh4LCB5LCByKSB7XG4gICAgeCA9ICt4LCB5ID0gK3ksIHIgPSArcjtcbiAgICBjb25zdCB4MCA9IHggKyByO1xuICAgIGNvbnN0IHkwID0geTtcbiAgICBpZiAociA8IDApIHRocm93IG5ldyBFcnJvcihcIm5lZ2F0aXZlIHJhZGl1c1wiKTtcbiAgICBpZiAodGhpcy5feDEgPT09IG51bGwpIHRoaXMuXyArPSBgTSR7eDB9LCR7eTB9YDtcbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLl94MSAtIHgwKSA+IGVwc2lsb24gfHwgTWF0aC5hYnModGhpcy5feTEgLSB5MCkgPiBlcHNpbG9uKSB0aGlzLl8gKz0gXCJMXCIgKyB4MCArIFwiLFwiICsgeTA7XG4gICAgaWYgKCFyKSByZXR1cm47XG4gICAgdGhpcy5fICs9IGBBJHtyfSwke3J9LDAsMSwxLCR7eCAtIHJ9LCR7eX1BJHtyfSwke3J9LDAsMSwxLCR7dGhpcy5feDEgPSB4MH0sJHt0aGlzLl95MSA9IHkwfWA7XG4gIH1cbiAgcmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWgkeyt3fXYkeytofWgkey13fVpgO1xuICB9XG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl8gfHwgbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuXyA9IFtdO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICBjbG9zZVBhdGgoKSB7XG4gICAgdGhpcy5fLnB1c2godGhpcy5fWzBdLnNsaWNlKCkpO1xuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fLmxlbmd0aCA/IHRoaXMuXyA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm9yb25vaSB7XG4gIGNvbnN0cnVjdG9yKGRlbGF1bmF5LCBbeG1pbiwgeW1pbiwgeG1heCwgeW1heF0gPSBbMCwgMCwgOTYwLCA1MDBdKSB7XG4gICAgaWYgKCEoKHhtYXggPSAreG1heCkgPj0gKHhtaW4gPSAreG1pbikpIHx8ICEoKHltYXggPSAreW1heCkgPj0gKHltaW4gPSAreW1pbikpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGJvdW5kc1wiKTtcbiAgICB0aGlzLmRlbGF1bmF5ID0gZGVsYXVuYXk7XG4gICAgdGhpcy5fY2lyY3VtY2VudGVycyA9IG5ldyBGbG9hdDY0QXJyYXkoZGVsYXVuYXkucG9pbnRzLmxlbmd0aCAqIDIpO1xuICAgIHRoaXMudmVjdG9ycyA9IG5ldyBGbG9hdDY0QXJyYXkoZGVsYXVuYXkucG9pbnRzLmxlbmd0aCAqIDIpO1xuICAgIHRoaXMueG1heCA9IHhtYXgsIHRoaXMueG1pbiA9IHhtaW47XG4gICAgdGhpcy55bWF4ID0geW1heCwgdGhpcy55bWluID0geW1pbjtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuZGVsYXVuYXkudXBkYXRlKCk7XG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIF9pbml0KCkge1xuICAgIGNvbnN0IHtkZWxhdW5heToge3BvaW50cywgaHVsbCwgdHJpYW5nbGVzfSwgdmVjdG9yc30gPSB0aGlzO1xuXG4gICAgLy8gQ29tcHV0ZSBjaXJjdW1jZW50ZXJzLlxuICAgIGNvbnN0IGNpcmN1bWNlbnRlcnMgPSB0aGlzLmNpcmN1bWNlbnRlcnMgPSB0aGlzLl9jaXJjdW1jZW50ZXJzLnN1YmFycmF5KDAsIHRyaWFuZ2xlcy5sZW5ndGggLyAzICogMik7XG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aCwgeCwgeTsgaSA8IG47IGkgKz0gMywgaiArPSAyKSB7XG4gICAgICBjb25zdCB0MSA9IHRyaWFuZ2xlc1tpXSAqIDI7XG4gICAgICBjb25zdCB0MiA9IHRyaWFuZ2xlc1tpICsgMV0gKiAyO1xuICAgICAgY29uc3QgdDMgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICAgIGNvbnN0IHgxID0gcG9pbnRzW3QxXTtcbiAgICAgIGNvbnN0IHkxID0gcG9pbnRzW3QxICsgMV07XG4gICAgICBjb25zdCB4MiA9IHBvaW50c1t0Ml07XG4gICAgICBjb25zdCB5MiA9IHBvaW50c1t0MiArIDFdO1xuICAgICAgY29uc3QgeDMgPSBwb2ludHNbdDNdO1xuICAgICAgY29uc3QgeTMgPSBwb2ludHNbdDMgKyAxXTtcblxuICAgICAgY29uc3QgZHggPSB4MiAtIHgxO1xuICAgICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgICAgY29uc3QgZXggPSB4MyAtIHgxO1xuICAgICAgY29uc3QgZXkgPSB5MyAtIHkxO1xuICAgICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIGNvbnN0IGNsID0gZXggKiBleCArIGV5ICogZXk7XG4gICAgICBjb25zdCBhYiA9IChkeCAqIGV5IC0gZHkgKiBleCkgKiAyO1xuXG4gICAgICBpZiAoIWFiKSB7XG4gICAgICAgIC8vIGRlZ2VuZXJhdGUgY2FzZSAoY29sbGluZWFyIGRpYWdyYW0pXG4gICAgICAgIHggPSAoeDEgKyB4MykgLyAyIC0gMWU4ICogZXk7XG4gICAgICAgIHkgPSAoeTEgKyB5MykgLyAyICsgMWU4ICogZXg7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChNYXRoLmFicyhhYikgPCAxZS04KSB7XG4gICAgICAgIC8vIGFsbW9zdCBlcXVhbCBwb2ludHMgKGRlZ2VuZXJhdGUgdHJpYW5nbGUpXG4gICAgICAgIHggPSAoeDEgKyB4MykgLyAyO1xuICAgICAgICB5ID0gKHkxICsgeTMpIC8gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGQgPSAxIC8gYWI7XG4gICAgICAgIHggPSB4MSArIChleSAqIGJsIC0gZHkgKiBjbCkgKiBkO1xuICAgICAgICB5ID0geTEgKyAoZHggKiBjbCAtIGV4ICogYmwpICogZDtcbiAgICAgIH1cbiAgICAgIGNpcmN1bWNlbnRlcnNbal0gPSB4O1xuICAgICAgY2lyY3VtY2VudGVyc1tqICsgMV0gPSB5O1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgZXh0ZXJpb3IgY2VsbCByYXlzLlxuICAgIGxldCBoID0gaHVsbFtodWxsLmxlbmd0aCAtIDFdO1xuICAgIGxldCBwMCwgcDEgPSBoICogNDtcbiAgICBsZXQgeDAsIHgxID0gcG9pbnRzWzIgKiBoXTtcbiAgICBsZXQgeTAsIHkxID0gcG9pbnRzWzIgKiBoICsgMV07XG4gICAgdmVjdG9ycy5maWxsKDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaHVsbC5sZW5ndGg7ICsraSkge1xuICAgICAgaCA9IGh1bGxbaV07XG4gICAgICBwMCA9IHAxLCB4MCA9IHgxLCB5MCA9IHkxO1xuICAgICAgcDEgPSBoICogNCwgeDEgPSBwb2ludHNbMiAqIGhdLCB5MSA9IHBvaW50c1syICogaCArIDFdO1xuICAgICAgdmVjdG9yc1twMCArIDJdID0gdmVjdG9yc1twMV0gPSB5MCAtIHkxO1xuICAgICAgdmVjdG9yc1twMCArIDNdID0gdmVjdG9yc1twMSArIDFdID0geDEgLSB4MDtcbiAgICB9XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7aGFsZmVkZ2VzLCBpbmVkZ2VzLCBodWxsfSwgY2lyY3VtY2VudGVycywgdmVjdG9yc30gPSB0aGlzO1xuICAgIGlmIChodWxsLmxlbmd0aCA8PSAxKSByZXR1cm4gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSBNYXRoLmZsb29yKGkgLyAzKSAqIDI7XG4gICAgICBjb25zdCB0aiA9IE1hdGguZmxvb3IoaiAvIDMpICogMjtcbiAgICAgIGNvbnN0IHhpID0gY2lyY3VtY2VudGVyc1t0aV07XG4gICAgICBjb25zdCB5aSA9IGNpcmN1bWNlbnRlcnNbdGkgKyAxXTtcbiAgICAgIGNvbnN0IHhqID0gY2lyY3VtY2VudGVyc1t0al07XG4gICAgICBjb25zdCB5aiA9IGNpcmN1bWNlbnRlcnNbdGogKyAxXTtcbiAgICAgIHRoaXMuX3JlbmRlclNlZ21lbnQoeGksIHlpLCB4aiwgeWosIGNvbnRleHQpO1xuICAgIH1cbiAgICBsZXQgaDAsIGgxID0gaHVsbFtodWxsLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaHVsbC5sZW5ndGg7ICsraSkge1xuICAgICAgaDAgPSBoMSwgaDEgPSBodWxsW2ldO1xuICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3IoaW5lZGdlc1toMV0gLyAzKSAqIDI7XG4gICAgICBjb25zdCB4ID0gY2lyY3VtY2VudGVyc1t0XTtcbiAgICAgIGNvbnN0IHkgPSBjaXJjdW1jZW50ZXJzW3QgKyAxXTtcbiAgICAgIGNvbnN0IHYgPSBoMCAqIDQ7XG4gICAgICBjb25zdCBwID0gdGhpcy5fcHJvamVjdCh4LCB5LCB2ZWN0b3JzW3YgKyAyXSwgdmVjdG9yc1t2ICsgM10pO1xuICAgICAgaWYgKHApIHRoaXMuX3JlbmRlclNlZ21lbnQoeCwgeSwgcFswXSwgcFsxXSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyQm91bmRzKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29udGV4dC5yZWN0KHRoaXMueG1pbiwgdGhpcy55bWluLCB0aGlzLnhtYXggLSB0aGlzLnhtaW4sIHRoaXMueW1heCAtIHRoaXMueW1pbik7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJDZWxsKGksIGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2xpcChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsIHx8ICFwb2ludHMubGVuZ3RoKSByZXR1cm47XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xuICAgIGxldCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAocG9pbnRzWzBdID09PSBwb2ludHNbbi0yXSAmJiBwb2ludHNbMV0gPT09IHBvaW50c1tuLTFdICYmIG4gPiAxKSBuIC09IDI7XG4gICAgZm9yIChsZXQgaSA9IDI7IGkgPCBuOyBpICs9IDIpIHtcbiAgICAgIGlmIChwb2ludHNbaV0gIT09IHBvaW50c1tpLTJdIHx8IHBvaW50c1tpKzFdICE9PSBwb2ludHNbaS0xXSlcbiAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcbiAgICB9XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gICpjZWxsUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7cG9pbnRzfX0gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aCAvIDI7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNlbGxQb2x5Z29uKGkpO1xuICAgICAgaWYgKGNlbGwpIGNlbGwuaW5kZXggPSBpLCB5aWVsZCBjZWxsO1xuICAgIH1cbiAgfVxuICBjZWxsUG9seWdvbihpKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVyQ2VsbChpLCBwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG4gIF9yZW5kZXJTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjb250ZXh0KSB7XG4gICAgbGV0IFM7XG4gICAgY29uc3QgYzAgPSB0aGlzLl9yZWdpb25jb2RlKHgwLCB5MCk7XG4gICAgY29uc3QgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSB7XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4MCwgeTApO1xuICAgICAgY29udGV4dC5saW5lVG8oeDEsIHkxKTtcbiAgICB9IGVsc2UgaWYgKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oU1swXSwgU1sxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhTWzJdLCBTWzNdKTtcbiAgICB9XG4gIH1cbiAgY29udGFpbnMoaSwgeCwgeSkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLmRlbGF1bmF5Ll9zdGVwKGksIHgsIHkpID09PSBpO1xuICB9XG4gICpuZWlnaGJvcnMoaSkge1xuICAgIGNvbnN0IGNpID0gdGhpcy5fY2xpcChpKTtcbiAgICBpZiAoY2kpIGZvciAoY29uc3QgaiBvZiB0aGlzLmRlbGF1bmF5Lm5laWdoYm9ycyhpKSkge1xuICAgICAgY29uc3QgY2ogPSB0aGlzLl9jbGlwKGopO1xuICAgICAgLy8gZmluZCB0aGUgY29tbW9uIGVkZ2VcbiAgICAgIGlmIChjaikgbG9vcDogZm9yIChsZXQgYWkgPSAwLCBsaSA9IGNpLmxlbmd0aDsgYWkgPCBsaTsgYWkgKz0gMikge1xuICAgICAgICBmb3IgKGxldCBhaiA9IDAsIGxqID0gY2oubGVuZ3RoOyBhaiA8IGxqOyBhaiArPSAyKSB7XG4gICAgICAgICAgaWYgKGNpW2FpXSA9PSBjalthal1cbiAgICAgICAgICAmJiBjaVthaSArIDFdID09IGNqW2FqICsgMV1cbiAgICAgICAgICAmJiBjaVsoYWkgKyAyKSAlIGxpXSA9PSBjalsoYWogKyBsaiAtIDIpICUgbGpdXG4gICAgICAgICAgJiYgY2lbKGFpICsgMykgJSBsaV0gPT0gY2pbKGFqICsgbGogLSAxKSAlIGxqXVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgeWllbGQgajtcbiAgICAgICAgICAgIGJyZWFrIGxvb3A7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9jZWxsKGkpIHtcbiAgICBjb25zdCB7Y2lyY3VtY2VudGVycywgZGVsYXVuYXk6IHtpbmVkZ2VzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc319ID0gdGhpcztcbiAgICBjb25zdCBlMCA9IGluZWRnZXNbaV07XG4gICAgaWYgKGUwID09PSAtMSkgcmV0dXJuIG51bGw7IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBjb25zdCBwb2ludHMgPSBbXTtcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmZsb29yKGUgLyAzKTtcbiAgICAgIHBvaW50cy5wdXNoKGNpcmN1bWNlbnRlcnNbdCAqIDJdLCBjaXJjdW1jZW50ZXJzW3QgKiAyICsgMV0pO1xuICAgICAgZSA9IGUgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMTtcbiAgICAgIGlmICh0cmlhbmdsZXNbZV0gIT09IGkpIGJyZWFrOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICB9IHdoaWxlIChlICE9PSBlMCAmJiBlICE9PSAtMSk7XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuICBfY2xpcChpKSB7XG4gICAgLy8gZGVnZW5lcmF0ZSBjYXNlICgxIHZhbGlkIHBvaW50OiByZXR1cm4gdGhlIGJveClcbiAgICBpZiAoaSA9PT0gMCAmJiB0aGlzLmRlbGF1bmF5Lmh1bGwubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gW3RoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWluXTtcbiAgICB9XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2VsbChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7dmVjdG9yczogVn0gPSB0aGlzO1xuICAgIGNvbnN0IHYgPSBpICogNDtcbiAgICByZXR1cm4gVlt2XSB8fCBWW3YgKyAxXVxuICAgICAgICA/IHRoaXMuX2NsaXBJbmZpbml0ZShpLCBwb2ludHMsIFZbdl0sIFZbdiArIDFdLCBWW3YgKyAyXSwgVlt2ICsgM10pXG4gICAgICAgIDogdGhpcy5fY2xpcEZpbml0ZShpLCBwb2ludHMpO1xuICB9XG4gIF9jbGlwRmluaXRlKGksIHBvaW50cykge1xuICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGxldCBQID0gbnVsbDtcbiAgICBsZXQgeDAsIHkwLCB4MSA9IHBvaW50c1tuIC0gMl0sIHkxID0gcG9pbnRzW24gLSAxXTtcbiAgICBsZXQgYzAsIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIGxldCBlMCwgZTE7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgIHgwID0geDEsIHkwID0geTEsIHgxID0gcG9pbnRzW2pdLCB5MSA9IHBvaW50c1tqICsgMV07XG4gICAgICBjMCA9IGMxLCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkge1xuICAgICAgICBlMCA9IGUxLCBlMSA9IDA7XG4gICAgICAgIGlmIChQKSBQLnB1c2goeDEsIHkxKTtcbiAgICAgICAgZWxzZSBQID0gW3gxLCB5MV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgUywgc3gwLCBzeTAsIHN4MSwgc3kxO1xuICAgICAgICBpZiAoYzAgPT09IDApIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDAsIHN5MCwgc3gxLCBzeTFdID0gUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MSwgeTEsIHgwLCB5MCwgYzEsIGMwKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDEsIHN5MSwgc3gwLCBzeTBdID0gUztcbiAgICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MCwgc3kwKTtcbiAgICAgICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgICAgICAgaWYgKFApIFAucHVzaChzeDAsIHN5MCk7XG4gICAgICAgICAgZWxzZSBQID0gW3N4MCwgc3kwXTtcbiAgICAgICAgfVxuICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MSwgc3kxKTtcbiAgICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgICAgICBpZiAoUCkgUC5wdXNoKHN4MSwgc3kxKTtcbiAgICAgICAgZWxzZSBQID0gW3N4MSwgc3kxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFApIHtcbiAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoUFswXSwgUFsxXSk7XG4gICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKGksICh0aGlzLnhtaW4gKyB0aGlzLnhtYXgpIC8gMiwgKHRoaXMueW1pbiArIHRoaXMueW1heCkgLyAyKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnhtYXgsIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1pbl07XG4gICAgfVxuICAgIHJldHVybiBQO1xuICB9XG4gIF9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkgcmV0dXJuIFt4MCwgeTAsIHgxLCB5MV07XG4gICAgICBpZiAoYzAgJiBjMSkgcmV0dXJuIG51bGw7XG4gICAgICBsZXQgeCwgeSwgYyA9IGMwIHx8IGMxO1xuICAgICAgaWYgKGMgJiAwYjEwMDApIHggPSB4MCArICh4MSAtIHgwKSAqICh0aGlzLnltYXggLSB5MCkgLyAoeTEgLSB5MCksIHkgPSB0aGlzLnltYXg7XG4gICAgICBlbHNlIGlmIChjICYgMGIwMTAwKSB4ID0geDAgKyAoeDEgLSB4MCkgKiAodGhpcy55bWluIC0geTApIC8gKHkxIC0geTApLCB5ID0gdGhpcy55bWluO1xuICAgICAgZWxzZSBpZiAoYyAmIDBiMDAxMCkgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1heCAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1heDtcbiAgICAgIGVsc2UgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1pbiAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1pbjtcbiAgICAgIGlmIChjMCkgeDAgPSB4LCB5MCA9IHksIGMwID0gdGhpcy5fcmVnaW9uY29kZSh4MCwgeTApO1xuICAgICAgZWxzZSB4MSA9IHgsIHkxID0geSwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgfVxuICB9XG4gIF9jbGlwSW5maW5pdGUoaSwgcG9pbnRzLCB2eDAsIHZ5MCwgdnhuLCB2eW4pIHtcbiAgICBsZXQgUCA9IEFycmF5LmZyb20ocG9pbnRzKSwgcDtcbiAgICBpZiAocCA9IHRoaXMuX3Byb2plY3QoUFswXSwgUFsxXSwgdngwLCB2eTApKSBQLnVuc2hpZnQocFswXSwgcFsxXSk7XG4gICAgaWYgKHAgPSB0aGlzLl9wcm9qZWN0KFBbUC5sZW5ndGggLSAyXSwgUFtQLmxlbmd0aCAtIDFdLCB2eG4sIHZ5bikpIFAucHVzaChwWzBdLCBwWzFdKTtcbiAgICBpZiAoUCA9IHRoaXMuX2NsaXBGaW5pdGUoaSwgUCkpIHtcbiAgICAgIGZvciAobGV0IGogPSAwLCBuID0gUC5sZW5ndGgsIGMwLCBjMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbbiAtIDJdLCBQW24gLSAxXSk7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgICAgYzAgPSBjMSwgYzEgPSB0aGlzLl9lZGdlY29kZShQW2pdLCBQW2ogKyAxXSk7XG4gICAgICAgIGlmIChjMCAmJiBjMSkgaiA9IHRoaXMuX2VkZ2UoaSwgYzAsIGMxLCBQLCBqKSwgbiA9IFAubGVuZ3RoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWlucyhpLCAodGhpcy54bWluICsgdGhpcy54bWF4KSAvIDIsICh0aGlzLnltaW4gKyB0aGlzLnltYXgpIC8gMikpIHtcbiAgICAgIFAgPSBbdGhpcy54bWluLCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXhdO1xuICAgIH1cbiAgICByZXR1cm4gUDtcbiAgfVxuICBfZWRnZShpLCBlMCwgZTEsIFAsIGopIHtcbiAgICB3aGlsZSAoZTAgIT09IGUxKSB7XG4gICAgICBsZXQgeCwgeTtcbiAgICAgIHN3aXRjaCAoZTApIHtcbiAgICAgICAgY2FzZSAwYjAxMDE6IGUwID0gMGIwMTAwOyBjb250aW51ZTsgLy8gdG9wLWxlZnRcbiAgICAgICAgY2FzZSAwYjAxMDA6IGUwID0gMGIwMTEwLCB4ID0gdGhpcy54bWF4LCB5ID0gdGhpcy55bWluOyBicmVhazsgLy8gdG9wXG4gICAgICAgIGNhc2UgMGIwMTEwOiBlMCA9IDBiMDAxMDsgY29udGludWU7IC8vIHRvcC1yaWdodFxuICAgICAgICBjYXNlIDBiMDAxMDogZTAgPSAwYjEwMTAsIHggPSB0aGlzLnhtYXgsIHkgPSB0aGlzLnltYXg7IGJyZWFrOyAvLyByaWdodFxuICAgICAgICBjYXNlIDBiMTAxMDogZTAgPSAwYjEwMDA7IGNvbnRpbnVlOyAvLyBib3R0b20tcmlnaHRcbiAgICAgICAgY2FzZSAwYjEwMDA6IGUwID0gMGIxMDAxLCB4ID0gdGhpcy54bWluLCB5ID0gdGhpcy55bWF4OyBicmVhazsgLy8gYm90dG9tXG4gICAgICAgIGNhc2UgMGIxMDAxOiBlMCA9IDBiMDAwMTsgY29udGludWU7IC8vIGJvdHRvbS1sZWZ0XG4gICAgICAgIGNhc2UgMGIwMDAxOiBlMCA9IDBiMDEwMSwgeCA9IHRoaXMueG1pbiwgeSA9IHRoaXMueW1pbjsgYnJlYWs7IC8vIGxlZnRcbiAgICAgIH1cbiAgICAgIGlmICgoUFtqXSAhPT0geCB8fCBQW2ogKyAxXSAhPT0geSkgJiYgdGhpcy5jb250YWlucyhpLCB4LCB5KSkge1xuICAgICAgICBQLnNwbGljZShqLCAwLCB4LCB5KSwgaiArPSAyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoUC5sZW5ndGggPiA0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFAubGVuZ3RoOyBpKz0gMikge1xuICAgICAgICBjb25zdCBqID0gKGkgKyAyKSAlIFAubGVuZ3RoLCBrID0gKGkgKyA0KSAlIFAubGVuZ3RoO1xuICAgICAgICBpZiAoUFtpXSA9PT0gUFtqXSAmJiBQW2pdID09PSBQW2tdXG4gICAgICAgIHx8IFBbaSArIDFdID09PSBQW2ogKyAxXSAmJiBQW2ogKyAxXSA9PT0gUFtrICsgMV0pXG4gICAgICAgICAgUC5zcGxpY2UoaiwgMiksIGkgLT0gMjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGo7XG4gIH1cbiAgX3Byb2plY3QoeDAsIHkwLCB2eCwgdnkpIHtcbiAgICBsZXQgdCA9IEluZmluaXR5LCBjLCB4LCB5O1xuICAgIGlmICh2eSA8IDApIHsgLy8gdG9wXG4gICAgICBpZiAoeTAgPD0gdGhpcy55bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltaW4gLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWluLCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfSBlbHNlIGlmICh2eSA+IDApIHsgLy8gYm90dG9tXG4gICAgICBpZiAoeTAgPj0gdGhpcy55bWF4KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltYXggLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWF4LCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfVxuICAgIGlmICh2eCA+IDApIHsgLy8gcmlnaHRcbiAgICAgIGlmICh4MCA+PSB0aGlzLnhtYXgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueG1heCAtIHgwKSAvIHZ4KSA8IHQpIHggPSB0aGlzLnhtYXgsIHkgPSB5MCArICh0ID0gYykgKiB2eTtcbiAgICB9IGVsc2UgaWYgKHZ4IDwgMCkgeyAvLyBsZWZ0XG4gICAgICBpZiAoeDAgPD0gdGhpcy54bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnhtaW4gLSB4MCkgLyB2eCkgPCB0KSB4ID0gdGhpcy54bWluLCB5ID0geTAgKyAodCA9IGMpICogdnk7XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07XG4gIH1cbiAgX2VkZ2Vjb2RlKHgsIHkpIHtcbiAgICByZXR1cm4gKHggPT09IHRoaXMueG1pbiA/IDBiMDAwMVxuICAgICAgICA6IHggPT09IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA9PT0gdGhpcy55bWluID8gMGIwMTAwXG4gICAgICAgIDogeSA9PT0gdGhpcy55bWF4ID8gMGIxMDAwIDogMGIwMDAwKTtcbiAgfVxuICBfcmVnaW9uY29kZSh4LCB5KSB7XG4gICAgcmV0dXJuICh4IDwgdGhpcy54bWluID8gMGIwMDAxXG4gICAgICAgIDogeCA+IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA8IHRoaXMueW1pbiA/IDBiMDEwMFxuICAgICAgICA6IHkgPiB0aGlzLnltYXggPyAwYjEwMDAgOiAwYjAwMDApO1xuICB9XG59XG4iLCJcbmNvbnN0IEVQU0lMT04gPSBNYXRoLnBvdygyLCAtNTIpO1xuY29uc3QgRURHRV9TVEFDSyA9IG5ldyBVaW50MzJBcnJheSg1MTIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxhdW5hdG9yIHtcblxuICAgIHN0YXRpYyBmcm9tKHBvaW50cywgZ2V0WCA9IGRlZmF1bHRHZXRYLCBnZXRZID0gZGVmYXVsdEdldFkpIHtcbiAgICAgICAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IG5ldyBGbG9hdDY0QXJyYXkobiAqIDIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpXSA9IGdldFgocCk7XG4gICAgICAgICAgICBjb29yZHNbMiAqIGkgKyAxXSA9IGdldFkocCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERlbGF1bmF0b3IoY29vcmRzKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb29yZHMpIHtcbiAgICAgICAgY29uc3QgbiA9IGNvb3Jkcy5sZW5ndGggPj4gMTtcbiAgICAgICAgaWYgKG4gPiAwICYmIHR5cGVvZiBjb29yZHNbMF0gIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNvb3JkcyB0byBjb250YWluIG51bWJlcnMuJyk7XG5cbiAgICAgICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG5cbiAgICAgICAgLy8gYXJyYXlzIHRoYXQgd2lsbCBzdG9yZSB0aGUgdHJpYW5ndWxhdGlvbiBncmFwaFxuICAgICAgICBjb25zdCBtYXhUcmlhbmdsZXMgPSBNYXRoLm1heCgyICogbiAtIDUsIDApO1xuICAgICAgICB0aGlzLl90cmlhbmdsZXMgPSBuZXcgVWludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG4gICAgICAgIHRoaXMuX2hhbGZlZGdlcyA9IG5ldyBJbnQzMkFycmF5KG1heFRyaWFuZ2xlcyAqIDMpO1xuXG4gICAgICAgIC8vIHRlbXBvcmFyeSBhcnJheXMgZm9yIHRyYWNraW5nIHRoZSBlZGdlcyBvZiB0aGUgYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIHRoaXMuX2hhc2hTaXplID0gTWF0aC5jZWlsKE1hdGguc3FydChuKSk7XG4gICAgICAgIHRoaXMuX2h1bGxQcmV2ID0gbmV3IFVpbnQzMkFycmF5KG4pOyAvLyBlZGdlIHRvIHByZXYgZWRnZVxuICAgICAgICB0aGlzLl9odWxsTmV4dCA9IG5ldyBVaW50MzJBcnJheShuKTsgLy8gZWRnZSB0byBuZXh0IGVkZ2VcbiAgICAgICAgdGhpcy5faHVsbFRyaSA9IG5ldyBVaW50MzJBcnJheShuKTsgLy8gZWRnZSB0byBhZGphY2VudCB0cmlhbmdsZVxuICAgICAgICB0aGlzLl9odWxsSGFzaCA9IG5ldyBJbnQzMkFycmF5KHRoaXMuX2hhc2hTaXplKS5maWxsKC0xKTsgLy8gYW5ndWxhciBlZGdlIGhhc2hcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgYXJyYXlzIGZvciBzb3J0aW5nIHBvaW50c1xuICAgICAgICB0aGlzLl9pZHMgPSBuZXcgVWludDMyQXJyYXkobik7XG4gICAgICAgIHRoaXMuX2Rpc3RzID0gbmV3IEZsb2F0NjRBcnJheShuKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qge2Nvb3JkcywgX2h1bGxQcmV2OiBodWxsUHJldiwgX2h1bGxOZXh0OiBodWxsTmV4dCwgX2h1bGxUcmk6IGh1bGxUcmksIF9odWxsSGFzaDogaHVsbEhhc2h9ID0gIHRoaXM7XG4gICAgICAgIGNvbnN0IG4gPSBjb29yZHMubGVuZ3RoID4+IDE7XG5cbiAgICAgICAgLy8gcG9wdWxhdGUgYW4gYXJyYXkgb2YgcG9pbnQgaW5kaWNlczsgY2FsY3VsYXRlIGlucHV0IGRhdGEgYmJveFxuICAgICAgICBsZXQgbWluWCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWluWSA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WCA9IC1JbmZpbml0eTtcbiAgICAgICAgbGV0IG1heFkgPSAtSW5maW5pdHk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBjb29yZHNbMiAqIGldO1xuICAgICAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgICAgIHRoaXMuX2lkc1tpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3ggPSAobWluWCArIG1heFgpIC8gMjtcbiAgICAgICAgY29uc3QgY3kgPSAobWluWSArIG1heFkpIC8gMjtcblxuICAgICAgICBsZXQgbWluRGlzdCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgaTAsIGkxLCBpMjtcblxuICAgICAgICAvLyBwaWNrIGEgc2VlZCBwb2ludCBjbG9zZSB0byB0aGUgY2VudGVyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gZGlzdChjeCwgY3ksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIGkwID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpMHggPSBjb29yZHNbMiAqIGkwXTtcbiAgICAgICAgY29uc3QgaTB5ID0gY29vcmRzWzIgKiBpMCArIDFdO1xuXG4gICAgICAgIG1pbkRpc3QgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBwb2ludCBjbG9zZXN0IHRvIHRoZSBzZWVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTApIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoaTB4LCBpMHksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCAmJiBkID4gMCkge1xuICAgICAgICAgICAgICAgIGkxID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaTF4ID0gY29vcmRzWzIgKiBpMV07XG4gICAgICAgIGxldCBpMXkgPSBjb29yZHNbMiAqIGkxICsgMV07XG5cbiAgICAgICAgbGV0IG1pblJhZGl1cyA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHRoaXJkIHBvaW50IHdoaWNoIGZvcm1zIHRoZSBzbWFsbGVzdCBjaXJjdW1jaXJjbGUgd2l0aCB0aGUgZmlyc3QgdHdvXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTAgfHwgaSA9PT0gaTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgciA9IGNpcmN1bXJhZGl1cyhpMHgsIGkweSwgaTF4LCBpMXksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyIDwgbWluUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgICAgIG1pblJhZGl1cyA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkyeCA9IGNvb3Jkc1syICogaTJdO1xuICAgICAgICBsZXQgaTJ5ID0gY29vcmRzWzIgKiBpMiArIDFdO1xuXG4gICAgICAgIGlmIChtaW5SYWRpdXMgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICAvLyBvcmRlciBjb2xsaW5lYXIgcG9pbnRzIGJ5IGR4IChvciBkeSBpZiBhbGwgeCBhcmUgaWRlbnRpY2FsKVxuICAgICAgICAgICAgLy8gYW5kIHJldHVybiB0aGUgbGlzdCBhcyBhIGh1bGxcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzdHNbaV0gPSAoY29vcmRzWzIgKiBpXSAtIGNvb3Jkc1swXSkgfHwgKGNvb3Jkc1syICogaSArIDFdIC0gY29vcmRzWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1aWNrc29ydCh0aGlzLl9pZHMsIHRoaXMuX2Rpc3RzLCAwLCBuIC0gMSk7XG4gICAgICAgICAgICBjb25zdCBodWxsID0gbmV3IFVpbnQzMkFycmF5KG4pO1xuICAgICAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGQwID0gLUluZmluaXR5OyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9pZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3RzW2lkXSA+IGQwKSB7XG4gICAgICAgICAgICAgICAgICAgIGh1bGxbaisrXSA9IGlkO1xuICAgICAgICAgICAgICAgICAgICBkMCA9IHRoaXMuX2Rpc3RzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmh1bGwgPSBodWxsLnN1YmFycmF5KDAsIGopO1xuICAgICAgICAgICAgdGhpcy50cmlhbmdsZXMgPSBuZXcgVWludDMyQXJyYXkoMCk7XG4gICAgICAgICAgICB0aGlzLmhhbGZlZGdlcyA9IG5ldyBVaW50MzJBcnJheSgwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgdGhlIG9yZGVyIG9mIHRoZSBzZWVkIHBvaW50cyBmb3IgY291bnRlci1jbG9ja3dpc2Ugb3JpZW50YXRpb25cbiAgICAgICAgaWYgKG9yaWVudChpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KSkge1xuICAgICAgICAgICAgY29uc3QgaSA9IGkxO1xuICAgICAgICAgICAgY29uc3QgeCA9IGkxeDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpMXk7XG4gICAgICAgICAgICBpMSA9IGkyO1xuICAgICAgICAgICAgaTF4ID0gaTJ4O1xuICAgICAgICAgICAgaTF5ID0gaTJ5O1xuICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgaTJ4ID0geDtcbiAgICAgICAgICAgIGkyeSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZW50ZXIgPSBjaXJjdW1jZW50ZXIoaTB4LCBpMHksIGkxeCwgaTF5LCBpMngsIGkyeSk7XG4gICAgICAgIHRoaXMuX2N4ID0gY2VudGVyLng7XG4gICAgICAgIHRoaXMuX2N5ID0gY2VudGVyLnk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3RzW2ldID0gZGlzdChjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSwgY2VudGVyLngsIGNlbnRlci55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNvcnQgdGhlIHBvaW50cyBieSBkaXN0YW5jZSBmcm9tIHRoZSBzZWVkIHRyaWFuZ2xlIGNpcmN1bWNlbnRlclxuICAgICAgICBxdWlja3NvcnQodGhpcy5faWRzLCB0aGlzLl9kaXN0cywgMCwgbiAtIDEpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgc2VlZCB0cmlhbmdsZSBhcyB0aGUgc3RhcnRpbmcgaHVsbFxuICAgICAgICB0aGlzLl9odWxsU3RhcnQgPSBpMDtcbiAgICAgICAgbGV0IGh1bGxTaXplID0gMztcblxuICAgICAgICBodWxsTmV4dFtpMF0gPSBodWxsUHJldltpMl0gPSBpMTtcbiAgICAgICAgaHVsbE5leHRbaTFdID0gaHVsbFByZXZbaTBdID0gaTI7XG4gICAgICAgIGh1bGxOZXh0W2kyXSA9IGh1bGxQcmV2W2kxXSA9IGkwO1xuXG4gICAgICAgIGh1bGxUcmlbaTBdID0gMDtcbiAgICAgICAgaHVsbFRyaVtpMV0gPSAxO1xuICAgICAgICBodWxsVHJpW2kyXSA9IDI7XG5cbiAgICAgICAgaHVsbEhhc2guZmlsbCgtMSk7XG4gICAgICAgIGh1bGxIYXNoW3RoaXMuX2hhc2hLZXkoaTB4LCBpMHkpXSA9IGkwO1xuICAgICAgICBodWxsSGFzaFt0aGlzLl9oYXNoS2V5KGkxeCwgaTF5KV0gPSBpMTtcbiAgICAgICAgaHVsbEhhc2hbdGhpcy5faGFzaEtleShpMngsIGkyeSldID0gaTI7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gPSAwO1xuICAgICAgICB0aGlzLl9hZGRUcmlhbmdsZShpMCwgaTEsIGkyLCAtMSwgLTEsIC0xKTtcblxuICAgICAgICBmb3IgKGxldCBrID0gMCwgeHAsIHlwOyBrIDwgdGhpcy5faWRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gdGhpcy5faWRzW2tdO1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG5cbiAgICAgICAgICAgIC8vIHNraXAgbmVhci1kdXBsaWNhdGUgcG9pbnRzXG4gICAgICAgICAgICBpZiAoayA+IDAgJiYgTWF0aC5hYnMoeCAtIHhwKSA8PSBFUFNJTE9OICYmIE1hdGguYWJzKHkgLSB5cCkgPD0gRVBTSUxPTikgY29udGludWU7XG4gICAgICAgICAgICB4cCA9IHg7XG4gICAgICAgICAgICB5cCA9IHk7XG5cbiAgICAgICAgICAgIC8vIHNraXAgc2VlZCB0cmlhbmdsZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChpID09PSBpMCB8fCBpID09PSBpMSB8fCBpID09PSBpMikgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgYSB2aXNpYmxlIGVkZ2Ugb24gdGhlIGNvbnZleCBodWxsIHVzaW5nIGVkZ2UgaGFzaFxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrZXkgPSB0aGlzLl9oYXNoS2V5KHgsIHkpOyBqIDwgdGhpcy5faGFzaFNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gaHVsbEhhc2hbKGtleSArIGopICUgdGhpcy5faGFzaFNpemVdO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPT0gLTEgJiYgc3RhcnQgIT09IGh1bGxOZXh0W3N0YXJ0XSkgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXJ0ID0gaHVsbFByZXZbc3RhcnRdO1xuICAgICAgICAgICAgbGV0IGUgPSBzdGFydCwgcTtcbiAgICAgICAgICAgIHdoaWxlIChxID0gaHVsbE5leHRbZV0sICFvcmllbnQoeCwgeSwgY29vcmRzWzIgKiBlXSwgY29vcmRzWzIgKiBlICsgMV0sIGNvb3Jkc1syICogcV0sIGNvb3Jkc1syICogcSArIDFdKSkge1xuICAgICAgICAgICAgICAgIGUgPSBxO1xuICAgICAgICAgICAgICAgIGlmIChlID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBlID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlID09PSAtMSkgY29udGludWU7IC8vIGxpa2VseSBhIG5lYXItZHVwbGljYXRlIHBvaW50OyBza2lwIGl0XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZmlyc3QgdHJpYW5nbGUgZnJvbSB0aGUgcG9pbnRcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5fYWRkVHJpYW5nbGUoZSwgaSwgaHVsbE5leHRbZV0sIC0xLCAtMSwgaHVsbFRyaVtlXSk7XG5cbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGZsaXAgdHJpYW5nbGVzIGZyb20gdGhlIHBvaW50IHVudGlsIHRoZXkgc2F0aXNmeSB0aGUgRGVsYXVuYXkgY29uZGl0aW9uXG4gICAgICAgICAgICBodWxsVHJpW2ldID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuICAgICAgICAgICAgaHVsbFRyaVtlXSA9IHQ7IC8vIGtlZXAgdHJhY2sgb2YgYm91bmRhcnkgdHJpYW5nbGVzIG9uIHRoZSBodWxsXG4gICAgICAgICAgICBodWxsU2l6ZSsrO1xuXG4gICAgICAgICAgICAvLyB3YWxrIGZvcndhcmQgdGhyb3VnaCB0aGUgaHVsbCwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZyByZWN1cnNpdmVseVxuICAgICAgICAgICAgbGV0IG4gPSBodWxsTmV4dFtlXTtcbiAgICAgICAgICAgIHdoaWxlIChxID0gaHVsbE5leHRbbl0sIG9yaWVudCh4LCB5LCBjb29yZHNbMiAqIG5dLCBjb29yZHNbMiAqIG4gKyAxXSwgY29vcmRzWzIgKiBxXSwgY29vcmRzWzIgKiBxICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKG4sIGksIHEsIGh1bGxUcmlbaV0sIC0xLCBodWxsVHJpW25dKTtcbiAgICAgICAgICAgICAgICBodWxsVHJpW2ldID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuICAgICAgICAgICAgICAgIGh1bGxOZXh0W25dID0gbjsgLy8gbWFyayBhcyByZW1vdmVkXG4gICAgICAgICAgICAgICAgaHVsbFNpemUtLTtcbiAgICAgICAgICAgICAgICBuID0gcTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd2FsayBiYWNrd2FyZCBmcm9tIHRoZSBvdGhlciBzaWRlLCBhZGRpbmcgbW9yZSB0cmlhbmdsZXMgYW5kIGZsaXBwaW5nXG4gICAgICAgICAgICBpZiAoZSA9PT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAocSA9IGh1bGxQcmV2W2VdLCBvcmllbnQoeCwgeSwgY29vcmRzWzIgKiBxXSwgY29vcmRzWzIgKiBxICsgMV0sIGNvb3Jkc1syICogZV0sIGNvb3Jkc1syICogZSArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5fYWRkVHJpYW5nbGUocSwgaSwgZSwgLTEsIGh1bGxUcmlbZV0sIGh1bGxUcmlbcV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgICAgIGh1bGxUcmlbcV0gPSB0O1xuICAgICAgICAgICAgICAgICAgICBodWxsTmV4dFtlXSA9IGU7IC8vIG1hcmsgYXMgcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICBodWxsU2l6ZS0tO1xuICAgICAgICAgICAgICAgICAgICBlID0gcTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgaHVsbCBpbmRpY2VzXG4gICAgICAgICAgICB0aGlzLl9odWxsU3RhcnQgPSBodWxsUHJldltpXSA9IGU7XG4gICAgICAgICAgICBodWxsTmV4dFtlXSA9IGh1bGxQcmV2W25dID0gaTtcbiAgICAgICAgICAgIGh1bGxOZXh0W2ldID0gbjtcblxuICAgICAgICAgICAgLy8gc2F2ZSB0aGUgdHdvIG5ldyBlZGdlcyBpbiB0aGUgaGFzaCB0YWJsZVxuICAgICAgICAgICAgaHVsbEhhc2hbdGhpcy5faGFzaEtleSh4LCB5KV0gPSBpO1xuICAgICAgICAgICAgaHVsbEhhc2hbdGhpcy5faGFzaEtleShjb29yZHNbMiAqIGVdLCBjb29yZHNbMiAqIGUgKyAxXSldID0gZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaHVsbCA9IG5ldyBVaW50MzJBcnJheShodWxsU2l6ZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBlID0gdGhpcy5faHVsbFN0YXJ0OyBpIDwgaHVsbFNpemU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5odWxsW2ldID0gZTtcbiAgICAgICAgICAgIGUgPSBodWxsTmV4dFtlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyaW0gdHlwZWQgdHJpYW5nbGUgbWVzaCBhcnJheXNcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0aGlzLl90cmlhbmdsZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgICAgICB0aGlzLmhhbGZlZGdlcyA9IHRoaXMuX2hhbGZlZGdlcy5zdWJhcnJheSgwLCB0aGlzLnRyaWFuZ2xlc0xlbik7XG4gICAgfVxuXG4gICAgX2hhc2hLZXkoeCwgeSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihwc2V1ZG9BbmdsZSh4IC0gdGhpcy5fY3gsIHkgLSB0aGlzLl9jeSkgKiB0aGlzLl9oYXNoU2l6ZSkgJSB0aGlzLl9oYXNoU2l6ZTtcbiAgICB9XG5cbiAgICBfbGVnYWxpemUoYSkge1xuICAgICAgICBjb25zdCB7X3RyaWFuZ2xlczogdHJpYW5nbGVzLCBfaGFsZmVkZ2VzOiBoYWxmZWRnZXMsIGNvb3Jkc30gPSB0aGlzO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGFyID0gMDtcblxuICAgICAgICAvLyByZWN1cnNpb24gZWxpbWluYXRlZCB3aXRoIGEgZml4ZWQtc2l6ZSBzdGFja1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgYiA9IGhhbGZlZGdlc1thXTtcblxuICAgICAgICAgICAgLyogaWYgdGhlIHBhaXIgb2YgdHJpYW5nbGVzIGRvZXNuJ3Qgc2F0aXNmeSB0aGUgRGVsYXVuYXkgY29uZGl0aW9uXG4gICAgICAgICAgICAgKiAocDEgaXMgaW5zaWRlIHRoZSBjaXJjdW1jaXJjbGUgb2YgW3AwLCBwbCwgcHJdKSwgZmxpcCB0aGVtLFxuICAgICAgICAgICAgICogdGhlbiBkbyB0aGUgc2FtZSBjaGVjay9mbGlwIHJlY3Vyc2l2ZWx5IGZvciB0aGUgbmV3IHBhaXIgb2YgdHJpYW5nbGVzXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogICAgICAgICAgIHBsICAgICAgICAgICAgICAgICAgICBwbFxuICAgICAgICAgICAgICogICAgICAgICAgL3x8XFwgICAgICAgICAgICAgICAgICAvICBcXFxuICAgICAgICAgICAgICogICAgICAgYWwvIHx8IFxcYmwgICAgICAgICAgICBhbC8gICAgXFxhXG4gICAgICAgICAgICAgKiAgICAgICAgLyAgfHwgIFxcICAgICAgICAgICAgICAvICAgICAgXFxcbiAgICAgICAgICAgICAqICAgICAgIC8gIGF8fGIgIFxcICAgIGZsaXAgICAgL19fX2FyX19fXFxcbiAgICAgICAgICAgICAqICAgICBwMFxcICAgfHwgICAvcDEgICA9PiAgIHAwXFwtLS1ibC0tLS9wMVxuICAgICAgICAgICAgICogICAgICAgIFxcICB8fCAgLyAgICAgICAgICAgICAgXFwgICAgICAvXG4gICAgICAgICAgICAgKiAgICAgICBhclxcIHx8IC9iciAgICAgICAgICAgICBiXFwgICAgL2JyXG4gICAgICAgICAgICAgKiAgICAgICAgICBcXHx8LyAgICAgICAgICAgICAgICAgIFxcICAvXG4gICAgICAgICAgICAgKiAgICAgICAgICAgcHIgICAgICAgICAgICAgICAgICAgIHByXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IGEwID0gYSAtIGEgJSAzO1xuICAgICAgICAgICAgYXIgPSBhMCArIChhICsgMikgJSAzO1xuXG4gICAgICAgICAgICBpZiAoYiA9PT0gLTEpIHsgLy8gY29udmV4IGh1bGwgZWRnZVxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSBicmVhaztcbiAgICAgICAgICAgICAgICBhID0gRURHRV9TVEFDS1stLWldO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBiMCA9IGIgLSBiICUgMztcbiAgICAgICAgICAgIGNvbnN0IGFsID0gYTAgKyAoYSArIDEpICUgMztcbiAgICAgICAgICAgIGNvbnN0IGJsID0gYjAgKyAoYiArIDIpICUgMztcblxuICAgICAgICAgICAgY29uc3QgcDAgPSB0cmlhbmdsZXNbYXJdO1xuICAgICAgICAgICAgY29uc3QgcHIgPSB0cmlhbmdsZXNbYV07XG4gICAgICAgICAgICBjb25zdCBwbCA9IHRyaWFuZ2xlc1thbF07XG4gICAgICAgICAgICBjb25zdCBwMSA9IHRyaWFuZ2xlc1tibF07XG5cbiAgICAgICAgICAgIGNvbnN0IGlsbGVnYWwgPSBpbkNpcmNsZShcbiAgICAgICAgICAgICAgICBjb29yZHNbMiAqIHAwXSwgY29vcmRzWzIgKiBwMCArIDFdLFxuICAgICAgICAgICAgICAgIGNvb3Jkc1syICogcHJdLCBjb29yZHNbMiAqIHByICsgMV0sXG4gICAgICAgICAgICAgICAgY29vcmRzWzIgKiBwbF0sIGNvb3Jkc1syICogcGwgKyAxXSxcbiAgICAgICAgICAgICAgICBjb29yZHNbMiAqIHAxXSwgY29vcmRzWzIgKiBwMSArIDFdKTtcblxuICAgICAgICAgICAgaWYgKGlsbGVnYWwpIHtcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXNbYV0gPSBwMTtcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXNbYl0gPSBwMDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGhibCA9IGhhbGZlZGdlc1tibF07XG5cbiAgICAgICAgICAgICAgICAvLyBlZGdlIHN3YXBwZWQgb24gdGhlIG90aGVyIHNpZGUgb2YgdGhlIGh1bGwgKHJhcmUpOyBmaXggdGhlIGhhbGZlZGdlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIGlmIChoYmwgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlID0gdGhpcy5faHVsbFN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faHVsbFRyaVtlXSA9PT0gYmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9odWxsVHJpW2VdID0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSB0aGlzLl9odWxsUHJldltlXTtcbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoZSAhPT0gdGhpcy5faHVsbFN0YXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluayhhLCBoYmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmsoYiwgaGFsZmVkZ2VzW2FyXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluayhhciwgYmwpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYnIgPSBiMCArIChiICsgMSkgJSAzO1xuXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgd29ycnkgYWJvdXQgaGl0dGluZyB0aGUgY2FwOiBpdCBjYW4gb25seSBoYXBwZW4gb24gZXh0cmVtZWx5IGRlZ2VuZXJhdGUgaW5wdXRcbiAgICAgICAgICAgICAgICBpZiAoaSA8IEVER0VfU1RBQ0subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIEVER0VfU1RBQ0tbaSsrXSA9IGJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIGJyZWFrO1xuICAgICAgICAgICAgICAgIGEgPSBFREdFX1NUQUNLWy0taV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXI7XG4gICAgfVxuXG4gICAgX2xpbmsoYSwgYikge1xuICAgICAgICB0aGlzLl9oYWxmZWRnZXNbYV0gPSBiO1xuICAgICAgICBpZiAoYiAhPT0gLTEpIHRoaXMuX2hhbGZlZGdlc1tiXSA9IGE7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgbmV3IHRyaWFuZ2xlIGdpdmVuIHZlcnRleCBpbmRpY2VzIGFuZCBhZGphY2VudCBoYWxmLWVkZ2UgaWRzXG4gICAgX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIGEsIGIsIGMpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMudHJpYW5nbGVzTGVuO1xuXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlc1t0XSA9IGkwO1xuICAgICAgICB0aGlzLl90cmlhbmdsZXNbdCArIDFdID0gaTE7XG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlc1t0ICsgMl0gPSBpMjtcblxuICAgICAgICB0aGlzLl9saW5rKHQsIGEpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAxLCBiKTtcbiAgICAgICAgdGhpcy5fbGluayh0ICsgMiwgYyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gKz0gMztcblxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG59XG5cbi8vIG1vbm90b25pY2FsbHkgaW5jcmVhc2VzIHdpdGggcmVhbCBhbmdsZSwgYnV0IGRvZXNuJ3QgbmVlZCBleHBlbnNpdmUgdHJpZ29ub21ldHJ5XG5mdW5jdGlvbiBwc2V1ZG9BbmdsZShkeCwgZHkpIHtcbiAgICBjb25zdCBwID0gZHggLyAoTWF0aC5hYnMoZHgpICsgTWF0aC5hYnMoZHkpKTtcbiAgICByZXR1cm4gKGR5ID4gMCA/IDMgLSBwIDogMSArIHApIC8gNDsgLy8gWzAuLjFdXG59XG5cbmZ1bmN0aW9uIGRpc3QoYXgsIGF5LCBieCwgYnkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gYng7XG4gICAgY29uc3QgZHkgPSBheSAtIGJ5O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuLy8gcmV0dXJuIDJkIG9yaWVudGF0aW9uIHNpZ24gaWYgd2UncmUgY29uZmlkZW50IGluIGl0IHRocm91Z2ggSi4gU2hld2NodWsncyBlcnJvciBib3VuZCBjaGVja1xuZnVuY3Rpb24gb3JpZW50SWZTdXJlKHB4LCBweSwgcngsIHJ5LCBxeCwgcXkpIHtcbiAgICBjb25zdCBsID0gKHJ5IC0gcHkpICogKHF4IC0gcHgpO1xuICAgIGNvbnN0IHIgPSAocnggLSBweCkgKiAocXkgLSBweSk7XG4gICAgcmV0dXJuIE1hdGguYWJzKGwgLSByKSA+PSAzLjMzMDY2OTA3Mzg3NTQ3MTZlLTE2ICogTWF0aC5hYnMobCArIHIpID8gbCAtIHIgOiAwO1xufVxuXG4vLyBhIG1vcmUgcm9idXN0IG9yaWVudGF0aW9uIHRlc3QgdGhhdCdzIHN0YWJsZSBpbiBhIGdpdmVuIHRyaWFuZ2xlICh0byBmaXggcm9idXN0bmVzcyBpc3N1ZXMpXG5mdW5jdGlvbiBvcmllbnQocngsIHJ5LCBxeCwgcXksIHB4LCBweSkge1xuICAgIGNvbnN0IHNpZ24gPSBvcmllbnRJZlN1cmUocHgsIHB5LCByeCwgcnksIHF4LCBxeSkgfHxcbiAgICBvcmllbnRJZlN1cmUocngsIHJ5LCBxeCwgcXksIHB4LCBweSkgfHxcbiAgICBvcmllbnRJZlN1cmUocXgsIHF5LCBweCwgcHksIHJ4LCByeSk7XG4gICAgcmV0dXJuIHNpZ24gPCAwO1xufVxuXG5mdW5jdGlvbiBpbkNpcmNsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gcHg7XG4gICAgY29uc3QgZHkgPSBheSAtIHB5O1xuICAgIGNvbnN0IGV4ID0gYnggLSBweDtcbiAgICBjb25zdCBleSA9IGJ5IC0gcHk7XG4gICAgY29uc3QgZnggPSBjeCAtIHB4O1xuICAgIGNvbnN0IGZ5ID0gY3kgLSBweTtcblxuICAgIGNvbnN0IGFwID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgYnAgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBjcCA9IGZ4ICogZnggKyBmeSAqIGZ5O1xuXG4gICAgcmV0dXJuIGR4ICogKGV5ICogY3AgLSBicCAqIGZ5KSAtXG4gICAgICAgICAgIGR5ICogKGV4ICogY3AgLSBicCAqIGZ4KSArXG4gICAgICAgICAgIGFwICogKGV4ICogZnkgLSBleSAqIGZ4KSA8IDA7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bXJhZGl1cyhheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSAwLjUgLyAoZHggKiBleSAtIGR5ICogZXgpO1xuXG4gICAgY29uc3QgeCA9IChleSAqIGJsIC0gZHkgKiBjbCkgKiBkO1xuICAgIGNvbnN0IHkgPSAoZHggKiBjbCAtIGV4ICogYmwpICogZDtcblxuICAgIHJldHVybiB4ICogeCArIHkgKiB5O1xufVxuXG5mdW5jdGlvbiBjaXJjdW1jZW50ZXIoYXgsIGF5LCBieCwgYnksIGN4LCBjeSkge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgZXggPSBjeCAtIGF4O1xuICAgIGNvbnN0IGV5ID0gY3kgLSBheTtcblxuICAgIGNvbnN0IGJsID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgY2wgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBkID0gMC41IC8gKGR4ICogZXkgLSBkeSAqIGV4KTtcblxuICAgIGNvbnN0IHggPSBheCArIChleSAqIGJsIC0gZHkgKiBjbCkgKiBkO1xuICAgIGNvbnN0IHkgPSBheSArIChkeCAqIGNsIC0gZXggKiBibCkgKiBkO1xuXG4gICAgcmV0dXJuIHt4LCB5fTtcbn1cblxuZnVuY3Rpb24gcXVpY2tzb3J0KGlkcywgZGlzdHMsIGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSAyMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gbGVmdCArIDE7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGlkc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEaXN0ID0gZGlzdHNbdGVtcF07XG4gICAgICAgICAgICBsZXQgaiA9IGkgLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPj0gbGVmdCAmJiBkaXN0c1tpZHNbal1dID4gdGVtcERpc3QpIGlkc1tqICsgMV0gPSBpZHNbai0tXTtcbiAgICAgICAgICAgIGlkc1tqICsgMV0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWVkaWFuID0gKGxlZnQgKyByaWdodCkgPj4gMTtcbiAgICAgICAgbGV0IGkgPSBsZWZ0ICsgMTtcbiAgICAgICAgbGV0IGogPSByaWdodDtcbiAgICAgICAgc3dhcChpZHMsIG1lZGlhbiwgaSk7XG4gICAgICAgIGlmIChkaXN0c1tpZHNbbGVmdF1dID4gZGlzdHNbaWRzW3JpZ2h0XV0pIHN3YXAoaWRzLCBsZWZ0LCByaWdodCk7XG4gICAgICAgIGlmIChkaXN0c1tpZHNbaV1dID4gZGlzdHNbaWRzW3JpZ2h0XV0pIHN3YXAoaWRzLCBpLCByaWdodCk7XG4gICAgICAgIGlmIChkaXN0c1tpZHNbbGVmdF1dID4gZGlzdHNbaWRzW2ldXSkgc3dhcChpZHMsIGxlZnQsIGkpO1xuXG4gICAgICAgIGNvbnN0IHRlbXAgPSBpZHNbaV07XG4gICAgICAgIGNvbnN0IHRlbXBEaXN0ID0gZGlzdHNbdGVtcF07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBkbyBpKys7IHdoaWxlIChkaXN0c1tpZHNbaV1dIDwgdGVtcERpc3QpO1xuICAgICAgICAgICAgZG8gai0tOyB3aGlsZSAoZGlzdHNbaWRzW2pdXSA+IHRlbXBEaXN0KTtcbiAgICAgICAgICAgIGlmIChqIDwgaSkgYnJlYWs7XG4gICAgICAgICAgICBzd2FwKGlkcywgaSwgaik7XG4gICAgICAgIH1cbiAgICAgICAgaWRzW2xlZnQgKyAxXSA9IGlkc1tqXTtcbiAgICAgICAgaWRzW2pdID0gdGVtcDtcblxuICAgICAgICBpZiAocmlnaHQgLSBpICsgMSA+PSBqIC0gbGVmdCkge1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgZGlzdHMsIGksIHJpZ2h0KTtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGRpc3RzLCBsZWZ0LCBqIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBkaXN0cywgbGVmdCwgaiAtIDEpO1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgZGlzdHMsIGksIHJpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3dhcChhcnIsIGksIGopIHtcbiAgICBjb25zdCB0bXAgPSBhcnJbaV07XG4gICAgYXJyW2ldID0gYXJyW2pdO1xuICAgIGFycltqXSA9IHRtcDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldFgocCkge1xuICAgIHJldHVybiBwWzBdO1xufVxuZnVuY3Rpb24gZGVmYXVsdEdldFkocCkge1xuICAgIHJldHVybiBwWzFdO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IElQb2ludCwgSUxpbmUgfSBmcm9tICcuLi9tb2RlbHMvY29tbW9uJztcbmltcG9ydCB7IGxlbmd0aEZyb21PcmlnaW4sIHNob3J0ZXN0UG9pbnRMaW5lVG9Qb2ludCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbnZleE1pbmtvd3NraVN1bSB9IGZyb20gJy4vbWlua293c2tpLXN1bSc7XG5cbmV4cG9ydCBlbnVtIERpc3RhbmNlQ2FsY3VsYXRpb25TdHJhdGVneSB7XG4gICAgQnJ1dGVGb3JjZSxcbiAgICBMaW5lYXIsIC8vIFRPRE9cbiAgICBMb2dhcml0aG1pYyAvLyBUT0RPXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2x5Z29uIGFuZCB0aGUgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXhQb2x5Z29uRGlzdGFuY2UgPSAocDogUG9seWdvbiwgcTogUG9seWdvbiwgc3RyYXRlZ3k6IERpc3RhbmNlQ2FsY3VsYXRpb25TdHJhdGVneSA9IERpc3RhbmNlQ2FsY3VsYXRpb25TdHJhdGVneS5CcnV0ZUZvcmNlKVxuOiB7XG4gICAgZGlzdGFuY2U6IG51bWJlcixcbiAgICB1bml0VmVjdG9yOiBJUG9pbnQsXG59ID0+IHtcbiAgICBjb25zdCBxTmVnID0gcS5uZWdhdGl2ZSgpO1xuXG4gICAgc3dpdGNoIChzdHJhdGVneSkge1xuICAgICAgICBjYXNlIERpc3RhbmNlQ2FsY3VsYXRpb25TdHJhdGVneS5CcnV0ZUZvcmNlOlxuICAgICAgICAgICAgY29uc3QgbXN1bSA9IGNvbnZleE1pbmtvd3NraVN1bShwLCBxTmVnKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYG1pbmtvd3NraSBzdW06ICR7SlNPTi5zdHJpbmdpZnkobXN1bSl9YCk7XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgdG8gcG9seWdvbiBzbyBwb2ludHMgYmVjb21lIHNvcnRlZFxuICAgICAgICAgICAgY29uc3QgcG9seSA9IFBvbHlnb24uZnJvbVBvaW50cyhtc3VtKTtcblxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VzV2l0aERpcmVjdGlvbnMgPSBwb2x5LnBvaW50cy5tYXAoKHAsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0geyBmcm9tOiBwLCB0bzogcG9seS5nZXROZXh0UG9pbnQoaSkgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0ZXN0UG9pbnRzID0gc2hvcnRlc3RQb2ludExpbmVUb1BvaW50KGxpbmUsIHsgeDogMCwgeTogMCB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGxlbmd0aEZyb21PcmlnaW4oc2hvcnRlc3RQb2ludHNbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNxcnREaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pdFZlY3RvciA9IHsgXG4gICAgICAgICAgICAgICAgICAgIHg6IChzaG9ydGVzdFBvaW50c1sxXS54IC0gc2hvcnRlc3RQb2ludHNbMF0ueCkgLyBzcXJ0RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIHk6IChzaG9ydGVzdFBvaW50c1sxXS55IC0gc2hvcnRlc3RQb2ludHNbMF0ueSkgLyBzcXJ0RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRpc3RhbmNlLCB1bml0VmVjdG9yIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlc1dpdGhEaXJlY3Rpb25zXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobWluLCBkaXN0KSA9PiBkaXN0LmRpc3RhbmNlIDwgbWluLmRpc3RhbmNlID8gZGlzdCA6IG1pbik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0cmF0ZWd5ICR7c3RyYXRlZ3l9IGhhcyBub3QgaW1wbGVtZW50ZWQgeWV0YCk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYW5nbGUgPSAoZnJvbTogSVBvaW50LCB0bzE6IElQb2ludCwgdG8yOiBJUG9pbnQpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0ICAgZHkxID0gdG8xLnkgLSBmcm9tLnksXG4gICAgICAgICAgICBkeDEgPSB0bzEueCAtIGZyb20ueCxcbiAgICAgICAgICAgIGR5MiA9IHRvMi55IC0gZnJvbS55LFxuICAgICAgICAgICAgZHgyID0gdG8yLnggLSBmcm9tLng7XG5cbiAgICBjb25zdCBkb3R5ID0gZHkxICogZHkyO1xuICAgIGNvbnN0IGRvdHggPSBkeDEgKiBkeDI7XG4gICAgY29uc3QgbGVuMSA9IE1hdGguc3FydCgoZHkxICogZHkxKSArIChkeDEgKiBkeDEpKTtcbiAgICBjb25zdCBsZW4yID0gTWF0aC5zcXJ0KChkeTIgKiBkeTIpICsgKGR4MiAqIGR4MikpO1xuICAgIFxuICAgIGNvbnN0IGFuZyA9IE1hdGguYWNvcygoZG90eCArIGRvdHkpIC8gKGxlbjEgKiBsZW4yKSk7XG5cbiAgICByZXR1cm4gYWJvdmUoeyBmcm9tLCB0bzogdG8xIH0sIHRvMikgPyBhbmcgOiAtYW5nO1xufVxuXG4vKipcbiAqIHJldHVybnMgcG9zaXRpdmUgbnVtYmVyIGlmIHBvaW50IGBwYCBpcyBsZWZ0IG9mIGxpbmUgYGxgXG4gKi9cbmV4cG9ydCBjb25zdCBkaXJlY3Rpb24gPSAobDogSUxpbmUsIHA6IElQb2ludCk6IG51bWJlciA9PlxuICAgICgobC50by54IC0gbC5mcm9tLngpICogKHAueSAtIGwuZnJvbS55KSkgLVxuICAgICgocC54IC0gbC5mcm9tLngpICogKGwudG8ueSAtIGwuZnJvbS55KSk7XG5cbmV4cG9ydCBjb25zdCBhYm92ZSA9IChsOiBJTGluZSwgcDogSVBvaW50KSA9PiBkaXJlY3Rpb24obCwgcCkgPiAwO1xuZXhwb3J0IGNvbnN0IGJlbG93ID0gKGw6IElMaW5lLCBwOiBJUG9pbnQpID0+IGRpcmVjdGlvbihsLCBwKSA8IDA7IiwiLyoqXG4gKiBUaGlzIG1vZHVsZSBpbXBsZW1lbnRzIE/igJlSb3Vya2UtQ2hpZW4tT2xzb24tTmFkZG9yIHBvbHlnb24gaW50ZXJzZWN0aW9uIGFsZ29yaXRobS5cbiAqIEhvd2V2ZXIsIGl0IG9ubHkgY2hlY2tzIGlmIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvbi4gXG4gKiBMYXRlciBpdCBjYW4gYmUgZXh0ZW5kZWQgdG8gY2FsY3VsYXRlIHRoZSBpbnRlcnNlY3Rpb24gYXJlYSBhcyB3ZWxsLlxuICovXG5pbXBvcnQgeyBlZGdlSW50ZXJzZWN0cywgSUVkZ2UsIGludGVyc2VjdGlvbkNvZWZmaWNpZW50cywgcG9pbnRMaW5lQ2xhc3NpZmljYXRpb24sIFNpZGUgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gXCIuLi9tb2RlbHMvcG9seWdvblwiXG5cbmV4cG9ydCBlbnVtIEFpbVN0YXRlIHtcblx0LyoqIE9ubHkgbGVmdCBlZGdlIGFpbXMgdG8gcmlnaHQgZWRnZSAqL1xuXHRMZWZ0ID0gXCJMZWZ0XCIsXG5cdFJpZ2h0ID0gXCJSaWdodFwiLFxuXHRCb3RoID0gXCJCb3RoXCIsXG5cdE5laXRoZXIgPSBcIk5laXRoZXJcIlxufVxuXG4vLyBUT0RPOiB0ZXN0IHRoaXNcbmV4cG9ydCBjb25zdCBnZXRBaW1TdGF0ZSA9IChlMTogSUVkZ2UsIGUyOiBJRWRnZSk6IEFpbVN0YXRlID0+IHtcblx0Y29uc3QgW8mRLCDJkV9dID0gaW50ZXJzZWN0aW9uQ29lZmZpY2llbnRzKGUxLCBlMik7XG5cblx0cmV0dXJuICjJkSA8IDApID9cblx0XHQoKMmRXyA8IDApID9cblx0XHRcdEFpbVN0YXRlLkJvdGggOlxuXHRcdFx0QWltU3RhdGUuTGVmdCkgOlxuXHRcdCgoyZFfIDwgMCkgP1xuXHRcdFx0QWltU3RhdGUuUmlnaHQgOlxuXHRcdFx0QWltU3RhdGUuTmVpdGhlcik7XG59XG5cbi8qKlxuICogU2VsZWN0cyB3aGljaCBlZGdlIHRvIGFkdmFuY2UgYmFzZWQgb24gdGhlIHN0YXR1c1xuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbGVmdCBlZGdlIHNob3VsZCBiZSBhZHZhbmNlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5jb25zdCBzZWxlY3RBZHZhbmNlID0gKGUxOiBJRWRnZSwgZTI6IElFZGdlKTogYm9vbGVhbiA9PiB7XG5cblx0Y29uc3QgYWltU3RhdGUgPSBnZXRBaW1TdGF0ZShlMSwgZTIpO1xuXG5cdHN3aXRjaCAoYWltU3RhdGUpIHtcblx0XHRjYXNlIEFpbVN0YXRlLkxlZnQ6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRjYXNlIEFpbVN0YXRlLlJpZ2h0OlxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdGNhc2UgQWltU3RhdGUuQm90aDoge1xuXHRcdFx0Y29uc3Qgc2lkZSA9IHBvaW50TGluZUNsYXNzaWZpY2F0aW9uKGUxLCBlMi50byk7XG5cdFx0XHRzd2l0Y2ggKHNpZGUpIHtcblx0XHRcdFx0Y2FzZSBTaWRlLlJpZ2h0OiByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGNhc2UgU2lkZS5MZWZ0OiByZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2FzZSBBaW1TdGF0ZS5OZWl0aGVyOiB7XG5cdFx0XHRjb25zdCBzaWRlID0gcG9pbnRMaW5lQ2xhc3NpZmljYXRpb24oZTEsIGUyLnRvKTtcblx0XHRcdHN3aXRjaCAoc2lkZSkge1xuXHRcdFx0XHRjYXNlIFNpZGUuUmlnaHQ6IHJldHVybiBmYWxzZTtcblx0XHRcdFx0Ly8gZWl0aGVyIGUxIGlzIHJpZ2h0IG9mIGUyLCBvciBuZWl0aGVyLiBFaXRoZXIgd2F5IHdlIGNhbiBzZWxlY3QgZTFcblx0XHRcdFx0Y2FzZSBTaWRlLkxlZnQ6IHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0d28gcG9seWdvbnMgaGFzIGludGVyc2VjdGlvbnMgb3Igbm90LiBcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBjb25zdCBwb2x5Z29uSW50ZXJzZWN0cyA9IChwMTogUG9seWdvbiwgcDI6IFBvbHlnb24pOiBib29sZWFuID0+IHtcblx0Y29uc3QgcFBvaW50cyA9IHAxLnBvaW50cztcblx0Y29uc3QgcVBvaW50cyA9IHAyLnBvaW50cztcblxuXHRsZXQgcFYgPSAxLCBxViA9IDE7XG5cblx0Y29uc3QgbmV4dFBJbmRleCA9ICgpID0+IChwViArIDEpICUgcFBvaW50cy5sZW5ndGg7XG5cdGNvbnN0IG5leHRRSW5kZXggPSAoKSA9PiAocVYgKyAxKSAlIHFQb2ludHMubGVuZ3RoO1xuXG5cdGNvbnN0IGN1cnJQRWRnZTogKCkgPT4gSUVkZ2UgPSAoKSA9PiAoeyBmcm9tOiBwUG9pbnRzW3BWXSwgdG86IHBQb2ludHNbbmV4dFBJbmRleCgpXSB9KTtcblx0Y29uc3QgY3VyclFFZGdlOiAoKSA9PiBJRWRnZSA9ICgpID0+ICh7IGZyb206IHFQb2ludHNbcVZdLCB0bzogcVBvaW50c1tuZXh0UUluZGV4KCldIH0pO1xuXG5cdGNvbnN0IG1heEl0ZXJhdGlvbnMgPSAzICogKHBQb2ludHMubGVuZ3RoICsgcVBvaW50cy5sZW5ndGgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbWF4SXRlcmF0aW9uczsgaSArPSAxKSB7XG5cdFx0aWYgKGVkZ2VJbnRlcnNlY3RzKGN1cnJQRWRnZSgpLCBjdXJyUUVkZ2UoKSkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFkdmFuY2VMZWZ0ID0gc2VsZWN0QWR2YW5jZShjdXJyUEVkZ2UoKSwgY3VyclFFZGdlKCkpO1xuXG5cdFx0aWYgKGFkdmFuY2VMZWZ0KSB7XG5cdFx0XHRwViA9IG5leHRQSW5kZXgoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cVYgPSBuZXh0UUluZGV4KCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL21vZGVscy9jb21tb24nO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL21vZGVscy9wb2x5Z29uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZleE1pbmtvd3NraVN1bShBOiBQb2x5Z29uLCBCOiBQb2x5Z29uKTogSVBvaW50W10ge1xuICAgIGNvbnN0IHBvaW50czogSVBvaW50W10gPSBbXTtcblxuICAgIGZvciAobGV0IHAxIG9mIEEucG9pbnRzKSB7XG4gICAgICAgIGZvciAobGV0IHAyIG9mIEIucG9pbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBzdW1QID0geyB4OiBwMS54ICsgcDIueCwgeTogcDEueSArIHAyLnkgfTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHN1bVApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbn1cblxuIiwiaW1wb3J0IHsgcG9pbnRUb0FycmF5IH0gZnJvbSAnLi4vaGVscGVycy90dXJmJztcbmltcG9ydCB7IElFZGdlLCBJTGluZSwgSVBvaW50LCBJUmVjdGFuZ2xlIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1vbic7XG5pbXBvcnQgeyBEZWxhdW5heSB9IGZyb20gJ2QzLWRlbGF1bmF5JztcblxuZXhwb3J0IGNvbnN0IGZpbmROZWlnaGJvcnMgPSAoZnJhbWU6IElSZWN0YW5nbGUsIGNlbnRlcnM6IElQb2ludFtdKTogbnVtYmVyW11bXSA9PiB7XG4gICAgXG4gICAgY29uc3QgY2VudGVyc01hcHBlZCA9IGNlbnRlcnMubWFwKHBvaW50VG9BcnJheSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjZW50ZXJzTWFwcGVkKSk7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZnJhbWUpKTtcblxuICAgIGNvbnN0IG5laWdoYm9yczogbnVtYmVyW11bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGNlbnRlcnMubGVuZ3RoIH0sXG4gICAgICAgICgpID0+IFtdKTtcblxuICAgIGNvbnN0IGRlbGF1bmF5ID0gRGVsYXVuYXkuZnJvbShjZW50ZXJzTWFwcGVkKTtcbiAgICBjb25zdCB2b3Jvbm9pID0gZGVsYXVuYXkudm9yb25vaShbTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJdKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VudGVycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIHZvcm9ub2kubmVpZ2hib3JzKGkpKSB7XG4gICAgICAgICAgICBuZWlnaGJvcnNbaV0ucHVzaChuZWlnaGJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuZWlnaGJvcnMpKTtcblxuICAgIHJldHVybiBuZWlnaGJvcnM7XG59XG5cbmNvbnN0IHJlY3RUb0Jib3ggPSAoXzogSVJlY3RhbmdsZSkgPT4gXG4gICAgKHtcbiAgICAgICAgeGw6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLCB4cjogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgICAgIHlsOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiwgeXI6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIH0pOyIsImltcG9ydCB7IElMaW5lLCBJUG9pbnQsIElSZWN0YW5nbGUgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gXCIuLi9tb2RlbHMvcG9seWdvblwiO1xuaW1wb3J0IHsgRW1iZWRkZXJPcHRpb25zLCBMYXlvdXRGbiwgUG9seUdyYXBoIH0gZnJvbSBcIi4vaWVtYmVkZGVyXCI7XG5pbXBvcnQgeyBjb252ZXhQb2x5Z29uRGlzdGFuY2UgfSBmcm9tIFwiLi4vYWxnb3JpdGhtcy9jb252ZXgtcG9seWdvbi1kaXN0YW5jZVwiO1xuaW1wb3J0IHsgZGlyZWN0aW9uLCBsZW5ndGhGcm9tT3JpZ2luLCBzbG9wZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGNvbnN0cnVjdEVkZ2VzLCBEaXN0YW5jZURldGVjdGlvblR5cGUgfSBmcm9tIFwiLi4vcG9zZVwiO1xuaW1wb3J0IHsgcG9seWdvbkludGVyc2VjdHMgfSBmcm9tIFwiLi4vYWxnb3JpdGhtcy9jb252ZXgtcG9seWdvbi1pbnRlcnNlY3Rpb25cIjtcblxuZW51bSBGb3JjZVR5cGUge1xuICAgIE5vcm1hbCxcbiAgICBJbnRlcnNlY3Rpb24sXG59XG5cbmV4cG9ydCBjb25zdCBiYXNpY0VtYmVkOiBMYXlvdXRGbiA9IChjb21wb25lbnRzOiBQb2x5R3JhcGgsIG9wdGlvbnM6IEVtYmVkZGVyT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IEFUVFJBQ1RJVkVfQ09OU1RBTlQgPSBvcHRpb25zLmNvbXBvbmVudFNwYWNpbmcsIFJFUFVMU0lWRV9DT05TVEFOVCA9IG9wdGlvbnMuY29tcG9uZW50U3BhY2luZyAqKiAyO1xuICAgIGNvbnN0IENPTlZFUkdFTkNFX1RIUkVTSE9MRCA9IDE7XG4gICAgY29uc3QgRURHRV9USFJFU0hPTEQgPSA1O1xuICAgIGNvbnN0IE1BWF9GT1JDRSA9IEFUVFJBQ1RJVkVfQ09OU1RBTlQ7XG5cbiAgICBjb25zdCBtYWtlRm9yY2UgPSAobXVsdGlwbGllcjogKG46IG51bWJlcikgPT4gbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiAocDE6IFBvbHlnb24sIHAyOiBQb2x5Z29uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRpc3RhbmNlLCB1bml0VmVjdG9yIH0gPSBjb252ZXhQb2x5Z29uRGlzdGFuY2UocDEsIHAyKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGRpc3RhbmNlOiAke2Rpc3RhbmNlfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVkRm9yY2UgPSBtdWx0aXBsaWVyKGRpc3RhbmNlKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcmNlID0gTWF0aC5hYnMoY2FsY3VsYXRlZEZvcmNlKSA8IE1BWF9GT1JDRSA/XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZEZvcmNlIDpcbiAgICAgICAgICAgICAgICBNQVhfRk9SQ0UgKiBNYXRoLnNpZ24oY2FsY3VsYXRlZEZvcmNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHsgeDogdW5pdFZlY3Rvci54ICogZm9yY2UsIHk6IHVuaXRWZWN0b3IueSAqIGZvcmNlIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGF0dHJhY3RpdmVGb3JjZSA9IG1ha2VGb3JjZShuID0+IDMgKiBNYXRoLmxvZzIoTWF0aC5zcXJ0KG4pIC8gQVRUUkFDVElWRV9DT05TVEFOVCkpO1xuICAgIFxuICAgIGNvbnN0IHJlcHVsc2l2ZUZvcmNlID0gbWFrZUZvcmNlKG4gPT4gLSgoUkVQVUxTSVZFX0NPTlNUQU5UIC8gbikgLSAxKSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBpbnRlcnNlY3Rpb24gY2FzZVxuICAgICAqIEBwYXJhbSBmIGRpc3BsYWNlbWVudCBmdW5jdGlvbiB3aXRob3V0IGNvbnNpZGVyaW5nIGludGVyc2VjdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGRpc3BsYWNlbWVudFdyYXBwZXIgPSAocDFJbmRleDogbnVtYmVyLCBwMkluZGV4OiBudW1iZXIsIGY6IChwMTogUG9seWdvbiwgcDI6IFBvbHlnb24pID0+IElQb2ludCk6IHsgZm9yY2U6IElQb2ludCwgdHlwZTogRm9yY2VUeXBlIH0gPT4ge1xuICAgICAgICBjb25zdCBbcDEsIHAyXSA9IFtjb21wb25lbnRzLm5vZGVzW3AxSW5kZXhdLCBjb21wb25lbnRzLm5vZGVzW3AySW5kZXhdXTtcblx0XHRjb25zdCBoYXNJbnRlcnNlY3Rpb24gPSBwb2x5Z29uSW50ZXJzZWN0cyhwMSwgcDIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFoYXNJbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7IGZvcmNlOiBmKHAxLCBwMiksIHR5cGU6IEZvcmNlVHlwZS5Ob3JtYWwgfTtcbiAgICAgICAgfSBlbHNlIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGBpbnRlcnNlY3Rpb24gYmV0d2VlbiAke3AxSW5kZXh9IGFuZCAke3AySW5kZXh9YCk7XG4gICAgICAgICAgICAvLyBBbHdheXMgbW92ZSA1IHVuaXRzIGlmIGludGVyc2VjdGlvbiBvY2N1cnNcbiAgICAgICAgICAgIGNvbnN0IG1pbkZvcmNlID0gb3B0aW9ucy5jb21wb25lbnRTcGFjaW5nO1xuXG4gICAgICAgICAgICBjb25zdCBjZW50ZXJMaW5lID0geyBmcm9tOiBwMS5jZW50ZXIsIHRvOiBwMi5jZW50ZXIgfTtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGRpcmVjdGlvbihjZW50ZXJMaW5lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgXG4gICAgICAgICAgICAgICAgZm9yY2U6IHsgeDogLWRpci54ICogbWluRm9yY2UsIHk6IC1kaXIueSAqIG1pbkZvcmNlIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogRm9yY2VUeXBlLkludGVyc2VjdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUF0dHJhY3RpdmVGb3JjZXMgPSAoY29tcG9uZW50czogUG9seUdyYXBoLCBmb3JjZXM6IElQb2ludFtdLCBpbnRlcnNlY3Rpb25Gb3JjZXM6IElQb2ludFtdKSA9PiB7XG4gICAgICAgIGZvciAobGV0IFtmcm9tLCBuZWlnaGJvcnNdIG9mIGNvbXBvbmVudHMuZWRnZXMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB0byBvZiBuZWlnaGJvcnMpIHsgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZm9yY2UsIHR5cGUgfSA9IGRpc3BsYWNlbWVudFdyYXBwZXIoZnJvbSwgdG8sIGF0dHJhY3RpdmVGb3JjZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZUFycmF5ID0gdHlwZSA9PT0gRm9yY2VUeXBlLk5vcm1hbCA/IGZvcmNlcyA6IGludGVyc2VjdGlvbkZvcmNlcztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yY2VBcnJheVtmcm9tXS54ICs9IGZvcmNlLng7XG4gICAgICAgICAgICAgICAgZm9yY2VBcnJheVtmcm9tXS55ICs9IGZvcmNlLnk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvcmNlQXJyYXlbdG9dLnggLT0gZm9yY2UueDtcbiAgICAgICAgICAgICAgICBmb3JjZUFycmF5W3RvXS55IC09IGZvcmNlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYXBwbHlSZXB1bHNpdmVGb3JjZXMgPSAoY29tcG9uZW50czogUG9seUdyYXBoLCBmb3JjZXM6IElQb2ludFtdLCBpbnRlcnNlY3Rpb25Gb3JjZXM6IElQb2ludFtdKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLnR5cGUgPT09IERpc3RhbmNlRGV0ZWN0aW9uVHlwZS5CQVNJQykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZXNMZW4gPSBjb21wb25lbnRzLm5vZGVzLmxlbmd0aDsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXNMZW47ICsraSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IG5vZGVzTGVuOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm90IGNvbm5lY3RlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50cy5lZGdlc1tpXS5maW5kKG4gPT4gbiA9PT0gaikgIT09IHVuZGVmaW5lZCkgeyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBmb3JjZSwgdHlwZSB9ID0gZGlzcGxhY2VtZW50V3JhcHBlcihpLCBqLCByZXB1bHNpdmVGb3JjZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9yY2VBcnJheSA9IHR5cGUgPT09IEZvcmNlVHlwZS5Ob3JtYWwgPyBmb3JjZXMgOiBpbnRlcnNlY3Rpb25Gb3JjZXM7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VBcnJheVtpXS54ICs9IGZvcmNlLng7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZUFycmF5W2ldLnkgKz0gZm9yY2UueTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlQXJyYXlbal0ueCAtPSBmb3JjZS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VBcnJheVtqXS55IC09IGZvcmNlLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1vdmVGbiA9IG9wdGlvbnMudHlwZSA9PT0gRGlzdGFuY2VEZXRlY3Rpb25UeXBlLkdSSURfU1FVQVJFID9cbiAgICAgICAgb3B0aW9ucy5kZXRlY3Rpb24ubW92ZSA6XG4gICAgICAgIChpbmRleDogbnVtYmVyLCBkaXNwbGFjZW1lbnQ6IElQb2ludCkgPT4geyBjb21wb25lbnRzLm5vZGVzW2luZGV4XS5tb3ZlKGRpc3BsYWNlbWVudCk7IH07XG5cbiAgICBjb25zdCB0dXJuRm9yY2VzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogY29tcG9uZW50cy5ub2Rlcy5sZW5ndGggfSwgKCkgPT4gKHsgeDogMCwgeTogMCB9KSk7XG4gICAgY29uc3QgaW50ZXJzZWN0aW9uRm9yY2VzOiBJUG9pbnRbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGNvbXBvbmVudHMubm9kZXMubGVuZ3RoIH0sICgpID0+ICh7IHg6IDAsIHk6IDAgfSkpO1xuXG4gICAgY29uc3Qgc2luZ2xlU3RlcCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaGFzSW50ZXJzZWN0aW9uRm9yY2UgPSAoaTogbnVtYmVyKTogYm9vbGVhbiA9PlxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uRm9yY2VzW2ldLnggIT09IDAgfHwgaW50ZXJzZWN0aW9uRm9yY2VzW2ldLnkgIT09IDA7XG5cbiAgICAgICAgYXBwbHlBdHRyYWN0aXZlRm9yY2VzKGNvbXBvbmVudHMsIHR1cm5Gb3JjZXMsIGludGVyc2VjdGlvbkZvcmNlcyk7XG4gICAgICAgIFxuICAgICAgICBhcHBseVJlcHVsc2l2ZUZvcmNlcyhjb21wb25lbnRzLCB0dXJuRm9yY2VzLCBpbnRlcnNlY3Rpb25Gb3JjZXMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHR1cm5Ub3RhbEZvcmNlID0gMDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZm9yY2VzOiAke0pTT04uc3RyaW5naWZ5KHR1cm5Gb3JjZXMpfWApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5ub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgZm9yY2UgPSBoYXNJbnRlcnNlY3Rpb25Gb3JjZShpKSA/IGludGVyc2VjdGlvbkZvcmNlc1tpXSA6IHR1cm5Gb3JjZXNbaV07XG5cbiAgICAgICAgICAgIG1vdmVGbihpLCBmb3JjZSk7XG4gICAgICAgICAgICB0dXJuVG90YWxGb3JjZSArPSBsZW5ndGhGcm9tT3JpZ2luKGZvcmNlKTtcblxuICAgICAgICAgICAgdHVybkZvcmNlc1tpXS54ID0gMDtcbiAgICAgICAgICAgIHR1cm5Gb3JjZXNbaV0ueSA9IDA7XG5cbiAgICAgICAgICAgIGludGVyc2VjdGlvbkZvcmNlc1tpXS54ID0gMDtcbiAgICAgICAgICAgIGludGVyc2VjdGlvbkZvcmNlc1tpXS55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF2ZXJhZ2VGb3JjZSA9IHR1cm5Ub3RhbEZvcmNlIC8gY29tcG9uZW50cy5ub2Rlcy5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIGF2ZXJhZ2VGb3JjZTtcbiAgICB9O1xuXG4gICAgaWYgKG9wdGlvbnMuc3RlcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBvcHRpb25zLnN0ZXA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcDsgKytpKSB7XG4gICAgICAgICAgICBzaW5nbGVTdGVwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWRnZUNvdW50ZXIgPSAwO1xuXG4gICAgICAgIGNvbnN0IElURVJBVElPTiA9IDEwMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IElURVJBVElPTjsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBhdmVyYWdlRm9yY2UgPSBzaW5nbGVTdGVwKCk7XG4gICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQXZlcmFnZSBmb3JjZTogJHthdmVyYWdlRm9yY2V9YCk7XG5cbiAgICAgICAgICAgIGVkZ2VDb3VudGVyICs9IDE7XG4gICAgXG4gICAgICAgICAgICAvKiBpZiAoIWhhc0ludGVyc2VjdGlvbiAmJiBhdmVyYWdlRm9yY2UgPD0gQ09OVkVSR0VOQ0VfVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSAqL1xuXG4gICAgICAgICAgICBpZiAoZWRnZUNvdW50ZXIgPj0gRURHRV9USFJFU0hPTEQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJlY2FsY3VsYXRpbmcgZWRnZXMuLi5cIik7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5lZGdlcyA9IGNvbnN0cnVjdEVkZ2VzKGNvbXBvbmVudHMubm9kZXMpO1xuICAgICAgICAgICAgICAgIGVkZ2VDb3VudGVyID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHBhbmRMaW5lID0gKGxpbmU6IElMaW5lLCBiYm94OiBJUmVjdGFuZ2xlKTogSUxpbmUgPT4ge1xuICAgIGlmIChsaW5lLmZyb20ueCAhPT0gbGluZS50by54KSB7XG4gICAgICAgIGNvbnN0IGxpbmVTbG9wZSA9IHNsb3BlKGxpbmUpO1xuXG4gICAgICAgIGlmIChsaW5lLmZyb20ueCA8IGxpbmUudG8ueCkge1xuICAgICAgICAgICAgY29uc3QgbGVmdFAgPSBsaW5lLmZyb207XG4gICAgICAgICAgICBjb25zdCByaWdodFAgPSBsaW5lLnRvO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZyb206IGJib3gubWluWCA8IGxlZnRQLnggP1xuICAgICAgICAgICAgICAgICAgICAoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBiYm94Lm1pblg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdZID0gbGluZS50by55IC0gbGluZVNsb3BlICogKGxpbmUudG8ueCAtIG5ld1gpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKCkpIDpcbiAgICAgICAgICAgICAgICAgICAgbGVmdFAsXG4gICAgICAgICAgICAgICAgdG86IGJib3gubWF4WCA+IHJpZ2h0UC54ID9cbiAgICAgICAgICAgICAgICAgICAgKCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gYmJveC5tYXhYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WSA9IGxpbmUuZnJvbS55ICsgbGluZVNsb3BlICogKG5ld1ggLSBsaW5lLmZyb20ueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkoKSkgOlxuICAgICAgICAgICAgICAgICAgICByaWdodFAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGVmdFAgPSBsaW5lLnRvO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRQID0gbGluZS5mcm9tO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZyb206IGJib3gubWF4WCA+IHJpZ2h0UC54ID9cbiAgICAgICAgICAgICAgICAgICAgKCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gYmJveC5tYXhYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WSA9IGxpbmUudG8ueSAtIGxpbmVTbG9wZSAqIChsaW5lLnRvLnggLSBuZXdYKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogbmV3WCwgeTogbmV3WSB9O1xuICAgICAgICAgICAgICAgICAgICB9KSgpKSA6XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0UCxcbiAgICAgICAgICAgICAgICB0bzogYmJveC5taW5YIDwgbGVmdFAueCA/XG4gICAgICAgICAgICAgICAgICAgICgoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WCA9IGJib3gubWluWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBsaW5lLmZyb20ueSArIGxpbmVTbG9wZSAqIChuZXdYIC0gbGluZS5mcm9tLngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKCkpIDpcbiAgICAgICAgICAgICAgICAgICAgbGVmdFAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRWRnZSBjYXNlLCBpZiBsaW5lIGlzIHZlcnRpY2FsLCBtdXN0IGV4cGFuZCB2ZXJ0aWNhbGx5XG5cbiAgICAgICAgaWYgKGxpbmUuZnJvbS55IDwgbGluZS50by55KSB7XG4gICAgICAgICAgICBjb25zdCBtaW5ZUCA9IGxpbmUuZnJvbTtcbiAgICAgICAgICAgIGNvbnN0IG1heFlQID0gbGluZS50bztcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmcm9tOiBiYm94Lm1pblkgPCBtaW5ZUC55ID9cbiAgICAgICAgICAgICAgICAgICAgeyB4OiBtaW5ZUC54LCB5OiBiYm94Lm1pblkgfSA6XG4gICAgICAgICAgICAgICAgICAgIG1pbllQLFxuICAgICAgICAgICAgICAgIHRvOiBiYm94Lm1heFkgPiBtYXhZUC55ID9cbiAgICAgICAgICAgICAgICAgICAgeyB4OiBtYXhZUC54LCB5OiBiYm94Lm1heFkgfSA6XG4gICAgICAgICAgICAgICAgICAgIG1heFlQLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbllQID0gbGluZS50bztcbiAgICAgICAgICAgIGNvbnN0IG1heFlQID0gbGluZS5mcm9tO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZyb206IGJib3gubWF4WSA+IG1heFlQLnkgPyBcbiAgICAgICAgICAgICAgICAgICAgeyB4OiBtYXhZUC54LCB5OiBiYm94Lm1heFkgfSA6XG4gICAgICAgICAgICAgICAgICAgIG1heFlQLFxuICAgICAgICAgICAgICAgIHRvOiBiYm94Lm1pblkgPCBtaW5ZUC55ID9cbiAgICAgICAgICAgICAgICAgICAgeyB4OiBtaW5ZUC54LCB5OiBiYm94Lm1pblkgfSA6XG4gICAgICAgICAgICAgICAgICAgIG1pbllQLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07IiwiaW1wb3J0IHsgRmVhdHVyZSwgbGluZVN0cmluZywgcG9seWdvbiwgUHJvcGVydGllcywgUG9seWdvbiBhcyBUdXJmUG9seSwgTGluZVN0cmluZywgUG9pbnQsIEZlYXR1cmVDb2xsZWN0aW9uLCBCQm94IH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBJTGluZSwgSVBvaW50LCBJUmVjdGFuZ2xlIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1vbic7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xuXG5leHBvcnQgY29uc3QgcG9pbnRUb0FycmF5ID0gKHBvaW50OiBJUG9pbnQpOiBbbnVtYmVyLCBudW1iZXJdID0+XG4gICAgWyBwb2ludC54LCBwb2ludC55IF07XG5cbmV4cG9ydCBjb25zdCBhcnJheVRvUG9pbnQgPSAoWyB4LCB5IF06IFtudW1iZXIsIG51bWJlcl0pID0+XG4gICAgKHsgeCwgeSB9KTtcblxuLyoqXG4gKiBjb252ZXJ0cyBbIHsgeCwgeSB9IF0gdG8gW3gsIHldIGZvcm1cbiAqIEBwYXJhbSBwb2ludHMgXG4gKi9cbmV4cG9ydCBjb25zdCB0b0dlb0pTT04gPSAocG9pbnRzOiBJUG9pbnRbXSk6IFtudW1iZXIsIG51bWJlcl1bXSA9PiBcbiAgICBwb2ludHMubWFwKHBvaW50VG9BcnJheSk7XG5cbmV4cG9ydCBjb25zdCB0dXJmTGluZSA9IChsaW5lOiBJTGluZSkgPT5cbiAgICBsaW5lU3RyaW5nKFsgcG9pbnRUb0FycmF5KGxpbmUuZnJvbSksIHBvaW50VG9BcnJheShsaW5lLnRvKSBdKTtcblxuZXhwb3J0IGNvbnN0IHR1cmZQb2x5ICA9IChwb2x5OiBQb2x5Z29uKSA9PiB7XG4gICAgY29uc3QgcFBvaW50cyA9IHBvbHkucG9pbnRzO1xuICAgIC8vIEZvciBzb21lIHJlYXNvbiBwb2x5LmdldFBvaW50KDApIGlzIGRpZmZlcmVudCB0aGVuIHBvbHkucG9pbnRzWzBdXG4gICAgcmV0dXJuIHBvbHlnb24oWyB0b0dlb0pTT04oWyAuLi5wUG9pbnRzLCBwUG9pbnRzWzBdIF0pIF0pO1xufVxuXG5leHBvcnQgY29uc3QgdHVyZkJib3hUb1JlY3RhbmdsZSA9ICh0dXJmQmJveDogQkJveCk6IElSZWN0YW5nbGUgPT5cbiAgICAoeyBcbiAgICAgICAgbWluWDogdHVyZkJib3hbMF0sIG1pblk6IHR1cmZCYm94WzFdLFxuICAgICAgICBtYXhYOiB0dXJmQmJveFsyXSwgbWF4WTogdHVyZkJib3hbM10sXG4gICAgfSk7XG5cbmV4cG9ydCBjb25zdCBmcm9tVHVyZkxpbmUgPSAodHVyZkxpbmU6IEZlYXR1cmVDb2xsZWN0aW9uPFBvaW50Pik6IElMaW5lIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0dXJmTGluZS5mZWF0dXJlcztcblxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZyb21Db29yZCA9IGNvb3JkaW5hdGVzWzBdLmdlb21ldHJ5Py5jb29yZGluYXRlcyBhcyBbbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IHRvQ29vcmQgPSBjb29yZGluYXRlc1sxXS5nZW9tZXRyeT8uY29vcmRpbmF0ZXMgYXMgW251bWJlciwgbnVtYmVyXSB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChmcm9tQ29vcmQgJiYgdG9Db29yZCkge1xuICAgICAgICByZXR1cm4geyBcbiAgICAgICAgICAgIGZyb206IGFycmF5VG9Qb2ludChmcm9tQ29vcmQpLCBcbiAgICAgICAgICAgIHRvOiBhcnJheVRvUG9pbnQodG9Db29yZCksIFxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHVyZkxpbmUgaGFzIG51bGwgcG9pbnRzJyk7ICAgXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZnJvbVR1cmZQb2ludCA9ICh0dXJmUG9pbnQ6IEZlYXR1cmU8UG9pbnQ+KTogSVBvaW50ID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHR1cmZQb2ludC5nZW9tZXRyeT8uY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogY29vcmRpbmF0ZXNbMF0sIHk6IGNvb3JkaW5hdGVzWzFdIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0dXJmUG9pbnQuZ2VvbWV0cnkgaXMgbnVsbCcpO1xuICAgIH1cbn0iLCJleHBvcnQgdHlwZSBJUG9pbnQgPSB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlclxufTtcblxuZXhwb3J0IHR5cGUgSUxpbmUgPSB7XG4gICAgZnJvbTogSVBvaW50LFxuICAgIHRvOiBJUG9pbnQsXG59O1xuXG5leHBvcnQgdHlwZSBJUmVjdGFuZ2xlID0ge1xuICAgIG1pblg6IG51bWJlcixcbiAgICBtYXhYOiBudW1iZXIsXG4gICAgbWluWTogbnVtYmVyLFxuICAgIG1heFk6IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIElOb2RlID0ge1xuICAgIG1pbjogSVBvaW50LFxuICAgIG1heDogSVBvaW50LFxufTtcblxuZXhwb3J0IHR5cGUgSUVkZ2U8VCA9IElQb2ludD4gPSB7XG4gICAgZnJvbTogVCxcbiAgICB0bzogVCxcbn07XG5cbmV4cG9ydCB0eXBlIElHcmFwaCA9IHtcbiAgICBub2RlczogSU5vZGVbXSxcbiAgICBlZGdlczogSUVkZ2VbXTtcbn07XG5cbmV4cG9ydCBlbnVtIFNpZGUge1xuXHRMZWZ0ID0gXCJMZWZ0XCIsXG5cdFJpZ2h0ID0gXCJSaWdodFwiLFxufVxuXG5leHBvcnQgY29uc3QgcG9pbnRNdWx0U2NhbGFyID0gKHA6IElQb2ludCwgbjogbnVtYmVyKTogSVBvaW50ID0+IFxuXHQoeyB4OiBwLnggKiBuLCB5OiBwLnkgKiBuIH0pO1xuXG4vKiogcDEgKyBwMiAqL1xuZXhwb3J0IGNvbnN0IHBvaW50QWRkID0gKHAxOiBJUG9pbnQsIHAyOiBJUG9pbnQpOiBJUG9pbnQgPT4gXG5cdCh7IHg6IHAxLnggKyBwMi54LCB5OiBwMS55ICsgcDIueSB9KTtcblxuLyoqIHAxIC0gcDIgKi9cbmV4cG9ydCBjb25zdCBkaWZmID0gKHAxOiBJUG9pbnQsIHAyOiBJUG9pbnQpOiBJUG9pbnQgPT5cblx0KHsgeDogcDEueCAtIHAyLngsIHk6IHAxLnkgLSBwMi55IH0pO1xuXG5leHBvcnQgY29uc3QgY3Jvc3MgPSAoeyB4OiB4MSwgeTogeTEgfTogSVBvaW50LCB7IHg6IHgyLCB5OiB5MiB9OiBJUG9pbnQpOiBudW1iZXIgPT5cblx0KCh4MSAqIHkyKSAtICh5MSAqIHgyKSk7XG5cbmV4cG9ydCBjb25zdCBwb2ludExpbmVDbGFzc2lmaWNhdGlvbiA9IChlZGdlOiBJRWRnZSwgcG9pbnQ6IElQb2ludCk6IFNpZGUgPT4ge1xuXHRjb25zdCB0b1JlYmFzZWQgPSBkaWZmKGVkZ2UudG8sIGVkZ2UuZnJvbSk7XG5cdGNvbnN0IHBvaW50UmViYXNlZCA9IGRpZmYocG9pbnQsIGVkZ2UuZnJvbSk7XG5cblx0cmV0dXJuIGNyb3NzKHBvaW50UmViYXNlZCwgdG9SZWJhc2VkKSA+IDAgP1xuXHRcdFNpZGUuUmlnaHQgOiBcblx0XHRTaWRlLkxlZnQ7XG59XG5cbmV4cG9ydCBjb25zdCBlZGdlSW50ZXJzZWN0cyA9IChlMTogSUVkZ2UsIGUyOiBJRWRnZSkgPT4ge1xuXHRjb25zdCBzaWRlMSA9IHBvaW50TGluZUNsYXNzaWZpY2F0aW9uKGUxLCBlMi5mcm9tKTtcblx0Y29uc3Qgc2lkZTIgPSBwb2ludExpbmVDbGFzc2lmaWNhdGlvbihlMSwgZTIudG8pO1xuXHRjb25zdCBzaWRlMyA9IHBvaW50TGluZUNsYXNzaWZpY2F0aW9uKGUyLCBlMS5mcm9tKTtcblx0Y29uc3Qgc2lkZTQgPSBwb2ludExpbmVDbGFzc2lmaWNhdGlvbihlMiwgZTEudG8pO1xuXG5cdHJldHVybiBzaWRlMSAhPT0gc2lkZTIgJiYgXG5cdFx0c2lkZTMgIT09IHNpZGU0O1xuXHQvLyBUT0RPOiBoYW5kbGUgZWRnZSBjYXNlc1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgY29lZmZpZW5jdHMgb2YgdGhlIHBhcmFtZXRyaWMgcmVwcmVzZW50YXRpb25zIG9mIHRoZSBsaW5lcyBhdCB0aGUgaW50ZXJzZWN0aW9uIHBvaW50LlxuICogTGV0IGUxID0gyZEgKiBwMSArICgxIC0gyZEpICogcDJcbiAqIGFuZCBlMiA9IMmRJyAqIHAxJyArICgxIC0gyZEnKSAqIHAyJ1xuICogQHJldHVybnMgyZEgYW5kIMmRJyBhcyBhIDItdHVwbGVcbiAqL1xuZXhwb3J0IGNvbnN0IGludGVyc2VjdGlvbkNvZWZmaWNpZW50cyA9IChlMTogSUVkZ2UsIGUyOiBJRWRnZSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuXHRjb25zdCB7IGZyb206IHsgeDogeDEsIHk6IHkxIH0sIHRvOiB7IHg6IHgyLCB5OiB5MiB9IH0gPSBlMTtcblx0Y29uc3QgeyBmcm9tOiB7IHg6IHgxXywgeTogeTFfIH0sIHRvOiB7IHg6IHgyXywgeTogeTJfIH0gfSA9IGUyO1xuXHRjb25zdCDJkV8gPSAoKHkyXyAtIHkyKSAtICgoeDJfIC0geDIpIC8gKHgxIC0geDIpICogKHkxIC0geTIpKSkgL1xuXHRcdFx0XHRcdCgoeDFfIC0geDJfKSAvICh4MSAtIHgyKSAqICh5MSAtIHkyKSAtICh5MV8gLSB5Ml8pKTtcblxuXHRjb25zdCDJkSA9IFx0KMmRXyAqICh4MV8gLSB4Ml8pICsgeDJfIC0geDIpIC9cblx0XHRcdFx0KHgxIC0geDIpO1xuXG5cdHJldHVybiBbyZEsIMmRX107XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiB1c2VzIHBhcmFtZXRyaWMgcmVwcmVzZW50YXRpb24gb2YgbGluZXMuXG4gKiBMZXQgZTEgPSDJkSAqIHAxICsgKDEgLSDJkSkgKiBwMlxuICogYW5kIGUyID0gyZEnICogcDEnICsgKDEgLSDJkScpICogcDInXG4gKiBXZSBmaXJzdCBjYWxjdWxhdGUgyZEnIGJ5IGNyZWF0aW5nIHR3byBlcXVhbGl0aWVzIGZvciBlYWNoIGF4aXMuIFxuICogVGhlbiB3ZSBjYW4gZWFzaWx5IG9idGFpbiB0aGUgaW50ZXJzZWN0aW9uIHBvaW50IGJ5IHN1YnN0aXR1dGluZyB0aGUgdmFsdWUgb2YgdGhlc2UgY29lZmZpY2llbnRzLlxuICogQHJldHVybnMgcG9pbnQgd2hlcmUgdGhlIGxpbmVzIGludGVyc2VjdFxuICovXG5leHBvcnQgY29uc3QgbGluZUludGVyc2VjdGlvbiA9IChlMTogSUVkZ2UsIGUyOiBJRWRnZSk6IElQb2ludCA9PiB7XG5cdGNvbnN0IFvJkSwgX10gPSBpbnRlcnNlY3Rpb25Db2VmZmljaWVudHMoZTEsIGUyKTtcblx0XG5cdHJldHVybiBwb2ludEFkZChcblx0XHRwb2ludE11bHRTY2FsYXIoZTEuZnJvbSwgyZEpLFxuXHRcdHBvaW50TXVsdFNjYWxhcihlMS50bywgKDEgLSDJkSkpXG5cdCk7XG59IiwiaW1wb3J0IHsgSVBvaW50LCBJR3JhcGgsIElSZWN0YW5nbGUsIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgb3JpZW50YXRpb24sIE9yaWVudGF0aW9uLCBtb2QsIGRpc3RhbmNlLCBzbG9wZUFuZ2xlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZnJvbVR1cmZQb2ludCwgdHVyZlBvbHkgfSBmcm9tICcuLi9oZWxwZXJzL3R1cmYnO1xuaW1wb3J0IGNlbnRlck9mTWFzcyBmcm9tICdAdHVyZi9jZW50ZXItb2YtbWFzcyc7XG5cbi8qKlxuICogVE9ETzogdGVzdCBpZiBiYm94IHdvcmtpbmcgY29ycmVjdGx5IGFmdGVyIG1vdmVcbiAqL1xuZXhwb3J0IGNsYXNzIFBvbHlnb24ge1xuXG4gICAgcHJpdmF0ZSBtQmFzZTogSVBvaW50O1xuICAgIC8qKiBDYWNoZSBjZW50ZXIgb2YgdGhlIHZlcnRpY2VzICovXG4gICAgcHJpdmF0ZSBtVmVydGljZUNlbnRlcjogSVBvaW50O1xuICAgIHByaXZhdGUgbVZlcnRpY2VzQmJveDogSVJlY3RhbmdsZSB8IG51bGw7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKHByaXZhdGUgbVBvaW50czogSVBvaW50W10pIHtcbiAgICAgICAgdGhpcy5tQmFzZSA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2FsY3VsYXRlIGNlbnRlciBvZiBtYXNzIGlmIG9ubHkgc2luZ2xlIHBvaW50XG4gICAgICAgIC8vIHRoaXMubVZlcnRpY2VDZW50ZXIgPSBtUG9pbnRzLmxlbmd0aCA+IDEgPyBmcm9tVHVyZlBvaW50KGNlbnRlck9mTWFzcyh0dXJmUG9seSh0aGlzKSkpIDogbVBvaW50c1swXTtcbiAgICAgICAgdGhpcy5tVmVydGljZUNlbnRlciA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLm1Qb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMubVZlcnRpY2VDZW50ZXIueCArPSBwLng7XG4gICAgICAgICAgICB0aGlzLm1WZXJ0aWNlQ2VudGVyLnkgKz0gcC55O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tVmVydGljZUNlbnRlci54IC89IHRoaXMubVBvaW50cy5sZW5ndGg7XG4gICAgICAgIHRoaXMubVZlcnRpY2VDZW50ZXIueSAvPSB0aGlzLm1Qb2ludHMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMubVZlcnRpY2VzQmJveCA9IG51bGw7XG4gICAgfSAgIFxuXG4gICAgc3RhdGljIGZyb21HcmFwaChncmFwaDogSUdyYXBoKTogUG9seWdvbiB7XG4gICAgICAgIGxldCBwb2ludHM6IElQb2ludFtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBncmFwaC5ub2Rlcykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobm9kZS5taW4sIG5vZGUubWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZyb21Qb2ludHMocG9pbnRzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVBvaW50cyhwb2ludHM6IElQb2ludFtdKTogUG9seWdvbiB7XG4gICAgICAgIHJldHVybiBuZXcgUG9seWdvbih0aGlzLmNvbnZleEh1bGwocG9pbnRzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBwb2x5Z29uIHdpdGhvdXQgY29udmVydGluZyBwb2ludHMgdG8gYSBjb252ZXggaHVsbFxuICAgICAqIFVzZSBvbmx5IHdoZW4geW91IGFyZSBzdXJlIHRoYXQgYHBvaW50c2AgYXJlIGNvbnZleFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUG9pbnRzVW5zYWZlKHBvaW50czogSVBvaW50W10pOiBQb2x5Z29uIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2x5Z29uKHBvaW50cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aXRoQmFzZShwb2ludDogSVBvaW50KTogSVBvaW50IHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZS54ID09IDAgJiYgdGhpcy5iYXNlLnkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogcG9pbnQueCArIHRoaXMuYmFzZS54LCB5OiBwb2ludC55ICsgdGhpcy5iYXNlLnkgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpc3Bvc2l0aW9uOiBJUG9pbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tQmFzZS54ICs9IGRpc3Bvc2l0aW9uLng7XG4gICAgICAgIHRoaXMubUJhc2UueSArPSBkaXNwb3NpdGlvbi55O1xuICAgIH1cblxuICAgIC8qKiBTb3J0ZWQgYnkgYW5nbGUuIENvdW50ZXJjbG9ja3dpc2UgZGlyZWN0aW9uICovXG4gICAgZ2V0IHBvaW50cygpOiBJUG9pbnRbXSB7XG4gICAgICAgIGlmICh0aGlzLmJhc2UueCA9PSAwICYmIHRoaXMuYmFzZS55ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1Qb2ludHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjYWNoZSB0aGlzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tUG9pbnRzLm1hcCh0aGlzLndpdGhCYXNlLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50Q291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubVBvaW50cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luIG9mIHRoZSB2ZXJ0aWNlcyBcbiAgICAgKi9cbiAgICBnZXQgYmFzZSgpOiBJUG9pbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5tQmFzZTtcbiAgICB9XG5cbiAgICBnZXQgY2VudGVyKCk6IElQb2ludCB7XG4gICAgICAgIHJldHVybiB7IFxuICAgICAgICAgICAgeDogdGhpcy5iYXNlLnggKyB0aGlzLm1WZXJ0aWNlQ2VudGVyLngsXG4gICAgICAgICAgICB5OiB0aGlzLmJhc2UueSArIHRoaXMubVZlcnRpY2VDZW50ZXIueSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZWdhdGl2ZSgpOiBQb2x5Z29uIHtcbiAgICAgICAgLy8gU2FmZSB0byB1c2UgY29uc3RydWN0b3IgYmVjYXVzZSB3ZSBrbm93IHBvaW50cyBhcmUgY29udmV4XG4gICAgICAgIHJldHVybiBuZXcgUG9seWdvbih0aGlzLnBvaW50cy5tYXAoXG4gICAgICAgICAgICBwID0+ICh7IHg6IC1wLngsIHk6IC1wLnkgfSlcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgZ2V0U2FmZUluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gbW9kKGluZGV4LCB0aGlzLnBvaW50cy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldFBvaW50KGluZGV4OiBudW1iZXIpOiBJUG9pbnQge1xuICAgICAgICByZXR1cm4gdGhpcy53aXRoQmFzZSh0aGlzLnBvaW50c1t0aGlzLmdldFNhZmVJbmRleChpbmRleCldKTtcbiAgICB9XG5cbiAgICBnZXRQcmV2UG9pbnQoaW5kZXg6IG51bWJlcik6IElQb2ludCB7XG4gICAgICAgIHJldHVybiB0aGlzLndpdGhCYXNlKHRoaXMuZ2V0UG9pbnQoaW5kZXggLSAxKSk7XG4gICAgfVxuXG4gICAgZ2V0TmV4dFBvaW50KGluZGV4OiBudW1iZXIpOiBJUG9pbnQge1xuICAgICAgICByZXR1cm4gdGhpcy53aXRoQmFzZSh0aGlzLmdldFBvaW50KGluZGV4ICsgMSkpO1xuICAgIH1cblxuICAgIGdldCBib3VuZGluZ0JveCgpOiBJUmVjdGFuZ2xlIHtcbiAgICAgICAgaWYgKHRoaXMubVZlcnRpY2VzQmJveCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgYmJveCA9IHtcbiAgICAgICAgICAgICAgICBtaW5YOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgICAgICBtYXhYOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgICAgICBtaW5ZOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgICAgICBtYXhZOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5tUG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAueCA8IGJib3gubWluWCkge1xuICAgICAgICAgICAgICAgICAgICBiYm94Lm1pblggPSBwLng7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBpZiAocC54ID4gYmJveC5tYXhYKSB7XG4gICAgICAgICAgICAgICAgICAgIGJib3gubWF4WCA9IHAueDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHAueSA8IGJib3gubWluWSkge1xuICAgICAgICAgICAgICAgICAgICBiYm94Lm1pblkgPSBwLnk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBpZiAocC55ID4gYmJveC5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIGJib3gubWF4WSA9IHAueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubVZlcnRpY2VzQmJveCA9IGJib3g7XG4gICAgICAgIH0gIFxuXG4gICAgICAgIGNvbnN0IGJhc2UgPSB0aGlzLm1CYXNlO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW5YOiB0aGlzLm1WZXJ0aWNlc0Jib3gubWluWCArIGJhc2UueCxcbiAgICAgICAgICAgIG1heFg6IHRoaXMubVZlcnRpY2VzQmJveC5tYXhYICsgYmFzZS54LFxuICAgICAgICAgICAgbWluWTogdGhpcy5tVmVydGljZXNCYm94Lm1pblkgKyBiYXNlLnksXG4gICAgICAgICAgICBtYXhZOiB0aGlzLm1WZXJ0aWNlc0Jib3gubWF4WSArIGJhc2UueSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjb252ZXhIdWxsKHBvaW50czogSVBvaW50W10pOiBJUG9pbnRbXSB7XG4gICAgICAgIGxldCBzdGFjazogSVBvaW50W10gPSBbXTtcblxuICAgICAgICBsZXQgdG9wTGVmdDogSVBvaW50ID0gUG9seWdvbi50b3BMZWZ0KHBvaW50cyk7XG5cbiAgICAgICAgc3RhY2sucHVzaCh0b3BMZWZ0KTtcblxuICAgICAgICAvLyBSZW1vdmUgdG9wIGxlZnRcbiAgICAgICAgcG9pbnRzLnNwbGljZShwb2ludHMuZmluZEluZGV4KHAgPT4gcCA9PT0gdG9wTGVmdCksIDEpO1xuXG4gICAgICAgIC8vIFNvcnQgYnkgdGhlaXIgYW5nbGVcbiAgICAgICAgcG9pbnRzLnNvcnQoKGEsIGIpID0+IHNsb3BlQW5nbGUodG9wTGVmdCwgYSkgLSBzbG9wZUFuZ2xlKHRvcExlZnQsIGIpKTtcblxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlc1xuICAgICAgICBsZXQgdW5pcXVlcyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlcyhwb2ludHMsIHRvcExlZnQpO1xuXG4gICAgICAgIGZvciAobGV0IHBvaW50IG9mIHVuaXF1ZXMpIHtcbiAgICAgICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAxICYmIG9yaWVudGF0aW9uKHN0YWNrW3N0YWNrLmxlbmd0aCAtIDJdLCBzdGFja1tzdGFjay5sZW5ndGggLSAxXSwgcG9pbnQpID09PSBPcmllbnRhdGlvbi5MRUZUKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFjay5wdXNoKHBvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGFjaztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZW1vdmVEdXBsaWNhdGVzKHBvaW50czogSVBvaW50W10sIHRvcExlZnQ6IElQb2ludCk6IElQb2ludFtdIHtcbiAgICAgICAgbGV0IHVuaXF1ZXM6IElQb2ludFtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOykge1xuICAgICAgICAgICAgbGV0IHAgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBsZXQgaiA9IGkgKyAxO1xuXG4gICAgICAgICAgICB3aGlsZSAoaiA8IHBvaW50cy5sZW5ndGggJiYgc2xvcGVBbmdsZSh0b3BMZWZ0LCBwKSAtIHNsb3BlQW5nbGUodG9wTGVmdCwgcG9pbnRzW2pdKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBrZWVwIHRoZSBmYXJ0aGVzdCBwb2ludFxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSh0b3BMZWZ0LCBwb2ludHNbal0pID4gZGlzdGFuY2UodG9wTGVmdCwgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcCA9IHBvaW50c1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1bmlxdWVzLnB1c2gocCk7XG4gICAgICAgICAgICBpID0gajtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmlxdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHRvcExlZnQocG9pbnRzOiBJUG9pbnRbXSk6IElQb2ludCB7XG4gICAgICAgIHJldHVybiBwb2ludHMucmVkdWNlKCh0b3BMZWZ0LCBwb2ludCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRvcExlZnQueSA8IHBvaW50LnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9wTGVmdFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0b3BMZWZ0LnkgPT0gcG9pbnQueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3BMZWZ0LnggPD0gcG9pbnQueCA/IHRvcExlZnQgOiBwb2ludDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7IHg6IE51bWJlci5NQVhfVkFMVUUsIHk6IE51bWJlci5NQVhfVkFMVUUgfSk7XG4gICAgfVxufSIsImltcG9ydCB7IGJhc2ljRW1iZWQgfSBmcm9tIFwiLi9lbWJlZGRlci9iYXNpYy1lbWJlZGRlclwiO1xuaW1wb3J0IHsgSVBvaW50LCBJUmVjdGFuZ2xlIH0gZnJvbSBcIi4vbW9kZWxzL2NvbW1vblwiO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gXCIuL21vZGVscy9wb2x5Z29uXCI7XG5pbXBvcnQgeyBBZGpMaXN0LCBFbWJlZGRlck9wdGlvbnMgfSBmcm9tIFwiLi9lbWJlZGRlci9pZW1iZWRkZXJcIjtcbmltcG9ydCB7IGFyZWEsIGJvdW5kaW5nQm94LCBkaXN0YW5jZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBHcmlkU3F1YXJlRGlzdGFuY2VEZXRlY3Rpb24gfSBmcm9tICcuL2VtYmVkZGVyL2Rpc3RhbmNlLWRldGVjdGlvbi9ncmlkc3F1YXJlLWRpc3RhbmNlLWRldGVjdGlvbic7XG5pbXBvcnQgeyBmaW5kTmVpZ2hib3JzIH0gZnJvbSAnLi9hbGdvcml0aG1zL3Zvcm9ub2knO1xuXG5leHBvcnQgZW51bSBEaXN0YW5jZURldGVjdGlvblR5cGUge1xuICAgIEJBU0lDID0gXCJCQVNJQ1wiLFxuICAgIEdSSURfU1FVQVJFID0gXCJHUklEX1NRVUFSRVwiLFxufVxuXG5leHBvcnQgdHlwZSBEaXN0YW5jZURldGVjdGlvbkFyZ3MgPSBcbiAgICB7IFxuICAgICAgICB0eXBlOiBEaXN0YW5jZURldGVjdGlvblR5cGUuQkFTSUMsXG4gICAgfSB8XG4gICAgeyBcbiAgICAgICAgdHlwZTogRGlzdGFuY2VEZXRlY3Rpb25UeXBlLkdSSURfU1FVQVJFLCBcbiAgICAgICAgZGV0ZWN0aW9uOiBHcmlkU3F1YXJlRGlzdGFuY2VEZXRlY3Rpb24sXG4gICAgfTtcblxuZXhwb3J0IHR5cGUgTGF5b3V0T3B0aW9ucyA9IFxuICAgIHtcbiAgICAgICAgc3RlcD86IG51bWJlcixcbiAgICAgICAgY29tcG9uZW50U3BhY2luZz86IG51bWJlcixcbiAgICB9ICZcbiAgICBEaXN0YW5jZURldGVjdGlvbkFyZ3M7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX09QVElPTlM6IExheW91dE9wdGlvbnMgPSB7XG4gICAgdHlwZTogRGlzdGFuY2VEZXRlY3Rpb25UeXBlLkJBU0lDLFxuICAgIGNvbXBvbmVudFNwYWNpbmc6IDUwLFxufTtcblxudHlwZSBQYWNrUmVzdWx0ID0ge1xuICAgIHNoaWZ0czogeyBkeDogbnVtYmVyLCBkeTogbnVtYmVyIH1bXSxcbiAgICBmdWxsbmVzczogbnVtYmVyLFxufTtcblxuLyoqXG4gKiBQYWNrcyByZWd1bGFyIGRpc2Nvbm5lY3RlZCBncmFwaCBjb21wb25lbnRzXG4gKiBAcGFyYW0gY29tcG9uZW50cyBlYWNoIGNvbXBvbmVudCByZXByZXNlbnRzIGEgY29ubmVjdGVkIGdyYXBoIGluIGl0c2VsZlxuICogQHBhcmFtIG9wdGlvbnMgXG4gKi9cbmV4cG9ydCBjb25zdCBwYWNrQ29tcG9uZW50cyA9IChjb21wb25lbnRzOiBDb21wb25lbnRbXSwgb3B0aW9uczogTGF5b3V0T3B0aW9ucyA9IERFRkFVTFRfT1BUSU9OUyk6IFBhY2tSZXN1bHQgPT4ge1xuICAgIGlmIChvcHRpb25zICE9PSBERUZBVUxUX09QVElPTlMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgXG4gICAgICAgICAgICAuLi5ERUZBVUxUX09QVElPTlMsIFxuICAgICAgICAgICAgLi4ub3B0aW9ucywgXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgZW1iZWRkZXJPcHRpb25zOiBFbWJlZGRlck9wdGlvbnMgPSB7IFxuICAgICAgICAuLi5vcHRpb25zLCBcbiAgICAgICAgY29tcG9uZW50U3BhY2luZzogb3B0aW9ucy5jb21wb25lbnRTcGFjaW5nICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNvbXBvbmVudFNwYWNpbmcgOiBjYWxjdWxhdGVJZGVhbERpc3RhbmNlKGNvbXBvbmVudHMpIFxuICAgIH07XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgY29tcG9uZW50IHNwYWNpbmc6ICR7ZW1iZWRkZXJPcHRpb25zLmNvbXBvbmVudFNwYWNpbmd9YCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgaWRlYWwgZGlzdGFuY2U6ICR7b3B0aW9ucy5jb21wb25lbnREaXN0YW5jZX1gKTtcblxuICAgIGNvbnN0IHBvbHlnb25zID0gY29tcG9uZW50cy5tYXAoYyA9PiBjb21wb25lbnRUb1BvbHlnb24oYykpO1xuXG4gICAgY29uc3QgZWRnZXMgPSBjb25zdHJ1Y3RFZGdlcyhwb2x5Z29ucyk7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZWRnZXMpKTtcblxuICAgIGNvbnN0IHBvbHlHcmFwaCA9IHtcbiAgICAgICAgbm9kZXM6IHBvbHlnb25zLFxuICAgICAgICBlZGdlcyxcbiAgICB9O1xuXG4gICAgYmFzaWNFbWJlZChwb2x5R3JhcGgsIGVtYmVkZGVyT3B0aW9ucyk7XG5cbiAgICBjb25zdCBzaGlmdHMgPSBwb2x5R3JhcGgubm9kZXMubWFwKHAgPT4ge1xuICAgICAgICBjb25zdCBiYXNlID0gcC5iYXNlO1xuICAgICAgICByZXR1cm4geyBkeDogYmFzZS54LCBkeTogYmFzZS55IH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBzaGlmdHMsIGZ1bGxuZXNzOiBjYWxjdWxhdGVGdWxsbmVzcyhwb2x5Z29ucykgfTtcbn07XG5cbnR5cGUgTm9kZSA9IHtcbiAgICB4OiBudW1iZXIsIFxuICAgIHk6IG51bWJlciwgXG4gICAgd2lkdGg6IG51bWJlciwgXG4gICAgaGVpZ2h0OiBudW1iZXIsIFxufTtcblxuZXhwb3J0IHR5cGUgU2hhcGUgPSBJUG9pbnRbXTtcblxudHlwZSBDb21wb25lbnRFZGdlID0ge1xuICAgIHN0YXJ0WDogbnVtYmVyLFxuICAgIHN0YXJ0WTogbnVtYmVyLFxuICAgIGVuZFg6IG51bWJlcixcbiAgICBlbmRZOiBudW1iZXIsXG59O1xuXG50eXBlIENvbXBvbmVudCA9IHtcbiAgICBub2RlczogTm9kZVtdLFxuICAgIGVkZ2VzOiBDb21wb25lbnRFZGdlW107XG59O1xuXG5jb25zdCBjb21wb25lbnRUb1BvbHlnb24gPSAoY29tcG9uZW50OiBDb21wb25lbnQpOiBQb2x5Z29uID0+IHtcbiAgICBjb25zdCB2ZXJ0aWNlczogSVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBjb21wb25lbnQubm9kZXMpIHtcblxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHsgeDogbm9kZS54LCB5OiBub2RlLnkgfSk7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goeyB4OiBub2RlLnggKyBub2RlLndpZHRoLCB5OiBub2RlLnkgfSk7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goeyB4OiBub2RlLngsIHk6IG5vZGUueSArIG5vZGUuaGVpZ2h0IH0pO1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHsgeDogbm9kZS54ICsgbm9kZS53aWR0aCwgeTogbm9kZS55ICsgbm9kZS5oZWlnaHQgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFBvbHlnb24uZnJvbVBvaW50cyh2ZXJ0aWNlcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnJhbWUgPSAocG9seWdvbnM6IFBvbHlnb25bXSk6IElSZWN0YW5nbGUgPT4ge1xuICAgIGNvbnN0IGJib3ggPSB7XG4gICAgICAgIG1pblg6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgICAgICBtYXhYOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgICAgICAgbWluWTogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gICAgICAgIG1heFk6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSLFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IHAgb2YgcG9seWdvbnMpIHtcbiAgICAgICAgY29uc3QgcEJib3ggPSBwLmJvdW5kaW5nQm94O1xuICAgICAgICBpZiAocEJib3gubWluWCA8IGJib3gubWluWCkge1xuICAgICAgICAgICAgYmJveC5taW5YID0gcEJib3gubWluWDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocEJib3gubWF4WCA+IGJib3gubWF4WCkge1xuICAgICAgICAgICAgYmJveC5tYXhYID0gcEJib3gubWF4WDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocEJib3gubWluWSA8IGJib3gubWluWSkge1xuICAgICAgICAgICAgYmJveC5taW5ZID0gcEJib3gubWluWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocEJib3gubWF4WSA+IGJib3gubWF4WSkge1xuICAgICAgICAgICAgYmJveC5tYXhZID0gcEJib3gubWF4WTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBiYm94O1xufVxuXG4vKipcbiAqIFRha2VzIGFuIGFycmF5IG9mIHBvbHlnb25zIGFuZCByZXR1cm5zIHdoaWNoIG9uZXMgc2hvdWxkIGJlIGF0dHJhY3RpdmUgdG8gZWFjaCBvdGhlciBiYXNlZCBvbiB0aGVpciBjZW50ZXIncyB2b3Jvbm9pIGRpYWdyYW1zXG4gKiBAcGFyYW0gcG9seWdvbnMgXG4gKi9cbmV4cG9ydCBjb25zdCBjb25zdHJ1Y3RFZGdlcyA9IChwb2x5Z29uczogUG9seWdvbltdKTogQWRqTGlzdCA9PiB7XG4gICAgY29uc3QgZWRnZXM6IEFkakxpc3QgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBwb2x5Z29ucy5sZW5ndGggfSwgKCkgPT4gW10pO1xuXG4gICAgLy8gQm91bmRpbmcgYm94IG9mIHRoZSBwb2x5Z29ucyBhcmUgdGhlaXIgZnJhbWVcbiAgICBjb25zdCBiYm94ID0gYm91bmRpbmdCb3gocG9seWdvbnMubWFwKHAgPT4gcC5ib3VuZGluZ0JveCkpO1xuICAgIGNvbnN0IGNlbnRlcnMgPSBwb2x5Z29ucy5tYXAocCA9PiBwLmNlbnRlcik7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgY2VudGVyczogJHtKU09OLnN0cmluZ2lmeShjZW50ZXJzKX1gKTtcblxuICAgIGNvbnN0IG5laWdoYm9ycyA9IGZpbmROZWlnaGJvcnMoYmJveCwgY2VudGVycyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAvLyBOZWlnaGJvciBvZiBpLXRoIHBvbHlnb25cbiAgICAgICAgZm9yIChjb25zdCBuZWlnaGJvciBvZiBuZWlnaGJvcnNbaV0pIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWRkIGJpZ2dlciBvbmVzIHNvIHdlIGFkZCBvbmx5IG9uZSBmb3IgZWFjaFxuICAgICAgICAgICAgaWYgKG5laWdoYm9yID4gaSkge1xuICAgICAgICAgICAgICAgIGVkZ2VzW2ldLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgIC8vIGVkZ2VzLnB1c2goeyBmcm9tOiBpLCB0bzogbmVpZ2hib3IgfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xufTtcblxuY29uc3QgY2FsY3VsYXRlSWRlYWxEaXN0YW5jZSA9IChjb21wb25lbnRzOiBDb21wb25lbnRbXSk6IG51bWJlciA9PiB7XG4gICAgbGV0IGF2Z0Rpc3RhbmNlID0gMDtcbiAgICBsZXQgbGVuID0gMDtcblxuICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgLy8gQ2hvb3NlIGZpcnN0IGVkZ2Ugb2YgZmlyc3Qgbm9kZSBmcm9tIGVhY2ggY29tcG9uZW50XG4gICAgICAgIGlmIChjb21wb25lbnQuZWRnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGVuICs9IDE7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2UgPSBjb21wb25lbnQuZWRnZXNbMF07XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VMZW5ndGggPSBNYXRoLnNxcnQoZGlzdGFuY2UoeyB4OiBlZGdlLnN0YXJ0WCwgeTogZWRnZS5zdGFydFkgfSwgeyB4OiBlZGdlLmVuZFgsIHk6IGVkZ2UuZW5kWSB9KSk7XG4gICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGlzdGFuY2U6ICR7ZWRnZUxlbmd0aH1gKTtcbiAgICBcbiAgICAgICAgICAgIGF2Z0Rpc3RhbmNlICs9IGVkZ2VMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvKiAvLyBTaW5nbGUgY29tcG9uZW50c1xuICAgICAgICBpZiAoZWRnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZW4gKz0gMTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZTEgPSBjb21wb25lbnQubm9kZXNbMF07XG4gICAgICAgICAgICBjb25zdCBub2RlMiA9IGNvbXBvbmVudC5ub2Rlc1tlZGdlWzBdXTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVEaXN0YW5jZSA9IE1hdGguc3FydChkaXN0YW5jZShub2RlMSwgbm9kZTIpKTsgXG4gICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGlzdGFuY2U6ICR7bm9kZURpc3RhbmNlfWApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdmdEaXN0YW5jZSArPSBub2RlRGlzdGFuY2U7XG4gICAgICAgIH0gKi9cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBpZiBhbGwgY29tcG9uZW50cyBhcmUgc2luZ2xlIFxuICAgIC8vIGNvbnNvbGUubG9nKGF2Z0Rpc3RhbmNlIC8gbGVuKTtcblxuICAgIHJldHVybiAoYXZnRGlzdGFuY2UgLyBsZW4pICogMS41O1xufTtcblxuY29uc3QgY2FsY3VsYXRlRnVsbG5lc3MgPSAocG9seWdvbnM6IFBvbHlnb25bXSk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgcG9seWdvbkJib3hlcyA9IHBvbHlnb25zLm1hcChwID0+IHAuYm91bmRpbmdCb3gpO1xuXG4gICAgY29uc3QgYmJveCA9IGJvdW5kaW5nQm94KHBvbHlnb25CYm94ZXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgcG9seWdvbkJib3hlcy5tYXAoYmIgPT4gYXJlYShiYikpXG4gICAgICAgICAgICAucmVkdWNlKChhLCBzKSA9PiBhICsgcykgXG4gICAgICAgIC8gYXJlYShiYm94KVxuICAgICkgKiAxMDA7XG59OyIsImltcG9ydCB7IElMaW5lLCBJUG9pbnQsIElSZWN0YW5nbGUgfSBmcm9tIFwiLi9tb2RlbHMvY29tbW9uXCI7XG5cbmV4cG9ydCBlbnVtIE9yaWVudGF0aW9uIHtcbiAgICAvKiogb3JpZW50YXRpb24gPiAwICovXG4gICAgTEVGVCxcbiAgICAvKiogb3JpZW50YXRpb24gPCAwICovXG4gICAgUklHSFQsXG4gICAgLyoqIG9yaWVudGF0aW9uID0gMCAqL1xuICAgIFNUUkFJR0hULFxufVxuXG4vKipcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AaGFyc2hpdHNpa2NoaS9jb252ZXgtaHVsbHMtZXhwbGFpbmVkLWJhYWI2NjJjNGU5NFxuICogQHBhcmFtIHAgXG4gKiBAcGFyYW0gcSBcbiAqIEBwYXJhbSByIFxuICovXG5leHBvcnQgY29uc3Qgb3JpZW50YXRpb24gPSAocDogSVBvaW50LCBxOiBJUG9pbnQsIHI6IElQb2ludCk6IE9yaWVudGF0aW9uID0+IHtcbiAgICBsZXQgdmFsdWUgPSAocS54ICogci55KSAtIChxLnkgKiByLngpIC0gKHAueCAqIHIueSkgKyAocC54ICogcS55KSArIChwLnkgKiByLngpIC0gKHAueSAqIHEueCk7XG5cbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIHJldHVybiBPcmllbnRhdGlvbi5MRUZUO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHJldHVybiBPcmllbnRhdGlvbi5SSUdIVDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gT3JpZW50YXRpb24uU1RSQUlHSFQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFJldHVybiBhbHdheXMgcG9zaXRpdmUgcmVtYWluZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBtb2QgPSAobjogbnVtYmVyLCBtOiBudW1iZXIpOiBudW1iZXIgPT5cbiAgICAoKG4gJSBtKSArIG0pICUgbTtcblxuLyoqXG4gKiBBbHdheXMgcmV0dXJucyBiZXR3ZWVuIFswLCAyz4BdXG4gKi9cbmV4cG9ydCBjb25zdCBhbmdsZVBvc2l0aXZlID0gKHk6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoeSwgeCk7XG5cbiAgICByZXR1cm4gYW5nbGUgPCAwID9cbiAgICAgICAgYW5nbGUgKyAoMiAqIE1hdGguUEkpOlxuICAgICAgICBhbmdsZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgcCBoYXMgYW4gb3J0aG9nb25hbCBwcm9qZWN0aW9uIGludG8gbFxuICovXG5leHBvcnQgY29uc3QgaW5SYW5nZSA9IChwOiBJUG9pbnQsIGw6IElMaW5lKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZHggPSBsLnRvLnggLSBsLmZyb20ueDtcbiAgICBjb25zdCBkeSA9IGwudG8ueSAtIGwuZnJvbS55O1xuICAgIGNvbnN0IGlubmVyUHJvZCA9IChwLnggLSBsLmZyb20ueCkgKiBkeCArIChwLnkgLSBsLmZyb20ueSkgKiBkeTtcbiAgICAvLyBjb25zb2xlLmxvZyhgdi5zOiAke2lubmVyUHJvZH0sIHMuczogJHsoZHggKiBkeCkgKyAoZHkgKiBkeSl9YCk7XG4gICAgcmV0dXJuIDAgPD0gaW5uZXJQcm9kICYmIGlubmVyUHJvZCA8PSAoZHggKiBkeCkgKyAoZHkgKiBkeSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgLXBpLHBpIHJhbmdlIHRvIDAsMnBpXG4gKi9cbmV4cG9ydCBjb25zdCBuZWdhdGl2ZVRvQWJzb2x1dGUgPSAoYW5nbGU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgaWYgKGFuZ2xlIDw9IDApIHtcbiAgICAgICAgcmV0dXJuICgyICogTWF0aC5QSSkgKyBhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2hvcnRlc3RQb2ludExpbmVUb1BvaW50ID0gKGw6IElMaW5lLCBwOiBJUG9pbnQpOiBbSVBvaW50LCBJUG9pbnRdID0+IHtcbiAgICBjb25zdCBBID0gcC54IC0gbC5mcm9tLngsXG4gICAgICAgICAgQiA9IHAueSAtIGwuZnJvbS55LFxuICAgICAgICAgIEMgPSBsLnRvLnggLSBsLmZyb20ueCxcbiAgICAgICAgICBEID0gbC50by55IC0gbC5mcm9tLnk7XG5cbiAgICBjb25zdCBkb3QgPSBBICogQyArIEIgKiBEO1xuICAgIGNvbnN0IGxlblNxID0gQyAqIEMgKyBEICogRDtcbiAgICBsZXQgcGFyYW0gPSAtMTtcbiAgICBpZiAobGVuU3EgIT09IDApIHtcbiAgICAgICAgcGFyYW0gPSBkb3QgLyBsZW5TcTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW0gPCAwKSB7XG4gICAgICAgIHJldHVybiBbeyB4OiBsLmZyb20ueCwgeTogbC5mcm9tLnl9LCBwXTtcbiAgICB9IGVsc2UgaWYgKHBhcmFtID4gMSkge1xuICAgICAgICByZXR1cm4gW3sgeDogbC50by54LCB5OiBsLnRvLnkgfSwgcF07XG4gICAgfSBlbHNlIHsgLy8gMCA8PSBwYXJhbSA8PSAxXG4gICAgICAgIHJldHVybiBbeyB4OiBsLmZyb20ueCArIChwYXJhbSAqIEMpLCB5OiBsLmZyb20ueSArIChwYXJhbSAqIEQpIH0sIHBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxpbmVUb1BvaW50RGlzdGFuY2UgPSAobDogSUxpbmUsIHA6IElQb2ludCk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgW3AxLCBwMl0gPSBzaG9ydGVzdFBvaW50TGluZVRvUG9pbnQobCwgcCk7XG5cbiAgICByZXR1cm4gZGlzdGFuY2UocDEsIHAyKTtcbn1cblxuZXhwb3J0IGNvbnN0IHNob3J0ZXN0UG9pbnRMaW5lVG9MaW5lID0gKGwxOiBJTGluZSwgbDI6IElMaW5lKTogW0lQb2ludCwgSVBvaW50XSA9PiB7XG4gICAgY29uc3Qgc2hvcnRlc3RQYWlycyA9IFtcbiAgICAgICAgc2hvcnRlc3RQb2ludExpbmVUb1BvaW50KGwxLCBsMi5mcm9tKSxcbiAgICAgICAgc2hvcnRlc3RQb2ludExpbmVUb1BvaW50KGwxLCBsMi50byksXG4gICAgICAgIHNob3J0ZXN0UG9pbnRMaW5lVG9Qb2ludChsMiwgbDEuZnJvbSksXG4gICAgICAgIHNob3J0ZXN0UG9pbnRMaW5lVG9Qb2ludChsMiwgbDEudG8pLFxuICAgIF07XG5cbiAgICBsZXQgbWluUGFpciA9IHNob3J0ZXN0UGFpcnNbMF07XG5cbiAgICBmb3IgKGxldCBbcCwgcV0gb2Ygc2hvcnRlc3RQYWlycykge1xuICAgICAgICBpZiAoZGlzdGFuY2UocCwgcSkgPCBkaXN0YW5jZShtaW5QYWlyWzBdLCBtaW5QYWlyWzFdKSkge1xuICAgICAgICAgICAgbWluUGFpciA9IFtwLCBxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtaW5QYWlyO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIGZyb20gb3JpZ2luXG4gKi9cbmV4cG9ydCBjb25zdCBsZW5ndGhGcm9tT3JpZ2luID0gKHA6IElQb2ludCk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIChwLnggKiBwLngpICsgKHAueSAqIHAueSk7XG59XG5cbi8qKlxuICogU3F1YXJlZCBsZW5ndGhcbiAqL1xuZXhwb3J0IGNvbnN0IGxlbmd0aCA9IChsOiBJTGluZSk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgZHggPSBsLnRvLnggLSBsLmZyb20ueDtcbiAgICBjb25zdCBkeSA9IGwudG8ueSAtIGwuZnJvbS55O1xuXG4gICAgcmV0dXJuIChkeCAqIGR4KSArIChkeSAqIGR5KTtcbn1cblxuLyoqXG4gKiBDb21iaW5lcyB0d28gYXJyYXkgZWxlbWVudHMgYXMgcGFpcnMgXFxcbiAqICoqRXhhbXBsZToqKiB6aXAoW2EsIGIsIGNdLCBbMSwgMiwgM10pID0gWyBbIGEsIDEgXSwgWyBiLCAyIF0sIFsgYywgMyBdIF1cbiAqL1xuZXhwb3J0IGNvbnN0IHppcCA9IDxLLCBUPihhcnIxOiBLW10sIGFycjI6IFRbXSk6IFtLLCBUXVtdID0+IFxuICAgIGFycjEubWFwKCh2LCBpKSA9PiBbdiwgYXJyMltpXV0pO1xuXG5leHBvcnQgY29uc3QgZGlyZWN0aW9uID0gKGw6IElMaW5lKTogSVBvaW50ID0+IHtcbiAgICBjb25zdCBsZW4gPSBNYXRoLnNxcnQobGVuZ3RoKGwpKTtcblxuICAgIHJldHVybiB7IFxuICAgICAgICB4OiAobC50by54IC0gbC5mcm9tLngpIC8gbGVuLFxuICAgICAgICB5OiAobC50by55IC0gbC5mcm9tLnkpIC8gbGVuLFxuICAgIH07XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBjb3B5IG9uIGFuIG9iamVjdCxcbiAqIEBwYXJhbSBvYmplY3Qgb2JqZWN0IHRvIGJlIGNvcGllZC4gTXVzdCBub3QgYmUgcmVjdXJzaXZlXG4gKi9cbmV4cG9ydCBjb25zdCBjbG9uZSA9IDxUPiAob2JqZWN0OiBUKTogVCA9PiBcbiAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXG4vKipcbiAqIERvIHNvbWV0aGluZyB3aXRoIGFycmF5IHdpdGhvdXQgbXV0YXRpbmdcbiAqIFVzZWZ1bCBmb3IgZGVidWcgcHVycG9zZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGluc3BlY3QgPSA8VD4gKGFycjogVFtdLCBhY3Rpb246IChhcmcwOiBUKSA9PiB2b2lkKTogVFtdID0+IHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIGFycikge1xuICAgICAgICBhY3Rpb24oaXRlbSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGRpc3RhbmNlID0gKHAwOiBJUG9pbnQsIHAxOiBJUG9pbnQpOiBudW1iZXIgPT4ge1xuICAgIGxldCB3aWR0aCA9IHAwLnggLSBwMS54O1xuICAgIGxldCBoZWlnaHQgPSBwMC55IC0gcDEueTtcblxuICAgIHJldHVybiBNYXRoLnBvdyh3aWR0aCwgMikgKyBNYXRoLnBvdyhoZWlnaHQsIDIpO1xufVxuXG5leHBvcnQgY29uc3Qgc2xvcGUgPSAobGluZTogSUxpbmUpOiBudW1iZXIgPT4ge1xuICAgIGxldCBoZWlnaHQgPSBsaW5lLnRvLnkgLSBsaW5lLmZyb20ueTtcbiAgICBsZXQgd2lkdGggPSBsaW5lLnRvLnggLSBsaW5lLmZyb20ueDtcblxuICAgIHJldHVybiBoZWlnaHQgLyB3aWR0aDtcbn1cblxuLyoqXG4gKiBAcGFyYW0gZnJvbSBcbiAqIEBwYXJhbSB0byBcbiAqL1xuZXhwb3J0IGNvbnN0IHNsb3BlQW5nbGUgPSAoZnJvbTogSVBvaW50LCB0bzogSVBvaW50KTogbnVtYmVyID0+IHtcbiAgICBsZXQgaGVpZ2h0ID0gdG8ueSAtIGZyb20ueTtcbiAgICBsZXQgd2lkdGggPSB0by54IC0gZnJvbS54O1xuXG4gICAgcmV0dXJuIE1hdGguYXRhbjIoaGVpZ2h0LCB3aWR0aCk7XG59O1xuXG5leHBvcnQgY29uc3QgYXJlYSA9IChyZWN0OiBJUmVjdGFuZ2xlKTogbnVtYmVyID0+XG4gICAgTWF0aC5hYnMoKHJlY3QubWF4WCAtIHJlY3QubWluWCkgKiAocmVjdC5tYXhZIC0gcmVjdC5taW5ZKSk7IFxuXG5leHBvcnQgY29uc3QgYm91bmRpbmdCb3ggPSAocmVjdHM6IElSZWN0YW5nbGVbXSk6IElSZWN0YW5nbGUgPT4ge1xuICAgIHJldHVybiByZWN0cy5yZWR1Y2UoKGJib3gsIGN1cnJlbnQpID0+ICh7XG4gICAgICAgIG1pblg6IE1hdGgubWluKGJib3gubWluWCwgY3VycmVudC5taW5YKSxcbiAgICAgICAgbWF4WDogTWF0aC5tYXgoYmJveC5tYXhYLCBjdXJyZW50Lm1heFgpLFxuICAgICAgICBtaW5ZOiBNYXRoLm1pbihiYm94Lm1pblksIGN1cnJlbnQubWluWSksXG4gICAgICAgIG1heFk6IE1hdGgubWF4KGJib3gubWF4WSwgY3VycmVudC5tYXhZKSxcbiAgICB9KSwge1xuICAgICAgICBtaW5YOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICAgICAgbWF4WDogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsXG4gICAgICAgIG1pblk6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgICAgICBtYXhZOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgICB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9

/***/ })
/******/ ]);
});