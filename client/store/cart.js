/* eslint-disable max-statements */
/* eslint-disable complexity */
import axios from 'axios'
import _ from 'lodash'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEMS = 'ADD_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const CLEAR_CART = 'CLEAR_CART'

const GET_USER = 'GET_USER'

/**
 * INITIAL STATE
 */

const defaultCart = {count: 0, items: []}

/**
 * ACTION CREATORS
 */
export const getCartItems = () => ({type: GET_ITEMS})
export const addCartItem = item => ({type: ADD_ITEMS, item})
export const removeCartItem = index => ({type: REMOVE_ITEM, index})
export const decrementCartItem = item => ({type: DECREMENT_ITEM, item})
export const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

// NOT SURE IF NEEDED
// export const getCartItemsThunk = cartId => async dispatch => {
//   try {
//     await axios.get(`/api/cartItems/${cartId}`)
//     dispatch(getCartItems())
//   } catch (error) {
//     console.error(error)
//   }
// }

export const addCartItemThunk = item => async dispatch => {
  try {
    await axios.put('/api/cartItems', item)
    dispatch(addCartItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const decrementCartItemThunk = item => async dispatch => {
  try {
    await axios.put('/api/cartItems/decrement', item)
    dispatch(decrementCartItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const checkOutCartThunk = () => async dispatch => {
  try {
    await axios.all([
      axios.post('/api/orderHistories'),
      axios.put('/api/shoppingCarts'),
      axios.post('/api/shoppingCarts')
    ])

    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEMS: {
      let search = false
      let index = 0
      let length = state.items.length

      //search for item by id
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.item.id) {
          search = true
          index = i
          break
        }
      }

      //check if item exists and sets quantity to one if it doesnt
      let items = []
      if (search) {
        items = [...state.items]
      } else {
        items = [...state.items, action.item]
        items[length].quantity = 1
      }

      return {count: state.count + 1, items: items}
    }
    case REMOVE_ITEM: {
      let quantity = 0
      const items = state.items.filter((item, idx) => {
        if (idx === action.index) {
          quantity = item.quantity
        }
        return idx !== action.index
      })

      return {count: state.count - quantity, items}
    }
    case DECREMENT_ITEM: {
      return {
        count: state.count - 1,
        items: state.items.map(item => {
          if (item.id === action.item.id) {
            item.quantity -= 1
          }
          return item
        })
      }
    }
    case CLEAR_CART:
      return defaultCart

    //Merges old active carts on login
    case GET_USER: {
      let count = state.count
      let cart = action.user.shoppingCarts
      // console.log(cart, 'CART')
      if (cart === undefined) {
        // console.log(state, 'WHEN CART IS UNDEFINED')
        return state
      }

      let mergedCart = []
      // console.log(action, 'GETTING USER?')

      if (cart) {
        // console.log(cart[0].cartItems, 'DOES THIS EXIST?')
        let oldCartItems = cart[0].cartItems
        // console.log(count, items, 'count, items')
        // console.log(oldCartItems, 'OLDCARTITEMS', oldCartItems[0].itemId)
        for (let i = 0; i < oldCartItems.length; i++) {
          let cartItem = _.find(state.items, {id: oldCartItems[i].itemId})
          // console.log(cartItem, 'CART ITEM')
          count += oldCartItems[i].quantity

          if (cartItem) {
            cartItem.quantity += oldCartItems[i].quantity
          } else {
            let name = oldCartItems[i].item.name
            let price = oldCartItems[i].item.price

            oldCartItems[i].name = name
            oldCartItems[i].price = price

            mergedCart.push(oldCartItems[i])
          }
        }
        // console.log(count, mergedCart, 'AFTER FOR LOOP')
      }
      return {count, items: [...state.items, ...mergedCart]}
    }

    default:
      return state
  }
}
