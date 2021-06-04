import React from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../components/modals/modalReducer'

const CartOverview = ({ history, cartItems }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  const cartHasAlcohol = cartItems.find(
    cartItem => cartItem.isOnlyForAdults === true
  )

  const checkoutHandler = () => {
    if (!userData) dispatch(openModal({ modalType: 'LoginForm' }))
    history.push('/shipping')
  }

  return (
    <>
      <Card>
        <Card.Content header='Overview' />

        <Card.Content>
          <h5>{cartItems.length} item(s)</h5>
        </Card.Content>

        <Card.Content>
          <h5>
            Total: $
            {cartItems
              .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
              .toFixed(2)}
          </h5>
        </Card.Content>

        {cartHasAlcohol && (
          <Card.Content>
            <h5 style={{ color: 'red' }}>
              <span>
                <Icon name='exclamation circle' />
              </span>
              Note: Alcoholic drink in your cart
            </h5>
          </Card.Content>
        )}

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
