import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { logout } from '../../../redux/actions/userActions'

const SignedInMenu = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  const logOutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Menu.Item position='right' style={{ borderRight: '1px solid #eeeddd' }}>
        <Image avatar src={userData.avatar || '/assets/user.png'} />
        <Dropdown pointing='top left' text={userData.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to='/profile'
              text='My profile'
              icon='user'
            />

            <Dropdown.Item as={Link} to='cart' text='My cart' icon='cart' />

            <Dropdown.Item
              as={Link}
              to='/orders'
              text='My orders'
              icon='truck'
            />

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={logOutHandler}
              text='Sign out'
              icon='power'
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  )
}

export default SignedInMenu
