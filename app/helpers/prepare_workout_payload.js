import moment from 'moment'

import reduce from 'lodash-es/reduce'
import cloneDeep from 'lodash-es/cloneDeep'
import map from 'lodash-es/map'
import pick from 'lodash-es/pick'
import keys from 'lodash-es/keys'
import isNull from 'lodash-es/isNull'

const PERFORMED_EXERCISE_PROPS = ['exerciseId', 'weight', 'sets', 'reps', 'mode', 'amount', 'duration']

const toInt = num => parseInt(num, 10)
const toDecimal = num => parseFloat(num).toFixed(2) / 1

export default (workoutPayload) => {
  const payload = cloneDeep(workoutPayload)

  if (!payload.workoutDate)
    payload.workoutDate = moment()

  payload.workoutDate = moment(payload.workoutDate).format('YYYY-MM-DD')
  payload.performedExercises = map(payload.performedExercises, pExercise => {
    let filteredExercise = pick(pExercise, PERFORMED_EXERCISE_PROPS)
    return reduce(keys(filteredExercise), (memo, prop) => {
      if (isNull(pExercise[prop])) {
        return memo
      } else if (prop === 'weight') {
        return { ...memo, [prop]:  toDecimal(pExercise[prop]) }
      }

      memo[prop] = toInt(filteredExercise[prop])
      return memo
    }, {})
  }) //to int for all values
  return payload
}

