import {range} from '@core/utils';

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