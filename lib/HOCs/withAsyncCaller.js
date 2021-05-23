"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAsyncCaller = withAsyncCaller;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * api/async request handler
 * @param {Component} Component
 * @returns {Component}
 */
function withAsyncCaller(Component) {
  var _temp;

  // This is required when using apiCaller or apiCallerProps
  // to be able to cancel the requests
  // simply globally assign a axios reference
  const AXIOS = globalThis._withAsyncCallerAxios || {
    isCancel: () => false
  }; // If using without axios cancellation, isCancel() should behave like not existing

  return _temp = class WithAsyncCaller extends _react.PureComponent {
    constructor(_props) {
      super(_props);

      _defineProperty(this, "onChildUnmount", () => {
        this._isMounted = false;
        Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
      });

      _defineProperty(this, "cancelTokenByKey", key => {
        if (this.cancelTokens[key]) {
          this.cancelTokens[key].cancel();
          delete this.cancelTokens[key];
        }
      });

      _defineProperty(this, "generateCancelToken", (isAutoHandling = true) => {
        if (AXIOS.CancelToken) {
          const cancelToken = AXIOS.CancelToken.source();

          if (isAutoHandling) {
            const cancelTokenKey = `CT${this.cancelTokenKeyIndex++}`;
            this.cancelTokens[cancelTokenKey] = cancelToken;
          }

          return cancelToken;
        }

        return undefined;
      });

      _defineProperty(this, "apiCaller", (func, ...args) => {
        return this.caller(func, ...[...args, this.generateCancelToken()]);
      });

      _defineProperty(this, "apiCallerProps", (config, ...args) => {
        this.callerProps(config, ...[...args, this.generateCancelToken()]);
      });

      _defineProperty(this, "asyncCaller", (func, ...args) => {
        return this.caller(func, ...args);
      });

      _defineProperty(this, "asyncCallerProps", (config, ...args) => {
        this.callerProps(config, ...args);
      });

      _defineProperty(this, "caller", async (func, ...args) => {
        if (this._isMounted) {
          try {
            const response = await func(...args);

            if (this._isMounted) {
              return response;
            }

            throw false;
          } catch (err) {
            // If using without axios cancellation, isCancel() will never return true
            if (!this._isMounted || AXIOS.isCancel(err)) {
              throw false;
            } // Forward all throws not caused by component unmount or cancelled requests


            throw err;
          }
        }
      });

      _defineProperty(this, "callerProps", (config, ...args) => {
        const {
          api,
          responseKey,
          responseDataKey,
          loadingKey,
          onSuccess,
          onError
        } = config;

        const request = async () => {
          let isCancelled = false;
          let newState = {};
          let response;
          let callback;

          try {
            response = await api(...args);

            if (this._isMounted) {
              if (responseKey) {
                newState[responseKey] = responseDataKey ? response[responseDataKey] : response;
              }

              if (onSuccess) {
                callback = () => onSuccess(response);
              }
            }
          } catch (err) {
            // If using without axios cancellation, isCancel() will never return true
            if (!this._isMounted || AXIOS.isCancel(err)) {
              isCancelled = true;
            } else {
              response = err;

              if (onError) {
                callback = () => onError(err);
              }
            }
          } finally {
            if (this._isMounted && !isCancelled) {
              if (loadingKey) {
                newState[loadingKey] = false;
              }

              newState = responseKey || loadingKey ? newState : null;
              this.setState(newState, callback);
            }
          }
        };

        if (this._isMounted) {
          if (loadingKey) {
            this.setState({
              [loadingKey]: true
            }, request);
          } else {
            request();
          }
        }
      });

      _defineProperty(this, "setOwnProps", props => {
        if (this._isMounted) {
          this.setState({ ...props
          });
        }
      });

      this._isMounted = true;
      this.cancelTokenKeyIndex = 0;
      this.cancelTokens = {};
      this.state = {};
    }

    componentWillUnmount() {
      this._isMounted = false;
      Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
    }

    render() {
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, this.state, this.props, {
        onUnmount: this.onChildUnmount,
        setOwnProps: this.setOwnProps,
        apiCaller: this.apiCaller,
        apiCallerProps: this.apiCallerProps,
        asyncCaller: this.asyncCaller,
        asyncCallerProps: this.asyncCallerProps,
        generateCancelToken: this.generateCancelToken
      }));
    }

  }, _temp;
}