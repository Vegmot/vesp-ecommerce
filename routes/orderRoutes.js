import express from 'express'
import {
  createOrder,
  getOrderById,
  getMyOrders,
  setOrderToPaid,
  setOrderToOutFD,
  cancelMyOrder,
  deleteOrder,
  getAllOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:oid/paid').patch(protect, admin, setOrderToPaid)
router.route('/:oid/outfd').patch(protect, admin, setOrderToOutFD)
router
  .route('/:oid')
  .get(protect, admin, getOrderById)
  .delete(protect, admin, deleteOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/cancelorder').delete(protect, cancelMyOrder)
router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders)

export default router
