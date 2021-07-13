import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../modals/modalReducer'

const PrivateRoute = ({ component: Component, ...props }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { isAuthenticated } = userLogin

  return (
    <Route
      render={props =>
        !isAuthenticated ? (
          dispatch(openModal({ modalType: 'LoginForm' }))
        ) : (
          <Component {...props} />
        )
      }
      {...props}
    />
  )
}

export default PrivateRoute
