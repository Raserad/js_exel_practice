const editable = 'contenteditable'

export function isEditable($cell) {
  return $cell.attr(editable)
}

export function makeEditable($cell) {
  if (isEditable($cell)) return
  
  $cell.attr(editable, true)
  $cell.focus()
}

export function clearEditable($cell) {
  $cell.removeAttr(editable)
}