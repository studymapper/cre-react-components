"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _OutsideClick = _interopRequireDefault(require("./OutsideClick"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Modal extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCloseByKey", e => {
      const {
        onClose
      } = this.props;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    });

    const {
      isVisible
    } = props;

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this.onCloseByKey);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isVisible
    } = this.props;

    if (isVisible !== prevProps.isVisible) {
      if (isVisible) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.onCloseByKey);
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.onCloseByKey);
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.onCloseByKey);
  }

  render() {
    const {
      isVisible,
      onClose,
      className,
      classNameDialog,
      classNameContent,
      children
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return (0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "ModalBackdrop"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: `Modal ${className}`,
      role: "dialog",
      "aria-modal": true,
      tabIndex: -1
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `Modal__dialog ${classNameDialog}`,
      role: "document"
    }, /*#__PURE__*/_react.default.createElement(_OutsideClick.default, {
      className: `Modal__dialog-content ${classNameContent}`,
      onOutsideClick: onClose
    }, children)))), document.body);
  }

}

exports.default = Modal;

_defineProperty(Modal, "propTypes", {
  isVisible: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func,
  className: _propTypes.default.string,
  classNameDialog: _propTypes.default.string,
  classNameContent: _propTypes.default.string,
  children: _propTypes.default.any.isRequired
});

_defineProperty(Modal, "defaultProps", {
  onClose: () => {},
  className: '',
  classNameDialog: '',
  classNameContent: ''
});