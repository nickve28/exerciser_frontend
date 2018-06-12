import axios from 'axios'
import get from 'lodash-es/get'
import isEmpty from 'lodash-es/isEmpty'
import Promise from 'bluebird'

export const post = (payload, { url, headers }) => {
  return Promise.try(() => {
    return axios.post(url, { query: payload }, {headers})
  }).then(response => {
    const data = get(response, 'data.data')
    const errors = get(response, 'data.errors')

    if (!isEmpty(errors)) {
      throw errors
    }

    return data
  })
}