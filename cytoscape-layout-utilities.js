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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;
// (function () {
//   'use strict';

//   // registers the extension on a cytoscape lib ref
//   var register = function (cytoscape, $) {

//     if (!cytoscape || !$) {
//       return;
//     } // can't register if cytoscape unspecified

var options = {
  node: {
    highlighted: {
      'border-color': '#0B9BCD', //blue
      'border-width': 3
    },

    highlighted2: {
      'border-color': '#04F06A', //green
      'border-width': 3
    },
    highlighted3: {
      'border-color': '#F5E663', //yellow
      'border-width': 3
    },
    highlighted4: {
      'border-color': '#BF0603', //red
      'border-width': 3
    },
    selected: {
      'border-color': 'black',
      'border-width': 3,
      'background-color': 'lightgrey'
    }

  },
  edge: {
    highlighted: {
      'line-color': '#0B9BCD', //blue
      'width': 3
    },
    highlighted2: {
      'line-color': '#04F06A', //green
      'width': 3
    },
    highlighted3: {
      'line-color': '#F5E663', //yellow
      'width': 3
    },
    highlighted4: {
      'line-color': '#BF0603', //red
      'width': 3
    },
    selected: {
      'line-color': 'black',
      'width': 3
    }
  },
  setVisibilityOnHide: false, // whether to set visibility on hide/show
  setDisplayOnHide: true, // whether to set display on hide/show
  zoomAnimationDuration: 1500, //default duration for zoom animation speed
  neighbor: function neighbor(node) {
    // return desired neighbors of tapheld node
    return false;
  },
  neighborSelectTime: 500 //ms, time to taphold to select desired neighbors
};

var layoutUtilities = __webpack_require__(1);

cytoscape('core', 'layoutUtilities', function (opts) {
  var cy = this;

  // If 'get' is given as the param then return the extension instance
  if (opts === 'get') {
    return getScratch(cy).instance;
  }

  $.extend(true, options, opts);

  function getScratch(eleOrCy) {
    if (!eleOrCy.scratch("_layoutUtilities")) {
      eleOrCy.scratch("_layoutUtilities", {});
    }

    return eleOrCy.scratch("_layoutUtilities");
  }

  if (!getScratch(cy).initialized) {
    getScratch(cy).initialized = true;

    // create a view utilities instance
    var instance = layoutUtilities(cy, options);

    // if (cy.undoRedo) {
    //   var ur = cy.undoRedo(null, true);
    //   undoRedo(cy, ur, instance);
    // }

    // set the instance on the scratch pad
    getScratch(cy).instance = instance;

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
    cy.on('taphold', 'node', function (event) {
      var target = event.target || event.cyTarget;
      var tapheld = false;
      var neighborhood;
      var timeout = setTimeout(function () {
        if (shiftKeyDown) {
          cy.elements().unselect();
          neighborhood = options.neighbor(target);
          if (neighborhood) neighborhood.select();
          target.lock();
          tapheld = true;
        }
      }, options.neighborSelectTime - 500);
      cy.on('free', 'node', function () {
        var targetTapheld = event.target || event.cyTarget;
        if (target == targetTapheld && tapheld === true) {
          tapheld = false;
          if (neighborhood) neighborhood.select();
          target.unlock();
        } else {
          clearTimeout(timeout);
        }
      });
      cy.on('drag', 'node', function () {
        var targetDragged = event.target || event.cyTarget;
        if (target == targetDragged && tapheld === false) {
          clearTimeout(timeout);
        }
      });
    });
  }

  // return the instance of extension
  return getScratch(cy).instance;
});

// };

// if (typeof module !== 'undefined' && module.exports) { // expose as a commonjs module
//   module.exports = register;
// }

// if (typeof define !== 'undefined' && define.amd) { // expose as an amd/requirejs module
//   define('cytoscape-view-utilities', function () {
//     return register;
//   });
// }

// if (typeof cytoscape !== 'undefined' && typeof $ !== "undefined") { // expose to global cytoscape (i.e. window.cytoscape)
//   register(cytoscape, $);
// }

