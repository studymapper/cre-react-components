"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactHelmet = require("react-helmet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Helmet extends _react.Component {
  shouldComponentUpdate(nextProps) {
    const {
      pathname,
      title,
      description,
      image,
      language,
      extraTags
    } = this.props;

    if (pathname !== nextProps.pathname || title !== nextProps.title || description !== nextProps.description || image !== nextProps.image || language !== nextProps.language || extraTags !== nextProps.extraTags) {
      return true;
    }

    return false;
  }

  render() {
    var _globalThis$location;

    const href = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$location = globalThis.location) === null || _globalThis$location === void 0 ? void 0 : _globalThis$location.href;
    const {
      defaultConfig
    } = this.props;
    const {
      title: dcTitle,
      description: dcDescription,
      image: dcImage,
      type,
      twitterSite,
      twitterCard,
      siteName,
      fbAppId,
      language: dcLanguage
    } = defaultConfig;
    let {
      title,
      description,
      image,
      language,
      extraTags
    } = this.props;
    title = title || dcTitle;
    description = description || dcDescription;
    image = image || dcImage;
    language = language || dcLanguage;
    return /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("html", {
      lang: language
    }), /*#__PURE__*/_react.default.createElement("title", null, title), /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: href
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "description",
      content: description
    }), /*#__PURE__*/_react.default.createElement("meta", {
      itemProp: "name",
      content: title
    }), /*#__PURE__*/_react.default.createElement("meta", {
      itemProp: "description",
      content: description
    }), /*#__PURE__*/_react.default.createElement("meta", {
      itemProp: "image",
      content: image
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "twitter:card",
      content: twitterCard
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "twitter:title",
      content: title
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "twitter:description",
      content: description
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "twitter:image",
      content: image
    }), twitterSite && /*#__PURE__*/_react.default.createElement("meta", {
      name: "twitter:site",
      content: twitterSite
    }), /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:description",
      content: description
    }), /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:title",
      content: title
    }), /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:url",
      content: href
    }), /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:image",
      content: image
    }), /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:type",
      content: type
    }), siteName && /*#__PURE__*/_react.default.createElement("meta", {
      property: "og:site_name",
      content: siteName
    }), fbAppId && /*#__PURE__*/_react.default.createElement("meta", {
      property: "fb:app_id",
      content: fbAppId
    }), extraTags);
  }

}

_defineProperty(Helmet, "propTypes", {
  pathname: _propTypes.default.string.isRequired,
  defaultConfig: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    description: _propTypes.default.string.isRequired,
    image: _propTypes.default.string.isRequired,
    type: _propTypes.default.string.isRequired,
    language: _propTypes.default.string.isRequired,
    twitterCard: _propTypes.default.string.isRequired,
    twitterSite: _propTypes.default.string,
    siteName: _propTypes.default.string,
    fbAppId: _propTypes.default.string
  }).isRequired,
  title: _propTypes.default.string.isRequired,
  description: _propTypes.default.string.isRequired,
  image: _propTypes.default.string.isRequired,
  language: _propTypes.default.string.isRequired,
  extraTags: _propTypes.default.array
});

function mapStateToProps({
  helmet,
  i18n
}) {
  return { ...helmet,
    language: i18n ? i18n.language : ''
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Helmet);

exports.default = _default;