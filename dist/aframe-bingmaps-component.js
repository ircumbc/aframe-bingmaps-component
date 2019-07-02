(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n/**\n * Bing Maps component for A-Frame.\n */\n\n\nAFRAME.registerComponent('bingmaps', {\n  schema: {\n    center: {\n      default: [0, 0],\n      type: 'array'\n    },\n    type: {\n      default: 'aerial',\n      type: 'string'\n    },\n    key: {\n      default: '',\n      type: 'string'\n    },\n    zoom: {\n      default: 0,\n      type: 'int'\n    }\n  },\n\n  /**\n  * Set if component needs multiple instancing.\n  */\n  multiple: false,\n\n  /**\n  * Called once when component is attached. Generally for initial setup.\n  */\n  init: function () {\n    this.metadata = {};\n    this.get_metadata().then(() => {\n      console.log(this.get_tile_url('123123123123123'));\n    });\n    console.log(this.get_tile_siblingS('0123'));\n  },\n\n  /**\n  * Called when component is attached and when component data changes.\n  * Generally modifies the entity based on the data.\n  */\n  update: function (oldData) {},\n\n  /**\n  * Called when a component is removed (e.g., via removeAttribute).\n  * Generally undoes all modifications to the entity.\n  */\n  remove: function () {},\n\n  /**\n  * Called on each scene tick.\n  */\n  // tick: function (t) { },\n\n  /**\n  * Called when entity pauses.\n  * Use to stop or remove any dynamic or background behavior such as events.\n  */\n  pause: function () {},\n\n  /**\n  * Called when entity resumes.\n  * Use to continue or add any dynamic or background behavior such as events.\n  */\n  play: function () {},\n\n  /**\n  * Event handlers that automatically get attached or detached based on scene state.\n  */\n  events: {// click: function (evt) { }\n  },\n\n  /**\n   * Request the metadata from Bing Maps that we will use to set the map tile image URLs.\n   */\n  get_metadata: function () {\n    let type = this.data.type;\n    let key = this.data.key;\n    var metadata_url = `//dev.virtualearth.net/REST/V1/Imagery/Metadata/${type}?output=json&include=ImageryProviders&key=${key}`;\n    return new Promise((resolve, reject) => {\n      fetch(metadata_url).then(response => {\n        return response.json();\n      }).then(data => {\n        let imageUrl = data.resourceSets[0].resources[0].imageUrl;\n\n        if (location.protocol === 'https:') {\n          imageUrl = imageUrl.replace(/^http:/gi, 'https:');\n        }\n\n        this.metadata = {\n          imageUrl: imageUrl,\n          imageUrlSubdomains: data.resourceSets[0].resources[0].imageUrlSubdomains\n        };\n        resolve();\n      }).catch(error => {\n        throw new Error('Failed to get Bing Maps metadata from dev.virtualearth.net.', error);\n        reject();\n      });\n    });\n  },\n  get_tile_url: function (quadkey) {\n    let index = parseInt(quadkey) & this.metadata.imageUrlSubdomains.length;\n    let subdomain = this.metadata.imageUrlSubdomains[index];\n    return this.metadata.imageUrl.replace('{subdomain}', subdomain).replace('{quadkey}', quadkey);\n  },\n  get_tile_parent: function (quadkey) {\n    return quadkey.slice(0, -1);\n  },\n  get_tile_children: function (quadkey) {\n    return [0, 1, 2, 3].map(i => {\n      return quadkey.concat(i);\n    });\n  },\n  get_tile_siblings: function (quadkey) {\n    return this.get_tile_children(this.get_tile_parent(quadkey)).filter(i => {\n      return i !== quadkey;\n    });\n  },\n  get_tile_neighbors: function (quadkey) {\n    // get all keys that are adjacent to me, including diagonally.\n    var neighbors = [];\n    neighbors.push(QuadKeyTools.sibling(key, 'left'));\n    neighbors.push(QuadKeyTools.sibling(neighbors[neighbors.length - 1], 'up'));\n    neighbors.push(QuadKeyTools.sibling(key, 'right'));\n    neighbors.push(QuadKeyTools.sibling(neighbors[neighbors.length - 1], 'down'));\n    neighbors.push(QuadKeyTools.sibling(key, 'up'));\n    neighbors.push(QuadKeyTools.sibling(neighbors[neighbors.length - 1], 'right'));\n    neighbors.push(QuadKeyTools.sibling(key, 'down'));\n    neighbors.push(QuadKeyTools.sibling(neighbors[neighbors.length - 1], 'left'));\n    return neighbors;\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});