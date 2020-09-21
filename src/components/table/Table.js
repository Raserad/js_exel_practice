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

    let value = false
    if (type == 'col') {
      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        value = coords.width + delta
      }
    } else {
      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
      }
    }

    document.onmouseup = () => {
      if (type == 'col') {
        const col = $parent.data.col

        const $elements = this.$root.findAll(`[data-col="${col}"]`)

        $elements.forEach($element => $element.css({width: value + 'px'}))
      } else {
        $parent.css({height: value + 'px'})
      }
      document.onmousemove = null
    }
  }
}