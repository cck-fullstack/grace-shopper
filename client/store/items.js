import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEMS = 'ADD_ITEMS'

/**
 * INITIAL STATE
 */
const defaultItems = []

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})

/**
 * THUNK CREATORS
 */
export const getItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/items')
    dispatch(getItems(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultItems, action) {
  console.log(state, 'state')
  switch (action.type) {
    case GET_ITEMS: {
      console.log('IS THIS RUNNING???', action)
      return action.items
    }
    default:
      return state
  }
}
