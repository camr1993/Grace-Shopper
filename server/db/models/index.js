const User = require('./user')
const Cart = require('./cart')
const Item = require('./item')
const PurchasedItem = require('./purchasedItems')

/* ASSOCIATIONS */
User.belongsToMany(Item, {through: Cart})
Item.belongsToMany(User, {through: Cart})
PurchasedItem.belongsTo(User)

module.exports = {
  User,
  Item,
  Cart,
  PurchasedItem,
}
