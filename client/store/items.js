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

export const getSingleItemThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items/${id}`)
    dispatch(getItems(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultItems, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return action.items
    }
    default:
      return state
  }
}
