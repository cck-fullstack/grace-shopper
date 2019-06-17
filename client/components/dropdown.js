import {Dropdown, Button, Divider} from 'react-materialize'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const categories = [
  'C++',
  'Java',
  'Javascript',
  'Perl',
  'PHP',
  'Python',
  'Ruby'
]

class Categories extends Component {
  componentDidMount() {}

  render() {
    return (
      <Dropdown
        options={{coverTrigger: false}}
        trigger={<Button>Products</Button>}
      >
        <Link to="/items" style={{margin: 0}}>
          All
        </Link>
        <Divider />

        {categories.map(category => {
          return (
            <Link
              to={`/items/category/${category}`}
              key={category}
              style={{margin: 0}}
            >
              {category}
            </Link>
          )
        })}
      </Dropdown>
    )
  }
}
export default Categories
