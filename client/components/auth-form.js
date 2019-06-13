import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

import {GoogleLogin, GoogleLogout} from 'react-google-login'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const responseGoogle = response => {
    console.log('RESPONSE:', response)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email" className="validate">
            <small>Email</small>
          </label>
          <input required type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password" className="validate">
            <small>Password</small>
          </label>
          <input required type="password" name="password" />
        </div>
        <div>
          <button type="submit" className="waves-effect waves-light btn">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google" className="waves-effect waves-light btn red">
        {displayName} with Google
      </a>

      {/*<a href="/auth/google" className="btn">
        {displayName} with Google
      </a>*/}

      {/* THE BELOW IS IN PROGRESS. */}

      {/* <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
        clientId={'630517724735-e3j34trdr4vcv88tn1154etrgfu810am.apps.googleusercontent.com'}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}

      {/* <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
