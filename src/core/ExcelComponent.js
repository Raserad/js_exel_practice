import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  static className = ''

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name

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
  }
}