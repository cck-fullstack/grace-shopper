import axios from 'axios'
import _ from 'lodash'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEMS = 'ADD_ITEMS'
const CREATE_ITEM = 'CREATE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
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
const deleteItem = id => ({type: DELETE_ITEM, id})
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

export const getCategoryThunk = category => async dispatch => {
  try {
    console.log(category, ' INTHUNK')
    const {data} = await axios.get(`/api/items/category/${category}`)
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

export const deleteItemThunk = id => async dispatch => {
  try {
    await axios.delete(`api/items/${id}`)
    dispatch(deleteItem(id))
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
      if (!Array.isArray(action.items)) return [action.items]
      return action.items
    }

    case ADD_ITEMS: {
      const items = state.map(item => {
        if (item.id === action.item.id) item.inventory = action.item.inventory
        return item
      })
      return items
    }
    case CREATE_ITEM:
      return [...state, action.item]
    case DELETE_ITEM: {
      let items = state
      _.remove(items, item => item.id === action.id)
      return [...items]
    }
    default:
      return state
  }
}
