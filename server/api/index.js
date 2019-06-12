const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/items', require('./items'))
router.use('/cartItems', require('./cartItems'))
router.use('/orderHistories', require('./orderHistories'))
router.use('/shoppingCarts', require('./shoppingCarts'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
