import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWorkouts, deleteWorkout} from '../actions/index'
import {Link} from 'react-router'


import values from 'lodash-es/values'
import map from 'lodash-es/map'
import partial from 'lodash-es/partial'

import {RaisedButton, Snackbar} from 'material-ui'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import WorkoutEntry from '../components/workout_entry'

import Title from '../components/title'

class Workouts extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.renderMoreButton = this.renderMoreButton.bind(this)
    this.loadWorkouts = this.loadWorkouts.bind(this)
  }

  componentWillMount() {
    this.props.fetchWorkouts()
  }

  onDelete({id}) {
    this.props.deleteWorkout(id).then(() => {
      this.props.fetchWorkouts()
    })
  }

  loadWorkouts(limit, offset) {
    this.props.fetchWorkouts(limit, offset)
  }

  renderMoreButton() {
    const {workouts, count} = this.props
    const moreAvailable = workouts && values(workouts).length < count

    if (moreAvailable) {
      const offset = values(workouts).length
      const limit = 10

      return (
        <li className="show-more-li-non-styled">
          <RaisedButton backgroundColor="#00BCD4" labelColor="white" onClick={() => this.loadWorkouts(limit, offset)} label="Show more" />
        </li>
      )
    }
    return ''
  }

  render() {
    const { workouts, count, workoutOrder } = this.props
    return (
      <div className="content">
        <Title title="Workouts" count={count}>
          <Link to="/workouts/new" style={{float: 'right'}}>Add Workout</Link>
        </Title>

        <ReactCSSTransitionGroup
          component="ul"
          className="list-view-group"
          transitionName="listitem"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {
            map(workoutOrder, id => {
              const workout = workouts[id]
              return <WorkoutEntry key={workout.id} workout={workout} onDelete={partial(this.onDelete, workout)} />
            })
          }
        {this.renderMoreButton()}
        </ReactCSSTransitionGroup>
        {renderNotification(this.props.notifications)}
      </div>
    )
  }
}

function renderNotification(notificationInfo) {
  return (
    <div>
      <Snackbar
        id="snackbar-workout-deleted"
        open={notificationInfo.showWorkoutDeleted}
        message="The workout has been deleted."
      />
      <Snackbar
        id="snackbar-workout-created"
        open={notificationInfo.showWorkoutCreated}
        message="Workout successfully created."
      />
      <Snackbar
        id="snackbar-workout-updated"
        open={notificationInfo.showWorkoutUpdated}
        message="Workout successfully updated."
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    workouts: state.workoutFetch.data.entities,
    count: state.workoutFetch.data.count,
    notifications: state.notifications,
    workoutOrder: state.workoutFetch.data.order
  }
}

export default connect(mapStateToProps, {fetchWorkouts, deleteWorkout})(Workouts)