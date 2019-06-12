const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCart = db.define('shoppingCart', {
  orderNumber: {
    type: Sequelize.STRING
  }
})

module.exports = ShoppingCart
