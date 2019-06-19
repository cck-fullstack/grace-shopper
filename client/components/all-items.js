import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {Breadcrumb, Toast, Preloader, Pagination} from 'react-materialize'

class AllItems extends Component {
  componentDidMount() {
    this.props.fetchItems()
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
    console.log(items, 'ITEMS')
    return (
      <span>
        <div>
          <Breadcrumb className="teal">
            <a style={{margin: 0}}>Products</a>
          </Breadcrumb>
          <Pagination
            items={10}
            activePage={1}
            maxButtons={Math.ceil(items.length / 10)}
          />{' '}
          <div className="container">
            <div className="row">
              <h1 className="brand-logo" id="centered-title">
                All Items
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
                            alignItems: 'flex-end',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <p
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingLeft: '1.5em'
                              }}
                            >
                              <a>Price: ${item.price / 100} </a>
                              <a>Stock:{item.inventory}</a>
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  paddingRight: '1.5em',
                                  paddingBottom: '3.2em'
                                }}
                                onClick={() => {
                                  addToCart(this.addOnClick(item))
                                }}
                              >
                                <Toast
                                  options={{
                                    html: `${item.name} added to cart!`
                                  }}
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
