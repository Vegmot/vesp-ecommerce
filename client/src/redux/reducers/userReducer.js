import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants/userConstants'

const initialState = {
  loading: false,
  user: null,
  userData: null,
  success: false,
  error: null,
}

export const userLoginReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, userData: {} }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userData: payload }
    case LOGIN_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const registerReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, userData: {} }
    case REGISTER_SUCCESS:
      return { ...state, loading: false, userData: payload }
    case REGISTER_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const getUserReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true, user: {} }
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: payload }
    case GET_USER_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, user: {} }
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, user: payload }
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
