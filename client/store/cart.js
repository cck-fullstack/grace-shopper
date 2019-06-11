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
  console.log(action, 'ACTION')
  switch (action.type) {
    case ADD_ITEMS:
      return {count: state.count + 1, items: [...state.items, action.item]}
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
