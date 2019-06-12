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
        <h1 className="brand-logo">All Items</h1>
        {items.map(item => (
          <div className="row" key={item.id}>
            <div className="col s12 m7">
              <div className="card">
                <div className="card-image">
                  <img src={item.imageURL} />
                </div>
                <div className="card-content">
                  <p className="card-title">{item.name}</p>
                  <p>${item.price * 0.01}</p>
                  <p>Stock:{item.quantity}</p>
                  <p>Description:{item.description}</p>
                </div>{' '}
                <button
                  type="button"
                  className="btn waves-effect waves-light blue"
                  onClick={() => addToCart(this.addOnClick(item))}
                >
                  Add To Cart
                </button>{' '}
                <button className="btn-floating btn-small waves-effect waves-light green">
                  {' '}
                  +{' '}
                </button>{' '}
                <button className="btn-floating btn-small waves-effect waves-light red">
                  {' '}
                  -{' '}
                </button>
              </div>
            </div>

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
