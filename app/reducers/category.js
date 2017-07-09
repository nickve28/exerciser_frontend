import createReducer from './api_reducer'

import { FETCH_CATEGORIES } from 'app/sections/exercises/actions/category'

const categoryConfig = {
  dataType: 'category',
  plural: 'categories',
  actions: {
    list: FETCH_CATEGORIES
  },
  initialState: {
    entities: {}
  }
}

export default createReducer(categoryConfig)

