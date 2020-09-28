import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@components/header/header.template'
import {$} from '@core/dom'
import * as acitons from '@/redux/actions'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [
        'input',
        'click'
      ],
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

  onClick(event) {
    const $target = $(event.target)

    switch ($target.data.type) {
      case 'delete':
        const desition = confirm('Do you want delete the table?')

        if (desition) {
          localStorage.removeItem(`excel:${ActiveRoute.params[0]}`)
          ActiveRoute.navigate('')
        }
        break
      case 'exit':
        ActiveRoute.navigate('')
        break
    }
  }
}