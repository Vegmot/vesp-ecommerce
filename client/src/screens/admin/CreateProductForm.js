import React, { useState } from 'react'
import axios from 'axios'
import { Icon, Form, Input, TextArea, Loader, Button } from 'semantic-ui-react'
import ModalWrapper from '../../components/modals/ModalWrapper'

const CreateProductForm = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await axios.post('/api/upload', formData, config)

      setImage(res.data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = async (e, pid) => {
    e.preventDefault()
    await axios.post({
      _id: pid,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    })
  }

  return (
    <ModalWrapper size='mini' header='Add a product'>
      <Form onSubmit={submitHandler}>
        <Form.Field
          id='form-input-control-name'
          control={Input}
          label='Name'
          placeholder='Product name'
          disabled={submitting}
        />

        <label>File input & upload </label>
        <Button as='label' htmlFor='file' type='button' animated='fade'>
          <Button.Content visible>
            <Icon name='file' />
          </Button.Content>
          <Button.Content hidden>Choose a File</Button.Content>
        </Button>
        <input type='file' id='form-input-product-image' hidden />
        <Form.Input
          fluid
          label='File Chosen: '
          placeholder='Use the above bar to browse your file system'
          readOnly
          value={image}
        />

        <Form.Field
          id='form-input-control-price'
          control={Input}
          label='Price'
          placeholder='Price'
          disabled={submitting}
        />

        <input
          type='file'
          id='form-input-control-image'
          control={Input}
          label='Click to upload image'
          disabled={submitting}
        />

        {uploading && <Loader active inline='center' />}

        <Form.Field
          id='form-input-control-brand'
          control={Input}
          label='Brand'
          placeholder='Brand'
          disabled={submitting}
        />

        <Form.Field
          id='form-input-control-category'
          control={Input}
          label='Category'
          placeholder='Category'
          disabled={submitting}
        />

        <Form.Field
          id='form-input-control-count-in-stock'
          control={Input}
          label='Count in stock'
          placeholder='Count in stock'
          disabled={submitting}
        />

        <Form.Field
          id='form-input-control-description'
          control={TextArea}
          label='Description'
          placeholder='Description'
          disabled={submitting}
        />

        <Form.Button
          type='submit'
          content='Create/Update'
          disabled={submitting}
          loading={submitting}
          fluid
        />
      </Form>
    </ModalWrapper>
  )
}

export default CreateProductForm
