import {$} from '@core/dom'
import {createDashboard} from '@components/dashboard/dashboard.template'
import {getList} from '@components/dashboard/dashboard.functions'

export class Dashboard {
  constructor() {
    this.$root = $.create('div', 'db')
    this.initList()
  }

  initList() {
    this.list = getList()
  }

  getRoot() {
    return this.$root.html(createDashboard(this.list))
  }
}