const router = require('express').Router()
const {ShoppingCart, CartItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await ShoppingCart.findAll())
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newCart = {}
    if (req.session.passport !== undefined) {
      newCart.userId = req.session.passport.user
    }

    const newShoppingCart = await ShoppingCart.create(newCart)
    req.session.cart.cartId = newShoppingCart.dataValues.id
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await ShoppingCart.update(
      {completed: true},
      {where: {id: req.session.cart.cartId}}
    )

    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

router.put('/merge', async (req, res, next) => {
  try {
    const cart = await CartItem.findAll({
      where: {shoppingCartId: req.session.cart.prevCartId}
    })

    // console.log(cart, 'MERGECART')

    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})
