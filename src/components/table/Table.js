import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@components/table/TableSelection';
import {createTable} from '@components/table/table.template';
import {resizeHandler} from '@components/table/table.resize'
import {matrix} from '@components/table/table.functions';
import {shouldResize} from '@components/table/table.functions';
import {isCell} from '@components/table/table.functions';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: [
        'mousedown'
      ]
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHtml() {
    return createTable(20)
  }

  init() {
    super.init()
    
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
    
    if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $elements = matrix($target, this.selection.$current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        
        this.selection.selectGroup($elements)
      } else {
        this.selection.select($target)
      }
    }
  }
}