const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
  cartID: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  }
})
