'use strict'

const db = require('../server/db')
const {Item, CartItem, User, OrderHistory} = require('../server/db/models')
const {seedClasses} = require('./seedplus')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'McBoddy',
      email: 'cody@email.com',
      password: '123',
      address: '123 my house',
      isAdmin: true
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'McGirfy',
      email: 'murphy@email.com',
      password: '123',
      address: '234 your house'
    })
  ])

  console.log(`seeded ${users.length} users`)

  const items = await Promise.all([
    Item.create({
      name: 'Javascript Classes',
      price: 1234,
      inventory: 10,
      description: 'Fullstack Academy workshop ripoff',
      category: 'Javascript',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
    }),
    Item.create({
      name: 'Python Classes',
      price: 5678,
      inventory: 100,
      description: 'Watch Khan Academy',
      category: 'Python',
      imageURL: 'https://tinyurl.com/y5udnla3'
    }),
    Item.create({
      name: 'Typescript Classes',
      price: 1111,
      inventory: 2,
      description: 'Elective workshop ripoff',
      category: 'Javascript',
      imageURL:
        'https://cdn-images-1.medium.com/max/1200/1*JsyV8lXMuTbRVLQ2FPYWAg.png'
    })
  ])

  console.log(`seeded ${items.length} items`)

  // Seeds larger file
  const allClasses = await Promise.all(
    seedClasses.map(item => {
      Item.create(item)
    })
  )

  console.log(`seeded ${allClasses.length} new items`)

  const cartItems = await Promise.all([
    CartItem.create({itemId: 1, quantity: 1}),
    CartItem.create({itemId: 2, quantity: 5})
  ])

  console.log(`seeded ${cartItems.length} cart items`)

  const orderHistory = await Promise.all([
    OrderHistory.create({cartId: 1, userId: 1}),
    OrderHistory.create({cartId: 1, userId: 1})
  ])

  console.log(`seeded ${orderHistory.length} order histories`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
