import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addCartItem} from '../store/cart'

class AllItems extends Component {
  componentDidMount() {
    this.props.fetchItems()
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
            <button type="button" onClick={() => addToCart(item)}>
              Add To Cart
            </button>
          </div>
        ))}
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {items: state.items}
}

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(getItemsThunk()),
  addToCart: item => dispatch(addCartItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
