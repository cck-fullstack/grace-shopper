const User = require('./user')
const CartItem = require('./cartItem')
const Item = require('./item')
const ShoppingCart = require('./shoppingCart')
const OrderHistory = require('./orderHistory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

ShoppingCart.belongsTo(User)
CartItem.belongsTo(ShoppingCart)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  CartItem,
  Item,
  ShoppingCart,
  OrderHistory
}
