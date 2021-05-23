"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _Modal = _interopRequireDefault(require("../../Modal"));

var _InputGroup = _interopRequireDefault(require("../../InputGroup"));

var _Input = _interopRequireDefault(require("../../Input"));

var _Button = _interopRequireDefault(require("../../Button"));

var _PasswordStrengthMeter = _interopRequireDefault(require("../../PasswordStrengthMeter"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ModalForgotPassword extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onTogglePasswordVisibility", () => {
      const {
        isPasswordVisible
      } = this.state;
      this.setState({
        isPasswordVisible: !isPasswordVisible
      });
    });

    _defineProperty(this, "onChangehiddenEmailInputDummy", () => {});

    _defineProperty(this, "renderRequestUI", () => {
      const {
        isProcessing,
        isSuccess,
        isValidEmail,
        emailTitle,
        emailInputLabel,
        emailInputPlaceholder,
        emailSubmit,
        emailSuccess,
        email,
        onChangeEmail,
        onSubmitEmail
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__title"
      }, emailTitle), /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__content"
      }, !isSuccess && /*#__PURE__*/_react.default.createElement("label", {
        className: "ModalForgotPassword__content-label",
        htlmfor: "ModalForgotPassword__content-inputGroup-input"
      }, emailInputLabel), /*#__PURE__*/_react.default.createElement(_InputGroup.default, {
        className: "ModalForgotPassword__content-inputGroup"
      }, /*#__PURE__*/_react.default.createElement(_Input.default, {
        id: "ModalForgotPassword__content-inputGroup-input",
        className: `ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`,
        isDisabled: isProcessing || isSuccess,
        isReadOnly: isSuccess,
        isValid: isValidEmail && !isSuccess,
        type: "email",
        autoComplete: "email",
        value: email,
        placeholder: emailInputPlaceholder,
        onChange: onChangeEmail
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__footer"
      }, isSuccess ? /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__footer-success"
      }, emailSuccess) : /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--confirm",
        label: emailSubmit,
        isDisabled: !isValidEmail,
        isProcessing: isProcessing,
        onClick: onSubmitEmail
      })));
    });

    _defineProperty(this, "renderResetUI", () => {
      const {
        isProcessing,
        isRenderStrengthMeter,
        isSuccess,
        isValidPassword,
        passwordTitle,
        passwordInputLabel,
        passwordInputPlaceholder,
        passwordSubmit,
        passwordSuccess,
        passwordRequestNewEmail,
        backToLogin,
        onChangePassword,
        onSubmitPassword,
        onClose,
        onBackToRequestUI,
        email,
        password,
        zxcvbn
      } = this.props;
      const {
        isPasswordVisible
      } = this.state;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__title"
      }, passwordTitle), /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__content"
      }, !isSuccess && /*#__PURE__*/_react.default.createElement("label", {
        className: "ModalForgotPassword__content-label",
        htlmfor: "ModalForgotPassword__content-inputGroup-input"
      }, passwordInputLabel), /*#__PURE__*/_react.default.createElement(_Input.default, {
        className: "ModalForgotPassword__content-hiddenEmailInput",
        type: "email",
        value: email,
        onChange: this.onChangehiddenEmailInputDummy
      }), /*#__PURE__*/_react.default.createElement(_InputGroup.default, {
        className: "ModalForgotPassword__content-inputGroup"
      }, /*#__PURE__*/_react.default.createElement(_Input.default, {
        id: "ModalForgotPassword__content-inputGroup-input",
        className: `ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`,
        type: isPasswordVisible ? 'text' : 'password',
        isDisabled: isProcessing || isSuccess,
        isReadOnly: isSuccess,
        value: password,
        placeholder: passwordInputPlaceholder,
        onChange: onChangePassword
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "ModalForgotPassword__content-inputGroup-passwordToggle",
        onClick: this.onTogglePasswordVisibility
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: isPasswordVisible ? _freeSolidSvgIcons.faEyeSlash : _freeSolidSvgIcons.faEye
      }))), isRenderStrengthMeter && /*#__PURE__*/_react.default.createElement(_PasswordStrengthMeter.default, {
        className: "ModalForgotPassword__content-PasswordStrengthMeter",
        zxcvbn: zxcvbn,
        password: password
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__footer"
      }, isSuccess ? /*#__PURE__*/_react.default.createElement("div", {
        className: "ModalForgotPassword__footer-success"
      }, passwordSuccess, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--toLogin",
        label: backToLogin,
        onClick: onClose
      })) : /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--confirm",
        label: passwordSubmit,
        isDisabled: !isValidPassword,
        isProcessing: isProcessing,
        onClick: onSubmitPassword
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--backToRequestUI",
        label: passwordRequestNewEmail,
        onClick: onBackToRequestUI
      })));
    });

    this.state = {
      isPasswordVisible: false
    };
  }

  render() {
    const {
      isProcessing,
      isVisible,
      isResetCode,
      onClose
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(_Modal.default, {
      isVisible: isVisible,
      classNameDialog: "ModalForgotPasswordDialog",
      onClose: !isProcessing ? onClose : null
    }, isResetCode ? this.renderResetUI() : this.renderRequestUI());
  }

}

