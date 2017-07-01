import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

export default ({workout, onDelete}) => {
  const formatted_date = moment(workout.workoutDate).format('YYYY-MM-DD')
  return (
    <li className="list-view-group-item">
      <div className="pull-right">
        {formatted_date}
        <button className="button button-danger" style={{marginLeft: '5px'}} onClick={onDelete}>x</button>
      </div>
      <Link to={`/workouts/${workout.id}`}>{workout.description}</Link>
    </li>
  )
}