const router = require('express').Router()
const {CartItem, Item, OrderHistory, ShoppingCart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let id = req.session.passport.user
    const orders = await ShoppingCart.findAll({
      where: {userId: id}
    }).then(carts => {
      return Promise.all(
        carts.map(cart =>
          CartItem.findAll({
            where: {shoppingCartId: cart.id},
            include: [Item]
          })
        )
      )
    })
    res.json(orders)
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
      cartId: req.session.cart.cartId,
      userId: user
    }
    await OrderHistory.create(order)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
