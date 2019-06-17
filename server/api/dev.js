const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

//DEV ROUTES REMEMBER TO DELETE
router.get('/', (req, res, next) => {
  req.session.destroy()

  console.log(req.session, 'NEW SESSION')

  res.status(204).end()
})

router.get('/status', (req, res, next) => {
  console.log(req.session, 'NEW SESSION')

  res.status(204).end()
})
