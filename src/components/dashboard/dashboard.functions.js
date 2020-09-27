import {storage} from '@core/utils'

function getId(key) {
  return key.split(':')[1]
}

export function getList() {
  return Object
      .keys(window.localStorage)
      .filter(key => key.startsWith('excel'))
      .map(key => {
        const store = storage(key)
        store.id = getId(key)
        return store
      })
      .map(storage => ({
        id: storage.id,
        title: storage.title
      }))
}