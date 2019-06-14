/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getItemsThunk,
  deleteItemThunk,
  updateItemCountThunk,
  addItemThunk
} from '../store/items'
import ItemForm from './itemForm'

const defaultState = {
  name: '',
  price: 0.0,
  inventory: 0,
  description: '',
  category: '',
  warningMessage: 'Field is required!',
  showAddForm: false,
  showEditItems: false
}

class AdminPage extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.fetchItems()
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
    const {showAddForm, showEditItems} = this.state
    const {addOneItem, deleteItem, removeOneItem, items} = this.props
    console.log(items, 'PROPS.ITEMS')
    return (
      <span>
        <h1>Admin Page</h1>

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
          <ul>
            {items.map(item => (
              <div key={item.id}>
                <li>
                  {item.name}
                  <button type="button" onClick={() => deleteItem(item.id)}>
                    X
                  </button>
                </li>
                <li>${item.price * 0.01}</li>

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
                    <input
                      name="inventory"
                      type="number"
                      placeholder={item.inventory}
                      style={{width: '3em'}}
                    />
                  </form>
                </li>
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
  return {items: state.items, cart: state.cart}
}

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(getItemsThunk()),
  createItem: item => dispatch(addItemThunk(item)),
  addOneItem: item => dispatch(updateItemCountThunk(item, 1)),
  removeOneItem: item => dispatch(updateItemCountThunk(item, -1)),
  changeItemCount: (item, amt) => dispatch(updateItemCountThunk(item, amt)),

  deleteItem: id => dispatch(deleteItemThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
