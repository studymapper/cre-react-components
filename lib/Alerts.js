"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ALERTS_POSITION", {
  enumerable: true,
  get: function () {
    return _config.ALERTS_POSITION;
  }
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _alerts = require("./ReduxReducers/alerts");

var _AlertsCard = _interopRequireDefault(require("./Alerts/components/Card/AlertsCard"));

var _config = require("./Alerts/config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Alerts extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderAlert", ({
      id,
      ...props
    }) => {
      const {
        dismissAlert,
        position,
        renderTimeDisplay,
        isAutoDismiss,
        animationDuration,
        dismissDuration
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_AlertsCard.default, _extends({
        isAutoDismiss: isAutoDismiss,
        animationDuration: animationDuration,
        dismissDuration: dismissDuration
      }, props, {
        key: id,
        id: id,
        position: position,
        onDismiss: dismissAlert,
        renderTimeDisplay: renderTimeDisplay
      }));
    });
  }

  render() {
    const {
      alerts,
      position
    } = this.props;

    if (typeof window === 'undefined') {
      return null;
    }

    return (0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
      className: `Alerts Alerts--${position}`
    }, alerts.map(this.renderAlert)), globalThis?.document?.body);
  }

}

_defineProperty(Alerts, "propTypes", {
  position: _propTypes.default.oneOf(_config.ALERTS_POSITION_ARRAY).isRequired,
  dismissAlert: _propTypes.default.func.isRequired,
  alerts: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    type: _propTypes.default.oneOf(_config.ALERT_TYPES_ARRAY),
    position: _propTypes.default.oneOf(_config.ALERTS_POSITION_ARRAY),
    message: _propTypes.default.any.isRequired
  }).isRequired).isRequired,
  isAutoDismiss: _propTypes.default.bool,
  animationDuration: _propTypes.default.number,
  dismissDuration: _propTypes.default.number,
  renderTimeDisplay: _propTypes.default.func
});

_defineProperty(Alerts, "defaultProps", {
  isAutoDismiss: true,
  animationDuration: 500,
  dismissDuration: 4000
});

function mapStateToProps({
  alerts
}) {
  return { ...alerts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dismissAlert: id => {
      dispatch((0, _alerts.dismissAlert)(id));
    }
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Alerts);

exports.default = _default;