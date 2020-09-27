import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@components/header/header.template'
import {$} from '@core/dom'
import * as acitons from '@/redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHtml() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    const $title = $(event.target)
    this.$dispatch(acitons.changeTitle($title.text()))
  }
}