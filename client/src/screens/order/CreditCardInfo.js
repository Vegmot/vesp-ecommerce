import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Step, Container, Grid, Divider } from 'semantic-ui-react'
import MyTextInput from '../../components/form/MyTextInput'
import MySelectInput from '../../components/form/MySelectInput'
import { saveCreditCardInfo } from '../../redux/actions/cartActions'

const CreditCardInfo = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { creditCardInfo } = cart

  const initialValues = {
    cardNumber1: creditCardInfo.cardNumber1,
    cardNumber2: creditCardInfo.cardNumber2,
    cardNumber3: creditCardInfo.cardNumber3,
    cardNumber4: creditCardInfo.cardNumber4,
    cardExpMonth: creditCardInfo.cardExpMonth,
    cardExpYear: creditCardInfo.cardExpYear,
    cardCVC: creditCardInfo.cardCVC,
  }

  const validationSchema = Yup.object({
    cardNumber1: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    cardNumber2: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    cardNumber3: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    cardNumber4: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
    cardExpMonth: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(2, 'Must be exactly 2 digits')
      .max(2, 'Must be exactly 2 digits'),
    cardExpYear: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(2, 'Must be exactly 2 digits')
      .max(2, 'Must be exactly 2 digits'),
    cardCVC: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must enter numbers only')
      .min(3, 'Must be exactly 3 digits')
      .max(3, 'Must be exactly 3 digits'),
  })

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

        <div>
          <div style={{ margin: '5vh auto' }}>
            <h2>Enter credit card info</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              try {
                dispatch(saveCreditCardInfo(values))
                history.push('/confirm-order')
                setSubmitting(false)
              } catch (error) {
                setErrors({ errors: error.message })
                setSubmitting(false)
              }
            }}
          >
            <Form className='ui form'>
              <Grid
                style={{ width: '30vw', margin: '0 auto', textAlign: 'center' }}
              >
                <div style={{ margin: '0 auto' }}>
                  <h4>Card Number</h4>
                </div>
                <Grid.Row centered>
                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardNumber1'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardNumber2'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardNumber3'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardNumber4'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>
                </Grid.Row>

                <div style={{ margin: '2vh auto 0 auto' }}>
                  <h4>Month (MM) / Year (YY) / CVC</h4>
                </div>
                <Grid.Row centered>
                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardExpMonth'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardExpYear'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>

                  <Grid.Column width={3}>
                    <MyTextInput
                      name='cardCVC'
                      style={{ padding: '10% 15%' }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Button
                type='submit'
                color='teal'
                content='Proceed to checkout'
                style={{ width: '25vw', margin: '2vh auto' }}
              />
            </Form>
          </Formik>

          <Divider horizontal style={{ width: '50%', margin: '3vh auto' }}>
            OR
          </Divider>
          <Button
            type='button'
            color='green'
            content='Change payment method'
            onClick={() => history.push('/billing')}
          />
        </div>
      </Container>
    </>
  )
}

export default CreditCardInfo
