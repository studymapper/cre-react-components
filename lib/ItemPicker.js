"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _fuse = _interopRequireDefault(require("fuse.js"));

var _OutsideClick = _interopRequireDefault(require("./OutsideClick"));

var _ActivityIndicator = _interopRequireDefault(require("./ActivityIndicator"));

var _castArray = require("./utils/castArray");

var _classify = require("./utils/classify");

var _ItemPickerConfig = require("./configs/ItemPickerConfig");

var _ItemPickerItem = _interopRequireDefault(require("./ItemPicker/components/Item/ItemPickerItem"));

var _ItemPickerSearch = _interopRequireDefault(require("./ItemPicker/components/Search/ItemPickerSearch"));

var _computeItemPickerChangeValue = require("./ItemPicker/utils/computeItemPickerChangeValue");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItemPicker extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onSelectItem", item => {
      const {
        maxSelections,
        minSelections,
        onChange,
        value
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

    _defineProperty(this, "onChangeSearch", search => {
      const {
        items,
        itemsNameKey,
        itemsSearchConfig
      } = this.props;
      search = search.toLowerCase();

      if (!search) {
        this.setState({
          search,
          searchItems: []
        });
        return;
      }

      const fuseConfig = itemsSearchConfig || {
        keys: [itemsNameKey]
      };
      const fuse = new _fuse.default(items, fuseConfig);
      const results = fuse.search(search);

      const mapItem = ({
        item
      }) => item;

      this.setState({
        search,
        searchItems: results.map(mapItem)
      });
    });

    _defineProperty(this, "renderItem", item => {
      const {
        renderItemContent,
        itemsNameKey
      } = this.props;
      const {
        valueArray
      } = this.state;
      const {
        id,
        [itemsNameKey]: name
      } = item;
      const isActive = valueArray.indexOf(id) > -1;
      return /*#__PURE__*/_react.default.createElement(_ItemPickerItem.default, _extends({
        key: id
      }, item, {
        item: item,
        onSelect: this.onSelectItem,
        isActive: isActive,
        content: renderItemContent ? renderItemContent(item, isActive) : name
      }));
    });

    const {
      value: _value,
      items: _items,
      searchRenderItemTreshold
    } = props;
    this.state = {
      isSearch: _items.length > searchRenderItemTreshold,
      valueArray: (0, _castArray.castArray)(_value),
      search: '',
      searchItems: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      value,
      items,
      searchRenderItemTreshold
    } = this.props;

    if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
      this.setState({
        valueArray: (0, _castArray.castArray)(value)
      });
    }

    if (prevProps.items.length !== items.length) {
      const isSearch = items.length > searchRenderItemTreshold;

      if (prevState.isSearch !== isSearch) {
        this.setState({
          isSearch
        });
      }
    }
  }

  render() {
    const {
      isVisible,
      isProcessing,
      items,
      onClose,
      className,
      outsideClickEvent,
      onChangeSearch,
      emptyText,
      emptySearchText,
      searchPlaceholderText,
      domPortalNode,
      style,
      isSearchAutoFocus
    } = this.props;
    const {
      isSearch,
      search,
      searchItems
    } = this.state;
    const renderItems = search ? searchItems : items;
    const classNames = {
      items: '',
      itemsEmpty: '',
      itemsProcessing: '',
      empty: ''
    };

    if (!isVisible) {
      return null;
    }

    if (className) {
      classNames.items = (0, _classify.classify)(className, '__items');
      classNames.itemsEmpty = (0, _classify.classify)(className, '__items-empty');
      classNames.itemsProcessing = (0, _classify.classify)(className, '__items-processing');
      classNames.empty = (0, _classify.classify)(className, '__empty');
    }

    const JSX = /*#__PURE__*/_react.default.createElement(_OutsideClick.default, {
      className: `ItemPicker ${className}`,
      style: style,
      event: outsideClickEvent,
      onOutsideClick: onClose
    }, isSearch && /*#__PURE__*/_react.default.createElement(_ItemPickerSearch.default, {
      search: search,
      isAutoFocus: isSearchAutoFocus,
      placeholder: searchPlaceholderText,
      onChange: onChangeSearch || this.onChangeSearch
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: `ItemPicker__items ${classNames.items}`
    }, renderItems.length ? renderItems.map(this.renderItem) : !search && !!emptyText && /*#__PURE__*/_react.default.createElement("div", {
      className: `ItemPicker__items-empty ${classNames.itemsEmpty}`
    }, emptyText), isProcessing && /*#__PURE__*/_react.default.createElement("div", {
      className: `ItemPicker__items-processing ${classNames.itemsProcessing}`
    }, /*#__PURE__*/_react.default.createElement(_ActivityIndicator.default, {
      size: 20
    }))), !!(search && !searchItems.length) && /*#__PURE__*/_react.default.createElement("div", {
      className: `ItemPicker__empty ${classNames.empty}`
    }, emptySearchText));

    return domPortalNode ? (0, _reactDom.createPortal)(JSX, domPortalNode) : JSX;
  }

}

exports.default = ItemPicker;

_defineProperty(ItemPicker, "propTypes", { ..._ItemPickerConfig.ItemPickerGlobalPropTypes,
  isVisible: _propTypes.default.bool.isRequired,
  isSearchAutoFocus: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  outsideClickEvent: _propTypes.default.string,
  searchRenderItemTreshold: _propTypes.default.number,
  emptyText: _propTypes.default.string,
  emptySearchText: _propTypes.default.string,
  searchPlaceholderText: _propTypes.default.string,
  style: _propTypes.default.object
});

_defineProperty(ItemPicker, "defaultProps", { ..._ItemPickerConfig.ItemPickerGlobalDefaultProps,
  isSearchAutoFocus: true,
  outsideClickEvent: 'click',
  onClose: () => {},
  searchRenderItemTreshold: 8,
  emptyText: 'No items yet',
  emptySearchText: 'No matches',
  searchPlaceholderText: 'Search..',
  domPortalNode: null,
  style: {},
  ...(globalThis._ItemPicker_defaultProps || {})
});