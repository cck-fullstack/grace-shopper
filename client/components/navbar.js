import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartCount}) => (
  // =======
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//         </div>
//       )}
//     </nav>
//     {cartCount}
//     <Link to="/cartItems"> Cart Items</Link>

// >>>>>>> master
  <div>
    <h1 className="brand-logo">Service Sellin Bois</h1>
    <div id="navbar">
      <nav className="nav-wrapper grey darken-3">
        {isLoggedIn ? (
          <div className="container">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="left waves-effect waves-light btn">
              Login
            </Link>
            <Link to="/create" className="left waves-effect waves-light btn">
Create Account            </Link>
            <Link
              to="/cartItems"
              className="right waves-effect waves-light btn"
            >
              {' '}
              Cart Items {cartCount}
            </Link>{' '}
          </div>
        )}
      </nav>
    </div>

    <hr />
  </div>
)

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
