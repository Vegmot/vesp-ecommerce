import React, { useEffect } from 'react'
import { Table, Grid, Container, Image, Icon, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import CartOverview from './CartOverview'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'
import { openModal } from '../../components/modals/modalReducer'
import { ToastContainer, toast } from 'react-toastify'

const CartScreen = ({ match, location, history }) => {
  const pid = match.params.pid
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const popupAutoCloseDuration = 5000

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    if (pid) dispatch(addToCart(pid, qty))
  }, [dispatch, pid, qty])

  const removeFromCartHandler = () => {
    if (!userData) dispatch(openModal({ modalType: 'LoginForm' }))
    if (userData) {
      dispatch(removeFromCart(pid))
      displayRemoveSuccessMessage()
    }
  }

  const displayRemoveSuccessMessage = () => {
    toast.success(<div>Removed item from cart!</div>)
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
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell />
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
                          <Table.Cell>
                            {cartItem.category.charAt(0).toUpperCase() +
                              cartItem.category.substring(1)}
                          </Table.Cell>
                          <Table.Cell>{cartItem.price}</Table.Cell>
                          <Table.Cell>{cartItem.qty}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon='trash alternate outline'
                              color='red'
                              onClick={() => {
                                if (!userData)
                                  dispatch(
                                    openModal({ modalType: 'LoginForm' })
                                  )
                                if (userData) {
                                  dispatch(
                                    removeFromCart(cartItem.product.toString())
                                  )
                                  displayRemoveSuccessMessage()
                                }
                              }}
                            />

                            <ToastContainer
                              position='top-center'
                              autoClose={popupAutoCloseDuration}
                              hideProgressBar
                              draggable={false}
                              closeOnClick
                              pauseOnHover={false}
                              newestOnTop
                              pauseOnFocusLoss
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
                {cartItems && cartItems.length > 0 && (
                  <CartOverview cartItems={cartItems} history={history} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default CartScreen
