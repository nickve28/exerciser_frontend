import moment from 'moment'
import _ from 'lodash'

const PERFORMED_EXERCISE_PROPS = ['exerciseId', 'weight', 'sets', 'reps', 'mode', 'amount', 'duration']

const toInt = _.partialRight(parseInt, 10)
const toDecimal = num => parseFloat(num).toFixed(2) / 1

export default (workoutPayload) => {
  const payload = _.cloneDeep(workoutPayload)

  if (!payload.workoutDate)
    payload.workoutDate = moment()

  payload.workoutDate = moment(payload.workoutDate).format('YYYY-MM-DD')
  payload.performedExercises = _.map(payload.performedExercises, pExercise => {
    let filteredExercise = _.pick(pExercise, PERFORMED_EXERCISE_PROPS)
    return _.reduce(_.keys(filteredExercise), (memo, prop) => {
      if (_.isNull(pExercise[prop])) {
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

