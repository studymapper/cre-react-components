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

// NOTE: Careful when using non-instant event's like "click"
// If a component removes the clicked node before the click event triggers,
// it will count as an outside click!
class OutsideClick extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onOutsideClick", e => {
      const {
        onOutsideClick
      } = this.props;

      if (!this.REF.current.contains(e.target)) {
        onOutsideClick();
      }
    });

    this.REF = _react.default.createRef();
    this.EVENT = props.event;
  }

  componentDidMount() {
    const {
      onOutsideClick
    } = this.props;

    if (onOutsideClick) {
      setTimeout(() => {
        document.addEventListener(this.EVENT, this.onOutsideClick);
      }, 200);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      onOutsideClick
    } = this.props;

    if (prevProps.onOutsideClick !== onOutsideClick) {
      document.removeEventListener(this.EVENT, this.onOutsideClick);

      if (onOutsideClick) {
        document.addEventListener(this.EVENT, this.onOutsideClick);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener(this.EVENT, this.onOutsideClick);
  }

  render() {
    const {
      onOutsideClick,
      children,
      event,
      ...props
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
      ref: this.REF
    }), children);
  }

}

exports.default = OutsideClick;

_defineProperty(OutsideClick, "propTypes", {
  children: _propTypes.default.any.isRequired,
  onOutsideClick: _propTypes.default.func,
  event: _propTypes.default.string
});

_defineProperty(OutsideClick, "defaultProps", {
  event: 'mousedown'
});