"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("../../../Button"));

var _config = require("../../config");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _formatDistanceStrict = _interopRequireDefault(require("date-fns/formatDistanceStrict"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertsCard extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "requestAnimationFrame", () => {
      requestAnimationFrame(this.startDismiss);
    });

    _defineProperty(this, "startDismiss", () => {
      const {
        isAutoDismiss
      } = this.props;
      this.setState({
        dismissTimeoutStartDate: Date.now(),
        dismissTimeout: isAutoDismiss ? setTimeout(this.onDismiss, this.dismissCountdown) : null
      });
    });

    _defineProperty(this, "onMouseEnter", () => {
      const {
        dismissTimeoutStartDate,
        dismissTimeout
      } = this.state;
      clearTimeout(dismissTimeout);
      this.dismissCountdown = this.dismissCountdown - (Date.now() - dismissTimeoutStartDate);
      this.setState({
        dismissTimeout: null
      });
    });

    _defineProperty(this, "onMouseLeave", () => {
      this.setState({
        dismissTimeoutStartDate: new Date(),
        dismissTimeout: setTimeout(this.onDismiss, this.dismissCountdown)
      });
    });

    _defineProperty(this, "onPin", () => {
      const {
        dismissTimeout
      } = this.state;
      clearTimeout(dismissTimeout);
      this.setState({
        dismissTimeout: null,
        isPinned: true
      });
    });

    _defineProperty(this, "onUpdateTime", () => {
      const {
        renderTimeDisplay
      } = this.props;
      const {
        timestamp
      } = this.state;
      this.setState({
        timeDisplay: renderTimeDisplay ? renderTimeDisplay(timestamp) : (0, _formatDistanceStrict.default)(timestamp, new Date(), {
          addSuffix: true
        })
      });
    });

    _defineProperty(this, "onDismiss", () => {
      const {
        animationDuration
      } = this.props;
      this.setState({
        dismissedTimeout: setTimeout(this.onDismissFinal, animationDuration)
      });
    });

    _defineProperty(this, "onDismissFinal", () => {
      const {
        id,
        onDismiss
      } = this.props;
      onDismiss(id);
    });

    const {
      type,
      dismissDuration,
      renderTimeDisplay: _renderTimeDisplay
    } = props;
    let icon;

    switch (type) {
      case _config.ALERT_TYPES.INFO:
        icon = _freeSolidSvgIcons.faExclamationCircle;
        break;

      case _config.ALERT_TYPES.SUCCESS:
        icon = _freeSolidSvgIcons.faCheckCircle;
        break;

      case _config.ALERT_TYPES.WARNING:
        icon = _freeSolidSvgIcons.faExclamationTriangle;
        break;

      case _config.ALERT_TYPES.ERROR:
        icon = _freeSolidSvgIcons.faTimesCircle;
        break;

      default:
        break;
    }

    this.dismissCountdown = dismissDuration;
    this.updateInterval = null;
    this.state = {
      dismissTimeoutStartDate: null,
      dismissTimeout: null,
      dismissedTimeout: null,
      timestamp: new Date(),
      timeDisplay: _renderTimeDisplay ? _renderTimeDisplay() : 'just now',
      icon
    };
  }

  componentDidMount() {
    this.startTimeout = setTimeout(this.requestAnimationFrame, 50);
    this.updateInterval = setInterval(this.onUpdateTime, 60000);
  }

  componentWillUnmount() {
    const {
      startTimeout,
      updateInterval
    } = this;
    const {
      dismissTimeout,
      dismissedTimeout
    } = this.state;
    clearTimeout(startTimeout);
    clearTimeout(dismissTimeout);
    clearTimeout(dismissedTimeout);
    clearInterval(updateInterval);
  }

  render() {
    const {
      position,
      type,
      message,
      isAutoDismiss,
      dismissDuration,
      animationDuration
    } = this.props;
    const {
      icon,
      dismissTimeout,
      dismissTimeoutStartDate,
      isPinned,
      timeDisplay,
      dismissedTimeout
    } = this.state;
    const isMouseHandlers = isAutoDismiss && !isPinned;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `AlertsCard AlertsCard--${type} AlertsCard--${position} ${dismissTimeoutStartDate && !dismissedTimeout ? `AlertsCard--${position}-init` : ''}`,
      onMouseEnter: isMouseHandlers ? this.onMouseEnter : null,
      onMouseLeave: isMouseHandlers ? this.onMouseLeave : null,
      style: {
        transitionDuration: `${animationDuration}ms`
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "AlertsCard__header"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "AlertsCard__header-left"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: icon
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "AlertsCard__header-right"
    }, /*#__PURE__*/_react.default.createElement("time", {
      className: "AlertsCard__header-right-time"
    }, timeDisplay), isMouseHandlers && /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: "AlertsCard__header-right-button",
      onClick: this.onPin
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faThumbtack
    })), /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: "AlertsCard__header-right-button",
      onClick: this.onDismiss
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faTimes
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "AlertsCard__body"
    }, isAutoDismiss && /*#__PURE__*/_react.default.createElement("div", {
      className: "AlertsCard__body-countdown"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `AlertsCard__body-countdown-bar AlertsCard__body-countdown-bar--${type} ${isPinned ? 'AlertsCard__body-countdown-bar--pinned' : ''}`,
      style: {
        animationDuration: `${dismissDuration}ms`,
        animationPlayState: !dismissTimeout ? 'paused' : 'running'
      }
    })), message));
  }

}

exports.default = AlertsCard;

_defineProperty(AlertsCard, "propTypes", {
  id: _propTypes.default.number.isRequired,
  message: _propTypes.default.any.isRequired,
  type: _propTypes.default.string.isRequired,
  position: _propTypes.default.string.isRequired,
  onDismiss: _propTypes.default.func.isRequired,
  isAutoDismiss: _propTypes.default.bool.isRequired,
  animationDuration: _propTypes.default.number.isRequired,
  dismissDuration: _propTypes.default.number.isRequired,
  renderTimeDisplay: _propTypes.default.func
});