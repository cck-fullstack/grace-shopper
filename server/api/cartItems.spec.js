/* eslint-disable no-unused-expressions */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Item, CartItem, ShoppingCart} = require('../db/models')

describe('Cart routes', async () => {
  let user1, user2
  let python, perl
  let cartItem1, cartItem2

  let userSignIn = {
    firstName: 'cody',
    lastName: 'pug',
    email: 'cody@email.com',
    password: '123'
  }

  let userSignIn2 = {
    firstName: 'murphy',
    lastName: 'pug',
    email: 'murphy@email.com',
    password: '123'
  }

  beforeEach(async () => {
    await db.sync({force: true})
    user1 = await User.create(userSignIn)
    user2 = await User.create(userSignIn2)
    ShoppingCart.create({userId: 1})

    python = await Item.create({
      name: 'Python',
      price: 100,
      inventory: 10
    })
    perl = await Item.create({
      name: 'Perl',
      itemId: 2,
      price: 1000,
      inventory: 50
    })

    cartItem1 = await CartItem.create({
      itemId: 1,
      quantity: 1,
      shoppingCartId: 1
    })

    cartItem2 = await CartItem.create({
      itemId: 2,
      quantity: 10,
      shoppingCartId: 1
    })
  })

  xdescribe('GET /api/cartItems/', () => {
    const agent = request.agent(app)
    let res
    beforeEach(async () => {
      res = await agent.get('/api/cartItems').expect(200)
    })

    it('should return cartItems', () => {
      expect(res.body).to.exist
    })

    it('returns cartItems with correct number of items', () => {
      expect(res.body).to.have.lengthOf(2)
    })

    it('returns cartItems with correct Id', () => {
      expect(res.body[0].itemId).to.equal(1)
    })
    it('returns cartItems with correct quantity', () => {
      expect(res.body[0].quantity).to.equal(1)
    })
    it('returns cartItems with correct item name', () => {
      expect(res.body[0].item.name).to.equal('Python')
    })
    it('returns cartItems with correct price', () => {
      expect(res.body[0].item.name).to.equal('Python')
    })
    it('returns cartItems with default image', () => {
      expect(res.body[0].item.imageURL).to.equal(
        'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png'
      )
    })
  })

  xdescribe('GET specific cart id route', () => {
    const agent = request.agent(app)

    it('check if current cart exists', async () => {
      const res = await agent.get('/api/cartItems/1')
      expect(res.body).to.exist
    })
    it('adds new cart', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems/2')
      expect(res.body).to.exist
    })
  })

  xdescribe('PUT route updates corrently', () => {
    const agent = request.agent(app)
    agent.session = {cart: {cartId: 1}}

    it('should create new item for new cart', async () => {
      await agent
        .put('/api/cartItems')
        .send({id: 2, quantity: 5})
        .expect(201)
    })

    it('should correct number of items in new cart', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body).to.have.lengthOf(3)
    })

    it('does not create another instance of similar items', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body).to.have.lengthOf(3)
    })

    it('updates quantity of same items in one cart', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body[1].quantity).to.equal(10)
    })

    it('correct item id of duplicate items', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body[1].itemId).to.equal(2)
    })

    it('correct name of duplicate items', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body[1].item.name).to.equal('Perl')
    })

    it('correct price of duplicate items', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})

      const res = await agent.get('/api/cartItems')
      expect(res.body[1].item.price).to.equal(1000)
    })

    it('adds new item to same current cart', async () => {
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 2, quantity: 5})
      await agent.put('/api/cartItems').send({id: 1, quantity: 3})

      const res = await agent.get('/api/cartItems/2')
      expect(res.body).to.have.lengthOf(2)
    })
  })

  xdescribe('PUT decrements correctly', () => {
    const agent = request.agent(app)
    agent.session = {cart: {cartId: 1}}

    it('adds items and then removes correctly', async () => {
      await agent.put('/api/cartItems').send({id: 1, quantity: 9})
      await agent.put('/api/cartItems/decrement').send({id: 1, quantity: 5})

      const res = await agent.get('/api/cartItems/')
      expect(res.body[2].quantity).to.equal(4)
    })
    it('can chain actions and not lose count', async () => {
      await agent.put('/api/cartItems').send({id: 1, quantity: 9})
      await agent.put('/api/cartItems/decrement').send({id: 1, quantity: 5})
      await agent.put('/api/cartItems').send({id: 1, quantity: 9})
      await agent.put('/api/cartItems/decrement').send({id: 1, quantity: 5})

      const res = await agent.get('/api/cartItems/')
      expect(res.body[2].quantity).to.equal(4)
    })
    it('deletes item if quantity is 0', async () => {
      await agent.put('/api/cartItems').send({id: 1, quantity: 1})
      await agent.put('/api/cartItems/decrement').send({id: 1, quantity: 1})

      const res = await agent.get('/api/cartItems/2')
      expect(res.body).to.have.lengthOf(0)
    })
  })
})
