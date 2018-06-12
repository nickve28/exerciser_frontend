import React, {Component} from 'react'
import { reduxForm } from 'redux-form'
import {connect} from 'react-redux'

import {fetchWorkoutTemplate, saveWorkout, fetchExercises} from '../actions/index'
import { hashHistory } from 'react-router'
import {validateWorkoutCreate, validatePExerciseCreate, validatePExerciseUnique} from '../helpers/validator'
import { SubmissionError } from 'redux-form'

import isEmpty from 'lodash-es/isEmpty'
import omit from 'lodash-es/omit'
import replace from 'lodash-es/replace'
import reduce from 'lodash-es/reduce'
import merge from 'lodash-es/merge'
import get from 'lodash-es/get'
import some from 'lodash-es/some'
import map from 'lodash-es/map'
import compact from 'lodash-es/compact'

import WorkoutForm from '../components/workout_form'

import preparePayload from '../helpers/prepare_workout_payload'

const toDecimal = num => parseInt(num, 10)

class NewWorkout extends Component {
  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleLoadTemplate = this.handleLoadTemplate.bind(this)
    this.state = {errors: []}
  }

  componentDidMount() {
    if (isEmpty(this.props.exercises)) {
      return this.props.fetchExercises()
    }
    return true
  }

  render() {
    return (
      <WorkoutForm
        handleFormSubmit={this.props.handleSubmit(this.handleFormSubmit)}
        handleLoadTemplate={this.handleLoadTemplate}
        action="Create"
        exercises={this.props.exercises}
        exerciseOrder={this.props.exerciseOrder}
        validate={validate}
        errors={this.state.errors}
      />
    )
  }

  handleLoadTemplate() {
    this.props.fetchWorkoutTemplate()
  }

  handleFormSubmit(values) {
    let payload = omit(values, 'id')
    const errors = validate(payload)

    if (!isEmpty(errors)) {
      this.setState({errors})
      throw new SubmissionError(errors)
    }

    const createPayload = preparePayload(payload)

    this.props.saveWorkout(createPayload).then(() => {
      hashHistory.push('/workouts') //best way to navigate..
    })
  }

}

function validate(data) {
  const topLevelErrors = validateWorkoutCreate(omit(data, 'performedExercises'))
  const exerciseErrors = map(data.performedExercises, validatePExerciseCreate)
  const exerciseIds = compact(map(data.performedExercises, 'exerciseId'))
    .map(id => toDecimal(id)) //the 2nd parameter of map is causing trouble

  const exerciseUniqueError = validatePExerciseUnique(exerciseIds).error

  const errorMessages = reduce(get(topLevelErrors, 'error.details'), (memo, {message, path}) => {
    memo[path] = replace(message, /"/g, '')
    return memo
  }, {})

  if (exerciseUniqueError) {
    const err = 'You can not assign an exercise multiple times'
    errorMessages.uniqueExerciseError = err
  }

  const someErrorsPresentInExercises = some(exerciseErrors, ({error}) => error)

  if (someErrorsPresentInExercises) {
    errorMessages.performedExercises = map(exerciseErrors, ({error}) => {
      return reduce(get(error, 'details'), (memo, {message, path}) => {
        memo[path] = replace(message, /"/g, '')
        return memo
      }, {})
    })
  }
  return errorMessages
}

function mapStateToProps(state) {
  const exercises = state.exercises.data.entities

  //dirty hack for now!
  let initialValues = state.workouts.workoutTemplate
  if (initialValues) {
    const recentWorkoutId = state.workoutFetch.data.order[0]
    initialValues = state.workoutFetch.data.entities[recentWorkoutId]

    //initialValues.workoutDate = moment(initialValues.workoutDate).toDate()
    initialValues.performedExercises = map(initialValues.performedExercises, pExercise => {
      return merge({}, pExercise, {type: exercises[pExercise.exerciseId].type})
    })
    initialValues.workoutDate = new Date(initialValues.workoutDate)
  }

  return {
    exercises: exercises,
    exerciseOrder: state.exercises.data.order,
    initialValues: initialValues
  }
}

NewWorkout = reduxForm({ //eslint-disable-line
  form: 'workout',
  fields: ['description', 'workoutDate', 'performedExercise'],
  validate
})(NewWorkout)

export default connect(mapStateToProps, {fetchWorkoutTemplate, saveWorkout, fetchExercises})(NewWorkout)
