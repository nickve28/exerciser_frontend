import { USER_LOGIN, USER_LOGIN_EXPIRED } from 'app/sections/authentication/actions/authentication'

const initialState = {
  token: null,
  loginState: 'logged_out'
}

export default (state = initialState, action) => {
  if (action.type === USER_LOGIN && action.status === 'pending') {
    return {
      ...state,
      loginState: 'logging_in'
    }
  }

  if (action.type === USER_LOGIN && action.status === 'success') {
    return {
      token: action.payload.token,
      loginState: 'logged_in'
    }
  }

  if (action.type === USER_LOGIN && action.status === 'failed') {
    return {
      ...state,
      loginState: 'login_failure'
    }
  }

  if (action.type === USER_LOGIN_EXPIRED) {
    return {
      token: null,
      loginState: 'logged_out'
    }
  }

  return state
}