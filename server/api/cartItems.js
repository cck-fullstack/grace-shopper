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

//For multiple items
router.post('/', async (req, res, next) => {
  try {
    //Convert items to model format
    const cartItems = req.body.map(item => {
      return {
        itemID: item.id,
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
    console.log(req.session, 'SESSION')
    console.log(req.body)

    const newCart = {
      itemID: req.body.id,
      shoppingCartId: +req.session.cart.cartId
    }
    // quantity : req.body.quantity
    const cart = await CartItem.findOne({where: newCart})
    console.log(cart)
    if (cart) {
      await cart.update({quantity: req.body.quantity})
    } else {
      newCart.quantity = req.body.quantity
      await CartItem.create(newCart)
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
