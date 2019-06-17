import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import ProductsDropdown from './dropdown'
import axios from 'axios'

const destroy = async () => {
  await axios.get('/api/dev/')
}

const status = async () => {
  await axios.get('/api/dev/status')
}

const Navbar = ({handleClick, isLoggedIn, cartCount, firstName}) => {
  return (
    <div id="navbar">
      {/*<button type="button" onClick={() => destroy()}>
        Destroy Session
      </button>
      <button type="button" onClick={() => status()}>
        Session Status
      </button>

      <h1 className="brand-logo">
        <Link to="/" className="black-text">
          The Code School
        </Link>
      </h1>*/}
      <div id="navbar-fixed">
        <nav className="nav-wrapper grey darken-3">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link href="/" className="navlinks left">
                <img
                  id="logo"
                  src="https://cdn.discordapp.com/attachments/581912987577876502/590217108122763267/6455ecdcad33ab630747b56c640a6a696e380c8d.png"
                />
              </Link>
              <a
                href="#"
                className="white-text waves-effect waves-light btn right"
                onClick={handleClick}
              >
                Logout
              </a>
              <Link
                to="/checkout"
                className="white-text right waves-effect waves-light btn"
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
                  to="/"
                  className="white-text waves-effect waves-light btn left"
                >
                  Home
                </Link>
                <ProductsDropdown />
                <Link
                  to="/user"
                  className="white-text waves-effect waves-light btn"
                >
                  {firstName}
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link href="/" className="brand-logo left">
                <img
                  className="brand-logo left"
                  id="logo"
                  src="https://cdn.discordapp.com/attachments/581912987577876502/590217108122763267/6455ecdcad33ab630747b56c640a6a696e380c8d.png"
                />
              </Link>
              <Link
                to="/login"
                className="white-text right waves-effect waves-light btn"
              >
                Login
              </Link>
              <Link
                to="/create"
                className="white-text right waves-effect waves-light btn"
              >
                Create Account{' '}
              </Link>
              <Link
                to="/checkout"
                className="white-text right waves-effect waves-light btn"
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
                  to="/"
                  className="white-text waves-effect waves-light btn"
                >
                  Home
                </Link>
                <ProductsDropdown />
              </div>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  )
}

//***DROPDOWN EVENT LISTENER***

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartCount: state.cart.count,
    firstName: state.user.firstName
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
