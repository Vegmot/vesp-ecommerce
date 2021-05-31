import axios from 'axios'
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
import { CART_REMOVE_ITEM } from '../constants/cartConstants'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const res = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    localStorage.setItem('userData', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register =
  (firstName, lastName, displayName, email, password) => async dispatch => {
    try {
      dispatch({ type: REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post(
        `/api/users/register`,
        { firstName, lastName, displayName, email, password },
        config
      )

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })

      localStorage.setItem('userData', JSON.stringify(res.data))
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('cartItems')
  window.location.href = '/'
}

export const getUserById = uid => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST })

    const {
      userLogin: { userData },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    }

    const res = await axios.get(`/api/users/${uid}`, config)

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUserAccount = uid => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST })

    const {
      userLogin: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.delete(`/api/users/${uid}`, config)

    dispatch({ type: DELETE_USER_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
