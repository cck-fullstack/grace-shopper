const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: true}
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: true}
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {min: 0}
  }
})

module.exports = CartItem
