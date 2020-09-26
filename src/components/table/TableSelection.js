export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.$current = null
  }

  select($cell) {
    this.unselectAll()
    this.$current = $cell

    this.group.push($cell)
    $cell.focus().addClass(TableSelection.className)
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
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    const $cells = this.group
    $cells.forEach($cell => $cell.css(style))
  }
}