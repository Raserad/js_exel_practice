import {ExcelComponent} from '@core/ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return ''
  }

  initState(state = {}) {
    this.state = {...state}
  }

  setState(state) {
    this.state = {
      ...this.state, 
      ...state
    }
    this.$root.html(this.template)
  }
}