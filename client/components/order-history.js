import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const defaultState = {
  orders: []
}

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  async componentDidMount() {
    // this.props.fetchOrderHistory()
    const {data} = await axios.get('/api/OrderHistories')
    this.setState({orders: data})
  }

  render() {
    let totalPrice = 0
    return (
      <span className="brand-logo">
        {' '}
        <div className="container">
          {this.state.orders.length === 0 ? (
            <div>There is no order History</div>
          ) : (
            this.state.orders.map((cart, idx) => {
              totalPrice = 0
              return cart.length === 0 ? (
                <div />
              ) : (
                <div key={cart.id}>
                  <h2 id="centered-title">Cart {idx + 1}</h2>
                  <div className="row">
                    <ul className="collection">
                      {cart.map(item => {
                        totalPrice += item.item.price * item.quantity
                        return (
                          <div key={`${cart.id}-${item.item.id}`}>
                            <div>
                              <div className="col s4 m4">
                                <div className="card small">
                                  <Link to={`/items/${item.item.id}`}>
                                    <div className="card-image">
                                      <div className="image-fade">
                                        <img
                                          height="250px"
                                          className="product-image"
                                          src={item.item.imageURL}
                                        />{' '}
                                      </div>
                                      <span className="card-title">
                                        {item.item.name}
                                      </span>
                                    </div>
                                  </Link>{' '}
                                  <p> Quantity: {item.quantity}</p>{' '}
                                  <p> Price: ${item.item.price / 100}</p>{' '}
                                  <p> {item.item.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="speech-bubble">
                    <h4 className="cart-total">
                      Total Price: ${totalPrice / 100}
                    </h4>
                  </div>
                </div>
              )
            })
          )}
        </div>{' '}
      </span>
    )
  }
}

export default OrderHistory
