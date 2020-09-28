import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@components/table/TableSelection'
import {createTable} from '@components/table/table.template'
import {resizeHandler} from '@components/table/table.resize'
import {
  matrix, 
  nextSelector, 
  shouldResize, 
  isCell
} from '@components/table/table.functions'
import {defaultStyles} from '@/constants'
import * as actions from '@redux/actions'
import {parse} from '@core/parse'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'input',
        'keydown'
      ],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }


  get template() {
    return createTable(20, this.store.getState())
  }

  toHtml() {
    return this.template
  }

  init() {
    super.init()

    this.$on('formula:input', value => {
      this.selection.$current
          .attr('data-value', value)
          .text(parse(value))
      this.updateCellTextInStore(value)
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)

      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

    this.$on('formula:done', () => {
      const $cell = this.selection.$current
      $cell.focus()
    })

    this.selectCell(this.$root.find('[data-id="0:0"]'))
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
    const $target = $(event.target)
    $target.attr('data-value', $target.text())
    this.updateCellTextInStore($target.text())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  updateCellTextInStore(value) {
    const data = {
      id: this.selection.$current.id(),
      value: value
    }
    this.$dispatch(actions.tableChangeText(data))
  }
}