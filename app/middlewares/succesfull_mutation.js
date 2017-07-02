import { CREATE_EXERCISE } from '../sections/exercises/actions/exercise'

import { hashHistory } from 'react-router'

const middleware = () => next => action => {
  if (action.type === CREATE_EXERCISE && action.status === 'success') {
    hashHistory.push('/')
  }
  return next(action)
}

export default middleware