"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWindowResizeListener = withWindowResizeListener;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * add windows resize handler to a component
 * @param {Component} Component
 * @param {Number} delay
 * @returns {Component}
 */
function withWindowResizeListener(Component, delay = 100) {
  var _temp;

  if (!globalThis.document) return Component;
  return _temp = class WithWindowResizeListener extends _react.PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "onWindowResize", () => {
        clearTimeout(this.TIMEOUT);
        this.TIMEOUT = setTimeout(this.onWindowResizeDone, delay);
      });

      _defineProperty(this, "onWindowResizeDone", () => {
        this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        });
      });

      this.TIMEOUT = null;
      this.state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
      clearTimeout(this.TIMEOUT);
    }

    render() {
      const {
        windowWidth,
        windowHeight
      } = this.state;
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, this.props, {
        windowWidth: windowWidth,
        windowHeight: windowHeight
      }));
    }

  }, _temp;
}