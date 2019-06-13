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
    console.log(this.props)
    return (
      <div className="row">
        <h3 className="col 12">Customer Sign-up:</h3>
        <UserForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addUserThunk: user => {
      dispatch(addUserThunk(user)).then(() => {
        //change to whatever we decide when we do, sending to home for now
        ownProps.history.push('/home')
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(AddUser)
