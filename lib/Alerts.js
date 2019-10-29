function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AlertsCard from './Alerts/components/Card/AlertsCard';
import './Alerts/Alerts.scss';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from './Alerts/config';
export { ALERTS_POSITION } from './Alerts/config';
export default class Alerts extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderAlert", ({
      id,
      ...props
    }) => {
      const {
        onDismiss,
        position
      } = this.props;
      return React.createElement(AlertsCard, _extends({}, props, {
        key: id,
        id: id,
        position: position,
        onDismiss: onDismiss
      }));
    });
  }

  render() {
    const {
      alerts,
      position
    } = this.props;
    return React.createElement("div", {
      className: `Alerts Alerts--${position}`
    }, alerts.map(this.renderAlert));
  }

}

_defineProperty(Alerts, "propTypes", {
  position: PropTypes.oneOf(ALERTS_POSITION_ARRAY).isRequired,
  onDismiss: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(ALERT_TYPES_ARRAY),
    position: PropTypes.oneOf(ALERTS_POSITION_ARRAY),
    message: PropTypes.any.isRequired
  }).isRequired).isRequired
});