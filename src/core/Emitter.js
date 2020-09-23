export class Emitter {
  constructor() {
    this.listeners = {}
  }

  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
    return {
      unsubscribe: () => {
        this.listeners[event] = 
            this.listeners[event].filter(listener => listener != callback)
      }
    }
  }

  emit(event, ...args) {
    const callbacks = this.listeners[event] || []

    callbacks.forEach(callback => callback(...args))
  }
}