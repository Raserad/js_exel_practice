import {storage} from '@core/utils'

const stored = storage('excel-state') || {}

export const initialState = {
  colState: stored.colState || {},
  rowState: stored.rowState || {},
  cellState: stored.cellState || {}
}