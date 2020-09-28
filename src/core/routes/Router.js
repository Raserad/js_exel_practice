import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector)
    this.routes = routes

    this.currentPage = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.currentPage) {
      this.currentPage.destroy()
    }
    this.$placeholder.clear()

    const Page = this.routes[ActiveRoute.path] || this.routes.dashboard
    this.currentPage = new Page(ActiveRoute.params)
    this.$placeholder.append(this.currentPage.getRoot())
    this.currentPage.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}