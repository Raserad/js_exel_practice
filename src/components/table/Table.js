import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@components/table/table.template';
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

  toHtml() {
    return createTable(20)
  }

  onMousedown(event) {
    const $resizer = $(event.target)
    
    const type = $resizer.data.resize
    
    if (!type) return

    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    switch (type) {
      case 'col': {
        const col = $parent.data.col
        
        const $elements = this.$root.findAll(`[data-col="${col}"]`)
    
        document.onmousemove = e => {
          const delta = e.pageX - coords.right
          const width = coords.width + delta
    
          $elements.forEach($element => $element.css('width', width + 'px'))
        }
        
        break
      }
      case 'row': {
        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom
          const height = coords.height + delta
    
          $parent.css('height', height + 'px')
        }
        
        break
      }
    }

    document.onmouseup = () => document.onmousemove = null
  }
}