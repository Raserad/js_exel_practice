import {toInlineStyles} from '@core/utils'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 25

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getHeight(state, row) {
  return `${state[row] || DEFAULT_HEIGHT}px`
}

function getWidth(state, col) {
  return `${state[col] || DEFAULT_WIDTH}px`
}

function getText(state, id) {
  return state[id] || ''
}

function getStyle(state, id) {
  return toInlineStyles(state[id] || {})
}

function toColumn({char, col, width}) {
  return `
    <div class="column" 
         data-col="${col}" 
         data-type="resizable" 
         style="width: ${width}"
    >
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const text = getText(state.dataState, id)
    const style = getStyle(state.stylesState, id)
    return `
      <div class="cell" contenteditable
            data-type="cell"
            data-col="${col}" 
            data-id="${id}"
            style="width: ${width}; ${style}" >
      ${text}
      </div>
    `
  }
}

function createRow(index, content, height) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" 
         data-type="resizable"
         data-row="${index - 1}"
         style="height: ${height}"
    >
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

function widthWithState(state) {
  return (char, col) => ({
    char, col, width: getWidth(state.colState, col)
  })
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthWithState(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, getHeight(state.rowState, row)))
  }
  
  return rows.join('')
}