import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleItemThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Breadcrumb, Toast} from 'react-materialize'
import {Link} from 'react-router-dom'

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
    items = items[0]
    if (!items) items = []

    return (
      <span>
        <Breadcrumb className="teal">
          <Link to="/items" style={{margin: 0}}>
            Products
          </Link>
          <Link to={`/items/category/${items.category}`} style={{margin: 0}}>
            {items.category}
          </Link>
          <a style={{margin: 0}}>{items.name}</a>
        </Breadcrumb>
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
              <div
                onClick={() => {
                  addToCart(this.addOnClick(items))
                }}
              >
                <Toast
                  className="btn waves-effect waves-light blue"
                  options={{
                    html: `${items.name} added to cart!`,
                    displayLength: 300
                  }}
                >
                  Add to Cart
                </Toast>
              </div>
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
