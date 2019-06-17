const router = require('express').Router()
const User = require('../db/models/user')
const ShoppingCart = require('../db/models/shoppingCart')
const CartItem = require('../db/models/cartItem')
const Item = require('../db/models/item')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: [
        {
          model: ShoppingCart,
          where: {completed: false},
          include: [{model: CartItem, include: [Item]}]
        }
      ]
    })

    req.session.cart.prevCartId = user.shoppingCarts[0].dataValues.id
    // console.log(user.shoppingCarts[0].dataValues.id, 'CARTS')
    // console.log(user, 'LOGIN ROUTE')
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // console.log(req, 'REQ DURING LOGIN')
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
