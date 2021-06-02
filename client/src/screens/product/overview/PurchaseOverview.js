import React, { useState } from 'react'
import { Button, Card, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../components/modals/modalReducer'
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const PurchaseOverview = ({ product }) => {
  const dispatch = useDispatch()
  const pid = product._id

  const itemInStock = product.countInStock > 0
  const [qty, setQty] = useState(1)

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems, successAddItem, successRemoveItem } = cart

  const maxQtyPerOrder = 10
  const qtyOptions = []

  for (let i = 1; i <= maxQtyPerOrder; i++) {
    const eachOption = {
      key: i.toString(),
      text: i.toString(),
      value: i,
    }

    qtyOptions.push(eachOption)
  }

  const addToCartHandler = () => {
    if (!userData) dispatch(openModal({ modalType: 'LoginForm' }))
    if (userData) {
      dispatch(addToCart(pid, qty))
      displayAddSuccessMessage()
    }
  }

  const removeFromCartHandler = () => {
    if (!userData) dispatch(openModal({ modalType: 'LoginForm' }))
    if (userData) {
      dispatch(removeFromCart(pid))
      displayRemoveSuccessMessage()
    }
  }

  const displayAddSuccessMessage = () => {
    toast.success(
      <div>
        Added item to cart!{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={removeFromCartHandler}
        >
          Undo
        </span>
      </div>
    )
  }

  const displayRemoveSuccessMessage = () => {
    toast.success(
      <div>
        Removed item from cart!{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={addToCartHandler}
        >
          Undo
        </span>
      </div>
    )
  }

  return (
    <>
      <Card>
        <Card.Content header='Overview' />

        <Card.Content>
          <h5>{`Price: $ ${product.price}`}</h5>
        </Card.Content>

        <Card.Content>
          <h5>{itemInStock ? 'In stock' : 'Out of stock'}</h5>
        </Card.Content>

        <Card.Content>
          <Dropdown
            fluid
            selection
            defaultValue={1}
            value={qty}
            onChange={e => setQty(e.target.value)}
            options={qtyOptions}
          />
        </Card.Content>

        <Card.Content extra>
          <Button
            content='Add to cart'
            fluid
            disabled={!itemInStock}
            color='teal'
            onClick={addToCartHandler}
          />
          <ToastContainer
            position='top-center'
            autoClose={4000}
            hideProgressBar
            draggable={false}
            closeOnClick
            pauseOnHover={false}
            newestOnTop
            pauseOnFocusLoss
          />
        </Card.Content>
      </Card>
    </>
  )
}

export default PurchaseOverview
