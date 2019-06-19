import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategoryThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {
  Breadcrumb,
  Toast,
  Preloader,
  Pagination,
  PaginationButton
} from 'react-materialize'
import PaginationBar from './pagination'

class Category extends Component {
  componentDidMount() {
    let category = this.props.match.params.category

    this.props.fetchItems(category)
  }

  componentWillUnmount() {
    localStorage.setItem('cart', JSON.stringify(this.props.cart))
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
    const category = this.props.match.params.category

    return (
      <span>
        <Breadcrumb className="teal">
          <Link to="/items" style={{margin: 0}}>
            Products
          </Link>
          <a style={{margin: 0}}>{category}</a>
        </Breadcrumb>
        <Pagination
          items={10}
          activePage={1}
          maxButtons={Math.ceil(items.length / 10)}
        />
        <div className="container">
          <div className="row">
            <h1 className="brand-logo" id="centered-title">
              {category} Classes
            </h1>
            {items.length > 0 ? (
              <div>
                {items.map(item => (
                  <div key={item.id} className="col s4 m4">
                    <div className="card small">
                      <Link to={`/items/${item.id}`}>
                        <div className="card-image">
                          <div className="image-fade">
                            <img
                              height="250px"
                              className="product-image"
                              src={item.imageURL}
                            />{' '}
                          </div>
                          <span className="card-title">{item.name}</span>
                        </div>
                      </Link>
                      <div
                        style={{
                          display: 'flex',
                          'align-items': 'flex-end',
                          'justify-content': 'space-between'
                        }}
                      >
                        <div>
                          <a
                            style={{
                              display: 'flex',
                              'flex-direction': 'column',
                              'padding-left': '1.5em'
                            }}
                          >
                            <a>Price: ${item.price / 100} </a>
                            <a>Stock:{item.inventory}</a>
                          </a>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            'justify-content': 'flex-end'
                          }}
                        >
                          <div>
                            <div
                              style={{
                                'padding-right': '1.5em',
                                'padding-bottom': '2em'
                              }}
                              onClick={() => {
                                addToCart(this.addOnClick(item))
                              }}
                            >
                              <Toast
                                options={{html: `${item.name} added to cart!`}}
                              >
                                <i className="material-icons">
                                  add_shopping_cart
                                </i>
                              </Toast>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{display: 'flex', justifyContent: 'center '}}>
                <Preloader size="big" />
              </div>
            )}
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
  fetchItems: category => dispatch(getCategoryThunk(category)),
  addToCart: item => dispatch(addCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)
