export function capitalize(string) {
  if (typeof string !== 'string') return ''

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }

  return Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(prev, current) {
  if (typeof prev === 'object' && typeof current === 'object') {
    return JSON.stringify(prev) === JSON.stringify(current)
  }
  return prev === current
}

export function camelToDashCase(string) {
  return string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout = false
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      fn(...args)
    }, wait)
  }
}

export function currentTime() {
  return Date.now().toString()
}