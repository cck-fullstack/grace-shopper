import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addUserThunk} from '../store/user'
import UserForm from './userForm'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: ''
}

class AddUser extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addUserThunk(this.state)
    this.setState(initialState)
  }

  render() {
    return (
      <div>
        Customer Sign-up:
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
    addUserThunk: user => {
      console.log('thunk fired', user)
      dispatch(addUserThunk(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddUser)
