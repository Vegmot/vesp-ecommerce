import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon, Container } from 'semantic-ui-react'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('shopping cart')

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  const spaceBelowNavbarStyle = {
    marginBottom: '10vh',
  }

  const handleClickItem = (e, { name }) => {
    setActiveItem(name)
  }

  return (
    <>
      <Menu icon='labeled' fixed='top'>
        <Container>
          <Menu.Item
            as={Link}
            to='/'
            name='shopping cart'
            active={activeItem === 'shopping cart'}
            onClick={handleClickItem}
          >
            <Icon name='shopping cart' />
            Products
          </Menu.Item>

          <Menu.Item
            name='premium'
            active={activeItem === 'premium'}
            onClick={handleClickItem}
            as={Link}
            to='/premium'
          >
            <Icon name='star' />
            Premium
          </Menu.Item>

          {userData ? <SignedInMenu /> : <SignedOutMenu />}
        </Container>
      </Menu>

      <div className='space-below-navbar' style={spaceBelowNavbarStyle}></div>
    </>
  )
}

export default Navbar
