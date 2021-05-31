import React, { useState } from 'react'
import { Button, Card, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../components/modals/modalReducer'

const PurchaseOverview = ({ product }) => {
  const dispatch = useDispatch()

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
        </Card.Content>
      </Card>
    </>
  )
}

export default PurchaseOverview
