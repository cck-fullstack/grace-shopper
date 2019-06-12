import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Stripe extends React.Component {
  constructor(props) {
    super(props)
    this.onToken = this.onToken.bind(this)
  }

  onToken(token) {
    console.log('onToken', token)
    fetch('/api/stripe', {
      method: 'POST',
      body: JSON.stringify({stripeToken: token.id})
    }).then(response => {
      console.log(response, 'RESPONSE')
      response.json().then(data => {
        console.log(`We are in business, ${data}`)
      })
    })
  }

  render() {
    return (
      <div>
        <div>Get ready to have your money stolen!</div>

        <StripeCheckout
          token={() => this.onToken}
          stripeKey="pk_test_gRQzdxlhd01cSlBN3AspN8xq00kBwwD21I"
        />
      </div>
    )
  }
}
