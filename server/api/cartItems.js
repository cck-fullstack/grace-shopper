const router = require('express').Router()
const {CartItem, Item} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await CartItem.findAll({include: Item}))
  } catch (err) {
    next(err)
  }
})

//For multiple items (Not Used atm)
router.post('/', async (req, res, next) => {
  try {
    //Convert items to model format
    const cartItems = req.body.map(item => {
      return {
        itemId: item.id,
        quantity: item.quantity,
        shoppingCartId: req.session.cart.cartId
      }
    })

    await cartItems.map(item => {
      CartItem.create(item)
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
    console.log('IT DIDNT WORK')
  }
})

//Regular add cart (For persistence)
router.put('/', async (req, res, next) => {
  try {
    const newCart = {
      itemId: req.body.id,
      shoppingCartId: req.session.cart.cartId
    }
    const cart = await CartItem.findOne({where: newCart})
    if (cart) {
      await cart.update({quantity: req.body.quantity})
      res.sendStatus(204)
    } else {
      newCart.quantity = req.body.quantity
      await CartItem.create(newCart)
      res.sendStatus(201)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/decrement', async (req, res, next) => {
  try {
    const newCart = {
      itemId: req.body.id,
      shoppingCartId: req.session.cart.cartId
    }

    const cart = await CartItem.findOne({where: newCart})
    if (cart.quantity > 1) {
      await cart.update({quantity: req.body.quantity - 1})
      res.sendStatus(201)
    } else {
      await cart.destroy(cart)
      res.sendStatus(200)
    }
  } catch (err) {
    next(err)
  }
})
