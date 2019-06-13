import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/user'
import CartItems from './cart'
import UpdateUser from './updateUser'

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
        <h4>Your Current Cart:</h4>
        <CartItems />
        <div>
          <h4>Update your information here:</h4>
          <UpdateUser userId={+this.props.user.id} />
          <h4>Your Order History:</h4>
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
