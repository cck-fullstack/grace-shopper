const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: ''
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
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Item
