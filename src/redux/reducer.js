export function reducer(state, action) {
  switch (action.type) {
    case 'TABLE_RESIZE':
      const prevState = state.colState || {}
      return {...state, colState: {...prevState, ...action.data}}
    default:
      return state
  }
}