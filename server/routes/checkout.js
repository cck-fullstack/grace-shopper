const router = require('express').Router()
const {ShoppingCart, CartItem, Item, OrderHistory} = require('../db/models')

const Sequelize = require('sequelize')
module.exports = router
router.post('/updateOrderHistory', async (req, res, next) => {
  try {
    const newOrder = await OrderHistory.create({
      cartId: req.body.cartId, // or does this come from somewhere else?
      userId: req.body.userId
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
router.post('/intializeCart', async (req, res, next) => {
  try {
    res.json(
      await ShoppingCart.create({
        orderNumber: req.body.orderNumber,
        userId: req.body.userId
      })
    )
  } catch (err) {
    next(err)
  }
})
// in progress - this was supposed to manage our inventory (store quantity)
// router.put('/', async (req, res, next) => {
//     try {
//         const cartItems = await CartItem.findAll({      // produces an array of cart items
//             where: {
//                 shoppingCartId: req.body.shoppingCartId
//             }
