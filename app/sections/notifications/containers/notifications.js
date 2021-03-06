import React from 'react'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { Snackbar } from 'material-ui'

//needs rework once all notification are housed here
const Notifications = ({ showNoExerciseDeleted, showLoginExpired, loginFailure }) => {
  return <div>
    <Snackbar
      open={showNoExerciseDeleted || false}
      message='The exercise is used in workouts.'
      onRequestClose={noop}
    />
    <Snackbar
      open={showLoginExpired || false}
      message="Your login session expired. Please log in."
      onRequestClose={noop}
    />
    <Snackbar
      open={loginFailure.show}
      onRequestClose={noop}
      message={loginFailure.message}
    />
  </div>
}

const mapStateToProps = state => ({
  showNoExerciseDeleted: state.notifications.showNoExerciseDeleted,
  showLoginExpired: state.notifications.showLoginExpired,
  loginFailure: state.notifications.loginFailure
})

export default connect(mapStateToProps)(Notifications)