import {
  TABLE_RESIZE,
  TABLE_CHANGE_TEXT
} from './types'

export function reducer(state, action) {
  console.log('Current action', action)
  switch (action.type) {
    case TABLE_RESIZE:
      const field = action.data.type == 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: {
          ...state[field] || {},
          [action.data.id]: action.data.value
        }
      }
    case TABLE_CHANGE_TEXT:
      return {
        ...state, 
        cellState: {
          ...state.cellState || {},
          [action.data.id]: action.data.value
        },
        currentText: action.data.value
      }
    default:
      return state
  }
}