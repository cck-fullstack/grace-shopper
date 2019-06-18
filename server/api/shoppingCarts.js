const router = require('express').Router()
const {ShoppingCart, CartItem} = require('../db/models')
const _ = require('lodash')
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
      where: {shoppingCartId: req.session.cart.cartId}
    })
    const oldCartItems = req.body.shoppingCarts[0].cartItems

    oldCartItems.forEach(async cartItem => {
      console.log(cartItem, 'CI')

      //finds if old cart items matches any of the new cart items
      let match = _.find(cart, {itemId: cartItem.itemId})

      //if there is a match add new cart quantity to old cart item quantity
      if (match !== undefined) {
        let newQuantity = cartItem.quantity + match.quantity
        await CartItem.update(
          {
            quantity: newQuantity
          },
          {
            where: {
              itemId: cartItem.itemId,
              shoppingCartId: req.session.cart.prevCartId
            }
          }
        )

        //deletes new cart items after they are merged
        await match.destroy()
        _.remove(cart, {itemId: cartItem.itemId})
      }
      return cartItem
    })

    //update items in current cart to old cart if it exists
    cart.forEach(async cartItem => {
      await cartItem.update({shoppingCartId: req.session.cart.prevCartId})
    })

    //sets session cart id
    req.session.cart.cartId = req.session.cart.prevCartId
    delete req.session.cart.prevCartId

    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})
