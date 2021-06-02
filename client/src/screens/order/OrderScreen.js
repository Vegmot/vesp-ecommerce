import React from 'react'
import { Container } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

const OrderScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  return (
    <>
      {!userData ? (
        <Container>
          <h1>You need to log in</h1>
        </Container>
      ) : (
        <Container>
          <h1>Your orders will be displayed here</h1>
        </Container>
      )}
    </>
  )
}

export default OrderScreen
