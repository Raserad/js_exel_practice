const CODES = {
  A: 65,
  Z: 90
}

function toColumn(char, col) {
  return `
    <div class="column" data-col="${col}" data-type="resizable">
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(_, col) {
  return `
    <div class="cell" data-col="${col}" contenteditable></div>
  `
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }
  
  return rows.join('')
}