import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import CartItems from './cart'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('Cart', () => {
  let singleItem
  let cart = {
    items: [
      {
        itemId: 1,
        name: 'Javascript Classes',
        price: 100,
        quantity: 3,
        shoppingCartId: 1
      }
    ]
  }

  beforeEach(() => {
    singleItem = shallow(<CartItems item={cart} />)
  })

  xit('renders the name in an h4', () => {
    expect(singleItem.find('h4').text()).to.be.equal(cart.items[0].name)
  })

  it('renders the quantity in a p', () => {
    expect(singleItem.find('p').text()).to.contain(cart.items[0].quantity)
  })

  xit('renders the quantity in a p', () => {
    expect(singleItem.find('img').prop('src')).to.be.equal(cart.items[0].price)
  })
})
