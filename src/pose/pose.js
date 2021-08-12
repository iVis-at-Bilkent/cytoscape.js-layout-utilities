(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pose"] = factory();
	else
		root["pose"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "DistanceDetectionType", function() { return /* binding */ DistanceDetectionType; });
__webpack_require__.d(__webpack_exports__, "DEFAULT_OPTIONS", function() { return /* binding */ DEFAULT_OPTIONS; });
__webpack_require__.d(__webpack_exports__, "packComponents", function() { return /* binding */ packComponents; });
__webpack_require__.d(__webpack_exports__, "getFrame", function() { return /* binding */ getFrame; });
__webpack_require__.d(__webpack_exports__, "constructEdges", function() { return /* binding */ constructEdges; });

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
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

// CONCATENATED MODULE: ./src/pose/utils.ts

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
    var _a = __read(shortestPointLineToPoint(l, p), 2), p1 = _a[0], p2 = _a[1];
    return utils_distance(p1, p2);
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
        for (var shortestPairs_1 = __values(shortestPairs), shortestPairs_1_1 = shortestPairs_1.next(); !shortestPairs_1_1.done; shortestPairs_1_1 = shortestPairs_1.next()) {
            var _b = __read(shortestPairs_1_1.value, 2), p = _b[0], q = _b[1];
            if (utils_distance(p, q) < utils_distance(minPair[0], minPair[1])) {
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
var utils_length = function (l) {
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
    var len = Math.sqrt(utils_length(l));
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
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
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
var utils_distance = function (p0, p1) {
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
var utils_area = function (rect) {
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

// CONCATENATED MODULE: ./src/pose/models/polygon.ts


/**
 * TODO: test if bbox working correctly after move
 */
var polygon_Polygon = /** @class */ (function () {
    function Polygon(mPoints) {
        var e_1, _a;
        this.mPoints = mPoints;
        this.mBase = { x: 0, y: 0 };
        // No need to calculate center of mass if only single point
        // this.mVerticeCenter = mPoints.length > 1 ? fromTurfPoint(centerOfMass(turfPoly(this))) : mPoints[0];
        this.mVerticeCenter = { x: 0, y: 0 };
        try {
            for (var _b = __values(this.mPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(graph.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return mod(index, this.points.length);
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
                    for (var _b = __values(this.mPoints), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        points.sort(function (a, b) { return slopeAngle(topLeft, a) - slopeAngle(topLeft, b); });
        // Remove duplicates
        var uniques = this.removeDuplicates(points, topLeft);
        try {
            for (var uniques_1 = __values(uniques), uniques_1_1 = uniques_1.next(); !uniques_1_1.done; uniques_1_1 = uniques_1.next()) {
                var point = uniques_1_1.value;
                while (stack.length > 1 && orientation(stack[stack.length - 2], stack[stack.length - 1], point) === Orientation.LEFT) {
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
            while (j < points.length && slopeAngle(topLeft, p) - slopeAngle(topLeft, points[j]) === 0) {
                // Always keep the farthest point
                if (utils_distance(topLeft, points[j]) > utils_distance(topLeft, p)) {
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


// CONCATENATED MODULE: ./src/pose/algorithms/minkowski-sum.ts

function convexMinkowskiSum(A, B) {
    var e_1, _a, e_2, _b;
    var points = [];
    try {
        for (var _c = __values(A.points), _d = _c.next(); !_d.done; _d = _c.next()) {
            var p1 = _d.value;
            try {
                for (var _e = (e_2 = void 0, __values(B.points)), _f = _e.next(); !_f.done; _f = _e.next()) {
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

// CONCATENATED MODULE: ./src/pose/algorithms/convex-polygon-distance.ts



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
            var msum = convexMinkowskiSum(p, qNeg);
            // console.log(`minkowski sum: ${JSON.stringify(msum)}`);
            // Convert to polygon so points become sorted
            var poly_1 = polygon_Polygon.fromPoints(msum);
            var distancesWithDirections = poly_1.points.map(function (p, i) {
                var line = { from: p, to: poly_1.getNextPoint(i) };
                var shortestPoints = shortestPointLineToPoint(line, { x: 0, y: 0 });
                var distance = lengthFromOrigin(shortestPoints[0]);
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
var convex_polygon_distance_direction = function (l, p) {
    return ((l.to.x - l.from.x) * (p.y - l.from.y)) -
        ((p.x - l.from.x) * (l.to.y - l.from.y));
};
var above = function (l, p) { return convex_polygon_distance_direction(l, p) > 0; };
var below = function (l, p) { return convex_polygon_distance_direction(l, p) < 0; };

// CONCATENATED MODULE: ./src/pose/models/common.ts

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
    var _a = __read(intersectionCoefficients(e1, e2), 2), ɑ = _a[0], _ = _a[1];
    return pointAdd(pointMultScalar(e1.from, ɑ), pointMultScalar(e1.to, (1 - ɑ)));
};

// CONCATENATED MODULE: ./src/pose/algorithms/convex-polygon-intersection.ts

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
    var _a = __read(intersectionCoefficients(e1, e2), 2), ɑ = _a[0], ɑ_ = _a[1];
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
            var side = pointLineClassification(e1, e2.to);
            switch (side) {
                case Side.Right: return false;
                case Side.Left: return true;
            }
        }
        case AimState.Neither: {
            var side = pointLineClassification(e1, e2.to);
            switch (side) {
                case Side.Right: return false;
                // either e1 is right of e2, or neither. Either way we can select e1
                case Side.Left: return true;
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
        if (edgeIntersects(currPEdge(), currQEdge())) {
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

// CONCATENATED MODULE: ./src/pose/embedder/basic-embedder.ts





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
            var _a = convexPolygonDistance(p1, p2), distance = _a.distance, unitVector = _a.unitVector;
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
        var _a = __read([components.nodes[p1Index], components.nodes[p2Index]], 2), p1 = _a[0], p2 = _a[1];
        var hasIntersection = polygonIntersects(p1, p2);
        if (!hasIntersection) {
            return { force: f(p1, p2), type: ForceType.Normal };
        }
        else {
            // console.log(`intersection between ${p1Index} and ${p2Index}`);
            // Always move 5 units if intersection occurs
            var minForce = options.componentSpacing;
            var centerLine = { from: p1.center, to: p2.center };
            var dir = direction(centerLine);
            return {
                force: { x: -dir.x * minForce, y: -dir.y * minForce },
                type: ForceType.Intersection,
            };
        }
    };
    var applyAttractiveForces = function (components, forces, intersectionForces) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(components.edges.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), from = _e[0], neighbors = _e[1];
                try {
                    for (var neighbors_1 = (e_2 = void 0, __values(neighbors)), neighbors_1_1 = neighbors_1.next(); !neighbors_1_1.done; neighbors_1_1 = neighbors_1.next()) {
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
        if (options.type === DistanceDetectionType.BASIC) {
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
    var moveFn = options.type === DistanceDetectionType.GRID_SQUARE ?
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
            turnTotalForce += lengthFromOrigin(force);
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
                components.edges = constructEdges(components.nodes);
                edgeCounter = 0;
            }
        }
    }
};
var expandLine = function (line, bbox) {
    if (line.from.x !== line.to.x) {
        var lineSlope_1 = slope(line);
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

// CONCATENATED MODULE: ./node_modules/@turf/helpers/main.es.js
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
    case 'Point': geom = main_es_point(coordinates).geometry; break;
    case 'LineString': geom = lineString(coordinates).geometry; break;
    case 'Polygon': geom = main_es_polygon(coordinates).geometry; break;
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
function main_es_point(coordinates, properties, options) {
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
function main_es_points(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return main_es_point(coords, properties);
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
function main_es_polygon(coordinates, properties, options) {
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
function main_es_polygons(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return main_es_polygon(coords, properties);
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



// CONCATENATED MODULE: ./src/pose/helpers/turf.ts


var pointToArray = function (point) {
    return [point.x, point.y];
};
var arrayToPoint = function (_a) {
    var _b = __read(_a, 2), x = _b[0], y = _b[1];
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
    return lineString([pointToArray(line.from), pointToArray(line.to)]);
};
var turfPoly = function (poly) {
    var pPoints = poly.points;
    // For some reason poly.getPoint(0) is different then poly.points[0]
    return main_es_polygon([toGeoJSON(__spread(pPoints, [pPoints[0]]))]);
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

// CONCATENATED MODULE: ./node_modules/delaunator/index.js

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

// CONCATENATED MODULE: ./node_modules/d3-delaunay/src/path.js
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

// CONCATENATED MODULE: ./node_modules/d3-delaunay/src/polygon.js
class src_polygon_Polygon {
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

// CONCATENATED MODULE: ./node_modules/d3-delaunay/src/voronoi.js



class voronoi_Voronoi {
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
    const buffer = context == null ? context = new Path : undefined;
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
    const buffer = context == null ? context = new Path : undefined;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new Path : undefined;
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
    const polygon = new src_polygon_Polygon;
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

// CONCATENATED MODULE: ./node_modules/d3-delaunay/src/delaunay.js





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

class delaunay_Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new delaunay_Delaunay("length" in points
        ? flatArray(points, fx, fy, that)
        : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
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
      this._delaunator = new Delaunator(points);
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
    return new voronoi_Voronoi(this, bounds);
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
    const buffer = context == null ? context = new Path : undefined;
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
    const buffer = context == null ? context = new Path : undefined;
    const {points} = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, tau);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path : undefined;
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
    const polygon = new src_polygon_Polygon;
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new Path : undefined;
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
    const polygon = new src_polygon_Polygon;
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

// CONCATENATED MODULE: ./src/pose/algorithms/voronoi.ts



var findNeighbors = function (frame, centers) {
    var e_1, _a;
    var centersMapped = centers.map(pointToArray);
    // console.log(JSON.stringify(centersMapped));
    // console.log(JSON.stringify(frame));
    var neighbors = Array.from({ length: centers.length }, function () { return []; });
    var delaunay = delaunay_Delaunay.from(centersMapped);
    var voronoi = delaunay.voronoi([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    for (var i = 0; i < centers.length; ++i) {
        try {
            for (var _b = (e_1 = void 0, __values(voronoi.neighbors(i))), _c = _b.next(); !_c.done; _c = _b.next()) {
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

// CONCATENATED MODULE: ./src/pose/pose.ts





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
        options = __assign(__assign({}, DEFAULT_OPTIONS), options);
    }
    var embedderOptions = __assign(__assign({}, options), { componentSpacing: options.componentSpacing !== undefined ? options.componentSpacing : calculateIdealDistance(components) });
    // console.log(`component spacing: ${embedderOptions.componentSpacing}`);
    // console.log(`ideal distance: ${options.componentDistance}`);
    var polygons = components.map(function (c) { return componentToPolygon(c); });
    var edges = constructEdges(polygons);
    // console.log(JSON.stringify(edges));
    var polyGraph = {
        nodes: polygons,
        edges: edges,
    };
    basicEmbed(polyGraph, embedderOptions);
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
        for (var _b = __values(component.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    return polygon_Polygon.fromPoints(vertices);
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
        for (var polygons_1 = __values(polygons), polygons_1_1 = polygons_1.next(); !polygons_1_1.done; polygons_1_1 = polygons_1.next()) {
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
    var bbox = boundingBox(polygons.map(function (p) { return p.boundingBox; }));
    var centers = polygons.map(function (p) { return p.center; });
    // console.log(`centers: ${JSON.stringify(centers)}`);
    var neighbors = findNeighbors(bbox, centers);
    for (var i = 0; i < neighbors.length; ++i) {
        try {
            // Neighbor of i-th polygon
            for (var _b = (e_3 = void 0, __values(neighbors[i])), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
            var component = components_1_1.value;
            // Choose first edge of first node from each component
            if (component.edges.length > 0) {
                len += 1;
                var edge = component.edges[0];
                var edgeLength = Math.sqrt(utils_distance({ x: edge.startX, y: edge.startY }, { x: edge.endX, y: edge.endY }));
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
    var bbox = boundingBox(polygonBboxes);
    return (polygonBboxes.map(function (bb) { return utils_area(bb); })
        .reduce(function (a, s) { return a + s; })
        / utils_area(bbox)) * 100;
};


/***/ })
/******/ ]);
});