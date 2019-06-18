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
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {}

  addOnClick = item => {
    if (this.props.cart) {
      let search = _.find(this.props.cart.items, {id: item.id})

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

    let arrayCart = cart
    if (!Array.isArray(cart)) arrayCart = [...cart]

    return (
      <span>
        <h1>Cart Items</h1>
        {arrayCart.items.length === 0 ? (
          <span>Please add items to the cart </span>
        ) : (
          <div>
            {arrayCart.items.map((item, index) => {
              return (
                <div className="container" key={index}>
                  <h4>{item.name}</h4>
                  <button
                    type="button"
                    id="view-all-btn"
                    className="waves-effect waves-light btn-small red"
                    onClick={() => removeItem(index)}
                  >
                    x
                  </button>
                  <p>Quantity:{item.quantity}</p>
                  <p>Price:${item.price * 0.01}</p>
                  <button
                    type="button"
                    className="btn-floating btn-small waves-effect waves-light green"
                    onClick={() => addToCart(this.addOnClick(item))}
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
              )
            })}
            <button
              type="button"
              className="waves-effect waves-light btn red"
              onClick={() => checkOutCart(arrayCart.items)}
            >
              Check Out
            </button>
            <Stripe />
          </div>
        )}
        <div />
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeItem: idx => dispatch(removeCartItem(idx)),
  checkOutCart: () => {
    // BROKEN: ownProps - when you click checkout, it does not redirect user to /home as intended {}
    // console.log(ownProps)
    dispatch(checkOutCartThunk())
    // .then(() => ownProps.history.push('/home'))
  },
  addToCart: item => dispatch(addCartItemThunk(item)),
  decrementItem: item => dispatch(decrementCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
