import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/user'
import CartItems from './cart'
import UpdateUser from './updateUser'
import OrderHistory from './order-history'

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateUserThunk(this.props.userId, this.state)
    this.setState({})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Welcome to your user page, {this.props.user.firstName}</h2>
        <h3>Your Current Cart:</h3>
        <CartItems />
        <br />
        <div>
          <h3>Update your information here:</h3>
          <UpdateUser userId={+this.props.user.id} />
          <br />
          <OrderHistory />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
    // cart: state.cart
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
