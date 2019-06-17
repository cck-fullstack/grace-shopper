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
  OrderHistory,
  AdminPage,
  Category
} from './components'

import {me} from './store'
import Home from './components/homePage'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={AddUser} />
        <Route path="/cartItems" component={Cart} />
        <Route exact path="/items/:id" component={SingleItem} />
        <Route exact path="/items/category/:category" component={Category} />
        <Route path="/items" component={Items} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/adminpage" component={AdminPage} />

        {/* Blocks api routes but we use during development
        <Route path="/api" component={UserHome} /> */}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
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
