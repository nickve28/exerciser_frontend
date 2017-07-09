import React from 'react'
import { connect } from 'react-redux'
import { values } from 'lodash'

import { fetchMe } from 'app/sections/users/actions/user'

import Login from 'app/sections/authentication/containers/login'
import NavigationBar from 'app/sections/navigation/components/navigation_bar'
import Notifications from 'app/sections/notifications/containers/notifications'

import './root.css'

const renderContent = (authenticationState, children) => {
  if (authenticationState !== 'logged_in') {
    return <Login />
  }
  return children
}

const Root = ({ children, authenticationState, user, fetchMe }) => {
  if (authenticationState === 'logged_in') {
    fetchMe()
  }

  return <div>
    <div>
      <NavigationBar user={user} />
      <div className="desktop-filler" />
      <div className="container-fluid app-container app-container-size">
        {renderContent(authenticationState, children)}
      </div>
    </div>
    <Notifications />
  </div>
}

const mapStateToProps = state => {
  return {
    authenticationState: state.authentication.loginState,
    user: values(state.users.data.entities)[0]
  }
}

export default connect(mapStateToProps, { fetchMe })(Root)