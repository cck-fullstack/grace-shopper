/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getItemsThunk,
  deleteItemThunk,
  updateItemCountThunk,
  addItemThunk
} from '../store/items'
import {getAllUsersThunk, deleteUserThunk} from '../store/user'
import ItemForm from './itemForm'

const defaultState = {
  name: '',
  price: 0.0,
  inventory: 0,
  description: '',
  category: '',
  warningMessage: 'Field is required!',
  showAddForm: false,
  showEditItems: false,
  showEditUsersForm: false
}

class AdminPage extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.fetchItems()
    this.props.fetchUsers()
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const newItem = {
      name: this.state.name,
      price: this.state.price,
      inventory: this.state.inventory,
      description: this.state.description,
      category: this.state.category
    }
    this.props.createItem(newItem)
    this.setState(defaultState)
  }

  changeAmount = (event, item) => {
    event.preventDefault()
    this.props.changeItemCount(item, event.path[0][0].valueAsNumber)
  }

  render() {
    const {showAddForm, showEditItems, showEditUsersForm} = this.state
    const {
      addOneItem,
      deleteItem,
      deleteUser,
      removeOneItem,
      items,
      users
    } = this.props
    return (
      <span>
        <h3>Admin Panel</h3>

        <button
          type="button"
          onClick={() => this.setState({showAddForm: !showAddForm})}
        >
          Add Item Form
        </button>
        {showAddForm ? (
          <ItemForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={() => this.setState({showEditItems: !showEditItems})}
        >
          Edit Item Quantity
        </button>
        {showEditItems ? (
          <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {items.map(item => (
              <div key={item.id}>
                <li>
                  <li>
                    {item.name}
                    <button type="button" onClick={() => deleteItem(item.id)}>
                      X
                    </button>
                  </li>
                  <li>Price: ${item.price / 100}</li>

                  <li>
                    <button type="button" onClick={() => removeOneItem(item)}>
                      -
                    </button>
                    Stock:{item.inventory}
                    <button type="button" onClick={() => addOneItem(item)}>
                      +
                    </button>
                  </li>
                  <li>
                    Change Amount:<form
                      onSubmit={() => this.changeAmount(event, item)}
                    >
                      <li className="collection-item">
                        <input
                          name="inventory"
                          type="number"
                          placeholder={item.inventory}
                          style={{width: '3em'}}
                        />
                      </li>
                    </form>
                  </li>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={() => this.setState({showEditUsersForm: !showEditUsersForm})}
        >
          Show Edit User Form{' '}
        </button>
        {showEditUsersForm ? (
          <ul>
            {users.data.map(user => (
              <div key={user.id}>
                <li>
                  {user.firstName} {user.lastName}
                  <button type="button" onClick={() => deleteUser(user.id)}>
                    X
                  </button>
                </li>

                {/* <li>Admin</li>

                <Select size='s'>
                  <option value="">Choose your option</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select> */}
              </div>
            ))}
          </ul>
        ) : (
          <div />
        )}
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    cart: state.cart,
    users: state.user.usersData
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(getItemsThunk()),
  createItem: item => dispatch(addItemThunk(item)),
  addOneItem: item => dispatch(updateItemCountThunk(item, 1)),
  removeOneItem: item => dispatch(updateItemCountThunk(item, -1)),
  changeItemCount: (item, amt) => dispatch(updateItemCountThunk(item, amt)),
  deleteItem: id => dispatch(deleteItemThunk(id)),

  fetchUsers: () => dispatch(getAllUsersThunk()),
  deleteUser: id => dispatch(deleteUserThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
