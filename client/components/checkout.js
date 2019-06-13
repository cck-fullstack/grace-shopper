import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { getItemsThunk } from '../store/items'
// import { addCartItemThunk } from '../store/cart'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  // is componentDidMount needed?
  componentDidMount() {
    console.log('THIS.PROPS:', this.props)
  }

  render() {
    let {cart} = this.props

    console.log('CART:', cart)

    return (
      //null
      <span>
        <h1 className="brand-logo">Your cart</h1>
        {cart.items.map(item => (
          <div className="row" key={item.id}>
            <div className="col s12 m7">
              <div className="card">
                <Link to={`/items/${item.id}`}>
                  <div className="card-image">
                    <img src={item.imageURL} />
                  </div>
                  <div className="card-content">
                    <p className="card-title">{item.name}</p>
                    <p>${item.price * 0.01}</p>
                    <p>Stock:{item.inventory}</p>
                    <p>Description:{item.description}</p>
                  </div>{' '}
                </Link>
                <button
                  type="button"
                  className="btn waves-effect waves-light blue"
                  onClick={() => addToCart(this.addOnClick(item))}
                >
                  Add To Cart
                </button>{' '}
              </div>
            </div>
          </div>
        ))}
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    items: state.items,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
