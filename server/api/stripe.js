const router = require('express').Router()
const stripe = require('stripe')('sk_test_eyrzNBv0OK1iVwp9eWJ7pjmh006Wwi4N4S')
module.exports = router

router.get('/', function(req, res, next) {
  /* etc */
  console.log('Hello?')
})

router.post('/', async (req, res, next) => {
  const stripeToken = req.body.token
  const amount = 1000
  const charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: 'tok_visa'
  })

  if (!charge) {
    res.send({success: false, message: 'Error'})
  } else {
    res.send({success: true, message: 'Success'})
  }
})
