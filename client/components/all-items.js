import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {Breadcrumb, Toast} from 'react-materialize'
import PaginationBar from './pagination'

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
        <div>
          <Breadcrumb className="teal">
            <a style={{margin: 0}}>Products</a>
          </Breadcrumb>
          <PaginationBar />
          <div className="container">
            <div className="row">
              <h1 className="brand-logo" id="centered-title">
                All Items
              </h1>
              {items.map(item => (
                <div key={item.id} className="col s4 m4">
                  <div className="card small">
                    <Link to={`/items/${item.id}`}>
                      <div className="card-image">
                        <div className="image-fade">
                          <img className="product-image" src={item.imageURL} />{' '}
                        </div>
                        <span className="card-title">{item.name}</span>
                      </div>
                    </Link>
                    <div className="card-content" style={{display: 'flex'}}>
                      <div className="price-and-stock">
                        <ul>
                          <li>Price: ${item.price / 100} </li>

                          <li>Stock:{item.inventory}</li>
                        </ul>
                      </div>

                      <div
                        onClick={() => {
                          addToCart(this.addOnClick(item))
                        }}
                      >
                        {/* <Toast
                          className="toast-button"
                          options={{
                            html: `${item.name} added to cart!`,
                            displayLength: 300
                          }}
                        > */}
                        <a
                          className="btn-floating btn-small waves-effect waves-light green"
                          id="add-to-cart"
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </a>
                        {/* </Toast> */}
                      </div>
                      <div className="card-action" />
                    </div>
                  </div>
                </div>
              ))}{' '}
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
  fetchItems: () => dispatch(getItemsThunk()),
  addToCart: item => dispatch(addCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
