import React, { useState } from 'react'
import { Button, Card, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../components/modals/modalReducer'

const CartOverview = () => {
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  const maxQtyPerOrder = 10
  const qtyOptions = []

  const checkoutHandler = () => {
    if (!userData) dispatch(openModal({ modalType: 'LoginForm' }))
    console.log('Go to checkout')
  }

  return (
    <>
      <Card>
        <Card.Content header='Overview' />

        <Card.Content>
          <h5>To be continued</h5>
        </Card.Content>

        <Card.Content>
          <h5>To be continued</h5>
        </Card.Content>

        <Card.Content>To be continued</Card.Content>

        <Card.Content extra>
          <Button
            content='Proceed to Checkout'
            fluid
            color='teal'
            onClick={checkoutHandler}
          />
        </Card.Content>
      </Card>
    </>
  )
}

export default CartOverview
