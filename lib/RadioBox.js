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

class RadioBox extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", () => {
      const {
        onChange,
        id
      } = this.props;
      onChange(id);
    });
  }

  render() {
    const {
      className,
      onChange,
      id,
      checkedId,
      label,
      children
    } = this.props;
    const isChecked = id === checkedId;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `RadioBox ${className}`,
      onClick: onChange && this.onChange
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `RadioBox__box ${isChecked ? 'RadioBox__box--checked' : ''}`
    }), children || !!label && /*#__PURE__*/_react.default.createElement("div", {
      className: "RadioBox__label"
    }, label));
  }

}

exports.default = RadioBox;

_defineProperty(RadioBox, "propTypes", {
  checkedId: _propTypes.default.number.isRequired,
  id: _propTypes.default.number.isRequired,
  className: _propTypes.default.string,
  onChange: _propTypes.default.func,
  label: _propTypes.default.string,
  children: _propTypes.default.any
});

_defineProperty(RadioBox, "defaultProps", {
  className: '',
  label: ''
});