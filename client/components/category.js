import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategoryThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {Breadcrumb, Toast} from 'react-materialize'
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
        <PaginationBar />
        <h1 className="brand-logo" id="centered-title">
          {category} Classes
        </h1>
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
                    className="btn blue"
                    options={{
                      html: `${item.name} added to cart!`,
                      displayLength: 400
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
  fetchItems: category => dispatch(getCategoryThunk(category)),
  addToCart: item => dispatch(addCartItemThunk(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)
