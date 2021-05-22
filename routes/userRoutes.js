import express from 'express'
import {
  authUser,
  registerUser,
  getUserById,
  getLoggedInUser,
  adminDeleteUser,
  deleteUserSelf,
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.route('/delete').delete(protect, deleteUserSelf)
router
  .route('/:uid')
  .get(protect, getUserById)
  .delete(protect, admin, adminDeleteUser)
router.route('/').get(protect, getLoggedInUser)

export default router
