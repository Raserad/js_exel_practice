import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'
import {defaultTitle} from '@/constants'

export function getInitialState(name) {
  const stored = storage(name) || {}

  return {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    title: defaultTitle,
    ...stored,
    curentText: '',
    currentStyles: defaultStyles
  }
}