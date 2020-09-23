import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  static className = ''

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.store = options.store
    this.subscriptions = []

    this.prepare()
  }

  prepare() {}
  
  toHtml() {
    return ''
  }

  init() {
    super.initDomListeners()
  }

  destroy() {
    super.removeDomListeners()
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, callback) {
    const subscription = this.emitter.subscribe(event, callback)
    this.subscriptions.push(subscription)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
}