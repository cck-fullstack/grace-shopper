import M from 'materialize-css'
import {Dropdown, Button, Divider, Icon} from 'react-materialize'

import React, {Component} from 'react'

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
        <a href="/items" style={{margin: 0}}>
          All
        </a>
        <Divider />

        {categories.map(category => {
          return (
            <a
              href={`/items/category/${category}`}
              style={{margin: 0}}
              key={category}
            >
              {category}
            </a>
          )
        })}
      </Dropdown>
    )
  }
}
export default Categories
