'use strict'

const db = require('../server/db')
const {Item, CartItem, User, Admin} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'McBoddy',
      email: 'cody@email.com',
      password: '123',
      address: '123 my house'
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

  const admins = await Promise.all([
    Admin.create({
      firstName: 'Admin',
      lastName: 'Bob',
      email: 'admin1@email.com',
      password: '123'
    }),
    Admin.create({
      firstName: 'Sadmin',
      lastName: 'Jef',
      email: 'admin2@email.com',
      password: '123'
    })
  ])

  console.log(`seeded ${admins.length} admins`)

  const items = await Promise.all([
    Item.create({
      name: 'Javascript Classes',
      price: 1234,
      quantity: 10,
      description: 'Fullstack Academy workshop ripoff',
      category: 'javascript',
      imageURL:
        'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png'
    }),
    Item.create({
      name: 'Python Classes',
      price: 5678,
      quantity: 100,
      description: 'Watch Khan Academy',
      category: 'python',
      imageURL:
        'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png'
    }),
    Item.create({
      name: 'Typescript Classes',
      price: 1111,
      quantity: 2,
      description: 'Elective workshop ripoff',
      category: 'javascript',
      imageURL:
        'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png'
    })
  ])

  console.log(`seeded ${items.length} items`)

  const cartItems = await Promise.all([
    CartItem.create({itemID: 1, quantity: 1}),
    CartItem.create({itemID: 2, quantity: 5})
  ])

  console.log(`seeded ${cartItems.length} cart items`)

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
