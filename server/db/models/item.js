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
    validate: {notEmpty: true, min: 0}
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {min: 0}
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png'
  }
})

module.exports = Item
