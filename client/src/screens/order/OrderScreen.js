import React from 'react'
import { Container, Step, Icon } from 'semantic-ui-react'
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
        <Container textAlign='center'>
          <div>
            <Step.Group>
              <Step>
                <Icon name='truck' />
                <Step.Content>
                  <Step.Title>Shipping</Step.Title>
                  <Step.Description>
                    Choose your shipping options
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name='payment' />
                <Step.Content>
                  <Step.Title>Billing</Step.Title>
                  <Step.Description>Enter billing information</Step.Description>
                </Step.Content>
              </Step>

              <Step active>
                <Icon name='info' />
                <Step.Content>
                  <Step.Title>Confirm Order</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>

          <div></div>
        </Container>
      )}
    </>
  )
}

export default OrderScreen
