import {range} from '@core/utils';

export function isFocused(document) {
  const element = document.activeElement
  return element.isContentEditable || element.tagName == 'INPUT'
}

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type == 'cell'
}

export function matrix($target, $current) {
  const target = $current.id(true)
  const current = $target.id(true)

  const cols = range(target.col, current.col)
  const rows = range(target.row, current.row)

  const martix = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])

  return martix
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'ArrowUp':
      row--
      break
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'ArrowLeft':
      col--
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
  }

  return `[data-id="${row}:${col}"]`
}