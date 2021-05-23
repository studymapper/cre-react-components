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

class ItemPickerViewItem extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", e => {
      const {
        isSingleSelection,
        onClick,
        onRemove,
        item
      } = this.props;
      e.stopPropagation();

      if (onClick) {
        onClick(item);
      } else if (!isSingleSelection) {
        onRemove(item);
      }
    });
  }

  render() {
    const {
      className,
      style,
      isSingleSelection,
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `
                    ItemPickerViewItem
                    ${className}
                    ${isSingleSelection ? 'ItemPickerViewItem--isSingleSelection' : ''}
                `,
      style: style,
      onClick: this.onClick
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "ItemPickerViewItem__content"
    }, children));
  }

}

exports.default = ItemPickerViewItem;

_defineProperty(ItemPickerViewItem, "propTypes", {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  isSingleSelection: _propTypes.default.bool,
  onRemove: _propTypes.default.func,
  onClick: _propTypes.default.func,
  item: _propTypes.default.object.isRequired,
  children: _propTypes.default.any.isRequired
});

_defineProperty(ItemPickerViewItem, "defaultProps", {
  className: '',
  style: {}
});