import React from 'react'
import { Container, Step, Icon } from 'semantic-ui-react'

const BillingScreen = () => {
  return (
    <>
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

            <Step active>
              <Icon name='payment' />
              <Step.Content>
                <Step.Title>Billing</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>

            <Step>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </div>

        <div></div>
      </Container>
    </>
  )
}

export default BillingScreen
