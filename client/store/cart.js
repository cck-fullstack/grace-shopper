/**
 * ACTION TYPES
 */
const ADD_ITEMS = 'ADD_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = {count: 0, items: []}

/**
 * ACTION CREATORS
 */
export const addCartItem = item => ({type: ADD_ITEMS, item})
export const removeCartItem = index => ({type: REMOVE_ITEM, index})

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
        items[index].quantity += 1
      } else {
        items = [...state.items, action.item]
        items[length].quantity = 1
      }

      return {count: state.count + 1, items: items}
    }
    case REMOVE_ITEM: {
      const items = state.items.filter((ele, idx) => {
        return idx !== action.index
      })
      return {count: state.count - 1, items}
    }
    default:
      return state
  }
}
