export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1).split('/')[0]
  }

  static get params() {
    return window.location.hash.split('/').slice(1)
  }

  static navigate(route) {
    window.location.hash = route
  }
}