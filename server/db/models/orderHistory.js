const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
  cartId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: true}
  }
})

module.exports = OrderHistory
