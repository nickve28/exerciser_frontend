import React from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../actions/authentication'
import LoginForm from '../components/login_form'

const Login = ({ loginUser, loginState }) =>
  <LoginForm login={loginUser} loginState={loginState} />

const mapStateToProps = state => ({
  loginState: state.authentication.loginState
})

export default connect(mapStateToProps, { loginUser })(Login)