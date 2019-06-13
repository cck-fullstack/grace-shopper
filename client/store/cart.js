/* eslint-disable complexity */
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEMS = 'ADD_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */

// const testItems = [
//   {
//     id: 1,
//     name: "Javascript Classes",
//     price: 1234,
//     inventory: 10,
//     description: "Fullstack Academy workshop ripoff",
//     category: "javascript",
//     imageURL: "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png",
//     createdAt: "2019-06-13T19:42:31.172Z",
//     updatedAt: "2019-06-13T19:42:31.172Z",
//     cartItemId: null
//   },
//   {
//     id: 2,
//     name: "Python Classes",
//     price: 5678,
//     inventory: 100,
//     description: "Watch Khan Academy",
//     category: "python",
//     imageURL: "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png",
//     createdAt: "2019-06-13T19:42:31.173Z",
//     updatedAt: "2019-06-13T19:42:31.173Z",
//     cartItemId: null
//   },
//   {
//     id: 3,
//     name: "Typescript Classes",
//     price: 1111,
//     inventory: 2,
//     description: "Elective workshop ripoff",
//     category: "javascript",
//     imageURL: "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555349001/shape/mentalfloss/screen_shot_2016-02-04_at_4.43.43_pm.png",
//     createdAt: "2019-06-13T19:42:31.173Z",
//     updatedAt: "2019-06-13T19:42:31.173Z",
//     cartItemId: null
//   }
// ]

// const defaultCart = { count: 3, items: testItems }

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
    console.log(item, 'BEFORE AXIOS DELETE')
    await axios.put('/api/cartItems/decrement', item)
    dispatch(decrementCartItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const checkOutCartThunk = items => async dispatch => {
  try {
    await axios.all([
      // axios.post('/api/cartItems', items),
      axios.post('/api/orderHistories'),
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
    default:
      return state
  }
}
