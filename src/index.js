import {createStore} from '@core/createStore'
import {reducer} from '@redux/reducer'
import {storage} from '@core/utils'
import {Excel} from '@components/excel/Excel'
import {Formula} from '@components/formula/Formula'
import {Header} from '@components/header/Header'
import {Table} from '@components/table/Table'
import {Toolbar} from '@components/toolbar/Toolbar'
import '@/scss/index.scss'

const store = createStore(reducer, {
  colState: {}
})

store.subscribe(state => {
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()