import { combineReducers } from 'redux'
import { modalReducer } from '../components/modals/modalReducer'
import {
  userLoginReducer,
  registerReducer,
  getUserReducer,
  deleteUserReducer,
} from '../redux/reducers/userReducer'

const rootReducer = combineReducers({
  // modal
  modals: modalReducer,

  // user
  userLogin: userLoginReducer,
  registerUser: registerReducer,
  getUser: getUserReducer,
  deleteUser: deleteUserReducer,

  // product

  // order
})

export default rootReducer
