"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _ItemPickerViewItem = _interopRequireDefault(require("../Item/ItemPickerViewItem"));

var _OutsideClick = _interopRequireDefault(require("../../../OutsideClick"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItemPickerViewInput extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusInput", length => {
      if (this.REF_INPUT.current) {
        if (length) {
          this.REF_INPUT.current.selectionStart = length;
          this.REF_INPUT.current.selectionEnd = length;
        }

        this.REF_INPUT.current.focus();
      }
    });

    _defineProperty(this, "blurInput", () => {
      if (this.REF_INPUT.current) {
        this.REF_INPUT.current.blur();
      }
    });

    _defineProperty(this, "onChangeValue", e => {
      const {
        onChangeInput
      } = this.props;
      const value = e.target.value;
      const nextState = {
        value
      };

      if (!value) {
        nextState.isMatchVisible = false;
        nextState.match = null;
      }

      this.setState(nextState);
      onChangeInput && onChangeInput(value);
    });

    _defineProperty(this, "onKeyUp", e => {
      const {
        onSubmit,
        onRemove,
        itemsSelected,
        itemsNameKey,
        items,
        itemsSearchConfig
      } = this.props;
      const {
        value
      } = this.state;

      if (e.key === 'Backspace' && !value && itemsSelected.length) {
        const item = itemsSelected[itemsSelected.length - 1];
        const value = item[itemsNameKey];
        this.blurInput();
        this.setState({
          value,
          match: item,
          isMatchVisible: true
        });
        onRemove(item);
        requestAnimationFrame(() => {
          this.focusInput(value.length);
        });
      } else if (value) {
        const fuseConfig = itemsSearchConfig || {
          keys: [itemsNameKey]
        };
        const fuse = new _fuse.default(items, fuseConfig);
        const results = fuse.search(value);
        const matchItem = results.length && results[0].item;
        const {
          top,
          left
        } = this.REF_INPUT.current.getBoundingClientRect();
        const nextState = {
          isMatchVisible: true,
          match: matchItem,
          matchPosX: left,
          matchPosY: top
        };

        if (e.key === 'Enter' && matchItem && onSubmit(matchItem)) {
          nextState.value = '';
          nextState.match = null;
        }

        this.setState(nextState);
      }
    });

    _defineProperty(this, "onSelectMatch", () => {
      const {
        onSubmit
      } = this.props;
      const {
        match
      } = this.state;
      onSubmit(match);
      this.setState({
        isMatchVisible: false,
        match: null,
        value: ''
      });
    });

    _defineProperty(this, "onShowMatch", () => {
      const {
        match
      } = this.state;
      const {
        top,
        left
      } = this.REF_INPUT.current.getBoundingClientRect();
      this.setState({
        isMatchVisible: !!match,
        matchPosX: left,
        matchPosY: top
      });
    });

    _defineProperty(this, "onHideMatch", () => {
      this.setState({
        isMatchVisible: false
      });
    });

    this.REF_INPUT = _react.default.createRef();
    this.state = {
      isMatchVisible: false,
      match: null,
      matchPosX: 0,
      matchPosY: 0,
      value: ''
    };
  }

  componentDidMount() {
    const {
      setFocusInputFunc
    } = this.props;
    setFocusInputFunc(this.focusInput);
    requestAnimationFrame(this.focusInput);
  }

  render() {
    const {
      placeholder,
      placeholderInput,
      itemsSelected
    } = this.props;
    const {
      value,
      isMatchVisible,
      match,
      matchPosX,
      matchPosY
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "ItemPickerViewInput"
    }, /*#__PURE__*/_react.default.createElement("input", {
      ref: this.REF_INPUT,
      className: "ItemPickerViewInput__input",
      placeholder: !itemsSelected.length ? placeholder : placeholderInput,
      value: value,
      onFocus: this.onShowMatch,
      onKeyUp: this.onKeyUp,
      onChange: this.onChangeValue
    }), isMatchVisible && !!match && /*#__PURE__*/_react.default.createElement(_OutsideClick.default, {
      className: "ItemPickerViewInput__match",
      style: {
        left: matchPosX - 5,
        top: matchPosY + 20
      },
      onOutsideClick: this.onHideMatch
    }, /*#__PURE__*/_react.default.createElement(_ItemPickerViewItem.default, {
      onClick: this.onSelectMatch
    }, match.name)));
  }

}

exports.default = ItemPickerViewInput;

_defineProperty(ItemPickerViewInput, "propTypes", {
  setFocusInputFunc: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string.isRequired,
  placeholderInput: _propTypes.default.string.isRequired,
  items: _propTypes.default.array.isRequired,
  itemsSelected: _propTypes.default.array.isRequired,
  itemsNameKey: _propTypes.default.string.isRequired,
  itemsSearchConfig: _propTypes.default.object,
  onSubmit: _propTypes.default.func.isRequired,
  onRemove: _propTypes.default.func.isRequired,
  onChangeInput: _propTypes.default.func
});