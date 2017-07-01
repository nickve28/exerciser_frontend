import React from 'react'

export default ({exercise}) => {
  return (
    <ul key={exercise.exerciseId} className="list-view-group" style={{marginTop: '5px'}}>
      <li className="list-view-group-item">Name: {exercise.name}</li>
      <li className="list-view-group-item">Sets: {exercise.sets}</li>
      <li className="list-view-group-item">Reps: {exercise.reps}</li>
      <li className="list-view-group-item">Weight: {exercise.weight}</li>
    </ul>
  )
}