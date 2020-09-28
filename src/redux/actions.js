import {
  TABLE_RESIZE,
  TABLE_CHANGE_TEXT, 
  CHANGE_STYLES, 
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_TIME
} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function tableChangeText(data) {
  return {
    type: TABLE_CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeTitle(text) {
  return {
    type: CHANGE_TITLE,
    text
  }
}

export function updateOpenTime(data) {
  return {
    type: UPDATE_TIME,
    data
  }
}