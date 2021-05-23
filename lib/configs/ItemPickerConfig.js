"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemPickerGlobalDefaultProps = exports.ItemPickerGlobalPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ItemPickerGlobalPropTypes = {
  isProcessing: _propTypes.default.bool,
  className: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  onChangeSearch: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]),
  maxSelections: _propTypes.default.number,
  minSelections: _propTypes.default.number,
  items: _propTypes.default.array.isRequired,
  itemsNameKey: _propTypes.default.string,
  itemsSearchConfig: _propTypes.default.object,
  renderItemContent: _propTypes.default.func,
  domPortalNode: _propTypes.default.any
};
exports.ItemPickerGlobalPropTypes = ItemPickerGlobalPropTypes;
const ItemPickerGlobalDefaultProps = {
  isProcessing: false,
  className: '',
  itemsNameKey: 'name',
  itemsSearchConfig: null,
  maxSelections: null,
  minSelections: 0,
  renderItemContent: null,
  onChangeSearch: null
};
exports.ItemPickerGlobalDefaultProps = ItemPickerGlobalDefaultProps;