exports.default = ModalForgotPassword;

_defineProperty(ModalForgotPassword, "propTypes", {
  isProcessing: _propTypes.default.bool.isRequired,
  isVisible: _propTypes.default.bool.isRequired,
  isSuccess: _propTypes.default.bool.isRequired,
  isValidEmail: _propTypes.default.bool.isRequired,
  isValidPassword: _propTypes.default.bool.isRequired,
  isResetCode: _propTypes.default.bool.isRequired,
  isRenderStrengthMeter: _propTypes.default.bool.isRequired,
  //
  zxcvbn: _propTypes.default.func,
  // data
  email: _propTypes.default.string.isRequired,
  password: _propTypes.default.string.isRequired,
  // change handlers
  onClose: _propTypes.default.func.isRequired,
  onBackToRequestUI: _propTypes.default.func.isRequired,
  onChangeEmail: _propTypes.default.func.isRequired,
  onChangePassword: _propTypes.default.func.isRequired,
  // submissions
  onSubmitEmail: _propTypes.default.func.isRequired,
  onSubmitPassword: _propTypes.default.func.isRequired,
  // Text
  emailTitle: _propTypes.default.string.isRequired,
  emailInputLabel: _propTypes.default.string.isRequired,
  emailInputPlaceholder: _propTypes.default.string.isRequired,
  emailSubmit: _propTypes.default.string.isRequired,
  emailSuccess: _propTypes.default.string.isRequired,
  passwordTitle: _propTypes.default.string.isRequired,
  passwordInputLabel: _propTypes.default.string.isRequired,
  passwordInputPlaceholder: _propTypes.default.string.isRequired,
  passwordSubmit: _propTypes.default.string.isRequired,
  passwordSuccess: _propTypes.default.string.isRequired,
  passwordRequestNewEmail: _propTypes.default.string.isRequired,
  backToLogin: _propTypes.default.string.isRequired
});

_defineProperty(ModalForgotPassword, "defaultProps", {
  emailTitle: 'Forgot your password ?',
  emailInputLabel: 'Enter your email',
  emailInputPlaceholder: 'e-mail@email.com',
  emailSubmit: 'Confirm',
  emailSuccess: 'An email with further instructions has been sent to you.',
  passwordTitle: 'Set a new password',
  passwordInputLabel: 'Enter your new password',
  passwordInputPlaceholder: '******',
  passwordSubmit: 'Confirm',
  passwordSuccess: 'You can now login with your new password.',
  passwordRequestNewEmail: 'Click here to request a new password reset.',
  backToLogin: 'Back to Login'
});