import React from 'react'
// import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'

const CategoryDropdown = ({ category }) => {
  const categories = ['treats', 'drinks', 'decorations']

  console.log(categories)
  console.log(category)

  // const sortProductsByCategory = () => {}

  return (
    <Dropdown text='Category'>
      <Dropdown.Menu>
        <Dropdown.Header>Categories</Dropdown.Header>
        <Dropdown.Item>Treats</Dropdown.Item>
        <Dropdown.Item>Drinks</Dropdown.Item>
        <Dropdown.Item>Decorations</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoryDropdown
