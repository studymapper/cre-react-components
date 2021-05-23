"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.castArray = castArray;

/**
 * Cast any value to array
 * @param {*} value
 * @returns {Array}
 */
function castArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}