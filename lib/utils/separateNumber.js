"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separateNumber = separateNumber;

/**
 * Separate a number by thousands
 * Eg.: 100 = 100 | 1000 = 1 000 | 1000000 = 1 000 000
 * @param {Number} number
 * @param {String} separator
 * @returns {String}
 */
function separateNumber(number, separator = ' ') {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}