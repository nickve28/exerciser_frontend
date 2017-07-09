import { combineReducers } from 'redux'

import UserReducer from './user'
import AuthenticationReducer from './authentication'
import WorkoutReducer from './workout'
import NotificationReducer from './notification'
import ProgressReducer from './progress'

import WorkoutFetchReducer from './workout_fetch' //Temp until workout is transitioned
import ExerciseReducer from './exercise'
import CategoryReducer from './category'

import { reducer as FormReducer } from 'redux-form'

const reducers = combineReducers({
  exercises: ExerciseReducer,
  users: UserReducer,
  authentication: AuthenticationReducer,
  categories: CategoryReducer,
  workouts: WorkoutReducer,
  workoutFetch: WorkoutFetchReducer,
  notifications: NotificationReducer,
  progress: ProgressReducer,
  form: FormReducer
})

export default reducers
