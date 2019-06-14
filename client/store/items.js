import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEMS = 'ADD_ITEMS'
const CREATE_ITEM = 'CREATE_ITEM'

/**
 * INITIAL STATE
 */
const defaultItems = []

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})
const addItem = item => ({type: ADD_ITEMS, item})
const addItemInventory = item => ({type: CREATE_ITEM, item})

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

export const addItemThunk = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/items/add', item)
    dispatch(addItemInventory(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateItemCountThunk = (item, change = 1) => async dispatch => {
  try {
    const {data} = await axios.put('/api/items/', {item, change})
    dispatch(addItem(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultItems, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items

    case ADD_ITEMS: {
      const items = state.map(item => {
        if (item.id === action.item.id) item.inventory = action.item.inventory
        return item
      })
      return items
    }
    case CREATE_ITEM:
      return [...state, action.item]
    default:
      return state
  }
}
