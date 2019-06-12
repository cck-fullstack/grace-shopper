/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {removeCartItem, checkOutCartThunk} from '../store/cart'

class CartItems extends Component {
  async componentDidMount() {}

  render() {
    const {cart, checkOutCart, removeItem} = this.props
    return (
      <span>
        <h1>Cart Items</h1>
        {cart.items.length === 0 ? (
          <span>Please add items to the cart </span>
        ) : (
          cart.items.map((item, index) => (
            <div className="cartItems" key={index}>
              <p>name:{item.name}</p>
              <p>Quantity:{item.quantity}</p>
              <p>Price:${item.price * 0.01}</p>
              <button type="button" onClick={() => removeItem(index)}>
                X
              </button>
            </div>
          ))
        )}
        <button type="button" onClick={() => checkOutCart(cart.items)}>
          Check Out
        </button>
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  removeItem: idx => dispatch(removeCartItem(idx)),
  checkOutCart: idx => dispatch(checkOutCartThunk(idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
