"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _ActivityIndicator = _interopRequireDefault(require("./ActivityIndicator"));

var _castArray = require("./utils/castArray");

var _classify = require("./utils/classify");

var _ItemPickerConfig = require("./configs/ItemPickerConfig");

var _ItemPicker = _interopRequireDefault(require("./ItemPicker"));

var _computeItemPickerChangeValue = require("./ItemPicker/utils/computeItemPickerChangeValue");

var _ItemPickerViewItem = _interopRequireDefault(require("./ItemPickerView/components/Item/ItemPickerViewItem"));

var _ItemPickerViewInput = _interopRequireDefault(require("./ItemPickerView/components/Input/ItemPickerViewInput"));

var _globalThis$document;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItemPickerView extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "setFocusInputFunc", focusInput => {
      this.focusInput = focusInput;
    });

    _defineProperty(this, "onFocusInput", e => {
      this.focusInput && this.focusInput();
    });

    _defineProperty(this, "onToggleItemPicker", () => {
      const {
        domPortalNode
      } = this.props;
      const {
        isItemPickerVisible
      } = this.state;
      const itemPickerStyle = {};

      if (domPortalNode !== null) {
        itemPickerStyle.top = 0;
        itemPickerStyle.left = 0;
        itemPickerStyle.maxWidth = 200;

        if (this.REF_CONTAINER.current) {
          const {
            top,
            left,
            width,
            height
          } = this.REF_CONTAINER.current.getBoundingClientRect();
          itemPickerStyle.top = top + height;
          itemPickerStyle.left = left;
          itemPickerStyle.maxWidth = width;
        }
      }

      this.setState({
        isItemPickerVisible: !isItemPickerVisible,
        itemPickerStyle
      });
    });

    _defineProperty(this, "onAddItem", item => {
      const {
        value,
        maxSelections,
        minSelections,
        onChange
      } = this.props;
      const nextValue = (0, _computeItemPickerChangeValue.computeItemPickerChangeValue)({
        item,
        value,
        maxSelections,
        minSelections
      });

      if (nextValue !== false) {
        // only accept adding items
        if (JSON.stringify(nextValue).length > JSON.stringify(value).length) {
          onChange(nextValue, item);
          return true;
        }
      }

      return false;
    });

    _defineProperty(this, "onRemoveItem", item => {
      const {
        value,
        maxSelections,
        minSelections,
        onChange
      } = this.props;
      const nextValue = (0, _computeItemPickerChangeValue.computeItemPickerChangeValue)({
        item,
        value,
        maxSelections,
        minSelections
      });

      if (nextValue !== false) {
        onChange(nextValue, item);
      }
    });

    _defineProperty(this, "onClose", () => {
      const {
        isAutoClose
      } = this.props;
      const {
        isSingleSelection,
        isItemPickerVisible
      } = this.state;

      if (isAutoClose && isSingleSelection && isItemPickerVisible) {
        this.setState({
          isItemPickerVisible: false
        });
      }
    });

    _defineProperty(this, "renderItem", item => {
      const {
        renderItemContent,
        renderActiveItemContent,
        itemsNameKey
      } = this.props;
      const {
        isSingleSelection
      } = this.state;
      const {
        id,
        [itemsNameKey]: name
      } = item;
      const renderContent = renderActiveItemContent || renderItemContent;
      return /*#__PURE__*/_react.default.createElement(_ItemPickerViewItem.default, _extends({
        key: id
      }, item, {
        isSingleSelection: isSingleSelection,
        item: item,
        onRemove: this.onRemoveItem
      }), renderContent ? renderContent(item) : name);
    });

    const {
      value: _value,
      items,
      maxSelections: _maxSelections
    } = props;
    const valueArray = (0, _castArray.castArray)(_value);

    const filterItem = item => valueArray.indexOf(item.id) > -1;

    const selectedItems = items.filter(filterItem);

    const _isSingleSelection = typeof _value === 'number' || _maxSelections === 1;

    this.REF_CONTAINER = _react.default.createRef();
    this.focusInput = null;
    this.state = {
      isItemPickerVisible: false,
      selectedItems,
      isSingleSelection: _isSingleSelection,
      isMaxSelected: _isSingleSelection || _maxSelections && _maxSelections <= selectedItems.length,
      itemPickerStyle: {}
    };
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      items,
      maxSelections
    } = this.props;

    if (JSON.stringify(value) !== JSON.stringify(prevProps.value) || JSON.stringify(items) !== JSON.stringify(prevProps.items)) {
      const valueArray = (0, _castArray.castArray)(value);

      const filterItem = item => valueArray.indexOf(item.id) > -1;

      const selectedItems = items.filter(filterItem);
      const isSingleSelection = typeof value === 'number' || maxSelections === 1;
      this.setState({
        selectedItems,
        isSingleSelection,
        isMaxSelected: isSingleSelection || maxSelections && maxSelections <= selectedItems.length
      });
      this.onClose();
    }
  }

  render() {
    const {
      className,
      items,
      itemsNameKey,
      itemsSearchConfig,
      childrenLeft,
      childrenRight,
      isProcessing,
      placeholder,
      onClick,
      isInput,
      isToggle,
      placeholderInput,
      onChangeInput,
      childrenToggle,
      isItemPicker,
      isValid,
      isInvalid,
      style
    } = this.props;
    const {
      selectedItems,
      isMaxSelected,
      isSingleSelection,
      isItemPickerVisible,
      itemPickerStyle
    } = this.state;
    const isRenderInput = isInput && !isMaxSelected;
    const onClickFunc = isItemPicker ? this.onToggleItemPicker : onClick;
    const classNames = {
      items: '',
      items__isValid: '',
      itemsWrapper: '',
      itemsWrapperProcessing: '',
      itemsWrapperPlaceholder: '',
      dropdown: '',
      itempicker: ''
    };

    if (className) {
      classNames.items = (0, _classify.classify)(className, '__items');
      classNames.items__isValid = (0, _classify.classify)(className, '__items--isValid');
      classNames.items__isInvalid = (0, _classify.classify)(className, '__items--isInvalid');
      classNames.itemsWrapper = (0, _classify.classify)(className, '__items-wrapper');
      classNames.itemsWrapperProcessing = (0, _classify.classify)(className, '__items-wrapper-processing');
      classNames.itemsWrapperPlaceholder = (0, _classify.classify)(className, '__items-wrapper-placeholder');
      classNames.dropdown = (0, _classify.classify)(className, '__dropdown');
      classNames.itempicker = (0, _classify.classify)(className, '__ItemPicker');
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.REF_CONTAINER,
      className: `
                    ItemPickerView
                    ${isSingleSelection ? 'ItemPickerView--isSingleSelection' : ''}
                    ${className}
                `,
      style: style
    }, childrenLeft, /*#__PURE__*/_react.default.createElement("div", {
      className: `
                        ItemPickerView__items
                        ${isSingleSelection ? 'ItemPickerView__items--isSingleSelection' : ''}
                        ${isRenderInput ? 'ItemPickerView__items--isInput' : ''}
                        ${isInvalid ? `ItemPickerView__items--isInvalid ${classNames.items__isInvalid}` : isValid ? `ItemPickerView__items--isValid ${classNames.items__isValid}` : ''}
                        ${classNames.items}
                    `,
      onClick: isRenderInput ? this.onFocusInput : onClickFunc
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `
                            ItemPickerView__items-wrapper
                            ${isSingleSelection ? 'ItemPickerView__items-wrapper--isSingleSelection' : ''}
                            ${classNames.itemsWrapper}
                        `
    }, isProcessing && /*#__PURE__*/_react.default.createElement("div", {
      className: `
                                    ItemPickerView__items-wrapper-processing
                                    ${classNames.itemsWrapperProcessing}
                                `
    }, /*#__PURE__*/_react.default.createElement(_ActivityIndicator.default, {
      size: 20
    })), selectedItems.length ? selectedItems.map(this.renderItem) : !!(!isProcessing && (isSingleSelection || !isRenderInput)) && /*#__PURE__*/_react.default.createElement("div", {
      className: `
                                        ItemPickerView__items-wrapper-placeholder
                                        ${classNames.itemsWrapperPlaceholder}
                                    `
    }, placeholder), isRenderInput && /*#__PURE__*/_react.default.createElement(_ItemPickerViewInput.default, {
      setFocusInputFunc: this.setFocusInputFunc,
      placeholder: placeholder,
      placeholderInput: placeholderInput,
      items: items,
      itemsSelected: selectedItems,
      itemsNameKey: itemsNameKey,
      itemsSearchConfig: itemsSearchConfig,
      onSubmit: this.onAddItem,
      onRemove: this.onRemoveItem,
      onChangeInput: onChangeInput
    }))), isToggle && /*#__PURE__*/_react.default.createElement("div", {
      className: `
                            ItemPickerView__dropdown
                            ${classNames.dropdown}
                        `,
      onClick: onClickFunc
    }, childrenToggle || /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: _freeSolidSvgIcons.faCaretDown
    })), childrenRight, isItemPicker && /*#__PURE__*/_react.default.createElement(_ItemPicker.default, _extends({}, this.props, {
      style: itemPickerStyle,
      className: `
                            ItemPickerView__ItemPicker
                            ${classNames.itempicker}
                        `,
      isVisible: isItemPickerVisible,
      onClose: this.onToggleItemPicker
    })));
  }

}

