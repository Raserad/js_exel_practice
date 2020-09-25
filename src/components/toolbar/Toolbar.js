import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from '@components/toolbar/toolbar.template';
import {$} from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    this.initState({
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'none',
      textDecoration: 'normal'
    })
  }

  get template() {
    console.log('Current Toolbar State', this.state)
    return createToolbar(this.state)
  }

  toHtml() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.type == 'button') {
      const value = JSON.parse($target.data.value)
      this.setState(value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}