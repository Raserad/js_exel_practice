import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from '@components/toolbar/toolbar.template';
import {$} from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(this.store.getState().currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHtml() {
    return this.template
  }

  storeChanged(state) {
    this.setState(state.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.type == 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}