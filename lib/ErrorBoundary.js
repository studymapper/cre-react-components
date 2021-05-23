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

class ErrorBoundary extends _react.Component {
  static getDerivedStateFromError() {
    // eslint-disable-line react/sort-comp
    return {
      isError: true
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      pathname
    } = this.props;
    const {
      isError
    } = this.state;

    if (pathname !== nextProps.pathname || isError !== nextState.isError) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const {
      pathname
    } = this.props;
    const {
      isError
    } = this.state;

    if (isError && pathname !== prevProps.pathname) {
      this.setState({
        isError: false
      });
    }
  }

  componentDidCatch(error, info) {
    const {
      onError
    } = this.props;
    onError && onError(error, info);
  }

  render() {
    const {
      fallbackMessage,
      fallbackScreen,
      children
    } = this.props;
    const {
      isError
    } = this.state;

    if (isError) {
      return fallbackScreen || /*#__PURE__*/_react.default.createElement("div", {
        className: "ErrorBoundary"
      }, fallbackMessage);
    }

    return children;
  }

}

exports.default = ErrorBoundary;

_defineProperty(ErrorBoundary, "propTypes", {
  pathname: _propTypes.default.string.isRequired,
  onError: _propTypes.default.func,
  fallbackMessage: _propTypes.default.string,
  fallbackScreen: _propTypes.default.any,
  children: _propTypes.default.any
});

_defineProperty(ErrorBoundary, "defaultProps", {
  fallbackMessage: 'Oops, an error occurred !'
});