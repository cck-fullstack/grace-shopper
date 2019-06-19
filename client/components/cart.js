/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Stripe from './stripe.js'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import {
  addCartItemThunk,
  removeCartItem,
  checkOutCartThunk,
  decrementCartItemThunk
} from '../store/cart'

class CartItems extends Component {
  constructor(props) {
    super(props)
    this.state = {stripeComplete: false}
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

  checkStripeSuccess = boolean => {
    this.setState({stripeComplete: boolean})
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
    let totalPrice = 0
    return (
      <span>
        {arrayCart.items.length === 0 ? (
          <span>Please add items to the cart </span>
        ) : (
          <div className="container">
            <div>
              <div className="row">
                <ul className="collection">
                  {cart.items.map((item, index) => {
                    {
                      totalPrice += item.price * item.quantity
                    }
                    return (
                      <div key={index} className="col s4 m4">
                        <div className="card small">
                          <Link to={`/items/${item.id}`}>
                            <div className="card-image">
                              <div className="image-fade">
                                <img
                                  className="product-image"
                                  src={item.imageURL}
                                />{' '}
                              </div>
                              <span className="card-title">{item.name}</span>
                            </div>
                          </Link>
                          <div
                            className="card-content"
                            style={{display: 'flex'}}
                          >
                            <div className="price-and-stock">
                              <ul>
                                <li>Price: ${item.price / 100} </li>

                                <li>Quantity:{item.quantity}</li>
                              </ul>
                            </div>
                            <div className="card-action" />
                            <button
                              type="button"
                              id="increment-button"
                              className="btn-floating btn-small green"
                              onClick={() => addToCart(this.addOnClick(item))}
                            >
                              {' '}
                              +{' '}
                            </button>{' '}
                            <button
                              type="button"
                              id="view-all-btn1"
                              className="btn-small red"
                              onClick={() => removeItem(index)}
                            >
                              x
                            </button>
                            <button
                              type="button"
                              id="decriment-button"
                              className="btn-floating btn-small red"
                              onClick={() => decrementItem(item)}
                            >
                              {' '}
                              -{' '}
                            </button>
                          </div>
                        </div>{' '}
                      </div>
                    )
                  })}
                </ul>
                <div>
                  {' '}
                  <div className="speech-bubble">
                    {' '}
                    <h4 className="cart-total">
                      {' '}
                      Cart Total: ${totalPrice / 100}
                    </h4>
                  </div>
                </div>
                <div className="stripe-and-checkout">
                  <Stripe stripeComplete={this.checkStripeSuccess} />
                  {this.state.stripeComplete ? (
                    <button
                      type="button"
                      className="btn red"
                      onClick={() => checkOutCart(cart.items)}
                    >
                      CheckOut
                    </button>
                  ) : (
                    <a className="btn disabled">Checkout</a>
                  )}
                </div>
              </div>{' '}
            </div>{' '}
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
