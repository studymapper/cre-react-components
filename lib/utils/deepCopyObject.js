"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopyObject = deepCopyObject;

/**
 * Create a deep copy of an object
 * @param {Object} obj
 * @returns {Object}
 */
function deepCopyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}