"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _withThrottledChange = require("../../../HOCs/withThrottledChange");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItemPickerSearch extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusInput", () => {
      if (this.REF_SEARCH.current) {
        this.REF_SEARCH.current.focus();
      }
    });

    _defineProperty(this, "onChangeSearch", e => {
      const {
        onChangeThrottled
      } = this.props;
      const search = e.target.value;
      this.setState({
        search
      });
      onChangeThrottled(search, this.onSearch);
    });

    _defineProperty(this, "onSearch", search => {
      const {
        onChange
      } = this.props;
      onChange(search);
    });

    const {
      search: _search
    } = props;
    this.REF_SEARCH = _react.default.createRef();
    this.state = {
      search: _search || ''
    };
  }

  componentDidMount() {
    const {
      isAutoFocus
    } = this.state;

    if (isAutoFocus) {
      requestAnimationFrame(this.focusInput);
    }
  }

  render() {
    const {
      placeholder
    } = this.props;
    const {
      search
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("input", {
      ref: this.REF_SEARCH,
      className: "ItemPickerSearch",
      placeholder: placeholder,
      value: search,
      onChange: this.onChangeSearch
    });
  }

}

_defineProperty(ItemPickerSearch, "propTypes", {
  onChangeThrottled: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string.isRequired,
  search: _propTypes.default.string,
  isAutoFocus: _propTypes.default.bool.isRequired
});

var _default = (0, _withThrottledChange.withThrottledChange)(ItemPickerSearch, 250);

exports.default = _default;