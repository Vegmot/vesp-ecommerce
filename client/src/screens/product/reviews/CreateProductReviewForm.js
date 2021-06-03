import React, { useState } from 'react'
import ModalWrapper from '../../../components/modals/ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../../components/modals/modalReducer'
import { Formik, Form } from 'formik'
import { Button } from 'semantic-ui-react'
import MyTextInput from '../../../components/form/MyTextInput'
import MySelectInput from '../../../components/form/MyTextInput'
import { writeProductReview } from '../../../redux/actions/productActions'
import * as Yup from 'yup'

const CreateProductReviewForm = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  return (
    <>
      {userData && (
        <ModalWrapper size='mini' header='Write a review'>
          {' '}
          <Formik
            initialValues={{ rating: 0, text: '' }}
            validationSchema={Yup.object({
              rating: Yup.number().required('Please rate this product'),
              text: Yup.string().required('Please enter text'),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              try {
                dispatch(writeProductReview(values.rating, values.text))
                setSubmitting(false)
                dispatch(closeModal())
              } catch (error) {
                setErrors({ errors: error.message })
                setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, handleChange, handleBlur }) => (
              <Form className='ui form'>
                <MySelectInput
                  name='rating'
                  placeholder='Rating'
                  onChange={e => {
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                />
                <MyTextInput
                  name='text'
                  placeholder='text'
                  type='text'
                  onChange={e => {
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                />

                <Button
                  loading={isSubmitting || loading}
                  disabled={!isValid || !dirty || isSubmitting}
                  type='submit'
                  fluid
                  size='large'
                  color='teal'
                  content='Submit'
                />
              </Form>
            )}
          </Formik>
        </ModalWrapper>
      )}
    </>
  )
}

export default CreateProductReviewForm
