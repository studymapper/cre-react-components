"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limitString = limitString;

/**
 * limits a string by cutting it after the limit
 * Eg: limitString('Hello', 3) === 'Hel...'
 * @param {String} string
 * @param {Number} limit
 * @param {String} appendix
 * @returns {String}
 */
function limitString(string, limit, appendix = '...') {
  string = `${string || ''}`;

  if (limit && string.length > limit) {
    return `${string.slice(0, limit).trim()}${appendix}`;
  }

  return string;
}