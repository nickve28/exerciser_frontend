import { FETCH_ME } from 'app/actions/index'

export default (state = {}, action) => {
  if (action.type === FETCH_ME) {
    return action.payload
  }
  return state
}