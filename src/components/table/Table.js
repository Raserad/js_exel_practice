import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@components/table/TableSelection';
import {createTable} from '@components/table/table.template';
import {resizeHandler} from '@components/table/table.resize'
import {shouldResize} from '@components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: [
        'mousedown'
      ]
    })
  }

  toHtml() {
    return createTable(20)
  }

  init() {
    super.init()
    this.selection = new TableSelection()
  }

  onMousedown(event) {
    if (!shouldResize(event)) return

    resizeHandler(this.$root, event)
  }
}