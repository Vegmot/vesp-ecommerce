import React, { useState } from 'react'
import { Button, Card, Dropdown, Icon } from 'semantic-ui-react'
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

  const onChangeHandler = (e, data) => {
    setQty(data.value)
  }

  return (
    <>
      <Card>
        <Card.Content header='Overview' />

        <Card.Content>
          <h5>{`Price: $ ${product.price}`}</h5>
        </Card.Content>

        {product.category === 'decorations' ? (
          <Card.Content>
            <h5 style={{ color: 'orange' }}>
              <span>
                <Icon name='exclamation circle' />
              </span>{' '}
              Nutritional info not available
            </h5>
          </Card.Content>
        ) : (
          <Card.Content>
            {product.isVegan && (
              <h5>
                <span>
                  <Icon name='vimeo' />
                </span>
                Vegan{' '}
              </h5>
            )}

            {product.isNONGMO && (
              <h5>
                <span>
                  <Icon name='gofore' />
                </span>
                NON-GMO{' '}
              </h5>
            )}

            {product.isKosher && (
              <h5>
                <span>
                  <Icon name='kickstarter k' />
                </span>
                Kosher
              </h5>
            )}

            {product.isCrueltyFree && (
              <h5>
                <span>
                  <Icon name='copyright outline' />
                </span>
                Cruelty-free
              </h5>
            )}

            {product.isOrganic && (
              <h5>
                <span>
                  <Icon name='opera' />
                </span>
                Organic
              </h5>
            )}

            {product.isGlutenFree && (
              <h5>
                <span>
                  <Icon name='pie graph' />
                </span>
                Gluten-free
              </h5>
            )}

            {product.isAllergenFree && (
              <h5>
                <span>
                  <Icon name='vimeo' />
                </span>
                Allergen-free
              </h5>
            )}
          </Card.Content>
        )}

        {product.isOnlyForAdults && (
          <Card.Content>
            <h5 style={{ color: 'red' }}>
              <span>
                <Icon name='exclamation circle' />
              </span>
              Not available for below 21
            </h5>
          </Card.Content>
        )}

        <Card.Content>
          <Dropdown
            fluid
            selection
            name='qty'
            defaultValue={1}
            value={qty}
            onChange={onChangeHandler}
            options={qtyOptions}
          />
        </Card.Content>

        <Card.Content extra>
          <Button
            content={itemInStock ? 'Add to cart' : 'Out of stock'}
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
