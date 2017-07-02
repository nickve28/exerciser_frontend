// import React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import ChipInput from 'material-ui-chip-input'
// import { TextField } from 'material-ui'
// import { withState, withHandlers, compose } from 'recompose'
// import { without } from 'lodash'

// import { fetchExercise, updateExercise } from '../actions/exercise'

// import Title from '../../../components/title'

// import MaterialLabel from '../../../components/material/form/label'

// const ExerciseDetails = props => {
//   const {
//     exercise,
//     exerciseUpdate,
//     fetch,
//     update,
//     updateDescription,
//     addCategory,
//     removeCategory
//   } = props

//   if (!exercise) {
//     fetch()
//     return <div>Loading...</div>
//   }

//   return <div>
//     <Title title={exercise.name}>
//       <Link className="pull-right" to="/">Go back</Link>
//     </Title>

//     <div>
//       <h4>Summary</h4>
//         <MaterialLabel name="Type" />
//         <div>{exercise.type}</div>

//         <MaterialLabel name="Metric" />
//         <div>{exercise.metric}</div>

//         <MaterialLabel name="Description" />
//         <TextField
//           name="description"
//           value={exerciseUpdate.description || exercise.description}
//           onChange={updateDescription}
//           onBlur={() => update(exerciseUpdate)}
//         />

//         <MaterialLabel name="Categories" />
//         <ChipInput
//           dataSource={[]}
//           onRequestAdd={addCategory}
//           onRequestDelete={removeCategory}
//           value={exerciseUpdate.categories || exercise.categories}
//         />
//     </div>
//   </div>
// }

// const mapStateToProps = (state, props) => ({
//   exercise: state.exercises.data.entities[props.params.id]
// })

// const mapDispatchToProps = (dispatch, { params }) => ({
//   fetch: () => dispatch(fetchExercise(params.id)),
//   update: exercise => dispatch(updateExercise(exercise))
// })

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withState('exerciseUpdate', 'setExercise', {}),
//   withHandlers({
//     updateDescription: props => event => {
//       props.setExercise({ ...props.exercise, description: event.target.value})
//     },
//     addCategory: props => category => props.setExercise(
//       { ...props.exercise, categories: [...props.exercise.categories, category]}
//     ),
//     removeCategory: props => category => props.setExercise(
//       { ...props.exercise, categories: without(props.exercise.categories, category)}
//     )
//   })
// )(ExerciseDetails)