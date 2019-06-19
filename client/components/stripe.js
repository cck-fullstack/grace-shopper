import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export default class Stripe extends React.Component {
  constructor(props) {
    super(props)
    this.handleToken = this.handleToken.bind(this)
  }

  async handleToken(token) {
    const response = await axios.post('/api/stripe', {token})
    const {success} = response.data
    if (success) {
      this.props.stripeComplete(success)
    } else {
      console.log('Something went wrong', {type: 'error'})
    }
  }
  render() {
    return (
      <div className="container">
        <div className="product">
          <h3>Steal your Money</h3>
        </div>
        <StripeCheckout
          stripeKey="pk_test_gRQzdxlhd01cSlBN3AspN8xq00kBwwD21I"
          token={this.handleToken}
        />
      </div>
    )
  }
}
