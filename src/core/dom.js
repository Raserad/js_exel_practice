class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html.trim()
      return this
    }

    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() == 'input') {
      return this.$el.value.trim()
    }
    
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)

    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
    return this
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
    return this
  }

  attr(name, value = false) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }

    return this.$el.getAttribute(name)
  }

  removeAttr(name) {
    this.$el.removeAttribute(name)
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(props = null) {
    if (typeof props === 'string') {
      return this.$el.style[props]
    }

    Object
        .keys(props)
        .forEach(key => this.$el.style[key] = props[key])
    
    return this
  }

  getStyles(styles = []) {
    return styles.reduce((style, prop) => {
      style[prop] = this.$el.style[prop]
      return style
    }, {})
  }

  focus() {
    this.$el.focus()
    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return Array
        .from(this.$el.querySelectorAll(selector))
        .map(el => $(el))
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':')

      return {
        col: +col,
        row: +row
      }
    }

    return this.data.id
  }

  get data() {
    return this.$el.dataset
  }
}

export function $(selector) {
  const $dom = new Dom(selector)
  return $dom.$el ? $dom : false
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  el.classList.add(classes)
  return $(el)
}