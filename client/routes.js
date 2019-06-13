import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Items,
  SingleItem,
  Login,
  Signup,
  UserHome,
  UserPage,
  AddUser,
  Cart,
  Checkout,
  OrderHistory
} from './components'

import {me} from './store'
// import Cart from './components/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log('IS LOGGED IN?', this.props.isLoggedIn)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/create" component={AddUser} />
        <Route path="/cartItems" component={Cart} />
        <Route exact path="/items/:id" component={SingleItem} />
        <Route path="/items" component={Items} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderhistory" component={OrderHistory} />

        {/* Blocks api routes but we use during development
        <Route path="/api" component={UserHome} /> */}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/user/" component={UserPage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
