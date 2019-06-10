import React, {Component} from 'react'
import axios from 'axios'

export default class AllItems extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/items/`)
    this.setState({items: data})
  }

  render() {
    console.log(this.state, 'STATE')
    return (
      <span>
        <h1>All Items</h1>
        {this.state.items.map(item => (
          <div className="items" key={item.id}>
            <img src={item.imageURL} />
            <p>Name:{item.name}</p>
            <p>Price:${item.price * 0.01}</p>
            <p>Quantity:{item.quantity}</p>
          </div>
        ))}
      </span>
    )
  }
}
