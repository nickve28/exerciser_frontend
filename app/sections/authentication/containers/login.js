import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Title from 'app/components/title'
import MaterialField from 'app/components/material/form/field'
import MaterialLoginButton from 'app/components/material/form/login_button'

import { required } from 'app/helpers/validations'

import { loginUser } from '../actions/authentication'

let Login = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    loginUser,
    loginState,
    valid
  } = props

  return (
    <div>
      <Title title="Log in" />
      <form
        style={{ marginTop: '30px' }}
        className="login-form"
        onSubmit={handleSubmit(({username, password}) => loginUser(username, password))}
      >

      <Field
        type="text"
        name="username"
        label="username"
        component={MaterialField}
        validate={required}
      />

      <Field
        type="password"
        name="password"
        label="password"
        component={MaterialField}
        validate={required}
      />

      <MaterialLoginButton
        disabled={!valid || pristine || submitting || loginState === 'logging_in'}
        label="Log in"
      />
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  loginState: state.authentication.loginState
})

Login = reduxForm({
  form: 'login'
})(Login)
export default connect(mapStateToProps, { loginUser })(Login)