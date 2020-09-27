import {currentTime} from '@core/utils'

function toListItem(item) {
  return `
    <li class="db__record">
      <a href="#excel/${item.id}">${item.title}</a>
      <strong>
        ${new Date(item.openTime).toLocaleDateString()}
        ${new Date(item.openTime).toLocaleTimeString()}
      </strong>
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
          <a href="#excel/${currentTime()}" class="db__create">
              New <br /> table
          </a>
      </div>
    </div>

    <div class="dv__table db__view">
      ${showList(list)}
    </div>
  `
}