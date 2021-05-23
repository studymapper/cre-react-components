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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Input extends _react.PureComponent {
  render() {
    const {
      className,
      classNameValid,
      classNameInvalid,
      isReadOnly,
      isDisabled,
      isValid,
      isInvalid,
      isTextArea,
      ...props
    } = this.props;
    let classNamesInvalid = '';
    let classNamesValid = '';

    if (isInvalid) {
      classNamesInvalid = `Input--isInvalid ${classNameInvalid}`;
    } else if (isValid) {
      classNamesValid = `Input--isValid ${classNameValid}`;
    }

    if (isTextArea) {
      return /*#__PURE__*/_react.default.createElement("textarea", _extends({
        readOnly: isReadOnly,
        disabled: isDisabled
      }, props, {
        className: `Input Input--textarea ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`
      }));
    }

    return /*#__PURE__*/_react.default.createElement("input", _extends({
      readOnly: isReadOnly,
      disabled: isDisabled
    }, props, {
      className: `Input ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`
    }));
  }

}

exports.default = Input;

_defineProperty(Input, "propTypes", {
  className: _propTypes.default.string,
  classNameValid: _propTypes.default.string,
  classNameInvalid: _propTypes.default.string,
  isReadOnly: _propTypes.default.bool,
  isDisabled: _propTypes.default.bool,
  isValid: _propTypes.default.bool,
  isInvalid: _propTypes.default.bool,
  isTextArea: _propTypes.default.bool
});

_defineProperty(Input, "defaultProps", {
  className: '',
  classNameValid: '',
  classNameInvalid: '',
  isReadOnly: false,
  isDisabled: false,
  isValid: false,
  isInvalid: false,
  isTextArea: false
});