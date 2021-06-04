import React from 'react'
import { Container, Icon, Step, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import MySelectInput from '../../components/form/MySelectInput'

const ShippingScreen = ({ history }) => {
  const initialValues = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  }

  const validationSchema = Yup.object({
    address1: Yup.string().required('Please enter your address'),
    address2: Yup.string(),
    city: Yup.string().required('Please enter your city'),
    state: Yup.string().required('Please select your state'),
    zipCode: Yup.string().required('Please enter your zip code'),
    country: Yup.string().required('Please select your country'),
  })

  const stateOptions = [
    {
      key: 0,
      text: 'CA',
      value: 'CA',
    },
    {
      key: 1,
      text: 'NY',
      value: 'NY',
    },
    {
      key: 2,
      text: 'TX',
      value: 'TX',
    },
    {
      key: 3,
      text: 'WA',
      value: 'WA',
    },
  ]

  const countryOptions = [
    {
      key: 0,
      text: 'USA',
      value: 'USA',
    },
    {
      key: 1,
      text: 'South Korea',
      value: 'South Korea',
    },
    {
      key: 2,
      text: 'Singapore',
      value: 'Singapore',
    },
    {
      key: 3,
      text: 'Taiwan',
      value: 'Taiwan',
    },
  ]

  return (
    <>
      <Container textAlign='center'>
        <div>
          <Step.Group>
            <Step active>
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

            <Step>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </div>

        <div style={{ width: '50vw', margin: '15vh auto 0 auto' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              try {
                values.address1 = values.address1
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')

                if (values.address2)
                  values.address2 = values.address2
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')

                values.city = values.city
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')

                history.push('/billing')
                setSubmitting(false)
              } catch (error) {
                setErrors({ errors: error.message })
                setSubmitting(false)
              }
            }}
          >
            {({ values, isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                <MyTextInput name='address1' placeholder='Enter address' />

                <MyTextInput
                  name='address2'
                  placeholder='Enter optional address (Apt #, Floor, ...)'
                />

                <MyTextInput name='city' placeholder='Enter city' />

                {values.country === 'USA' && (
                  <MySelectInput
                    name='state'
                    placeholder='Select state'
                    options={stateOptions}
                  />
                )}

                <MyTextInput name='zipCode' placeholder='Enter zip code' />

                <MySelectInput
                  name='country'
                  placeholder='Select country'
                  options={countryOptions}
                />

                <Button
                  loading={isSubmitting}
                  disabled={!isValid || !dirty || isSubmitting}
                  type='submit'
                  fluid
                  size='large'
                  color='teal'
                  content='Proceed to Billing'
                />
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  )
}

export default ShippingScreen
