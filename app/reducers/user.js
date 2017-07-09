import createReducer from './api_reducer'

import { FETCH_ME } from 'app/sections/users/actions/user'

const userConfig = {
  dataType: 'me', //need an alias option
  plural: 'users',
  actions: {
    get: FETCH_ME
  },
  initialState: {
    entities: {}
  }
}

export default createReducer(userConfig)

