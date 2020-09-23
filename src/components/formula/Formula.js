import {ExcelComponent} from '@core/ExcelComponent';
import {createFormula} from '@components/formula/formula.template';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  init() {
    super.init()

    this.$formula = this.$root.find(`[data-type="formula"]`)

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', text => {
      this.$formula.text(text)
    })
  }

  toHtml() {
    return createFormula()
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}