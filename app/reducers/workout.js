import { FETCH_WORKOUT_TEMPLATE } from '../actions/index'
import map from 'lodash-es/map'
import defaults from 'lodash-es/defaults'
import first from 'lodash-es/first'

const INITIAL_STATE = {
  selectedWorkout: null,
  workouts: [],
  workoutCount: 0,
  workoutTemplate: null
}


//Converts the model to camelcase
const toWorkoutModel = (workoutData) => {
  const {description, id} = workoutData
  return {
    description, id,
    workoutDate: workoutData.workout_date,
    performedExercises: map(workoutData.performed_exercises, pExercise => {
      const { weight, sets, reps, metric, mode, amount, duration } = pExercise
      return {
        exerciseId: pExercise.exercise_id,
        weight, sets, reps, metric, mode, amount, duration
      }
    })
  }
}

export default (state = INITIAL_STATE, action = {}) => {
  // if (action.type === FETCH_WORKOUTS) {
  //   const workoutCount = action.payload.workout_count
  //   return defaults({
  //     workoutCount,
  //     workouts: map(action.payload.workouts, toWorkoutModel)
  //   }, INITIAL_STATE)
  // }

  // if (action.type === FETCH_WORKOUT) {
  //   return defaults({
  //     selectedWorkout: toWorkoutModel(action.payload)
  //   }, INITIAL_STATE)
  // }

  if (action.type === FETCH_WORKOUT_TEMPLATE) {
    return defaults({
      workoutTemplate: toWorkoutModel(first(action.payload))
    }, INITIAL_STATE)
  }

  // if (action.type === FETCH_MORE_WORKOUTS) {
  //   const workoutCount = action.payload.workout_count

  //   return defaults({
  //     workoutCount,
  //     workouts: concat(state.workouts, map(action.payload.workouts, toWorkoutModel))
  //   }, INITIAL_STATE)
  // }

  return state
}