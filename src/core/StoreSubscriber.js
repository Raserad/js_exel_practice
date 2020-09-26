import {isEqual} from '@core/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.subscribe = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.subscribe = this.store.subscribe(state => {
      Object.keys(state)
          .filter(key => !isEqual(this.prevState[key], state[key]))
          .forEach(key => notifyComponents(components, key, state))
      this.prevState = state
    })
  }

  unsubscribe() {
    this.subscribe.unsubscribe()
  }
}

function notifyComponents(components, key, state) {
  components
      .filter(component => component.isWatching(key))
      .forEach(component => {
        const changes = {[key]: state[key]}
        component.storeChanged(changes)
      })
}
