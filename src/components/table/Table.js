import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@components/table/TableSelection';
import {createTable} from '@components/table/table.template';
import {resizeHandler} from '@components/table/table.resize'
import {
  matrix, 
  nextSelector, 
  shouldResize, 
  isCell
} from '@components/table/table.functions';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: [
        'mousedown',
        'keydown'
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

  onKeydown(event) {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab'
    ]

    const {key} = event

    if (keys.includes(key)) {
      if (event.shiftKey) return

      event.preventDefault()

      const id = this.selection.$current.id(true)

      const $next = this.$root.find(nextSelector(key, id))
      
      if ($next) {
        this.selection.select($next)
      }
    }
  }
}