import React from 'react'
import { Container, Step, Icon, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../redux/actions/cartActions'
import MySelectInput from '../../components/form/MySelectInput'
import CreditCardInfo from './CreditCardInfo'

const BillingScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) history.push('/shipping')

  const paymentMethodOptions = [
    {
      key: 1,
      text: 'Credit Card',
      value: 'Credit Card',
      icon: { name: 'credit card' },
    },
    {
      key: 2,
      text: 'PayPal',
      value: 'PayPal',
      icon: { name: 'paypal' },
    },
    {
      key: 3,
      text: 'Can we just handshake it out?',
      value: 'Can we just handshake it out?',
      icon: { name: 'handshake outline' },
      disabled: true,
    },
  ]

  return (
    <>
      <Container textAlign='center'>
        <div>
          <Step.Group>
            <Step>
              <Icon name='truck' />
              <Step.Content>
                <Step.Title>Shipping</Step.Title>
                <Step.Description>Enter your shipping address</Step.Description>
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

        <div style={{ width: '30vw', margin: '15vh auto 0 auto' }}>
          <Formik
            initialValues={{ paymentMethod: '' }}
            validationSchema={Yup.object({
              paymentMethod: Yup.string().required(
                'Please choose payment method'
              ),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              try {
                dispatch(savePaymentMethod(values))
                if (values.paymentMethod === 'Credit Card')
                  history.push('/credit-card')
                if (values.paymentMethod === 'PayPal')
                  history.push('/confirm-order')
                setSubmitting(false)
              } catch (error) {
                setErrors({ errors: error.message })
                setSubmitting(false)
              }
            }}
          >
            {({ values, isSubmitting, touched }) => (
              <Form>
                <h2>How would you like to pay?</h2>

                <div
                  style={{
                    textAlign: 'left',
                    width: '15vw',
                    margin: '0 auto',
                  }}
                >
                  <MySelectInput
                    name='paymentMethod'
                    placeholder='Choose payment method'
                    selection
                    fluid
                    options={paymentMethodOptions}
                    className='icon'
                  />
                </div>

                <div style={{ marginTop: '5vh' }}>
                  <Button
                    fluid
                    loading={isSubmitting}
                    type='submit'
                    color='teal'
                    content='Proceed'
                    disabled={isSubmitting || !values.paymentMethod}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  )
}

export default BillingScreen
