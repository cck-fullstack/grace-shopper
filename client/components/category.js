import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategoryThunk} from '../store/items'
import {addCartItemThunk} from '../store/cart'
import _ from 'lodash'
import {Link} from 'react-router-dom'

class Category extends Component {
  componentDidMount() {
    let category = this.props.match.params.category

    this.props.fetchItems(category)
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
        <h1 className="brand-logo">
          {this.props.match.params.category} Classes
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
                    <p>${item.price * 0.01}</p>
                    <p>Stock:{item.inventory}</p>
                    <p>Description:{item.description}</p>
                  </div>{' '}
                </Link>
                <button
                  type="button"
                  className="btn waves-effect waves-light blue"
                  onClick={() => addToCart(this.addOnClick(item))}
                >
                  Add To Cart
                </button>{' '}
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
