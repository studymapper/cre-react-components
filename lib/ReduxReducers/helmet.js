"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHelmetData = setHelmetData;
exports.resetHelmet = resetHelmet;
exports.default = helmet;
const HELMET_SET = 'HELMET_SET';
const HELMET_RESET = 'HELMET_RESET';

function setHelmetData(data) {
  return {
    type: HELMET_SET,
    data
  };
}

function resetHelmet() {
  return {
    type: HELMET_RESET
  };
}

const initialState = {
  description: '',
  title: '',
  image: '',
  extraTags: null
};

function helmet(state = initialState, action) {
  switch (action.type) {
    case HELMET_SET:
      return { ...state,
        ...action.data
      };

    case HELMET_RESET:
      return { ...initialState
      };

    default:
      return state;
  }
}