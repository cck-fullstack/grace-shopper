const router = require('express').Router()
const stripe = require('stripe')('sk_test_eyrzNBv0OK1iVwp9eWJ7pjmh006Wwi4N4S')
module.exports = router

router.get('/', function(req, res, next) {
  /* etc */
  console.log('Hello?')
})

router.post('/', function(req, res, next) {
  /* etc */
  const stripeToken = req.body.stripeToken
  const amount = 1000
  console.log(stripeToken, 'POST ROUTE')
  stripe.charges
    .create(
      {
        amount: amount,
        currency: 'usd',
        source: stripeToken
      },
      {
        stripe_account: 'acct_1Ei2gwFLlDpxJp8h'
      }
    )
    .then(function(err, charge) {
      // asynchronously called
      console.log(charge, 'CHARGE')
      if (err) {
        res.send({success: false, message: 'Error'})
      } else {
        res.send({success: true, message: 'Success'})
      }
    })
})
