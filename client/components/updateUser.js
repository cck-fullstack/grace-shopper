import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk, me} from '../store/user'
import UserForm from './userForm'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: ''
}

class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // is it this.props or just props?
  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserThunk(this.props.userId, this.state)
    this.setState(initialState)
  }

  render() {
    return (
      <div>
        <UserForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserThunk: (userId, user) => {
      dispatch(updateUserThunk(userId, user))
    }
  }
}

export default connect(null, mapDispatchToProps)(UpdateUser)
