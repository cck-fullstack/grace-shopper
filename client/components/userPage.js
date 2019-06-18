import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/user'
import UpdateUser from './updateUser'
import OrderHistory from './order-history'
import AdminPage from './admin-page'
import {Select} from 'react-materialize'

const defaultState = {
  showUpdateUserForm: false,
  showOrderHistory: false
}

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserThunk(this.props.userId, this.state)
    this.setState(defaultState)
  }

  render() {
    const {showUpdateUserForm, showOrderHistory} = this.state
    return (
      <div>
        <h2 id="centered-title">
          Welcome to your user page, {this.props.user.firstName}.
        </h2>
        <div>
          {this.props.user.isAdmin ? <AdminPage /> : ''}
          <br />
          <h3>Update your information here:</h3>
          <button
            type="button"
            onClick={() =>
              this.setState({showUpdateUserForm: !showUpdateUserForm})
            }
          >
            Update User information
          </button>
          {showUpdateUserForm ? (
            <UpdateUser userId={+this.props.user.id} />
          ) : (
            <div />
          )}
          <br />
          <h3>Order History</h3>
          <button
            type="button"
            onClick={() => this.setState({showOrderHistory: !showOrderHistory})}
          >
            Order History
          </button>
          {showOrderHistory ? <OrderHistory /> : <div />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserThunk: userId => {
      dispatch(getUserThunk(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
