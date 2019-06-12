/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Stripe from './stripe.js'
import _ from 'lodash'

import {
  addCartItemThunk,
  removeCartItem,
  checkOutCartThunk,
  decrementCartItemThunk
} from '../store/cart'

class CartItems extends Component {
  async componentDidMount() {}

  addOnClick = item => {
    if (this.props.cart) {
      const search = _.find(this.props.cart.items, {id: item.id})

      if (search !== undefined) {
        search.quantity += 1
        return search
      }
    }
    item.quantity = 1
    return item
  }

  render() {
    const {
      addToCart,
      cart,
      checkOutCart,
      decrementItem,
      removeItem
    } = this.props
    return (
      <span>
        <h1>Cart Items</h1>
        {cart.items.length === 0 ? (
          <span>Please add items to the cart </span>
        ) : (
          cart.items.map((item, index) => (
            // {item !== undefined ?
            <div className="cartItems" key={index}>
              <p>
                name:{item.name}
                <button type="button" onClick={() => removeItem(index)}>
                  X
                </button>
              </p>
              <p>Quantity:{item.quantity}</p>
              <p>Price:${item.price * 0.01}</p>
              <button
                type="button"
                className="btn-floating btn-small waves-effect waves-light green"
                onClick={() => addToCart(this.addOnClick(item))}
                on
              >
                {' '}
                +{' '}
              </button>{' '}
              <button
                type="button"
                className="btn-floating btn-small waves-effect waves-light red"
                onClick={() => decrementItem(item)}
              >
                {' '}
                -{' '}
              </button>
            </div>
            // :<span>yes?</span>}
          ))
        )}
        <button type="button" onClick={() => checkOutCart(cart.items)}>
          Check Out
        </button>
        <Stripe />
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  removeItem: idx => dispatch(removeCartItem(idx)),
  checkOutCart: idx => dispatch(checkOutCartThunk(idx)),
  addToCart: item => dispatch(addCartItemThunk(item)),
  decrementItem: item => dispatch(decrementCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
