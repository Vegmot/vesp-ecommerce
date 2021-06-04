import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (pid, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/product/${pid}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      category: data.category,
      countInStock: data.countInStock,
      qty,
      isVegan: data.isVegan,
      isKosher: data.isKosher,
      isCrueltyFree: data.isCrueltyFree,
      isGlutenFree: data.isGlutenFree,
      isNONGMO: data.isNONGMO,
      isOrganic: data.isOrganic,
      isAllergenFree: data.isAllergenFree,
      isOnlyForAdults: data.isOnlyForAdults,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = pid => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: pid,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
