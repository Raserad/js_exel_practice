import {newPageId} from '@core/utils'

function getDate(id) {
  const monthNames = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June',
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ]
  const date = new Date(parseInt(id))
  const month = monthNames[date.getMonth()]
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

function toListItem(item) {
  return `
    <li class="db__record">
      <a href="#excel/${item.id}">${item.title}</a>
      <strong>${getDate(item.id)}</strong>
    </li>
  `
}

function preparedList(list) {
  return list.map(toListItem).join('')
}

function showList(list) {
  if (!list.length) {
    return `
      <h1>List is empty</h1>
    `
  }
  return `
    <div class="db__list-header">
      <span>Title</span>
      <span>Open date</span>
    </div>

    <ul class="db__list">
      ${preparedList(list)}
    </ul>
  `
}

export function createDashboard(list) {
  return `
    <div class="db__header">
      <h1>Exel dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
          <a href="#excel/${newPageId()}" class="db__create">
              New <br /> table
          </a>
      </div>
    </div>

    <div class="dv__table db__view">
      ${showList(list)}
    </div>
  `
}