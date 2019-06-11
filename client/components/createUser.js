import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addUserThunk} from '../store/user'

const initialState = {
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
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            placeholder="Email Here"
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password Here"
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <input
            name="address"
            placeholder="Address Here"
            value={this.state.address}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserThunk: user => {
      dispatch(addUserThunk(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddUser)
