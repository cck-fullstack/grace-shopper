const router = require('express').Router()
const {OrderHistory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await OrderHistory.findAll())
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //temporary fix to no guest user id
    let user = 99
    if (req.session.passport) user = req.session.passport.user

    const order = {
      cartID: req.session.cart.cartId,
      userID: user
    }
    await OrderHistory.create(order)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
