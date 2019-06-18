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
          <div className="col s4 m4">
            <div className="card large">
              <Link to={`/items/${items.id}`}>
                <div className="card-image">
                  <div className="image-fade">
                    <img className="product-image" src={items.imageURL} />{' '}
                  </div>
                  <span className="card-title">{items.name}</span>
                </div>
              </Link>
              <div className="card-content" style={{display: 'flex'}}>
                <div className="price-and-stock">
                  <ul>
                    <li>Price: ${items.price / 100} </li>

                    <li>Stock:{items.inventory}</li>
                  </ul>
                </div>
                {/* <Toast
                  options={{
                    html: `${items.name} added to cart!`,
                    displayLength: 300
                  }}
                > */}
                <a
                  className="btn-floating btn-small waves-effect waves-light green"
                  id="add-to-cart"
                  onClick={() => {
                    addToCart(this.addOnClick(items))
                  }}
                >
                  <i className="material-icons">add_shopping_cart</i>
                </a>
                {/* </Toast> */}
                <div className="card-action">
                  <div>{items.description}</div>
                </div>
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
