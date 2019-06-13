import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleItemThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'

class SingleItem extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleItem(id)
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
    let {addToCart, items} = this.props

    if (!items) items = []

    return (
      <span>
        <h1 className="brand-logo">Single Items</h1>
        <div className="row" key={items.id}>
          <div className="col s12 m7">
            <div className="card">
              <div className="card-image">
                <img src={items.imageURL} />
              </div>
              <div className="card-content">
                <p className="card-title">{items.name}</p>
                <p>${items.price * 0.01}</p>
                <p>Stock:{items.inventory}</p>
                <p>Description:{items.description}</p>
              </div>{' '}
              <button
                type="button"
                className="btn waves-effect waves-light blue"
                onClick={() => addToCart(this.addOnClick(items))}
              >
                Add To Cart
              </button>{' '}
            </div>
          </div>
        </div>
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {items: state.items, cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  fetchSingleItem: id => dispatch(getSingleItemThunk(id)),
  addToCart: item => dispatch(addCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
