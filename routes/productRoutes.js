import express from 'express'
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/toprated').get(getTopRatedProducts)
router.route('/:pid/reviews').post(protect, createProductReview)
router
  .route('/:pid')
  .get(getProductById)
  .delete(deleteProduct)
  .put(protect, admin, updateProduct)
router.route('/').post(protect, admin, createProduct).get(getAllProducts)
export default router
