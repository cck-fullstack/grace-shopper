import axios from 'axios'
import history from '../history'
import _ from 'lodash'

/**
 * ACTION TYPES
 */
const ADD_USER = 'ADD_USER'
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const addUser = user => ({type: ADD_USER, user})
const getUser = user => ({type: GET_USER, user})
const updateUser = updatedUser => ({type: UPDATE_USER, updatedUser})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})

/**
 * THUNK CREATORS
 */
export const addUserThunk = user => async dispatch => {
  try {
    const {data} = await axios.post('/user', user)
    dispatch(addUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateUserThunk = (userId, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/user/${userId}`, user)
    dispatch(updateUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    console.log('ME')
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const getUserThunk = userId => async dispatch => {
  try {
    console.log('GETUSERTHUNK')

    const {data} = await axios.get(`/users/${userId}`)
    dispatch(getUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    console.log('AUTH', method)

    res = await axios.post(`/auth/${method}`, {email, password})

    if (res.data.shoppingCarts) {
      await axios.put('/shoppingCarts/merge')
    }

    //Need to finish shopping cart merge and delete current cart

    console.log(res.data, 'RES.DATA')
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//fetch all for admin page
export const getAllUsersThunk = () => async dispatch => {
  try {
    const users = await axios.get('/api/users/all')
    dispatch(getAllUsers(users))
  } catch (err) {
    console.error(err)
  }
}

//admin page remove user from db
export const deleteUserThunk = id => async dispatch => {
  try {
    await axios.delete(`api/users/${id}`)
    dispatch(deleteUser(id))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */

export default function(state = defaultUser, action) {
  console.log(action, 'LOGIN?')
  switch (action.type) {
    case ADD_USER:
      return action.user
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.updatedUser
    case GET_ALL_USERS:
      return {...state, usersData: action.users}
    case DELETE_USER: {
      const users = state
      _.remove(users.usersData.data, user => user.id === action.id)
      return {...users, usersData: {data: [...users.usersData.data]}}
    }
    default:
      return state
  }
}
