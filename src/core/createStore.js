export function createStore(reducer, initialState) {
  let state = reducer({...initialState}, {type: '__INIT__'})
  let subscriptions = []

  return {
    dispatch(action) {
      state = reducer({...state}, action)
      subscriptions.forEach(sub => sub(state))
    },
    subscribe(callback) {
      subscriptions.push(callback)
      return {
        unsubscribe() {
          subscriptions = subscriptions.filter(
              subscription => subscription != callback
          )
        }
      }
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}