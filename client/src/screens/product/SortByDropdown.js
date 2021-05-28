import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const SortByDropdown = ({ sortBy }) => {
  return (
    <Dropdown text='Sort'>
      <Dropdown.Menu>
        <Dropdown.Header>Sort by...</Dropdown.Header>
        <Dropdown.Item>
          <Dropdown text='Rating'>
            <Dropdown.Menu>
              <Dropdown.Item>High to Low</Dropdown.Item>
              <Dropdown.Item>Low to High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>

        <Dropdown.Item>
          <Dropdown text='Reviews'>
            <Dropdown.Menu>
              <Dropdown.Item>More to Less</Dropdown.Item>
              <Dropdown.Item>Less to More</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>

        <Dropdown.Item>
          <Dropdown text='Brand'>
            <Dropdown.Menu>
              <Dropdown.Item>Z to A</Dropdown.Item>
              <Dropdown.Item>A to Z</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>

        <Dropdown.Item>
          <Dropdown text='Price'>
            <Dropdown.Menu>
              <Dropdown.Item>High to Low</Dropdown.Item>
              <Dropdown.Item>Low to High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SortByDropdown
