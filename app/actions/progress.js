import handleUnauthorized from './error'
import configuration from 'app/configs/index'

import compact from 'lodash-es/compact'
import {post} from 'app/helpers/request'

export const FETCH_PROGRESS = 'FETCH_PROGRESS'

const url = `${configuration.apiHost}:${configuration.apiPort}/api/graphql`


export const fetchProgress = ({exerciseId, fromDate, untilDate}) => {
  const token = localStorage.getItem('auth_token')
  const filters = compact([
    fromDate ? `from: "${fromDate}"` : null,
    untilDate ? `until: "${untilDate}"` : null,
    `exerciseId: ${exerciseId}`
  ]).join(', ')

  const headers = {
    authorization: `Bearer ${token}`
  }

  const query = `{
    me {
      progress(${filters}) {
        exerciseId, exerciseType, exerciseMetric, progress {
          weight, sets, reps, date, amount, duration, mode
        }
      }
    }
  }`

  return dispatch => {
    return post(query, {url, headers}).then(result => {
      dispatch({
        type: FETCH_PROGRESS,
        payload: result.me.progress
      })
    }).catch(err => {
      return handleUnauthorized(err, dispatch)
    })
  }
}