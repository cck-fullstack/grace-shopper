const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    res.json(
      await User.create({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
      })
    )
  } catch (error) {
    console.error(error)
  }
})
