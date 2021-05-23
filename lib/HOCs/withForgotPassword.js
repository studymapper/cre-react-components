"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withForgotPassword = withForgotPassword;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _withAsyncCaller = require("./withAsyncCaller");

var _ModalForgotPassword = _interopRequireDefault(require("../Modals/ForgotPassword/ModalForgotPassword"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withForgotPassword(Component, configProps) {
  const STORAGEKEY_LOGIN_EMAIL = 'sk-wfp-email';
  const {
    validatorEmail,
    validatorPassword,
    useZxcvbn,
    zxcvbnMinScore,
    searchQueryKey: _searchQueryKey,
    apiRequest: _apiRequest,
    apiReset: _apiReset
  } = configProps;
  let {
    textConfig: _textConfig
  } = configProps;

  const _validatorEmail = validatorEmail || (() => true);

  const _validatorPassword = validatorPassword || (() => true);

  const _useZxcvbn = !!useZxcvbn;

  const _zxcvbnMinScore = zxcvbnMinScore || 0;

  class WithForgotPassword extends _react.PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "setTextConfig", textConfig => {
        _textConfig = textConfig;
        this.forceUpdate();
      });

      _defineProperty(this, "setZxcvbn", async () => {
        const {
          setOwnProps
        } = this.props;

        if (_useZxcvbn) {
          const zxcvbn = await import('zxcvbn');
          this.zxcvbn = zxcvbn.default;
          setOwnProps({
            isProcessing: false,
            isRenderStrengthMeter: true
          });
        }
      });

      _defineProperty(this, "toggleModal", () => {
        const {
          isVisible,
          email
        } = this.state;
        sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);
        this.setState({
          isVisible: !isVisible
        });
      });

      _defineProperty(this, "onChangeEmail", e => {
        const email = e.target.value.trim();
        this.setState({
          email,
          isValidEmail: _validatorEmail(email)
        });
      });

      _defineProperty(this, "onChangePassword", e => {
        const password = e.target.value;
        let isValidPassword;

        if (_useZxcvbn && _zxcvbnMinScore && this.zxcvbn) {
          const passwordScore = this.zxcvbn(password).score;
          isValidPassword = passwordScore >= _zxcvbnMinScore;
        } else {
          isValidPassword = _validatorPassword(password);
        }

        this.setState({
          password,
          isValidPassword
        });
      });

      _defineProperty(this, "submitEmail", () => {
        const {
          email
        } = this.state;
        sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);
        this.requestApi({
          api: _apiRequest,
          apiArgs: [email]
        });
      });

      _defineProperty(this, "submitPassword", () => {
        const {
          password,
          resetCode
        } = this.state;
        this.requestApi({
          api: _apiReset,
          apiArgs: [resetCode, password]
        });
      });

      _defineProperty(this, "requestApi", async ({
        api,
        apiArgs
      }) => {
        const {
          asyncCaller,
          setOwnProps
        } = this.props;
        setOwnProps({
          isProcessing: true
        });

        try {
          await asyncCaller(api, ...apiArgs); // On success: remove the search queries from the url

          window.history.replaceState({}, document.title, window.location.pathname);
          setOwnProps({
            isProcessing: false,
            isSuccess: true
          });
        } catch (err) {
          if (err) {
            setOwnProps({
              isProcessing: false
            });
          }
        }
      });

      _defineProperty(this, "onBackToRequestUI", () => {
        this.setState({
          resetCode: ''
        });
      });

      const {
        search
      } = window.location;

      const _email = sessionStorage.getItem(STORAGEKEY_LOGIN_EMAIL) || '';

      let _resetCode = '';

      if (search) {
        const findQuery = query => {
          const data = query.split('=');

          if (data.length === 2 && data[0] === _searchQueryKey && data[1]) {
            _resetCode = data[1];
            return true;
          }

          return false;
        };

        search.slice(1) // remove the "?"
        .split('&') // split all queries
        .find(findQuery); // find the code reset query
      }

      this.state = {
        isVisible: !!_resetCode,
        isValidEmail: _validatorEmail(_email),
        isValidPassword: false,
        email: _email,
        password: '',
        resetCode: _resetCode
      };
    }

    componentDidMount() {
      this.setZxcvbn();
    } // to be compatible with i18n


    render() {
      const {
        isProcessing,
        isRenderStrengthMeter,
        isSuccess
      } = this.props;
      const {
        isVisible,
        isValidEmail,
        isValidPassword,
        email,
        password,
        resetCode
      } = this.state;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Component, _extends({}, this.props, {
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        email: email,
        password: password,
        setTextConfig: this.setTextConfig,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        toggleForgotPasswordModal: this.toggleModal
      })), /*#__PURE__*/_react.default.createElement(_ModalForgotPassword.default, _extends({
        isProcessing: isProcessing,
        isVisible: isVisible,
        isSuccess: isSuccess,
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        isResetCode: !!resetCode,
        isRenderStrengthMeter: isRenderStrengthMeter,
        zxcvbn: this.zxcvbn,
        email: email,
        password: password,
        onClose: this.toggleModal,
        onBackToRequestUI: this.onBackToRequestUI,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        onSubmitEmail: this.submitEmail,
        onSubmitPassword: this.submitPassword
      }, _textConfig)));
    }

  }

  _defineProperty(WithForgotPassword, "propTypes", {
    asyncCaller: _propTypes.default.func.isRequired,
    setOwnProps: _propTypes.default.func.isRequired,
    isProcessing: _propTypes.default.bool,
    isRenderStrengthMeter: _propTypes.default.bool,
    isSuccess: _propTypes.default.bool
  });

  _defineProperty(WithForgotPassword, "defaultProps", {
    isProcessing: _useZxcvbn,
    isRenderStrengthMeter: false,
    isSuccess: false
  });

  return (0, _withAsyncCaller.withAsyncCaller)(WithForgotPassword);
}