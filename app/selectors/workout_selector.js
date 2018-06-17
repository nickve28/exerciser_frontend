import { createSelector } from 'reselect'

import isEmpty from 'lodash-es/isEmpty'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import defaults from 'lodash-es/defaults'

const exerciseSelector = state => state.exercises.data.entities
const workoutSelector =  state => state.workouts.selectedWorkout

const toViewModel = (exercises, workout) => {
  return combineExercises(workout, exercises)
}

const combineExercises = (workout, exercises) => {
  const dataNotLoaded = isEmpty(exercises) || isEmpty(workout)
  if (dataNotLoaded) {
    return null
  }

  const exerciseMap = reduce(exercises, (memo, exercise) => {
    memo[exercise.id] = exercise
    return memo
  }, {})

  const mergedExercises = map(workout.performedExercises, exercise => {
    const {
      exerciseId, sets, reps, weight, metric, mode, duration, amount
    } = exercise
    return {
      exerciseId, sets, reps, weight,
      metric, mode, duration, amount,
      name: exerciseMap[exerciseId].name,
      type: exerciseMap[exerciseId].type
    }
  })
  return defaults({performedExercises: mergedExercises}, workout)

}

export default createSelector(
  exerciseSelector, workoutSelector,
  toViewModel
)
