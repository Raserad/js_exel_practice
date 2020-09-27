import {ExcelComponent} from '@core/ExcelComponent';
import {createFormula} from '@components/formula/formula.template';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: [
        'currentText'
      ],
      ...options
    })
  }
  init() {
    super.init()

    this.$formula = this.$root.find(`[data-type="formula"]`)

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  toHtml() {
    return createFormula()
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    event.stopPropagation()
    
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }
}