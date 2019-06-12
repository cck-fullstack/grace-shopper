import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'

class AllItems extends Component {
  componentDidMount() {
    this.props.fetchItems()
  }

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
    let {addToCart, items} = this.props
    return (
      <span>
        <h1>All Items</h1>
        {items.map(item => (
          <div className="items" key={item.id}>
            <img src={item.imageURL} />
            <p>Name:{item.name}</p>
            <p>Price:${item.price * 0.01}</p>
            <p>Quantity:{item.quantity}</p>
            <p>Description:{item.description}</p>
            <button
              type="button"
              onClick={() => addToCart(this.addOnClick(item))}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {items: state.items, cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(getItemsThunk()),
  addToCart: item => {
    dispatch(addCartItemThunk(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
