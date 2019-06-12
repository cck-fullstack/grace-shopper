import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEMS = 'ADD_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {count: 0, items: []}

/**
 * ACTION CREATORS
 */
export const addCartItem = item => ({type: ADD_ITEMS, item})
export const removeCartItem = index => ({type: REMOVE_ITEM, index})
export const decrementCartItem = item => ({type: DECREMENT_ITEM, item})
export const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

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
        // items[index].quantity += 1
      } else {
        items = [...state.items, action.item]
        items[length].quantity = 1
      }

      return {count: state.count + 1, items: items}
    }
    case REMOVE_ITEM: {
      let quantity = 0
      const items = state.items.map((ele, idx) => {
        if (idx !== action.index) {
          return ele
        } else {
          quantity = ele.quantity
        }
      })
      return {count: state.count - 1, items}
    }
    case DECREMENT_ITEM: {
      return {
        count: state.count - 1,
        items: state.items.map(item => {
          if (item.id === action.item.id) {
            item.quantity -= 1
          }
        })
      }
    }
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