exports.default = ItemPickerView;

_defineProperty(ItemPickerView, "propTypes", { ..._ItemPickerConfig.ItemPickerGlobalPropTypes,
  isItemPicker: _propTypes.default.bool,
  isToggle: _propTypes.default.bool,
  isInput: _propTypes.default.bool,
  isValid: _propTypes.default.bool,
  isInvalid: _propTypes.default.bool,
  isAutoClose: _propTypes.default.bool,
  childrenLeft: _propTypes.default.any,
  childrenRight: _propTypes.default.any,
  childrenToggle: _propTypes.default.any,
  placeholder: _propTypes.default.string,
  placeholderInput: _propTypes.default.string,
  onChangeInput: _propTypes.default.func,
  renderActiveItemContent: _propTypes.default.func
});

_defineProperty(ItemPickerView, "defaultProps", { ..._ItemPickerConfig.ItemPickerGlobalDefaultProps,
  style: {},
  isItemPicker: true,
  isToggle: true,
  isValid: false,
  isInvalid: false,
  isInput: false,
  isAutoClose: true,
  childrenLeft: null,
  childrenRight: null,
  childrenToggle: null,
  placeholder: '',
  placeholderInput: '...',
  onChangeInput: null,
  renderActiveItemContent: null,
  domPortalNode: globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body,
  ...(globalThis._ItemPickerView_defaultProps || {})
});