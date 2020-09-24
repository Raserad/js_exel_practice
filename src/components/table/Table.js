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
import * as actions from '@redux/actions';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'keydown',
        'input'
      ],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHtml() {
    return createTable(20, this.store.getState())
  }

  init() {
    super.init()
    
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      const $cell = this.selection.$current
      $cell.text(text)
      this.updateCellTextInStore($cell)
    })

    this.$on('formula:done', () => {
      this.selection.$current.focus()
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    }
    
    if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $elements = matrix($target, this.selection.$current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        
        this.selection.selectGroup($elements)
      } else {
        this.selectCell($target)
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
      event.preventDefault()

      const id = this.selection.$current.id(true)

      const $next = this.$root.find(nextSelector(key, id))
      
      if ($next) {
        this.selectCell($next)
      }
    }
  }

  onInput(event) {
    const $cell = $(event.target)
    this.updateCellTextInStore($cell)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  updateCellTextInStore($cell) {
    const data = {
      id: $cell.id(),
      value: $cell.text()
    }
    this.$dispatch(actions.tableChangeText(data))
  }
}