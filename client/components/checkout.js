import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { getItemsThunk } from '../store/items'
// import { addCartItemThunk } from '../store/cart'
import CartItems from './cart'

class Checkout extends Component {
  // is componentDidMount needed?
  componentDidMount() {
    // console.log('THIS.PROPS:', this.props)
  }

  render() {
    let {cart} = this.props
    return (
      <div>
        <h4 id="centered-title">Your Current Cart:</h4>
        <CartItems />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
  //     cart: state.cart,
  //     items: state.items,
  //     user: state.user
  //   }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
