import some from 'lodash-es/some'
import castArray from 'lodash-es/castArray'
import forEach from 'lodash-es/forEach'
import has from 'lodash-es/has'

import {
  RESET_NOTIFICATIONS
} from 'app/sections/notifications/actions/notification'

import {
  EXERCISE_NOT_DELETED
} from 'app/sections/exercises/actions/exercise'

import {
  USER_LOGIN_EXPIRED,
  USER_LOGIN_EXPIRE_END,
  USER_LOGIN
} from 'app/sections/authentication/actions/authentication'

const middleware = store => next => action => {
  if (action.status !== 'failed') {
    return next(action)
  }

  if (action.type === USER_LOGIN) {
    next(action)

    setTimeout(() => {
      store.dispatch({
        type: RESET_NOTIFICATIONS
      })
    }, 2500)
    return true
  }

  next(action)

  const dispatch = store.dispatch
  const error = action.error

  const isUnauthorized = some(castArray(error), err => err && err.code === 401)
  if (isUnauthorized) {
    localStorage.removeItem('auth_token')
    dispatch({ type: USER_LOGIN_EXPIRED })

    //after 5 sec, send end of user expiry event
    setTimeout(function() {
      dispatch({ type: USER_LOGIN_EXPIRE_END })
    }, 5000)
  }

  forEach(error, ({ code, details }) => {
    const isWorkoutNotDeletedError = code === 422 && has(details, 'performed_exercises')
    if (isWorkoutNotDeletedError) {
      dispatch({
        type: EXERCISE_NOT_DELETED
      })
    }
  })
  setTimeout(() => {
    dispatch({
      type: RESET_NOTIFICATIONS
    })
  }, 5000)

  return error
}

export default middleware