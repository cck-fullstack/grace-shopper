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

  componentDidMount() {
    // this.props.getUserThunk(+this.props.match.params.userId)
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
    return (
      <div>
        <h2>Welcome to your user page, {this.props.firstName}</h2>
        <h4>Your Current Cart:</h4>
        <CartItems />
        <div>
          <h4>Update your information here:</h4>
          <UpdateUser userId={+this.props.match.params.userId} />
          <h4>Your Order History:</h4>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   console.log('STATE?', state)
//   return {
//     user: state.user
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    getUserThunk: userId => {
      dispatch(getUserThunk(userId))
    }
  }
}

export default connect(null, mapDispatchToProps)(UserPage)
