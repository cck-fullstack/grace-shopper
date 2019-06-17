import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {Toast} from 'react-materialize'

class AllItems extends Component {
  componentDidMount() {
    this.props.fetchItems()
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
    if (!Array.isArray(items)) items = [items]

    return (
      <span>
        <h1 className="brand-logo">All Items</h1>
        {items.map(item => (
          <div className="row" key={item.id}>
            <div className="col s12 m7">
              <div className="card">
                <Link to={`/items/${item.id}`}>
                  <div className="card-image">
                    <img src={item.imageURL} />
                  </div>
                  <div className="card-content black-text">
                    <p className="card-title">{item.name}</p>
                    <p>${item.price / 100}</p>
                    <p>Stock:{item.inventory}</p>
                    <p>Description:{item.description}</p>
                  </div>{' '}
                </Link>
                <div
                  onClick={() => {
                    addToCart(this.addOnClick(item))
                  }}
                >
                  <Toast
                    className="btn waves-effect waves-light blue"
                    options={{
                      html: `${item.name} added to cart!`,
                      displayLength: 300
                    }}
                  >
                    Add to Cart
                  </Toast>
                </div>
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
  addToCart: item => dispatch(addCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