// })

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var layoutUtilities = function layoutUtilities(cy, options) {

    // Set style for highlighted and unhighligthed eles
    cy.style().selector("node.highlighted").css(options.node.highlighted).selector("node.highlighted:selected").css(options.node.selected).selector("node.highlighted2").css(options.node.highlighted2).selector("node.highlighted2:selected").css(options.node.selected).selector("node.highlighted3").css(options.node.highlighted3).selector("node.highlighted3:selected").css(options.node.selected).selector("node.highlighted4").css(options.node.highlighted4).selector("node.highlighted4:selected").css(options.node.selected).selector("edge.highlighted").css(options.edge.highlighted).selector("edge.highlighted:selected").css(options.edge.selected).selector("edge.highlighted2").css(options.edge.highlighted2).selector("edge.highlighted2:selected").css(options.edge.selected).selector("edge.highlighted3").css(options.edge.highlighted3).selector("edge.highlighted3:selected").css(options.edge.selected).selector("edge.highlighted4").css(options.edge.highlighted4).selector("edge.highlighted4:selected").css(options.edge.selected).update();
    // the instance to be returned
    var instance = {};

    // Section hide-show
    // hide given eles
    instance.hide = function (eles) {
        eles = eles.filter(":visible");
        eles = eles.union(eles.connectedEdges());

        eles.unselect();

        if (options.setVisibilityOnHide) {
            eles.css('visibility', 'hidden');
        }

        if (options.setDisplayOnHide) {
            eles.css('display', 'none');
        }

        return eles;
    };

    // unhide given eles
    instance.show = function (eles) {
        var hiddenEles = eles.filter(':hidden');
        eles = eles.not(":visible");
        eles = eles.union(eles.connectedEdges());
        eles.unselect();

        if (options.setVisibilityOnHide) {
            eles.css('visibility', 'visible');
        }

        if (options.setDisplayOnHide) {
            eles.css('display', 'element');
        }

        return eles;
    };

    instance.positionNewNode = function (mainEle, newEles) {
        newEles.forEach(function (newEle) {
            var neighbors = newEle.neighborhood().nodes(":visible");
            var x = 0;
            var y = 0;
            var count = 0;
            if (neighbors.length > 1) {
                neighbors.forEach(function (ele) {
                    x += ele.position("x");
                    y += ele.position("y");
                    count++;
                });
                x = x / count;
                y = y / count;
                newEle.position("x", x);
                newEle.position("y", y);
            } else {
                instance.closeUpElements(mainEle, newEles);
            }
        });
    };

    instance.closeUpElements = function (mainEle, hiddenEles) {
        var leftX = Number.MAX_VALUE;
        var rightX = Number.MIN_VALUE;
        var topY = Number.MAX_VALUE;
        var bottomY = Number.MIN_VALUE;
        // Check the x and y limits of all hidden elements and store them in the variables above
        hiddenEles.forEach(function (ele) {
            if (ele.data('class') != 'compartment' && ele.data('class') != 'complex') {
                var halfWidth = ele.outerWidth() / 2;
                var halfHeight = ele.outerHeight() / 2;
                if (ele.position("x") - halfWidth < leftX) leftX = ele.position("x") - halfWidth;
                if (ele.position("x") + halfWidth > rightX) rightX = ele.position("x") + halfWidth;
                if (ele.position("y") - halfHeight < topY) topY = ele.position("y") - halfHeight;
                if (ele.position("y") + halfHeight > topY) bottomY = ele.position("y") + halfHeight;
            }
        });

        //The coordinates of the old center containing the hidden nodes
        var oldCenterX = (leftX + rightX) / 2;
        var oldCenterY = (topY + bottomY) / 2;

        //Here we calculate two parameters which define the area in which the hidden elements are placed initially
        var minHorizontalParam = mainEle.outerWidth() / 2 + (rightX - leftX) / 2;
        var maxHorizontalParam = mainEle.outerWidth() + (rightX - leftX) / 2;
        var minVerticalParam = mainEle.outerHeight() / 2 + (bottomY - topY) / 2;
        var maxVerticalParam = mainEle.outerHeight() + (bottomY - topY) / 2;

        //Quadrants is an object of the form {first:"obtained", second:"free", third:"free", fourth:"obtained"}
        // which holds which quadrant are free (that's where hidden nodes will be brought)
        var quadrants = instance.checkOccupiedQuadrants(mainEle, hiddenEles);
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
        // If the horizontalMult is 0 it means that no quadrant is free, so we randomly choose a quadrant
        var horizontalParam = instance.generateRandom(minHorizontalParam, maxHorizontalParam, horizontalMult);
        var verticalParam = instance.generateRandom(minVerticalParam, maxVerticalParam, verticalMult);

        //The coordinates of the center where the hidden nodes will be transfered
        var newCenterX = mainEle.position("x") + horizontalParam;
        var newCenterY = mainEle.position("y") + verticalParam;

        var xdiff = newCenterX - oldCenterX;
        var ydiff = newCenterY - oldCenterY;

        //Change the position of hidden elements
        hiddenEles.forEach(function (ele) {
            var newx = ele.position("x") + xdiff;
            var newy = ele.position("y") + ydiff;
            ele.position("x", newx);
            ele.position("y", newy);
        });
    };

    instance.generateRandom = function (min, max, mult) {
        var val = [-1, 1];
        if (mult === 0) mult = val[Math.floor(Math.random() * val.length)];
        return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
    };

    instance.checkOccupiedQuadrants = function (mainEle, hiddenEles) {
        // if (instance.elementUtilities.getMapType() == 'PD')
        // {
        //   var visibleNeighborEles = mainEle.neighborhood().difference(hiddenEles).nodes();
        //   var visibleNeighborsOfNeighbors = visibleNeighborEles.neighborhood().difference(hiddenEles).difference(mainEle).nodes();
        //   var visibleEles = visibleNeighborEles.union(visibleNeighborsOfNeighbors);
        // }
        // else
        var visibleEles = mainEle.neighborhood().difference(hiddenEles).nodes();
        var occupiedQuadrants = { first: "free", second: "free", third: "free", fourth: "free" };

        visibleEles.forEach(function (ele) {
            if (ele.data('class') != 'compartment' && ele.data('class') != 'complex') {
                if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.second = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y")) occupiedQuadrants.first = "occupied";else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.third = "occupied";else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y")) occupiedQuadrants.fourth = "occupied";
            }
        });
        return occupiedQuadrants;
    };

    // return the instance
    return instance;
};

module.exports = layoutUtilities;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'layoutUtilities', impl); // register with cytoscape.js
};

// if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
//   register( cytoscape );
// }

module.exports = register;

/***/ })
/******/ ]);
});