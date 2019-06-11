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
