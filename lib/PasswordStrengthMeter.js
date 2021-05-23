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

class PasswordStrengthMeter extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "loadModule", async () => {
      const zxcvbn = await import('zxcvbn');
      this.zxcvbn = zxcvbn.default;
      this.setPasswordScore();
    });

    _defineProperty(this, "setPasswordScore", () => {
      const {
        password
      } = this.props;
      this.setState({
        score: this.zxcvbn(password).score
      }, this.onUpdatedScore);
    });

    _defineProperty(this, "onUpdatedScore", () => {
      const {
        onChangeScore
      } = this.props;
      const {
        score
      } = this.state;

      if (onChangeScore) {
        onChangeScore(score);
      }
    });

    const {
      zxcvbn: _zxcvbn
    } = props;
    this.zxcvbn = _zxcvbn;
    this.state = {
      score: 0
    };
  }

  componentDidMount() {
    if (!this.zxcvbn) {
      this.loadModule();
    } else {
      this.setPasswordScore();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      password
    } = this.props;
    const {
      score
    } = this.state;

    if (this.zxcvbn && (password !== nextProps.password || score !== nextState.score)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const {
      password
    } = this.props;

    if (password !== prevProps.password) {
      this.setPasswordScore();
    }
  } // asynchronously load "zxcvbn" because it's a huge package


  render() {
    const {
      className
    } = this.props;
    const {
      score
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `PasswordStrengthMeter ${className}`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `PasswordStrengthMeter-bar PasswordStrengthMeter-bar--${score}`
    }));
  }

}

exports.default = PasswordStrengthMeter;

_defineProperty(PasswordStrengthMeter, "propTypes", {
  password: _propTypes.default.string.isRequired,
  zxcvbn: _propTypes.default.func,
  onChangeScore: _propTypes.default.func,
  className: _propTypes.default.string
});

_defineProperty(PasswordStrengthMeter, "defaultProps", {
  className: ''
});