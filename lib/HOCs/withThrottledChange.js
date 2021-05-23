"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withThrottledChange = withThrottledChange;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * throttle update handler
 * @param {Component} Component
 * @param {Number} defaultThrottle
 * @returns {Component}
 */
function withThrottledChange(Component, defaultThrottle = 150) {
  var _temp;

  return _temp = class WithThrottledChange extends _react.PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "onChange", (value, callback, throttle = defaultThrottle) => {
        clearTimeout(this.TIMEOUT);
        this.VALUE = value;
        this.CALLBACK = callback;
        this.TIMEOUT = setTimeout(this.change, throttle);
      });

      _defineProperty(this, "change", () => {
        this.CALLBACK(this.VALUE);
      });

      this.VALUE = null;
      this.CALLBACK = null;
      this.TIMEOUT = null;
    }

    componentWillUnmount() {
      clearTimeout(this.TIMEOUT);
    }

    render() {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, this.props, {
        onChangeThrottled: this.onChange
      }));
    }

  }, _temp;
}