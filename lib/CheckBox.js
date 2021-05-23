"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _classify = require("./utils/classify");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CheckBox extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", () => {
      const {
        onChange,
        isChecked,
        value
      } = this.props;
      onChange(isChecked, value);
    });
  }

  render() {
    const {
      className,
      isSwitch,
      onChange,
      isChecked,
      label,
      children
    } = this.props;
    const classNames = {
      switch: '',
      switchDot: '',
      box: '',
      boxCheck: '',
      label: '',
      switchChecked: '',
      switchDotChecked: '',
      boxChecked: '',
      boxCheckChecked: '',
      labelChecked: ''
    };

    if (className) {
      classNames.switch = (0, _classify.classify)(className, '__switch');
      classNames.switchDot = (0, _classify.classify)(className, '__switch-dot');
      classNames.box = (0, _classify.classify)(className, '__box');
      classNames.boxCheck = (0, _classify.classify)(className, '__box-check');
      classNames.label = (0, _classify.classify)(className, '__label');

      if (isChecked) {
        classNames.switchChecked = (0, _classify.classify)(className, '__switch--checked');
        classNames.switchDotChecked = (0, _classify.classify)(className, '__switch-dot--checked');
        classNames.boxChecked = (0, _classify.classify)(className, '__box--checked');
        classNames.boxCheckChecked = (0, _classify.classify)(className, '__box-check--checked');
        classNames.labelChecked = (0, _classify.classify)(className, '__label--checked');
      }
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: `CheckBox ${className}`,
      onClick: onChange && this.onChange
    }, isSwitch ? /*#__PURE__*/_react.default.createElement("div", {
      className: `
                            CheckBox__switch
                            ${isChecked ? 'CheckBox__switch--checked' : ''}
                            ${classNames.switch}
                            ${classNames.switchChecked}
                        `
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `
                                CheckBox__switch-dot
                                ${isChecked ? 'CheckBox__switch-dot--checked' : ''}
                                ${classNames.switchDot}
                                ${classNames.switchDotChecked}
                            `
    })) : /*#__PURE__*/_react.default.createElement("div", {
      className: `
                            CheckBox__box
                            ${isChecked ? 'CheckBox__box--checked' : ''}
                            ${classNames.box}
                            ${classNames.boxChecked}
                        `
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      className: `
                                CheckBox__box-check
                                ${isChecked ? 'CheckBox__box-check--checked' : ''}
                                ${classNames.boxCheck}
                                ${classNames.boxCheckChecked}
                            `,
      icon: _freeSolidSvgIcons.faCheck
    })), children || !!label && /*#__PURE__*/_react.default.createElement("div", {
      className: `
                            CheckBox__label
                            ${isChecked ? 'CheckBox__label--checked' : ''}
                            ${classNames.label}
                            ${classNames.labelChecked}
                        `
    }, label));
  }

}

exports.default = CheckBox;

_defineProperty(CheckBox, "propTypes", {
  isChecked: _propTypes.default.bool.isRequired,
  isSwitch: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  className: _propTypes.default.string,
  label: _propTypes.default.any,
  children: _propTypes.default.any,
  value: _propTypes.default.any
});

_defineProperty(CheckBox, "defaultProps", {
  isSwitch: false,
  className: '',
  label: ''
});