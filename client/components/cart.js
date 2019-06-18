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
  async componentDidMount() {
    if (!this.cart) {
      this.cart = JSON.parse(localStorage.getItem('cart'))
      console.log('LOCAL CART', JSON.parse(localStorage.getItem('cart')))
    }
  }

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
    // if (!Array.isArray(cart)) arrayCart = [...cart]

    return (
      <span>
        <h1>Cart Items</h1>
        {arrayCart.items.length === 0 ? (
          <span>Please add items to the cart </span>
        ) : (
          <div>
            <div className="container">
              <div className="row">
                <ul className="collection">
                  {cart.items.map((item, index) => {
                    return (
                      <div key={index}>
                        <li className="collection-item">
                          <h4>{item.name}</h4>
                          <button
                            type="button"
                            id="view-all-btn"
                            className="btn-small red"
                            onClick={() => removeItem(index)}
                          >
                            x
                          </button>
                          <p>Quantity:{item.quantity}</p>
                          <p>Price:${item.price * 0.01}</p>
                          <button
                            type="button"
                            className="btn-floating btn-small green"
                            onClick={() => addToCart(this.addOnClick(item))}
                          >
                            {' '}
                            +{' '}
                          </button>{' '}
                          <button
                            type="button"
                            className="btn-floating btn-small red"
                            onClick={() => decrementItem(item)}
                          >
                            {' '}
                            -{' '}
                          </button>
                        </li>
                      </div>
                    )
                  })}
                </ul>
                <button
                  type="button"
                  className="btn red"
                  onClick={() => checkOutCart(cart.items)}
                >
                  Check Out
                </button>
                <Stripe />
              </div>{' '}
            </div>{' '}
            {/*{arrayCart.items.map((item, index) => {
              return (
                <div className="container" key={index}>
                  <h4>{item.name}</h4>
                  <button
                    type="button"
                    id="view-all-btn"
                    className="btn-small red"
                    onClick={() => removeItem(index)}
                  >
                    x
                  </button>
                  <p>Quantity:{item.quantity}</p>
                  <p>Price:${item.price * 0.01}</p>
                  <button
                    type="button"
                    className="btn-floating btn-small green"
                    onClick={() => addToCart(this.addOnClick(item))}
                  >
                    {' '}
                    +{' '}
                  </button>{' '}
                  <button
                    type="button"
                    className="btn-floating btn-small red"
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
              className="btn red"
              onClick={() => checkOutCart(arrayCart.items)}
            >
              Check Out
            </button>
            <Stripe />*/}
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
    dispatch(checkOutCartThunk())
  },
  addToCart: item => dispatch(addCartItemThunk(item)),
  decrementItem: item => dispatch(decrementCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)
