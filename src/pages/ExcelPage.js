import {Excel} from '@components/excel/Excel'
import {Formula} from '@components/formula/Formula'
import {Header} from '@components/header/Header'
import {Table} from '@components/table/Table'
import {Toolbar} from '@components/toolbar/Toolbar'
import {createStore} from '@core/createStore'
import {reducer} from '@redux/reducer'
import {getInitialState} from '@redux/initialState'
import {storage, debounce, newPageId} from '@core/utils'
import {Page} from '@core/Page'

function pageName(id) {
  return `excel:${id}`
}

export class ExcelPage extends Page {
  getRoot() {
    const id = this.params[0] ? this.params[0] : newPageId()

    const name = pageName(id)

    const store = createStore(reducer, getInitialState(name))

    const storageListener = debounce(state => {
      storage(name, state)
    }, 300)

    store.subscribe(storageListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }
}