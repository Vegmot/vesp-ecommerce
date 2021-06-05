import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_CREDIT_CARD_INFO,
} from '../constants/cartConstants'

export const cartReducer = (
  state = {
    cartItems: [],
    successAddItem: false,
    successRemoveItem: false,
    successSaveSA: false,
    successSavePM: false,
    successSaveCCInfo: false,
    shippingAddress: {},
    paymentMethod: null,
    creditCardInfo: null,
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem =>
            cartItem.product === existItem.product ? item : cartItem
          ),
          successAddItem: true,
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          successAddItem: true,
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.product !== action.payload
        ),
        successRemoveItem: true,
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
        successSaveSA: true,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
        successSavePM: true,
      }

    case CART_SAVE_CREDIT_CARD_INFO:
      return {
        ...state,
        creditCardInfo: action.payload,
        successSaveCCInfo: true,
      }

    default:
      return state
  }
}
