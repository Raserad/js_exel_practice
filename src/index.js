import {Router} from '@core/routes/Router'
import {ExcelPage} from '@/pages/ExcelPage'
import {DashboardPage} from '@/pages/DashboardPage'
import '@/scss/index.scss'

new Router('#app', {
  excel: ExcelPage,
  dashboard: DashboardPage
})