import React, { useEffect } from 'react'
import { Table, Grid, Container, Image, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import CartOverview from './CartOverview'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'
import { openModal } from '../../components/modals/modalReducer'

const CartScreen = ({ match, location, history }) => {
  const pid = match.params.pid
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    if (pid) dispatch(addToCart(pid, qty))
  }, [dispatch, pid, qty])

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = e => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      {!userData ? (
        <Container>
          <h1>You need to log in</h1>
        </Container>
      ) : (
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {cartItems && cartItems.length > 0 ? (
                  <Table striped textAlign='center'>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {cartItems.map(cartItem => (
                        <Table.Row key={cartItem.product}>
                          <Table.Cell>{cartItem.name}</Table.Cell>
                          <Table.Cell>
                            <Image
                              src={cartItem.image}
                              alt={cartItem.name}
                              size='tiny'
                              centered
                            />
                          </Table.Cell>
                          <Table.Cell>{cartItem.price}</Table.Cell>
                          <Table.Cell>{cartItem.qty}</Table.Cell>
                          <Table.Cell>
                            <Icon
                              name='trash alternate outline'
                              bordered
                              inverted
                              color='red'
                              onClick={handleRemoveFromCart}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                ) : (
                  <h1>Your cart is empty</h1>
                )}
              </Grid.Column>

              <Grid.Column width={2}></Grid.Column>

              <Grid.Column width={4}>
                {cartItems && cartItems.length > 0 && <CartOverview />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default CartScreen
