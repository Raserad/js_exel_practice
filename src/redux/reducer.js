import {
  TABLE_RESIZE,
  TABLE_CHANGE_TEXT, 
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE
} from './types'

export function reducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const field = action.data.type == 'col' ? 'colState' : 'rowState'
      return {
        ...state, 
        ...value(state, field, action)
      }
    case TABLE_CHANGE_TEXT:
      return {
        ...state,
        ...value(state, 'dataState', action),
        currentText: action.data.value
      }
    case APPLY_STYLE:
      return {
        ...state,
        stylesState: {
          ...state.stylesState,
          ...action.data.ids.reduce((ids, id) => {
            ids[id] = {
              ...state.stylesState[id],
              ...action.data.value
            }
            return ids
          }, {})
        },
        currentStyles: {
          ...state.currentStyles,
          ...action.data.value
        }
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.text
      }
    default:
      return state
  }
}

function value(state, field, action) {
  return {
    [field]: {
      ...state[field] || {},
      [action.data.id]: action.data.value
    }
  }
}