import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ChipInput from 'material-ui-chip-input'
import { TextField } from 'material-ui'
import { withState, withHandlers, compose } from 'recompose'

import { fetchExercise, updateExercise } from '../actions/exercise'

import Title from '../../../components/title'

import MaterialLabel from '../../../components/material/form/label'

const ExerciseDetails = props => {
  const {
    exercise,
    exerciseUpdate,
    fetch,
    update,
    updateDescription,
    addCategory,
    removeCategory
  } = props

  if (!exercise) {
    fetch()
    return <div>Loading...</div>
  }

  return <div>
    <Title title={exercise.name}>
      <Link className="pull-right" to="/">Go back</Link>
    </Title>

    <div>
      <h4>Summary</h4>
        <MaterialLabel name="Type" />
        <div>{exercise.type}</div>

        <MaterialLabel name="Metric" />
        <div>{exercise.metric}</div>

        <MaterialLabel name="Description" />
        <TextField
          name="description"
          value={exerciseUpdate.description || exercise.description}
          onChange={updateDescription}
          onBlur={() => update(exerciseUpdate)}
        />

        <MaterialLabel name="Categories" />
        <ChipInput
          dataSource={[]}
          onRequestAdd={category => {
            addCategory(category, update) //todo think of a better solution
          }}
          onRequestDelete={category => {
            removeCategory(category, update)
          }}
          onChange={() => update(exerciseUpdate)}
          value={exerciseUpdate.categories || exercise.categories}
        />
    </div>
  </div>
}

const mapStateToProps = (state, props) => ({
  exercise: state.exercises.data.entities[props.params.id]
})

const mapDispatchToProps = (dispatch, { params }) => ({
  fetch: () => dispatch(fetchExercise(params.id)),
  update: exercise => dispatch(updateExercise(exercise))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //set exercise (if loaded) as default state
  withState('exerciseUpdate', 'setExercise', ({ exercise }) => exercise ? exercise: {}),
  withHandlers({
    updateDescription: props => event => {
      props.setExercise({ ...props.exercise, description: event.target.value})
    },
    addCategory: props => (category, update) => {
      const { exercise, setExercise } = props
      const newCategories = [...exercise.categories, category]

      setExercise({ ...exercise, categories: newCategories})
      update({ ...exercise, categories: newCategories })
    },
    removeCategory: props => (category, update) => {
      const { exercise, setExercise } = props
      const { categories } = exercise
      const categoryIndex = categories.indexOf(category)
      let newCategories = categories
      if (categoryIndex > -1) {
        newCategories.splice(categoryIndex, 1)
      }

      setExercise({ ...exercise, categories: newCategories})
      update({ ...exercise, categories: newCategories })
    }
  })
)(ExerciseDetails)