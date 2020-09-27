import {makeEditable, clearEditable} from '@components/table/table.editable'

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.$current = null
  }

  select($cell) {
    const editable = this.$current && this.$current.id() == $cell.id()
    
    this.unselectAll()
    this.$current = $cell

    $cell.addClass(TableSelection.className)
    this.group.push($cell)
    
    if (editable) {
      makeEditable($cell)
    }
  }

  get selectedIds() {
    return this.group.map($cell => $cell.id())
  }

  selectGroup($cells) {
    this.unselectAll()
    
    this.group = $cells
    $cells.forEach($cell => $cell.addClass(TableSelection.className))
  }

  unselectAll() {
    this.group.forEach($el => {
      clearEditable($el)
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }

  applyStyle(style) {
    const $cells = this.group
    $cells.forEach($cell => $cell.css(style))
  }
}