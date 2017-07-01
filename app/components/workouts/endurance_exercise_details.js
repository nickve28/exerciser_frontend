import React from 'react'

export default ({exercise}) => {
  return (
    <ul key={exercise.exerciseId} className="list-view-group" style={{marginTop: '5px'}}>
      <li className="list-view-group-item">Name: {exercise.name}</li>
      <li className="list-view-group-item">Amount: {exercise.amount} {exercise.metric}</li>
      <li className="list-view-group-item">Duration: {exercise.duration} Minutes</li>
      <li className="list-view-group-item">Mode: {exercise.mode}</li>
    </ul>
  )
}