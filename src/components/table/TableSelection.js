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
    $cell.addClass(TableSelection.className)
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
}