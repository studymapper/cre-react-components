"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ActivityIndicator extends _react.PureComponent {
  render() {
    const {
      className,
      classNameInfo,
      size,
      info
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `ActivityIndicator ${className}`
    }, /*#__PURE__*/_react.default.createElement("svg", {
      className: "ActivityIndicator__spinner",
      "aria-label": info || 'loading',
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 66 66",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react.default.createElement("circle", {
      className: "ActivityIndicator__spinner-path",
      fill: "none",
      strokeWidth: "6",
      strokeLinecap: "round",
      cx: "33",
      cy: "33",
      r: "30"
    })), !!info && /*#__PURE__*/_react.default.createElement("div", {
      className: `ActivityIndicator__info ${classNameInfo}`
    }, info));
  }

}

exports.default = ActivityIndicator;

_defineProperty(ActivityIndicator, "propTypes", {
  size: _propTypes.default.number,
  className: _propTypes.default.string,
  classNameInfo: _propTypes.default.string,
  info: _propTypes.default.string
});

_defineProperty(ActivityIndicator, "defaultProps", {
  size: 24,
  className: '',
  classNameInfo: '',
  info: ''
});