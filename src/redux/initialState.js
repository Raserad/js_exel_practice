import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'
import {defaultTitle} from '@/constants'

const stored = storage('excel-state') || {}

export const initialState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  title: defaultTitle,
  ...stored,
  curentText: '',
  currentStyles: defaultStyles
}