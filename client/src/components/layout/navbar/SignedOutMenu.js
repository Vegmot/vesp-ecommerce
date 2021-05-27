import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import { openModal } from '../../modals/modalReducer'

const SignedOutMenu = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Menu.Item
        position='right'
        onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
        style={{ borderRight: '1px solid #eeeddd' }}
      >
        <Icon name='user circle' />
        Sign in
      </Menu.Item>
    </>
  )
}

export default SignedOutMenu
