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
    return (
      <span className="brand-logo">
        {this.state.orders.length === 0 ? (
          <div>There is no order History</div>
        ) : (
          this.state.orders.map((cart, idx) => {
            return cart.length === 0 ? (
              <div />
            ) : (
              <div key={cart.id}>
                <h2>Cart {idx + 1}</h2>
                {cart.map(item => (
                  <div className="row" key={`${cart.id}-${item.item.id}`}>
                    <div className="col s12 m7">
                      <div className="card">
                        <Link to={`/items/${item.item.id}`}>
                          <div className="card-image">
                            <img src={item.item.imageURL} />
                          </div>
                          <div className="card-content">
                            <p className="card-title">{item.item.name}</p>
                            <p>${item.item.price * 0.01}</p>
                            <p>Stock:{item.quantity}</p>
                            <p>Description:{item.item.description}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })
        )}
      </span>
    )
  }
}

export default OrderHistory
