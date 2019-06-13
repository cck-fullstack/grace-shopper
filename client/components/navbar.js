import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartCount}) => (
  <div>
    <h1 className="brand-logo">
      <Link to="/" className="black-text">
        Droopy Cart Bros
      </Link>
    </h1>
    <div id="navbar-fixed">
      <nav className="nav-wrapper grey darken-3">
        {isLoggedIn ? (
          <div className="container">
            {/* The navbar will show these links after you log in */}
            <a
              href="#"
              className="white-text waves-effect waves-light btn-flat right"
              onClick={handleClick}
            >
              Logout
            </a>
            <Link
              to="/cartItems"
              className="right waves-effect waves-light btn-flat"
            >
              <div className="white-text waves-effect waves-light btn-flat">
                {cartCount}
                <i id="cartIcon" className="material-icons">
                  {' '}
                  shopping_cart
                </i>{' '}
                cart
              </div>
            </Link>
            <div className="navlinks">
              <Link
                to="/home"
                className="white-text waves-effect waves-light btn-flat"
              >
                Home
              </Link>
              <Link
                to="/items"
                className="white-text waves-effect waves-light dropdown-trigger btn"
              >
                Products
              </Link>
              <Link
                to="/user"
                className="white-text waves-effect waves-light btn-flat"
              >
                Profile
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link
              to="/login"
              className="white-text right waves-effect waves-light btn-flat"
            >
              Login
            </Link>
            <Link
              to="/create"
              className="white-text right waves-effect waves-light btn-flat"
            >
              Create Account{' '}
            </Link>
            <Link
              to="/cartItems"
              className="white-text right waves-effect waves-light btn-flat"
            >
              <div>
                <i id="cartIcon" className="material-icons right">
                  shopping_cart
                </i>
                {'cart '}
                {cartCount}
              </div>
            </Link>
            <div className="navlinks">
              <Link
                to="/home"
                className="white-text waves-effect waves-light btn-flat"
              >
                Home
              </Link>
              <Link
                to="/items"
                className="white-text waves-effect waves-light btn-flat dropdown-trigger btn"
                data-target="dropdown1"
              >
                Our Products
              </Link>
              <ul id="dropdown1" className="dropdown-content">
                <li>category1</li>
                <li>category2</li>
                <li>category3</li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>

    <hr />
  </div>
)

//***DROPDOWN EVENT LISTENER***

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartCount: state.cart.count
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
