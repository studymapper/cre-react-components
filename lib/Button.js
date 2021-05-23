"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ActivityIndicator = _interopRequireDefault(require("./ActivityIndicator"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Button extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClick", e => {
      const {
        onClick,
        isDisabled,
        isProcessing,
        debounceTime
      } = this.props;

      if (onClick && !isDisabled && !isProcessing && !this.IS_DEBOUNCE) {
        if (debounceTime) {
          this.IS_DEBOUNCE = true;
        }

        onClick(e);

        if (debounceTime) {
          this.DEBOUNCE_TIMEOUT = setTimeout(this.debounce, debounceTime);
        }
      }
    });

    _defineProperty(this, "debounce", () => {
      this.IS_DEBOUNCE = false;
    });

    this.IS_DEBOUNCE = false;
    this.DEBOUNCE_TIMEOUT = null;
  }

  componentWillUnmount() {
    clearTimeout(this.DEBOUNCE_TIMEOUT);
  }

  render() {
    const {
      className,
      classNameDisabled,
      classNameProcessing,
      classNameLink,
      classNameActivityIndicator,
      onClick,
      label,
      route,
      routeProps,
      isDisabled,
      isProcessing,
      children,
      sizeActivityIndicator,
      debounceTime,
      href,
      ...props
    } = this.props;
    const classNameMain = `Button
            ${isDisabled ? `Button--disabled ${classNameDisabled}` : ''}
            ${isProcessing ? `Button--processing ${classNameProcessing}` : ''}
            ${className}`;

    if (route) {
      // Internal Route
      return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, _extends({}, props, {
        className: classNameMain,
        onClick: this.onClick,
        to: {
          pathname: route,
          state: routeProps
        }
      }), isProcessing ? /*#__PURE__*/_react.default.createElement(_ActivityIndicator.default, {
        classNameLoader: classNameActivityIndicator,
        size: sizeActivityIndicator
      }) : children || label);
    }

    if (href) {
      // Native Anchor
      return /*#__PURE__*/_react.default.createElement("a", _extends({
        target: "_blank",
        rel: "noopener noreferrer"
      }, props, {
        className: classNameMain,
        onClick: this.onClick,
        href: href
      }), isProcessing ? /*#__PURE__*/_react.default.createElement(_ActivityIndicator.default, {
        classNameLoader: classNameActivityIndicator,
        size: sizeActivityIndicator
      }) : children || label);
    } // Custom Button


    return /*#__PURE__*/_react.default.createElement("span", _extends({}, props, {
      className: classNameMain,
      onClick: this.onClick
    }), isProcessing ? /*#__PURE__*/_react.default.createElement(_ActivityIndicator.default, {
      classNameLoader: classNameActivityIndicator,
      size: sizeActivityIndicator
    }) : children || label);
  }

}

exports.default = Button;

_defineProperty(Button, "propTypes", {
  className: _propTypes.default.string,
  classNameLink: _propTypes.default.string,
  classNameDisabled: _propTypes.default.string,
  classNameProcessing: _propTypes.default.string,
  classNameActivityIndicator: _propTypes.default.string,
  label: _propTypes.default.string,
  href: _propTypes.default.string,
  route: _propTypes.default.string,
  routeProps: _propTypes.default.object,
  isDisabled: _propTypes.default.bool,
  isProcessing: _propTypes.default.bool,
  debounceTime: _propTypes.default.number,
  sizeActivityIndicator: _propTypes.default.number,
  onClick: _propTypes.default.func,
  children: _propTypes.default.any
});

_defineProperty(Button, "defaultProps", {
  className: '',
  classNameDisabled: '',
  classNameProcessing: '',
  classNameActivityIndicator: '',
  classNameLink: '',
  href: null,
  route: null,
  routeProps: {},
  label: '',
  isDisabled: false,
  isProcessing: false,
  debounceTime: 300,
  sizeActivityIndicator: 20
});