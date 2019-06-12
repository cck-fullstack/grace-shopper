const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: true}
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT,
    validate: {notEmpty: true}
  },
  category: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING,
    validate: {notEmpty: true}
  }
})

module.exports = Item
