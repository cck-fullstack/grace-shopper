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
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    let thisUser = await User.findByPk(req.params.userId)
    if (thisUser) {
      let updatedUser = await User.update(req.body, {
        where: {id: req.params.userId},
        returning: true,
        plain: true
      })
      res.json(updatedUser[1])
    }
  } catch (error) {
    next(error)
  }
})
