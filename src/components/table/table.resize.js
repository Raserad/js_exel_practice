import {$} from '@core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const type = $resizer.data.resize
    
    if (!type) return

    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    prepareResizer($resizer, type)

    let value = false
    document.onmousemove = e => {
      if (type == 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      $resizer.removeAttr('style')
      document.onmousemove = null
      document.onmouseup = null

      resolve({
        id: type == 'col' ? $parent.data.col : $parent.data.row,
        type,
        value
      })

      clearResizer(type, $root, $parent, value)
    }
  })
}

function prepareResizer($resizer, type) {
  $resizer.css({
    opacity: '1',
  })

  if (type == 'col') {
    $resizer.css({bottom: '-100000px'})
  } else {
    $resizer.css({right: '-100000px'})
  }
}

function clearResizer(type, $root, $parent, value) {
  if (type == 'col') {
    $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach($element => $element.css({width: value + 'px'}))
  } else {
    $parent.css({height: value + 'px'})
  }
}
