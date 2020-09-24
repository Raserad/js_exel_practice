import {
  TABLE_RESIZE,
  TABLE_CHANGE_TEXT
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