import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Navbar = ({items}) => {
  return (
    <div>
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
    </div>
  )
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  items: PropTypes.array.isRequired
}
