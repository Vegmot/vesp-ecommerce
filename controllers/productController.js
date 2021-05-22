import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const done = (res, status, message) => {
  return res.status(status).send({ message })
}

// get all products
// GET /api/products?keyword=''&sortBy=''
// public
const getAllProducts = asyncHandler(async (req, res) => {
  const productsPerPage = 10
  const page = +req.query.pageNumber || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {}

  /* // Thank you Viktoras from Q&A!
// use the next line in SearchBox.js
const query = search
  ? {
      name: {
        $regex: search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'),
        $options: 'i',
      },
    }
  : {}; */

  const category = req.query.sortBy || ''

  const count = await Product.countDocuments({ ...keyword })

  let products = []

  if (keyword && category)
    // if both keyword and category are passed in
    products = await Product.find({
      $and: [{ ...keyword }, { category }],
    })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1))

  if (keyword && !category)
    // if keyword is passed in only
    products = await Product.find({ ...keyword })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1))

  if (category && !keyword)
    // if category is passed in only
    products = await Product.find({ category })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1))

  // products sorting logic above working checked on 5/22/2021

  if (!products) return done(res, 404, 'Products not found')

  res
    .status(200)
    .json({ page, products, pages: Math.ceil(count / productsPerPage) })
})

// get a product by its id
// GET /api/products/:pid
// public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.pid)
  if (!product) return done(res, 404, 'Product not found')

  return res.status(200).json(product)
})

// delete a product
// DELETE /api/products/:pid
// private | admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.pid)
  if (!product) return done(res, 404, 'Product not found')

  await product.remove()
  return done(res, 200, 'Successfully deleted the product')
})

// create a product
// POST /api/products
// private | admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    countReviews,
    description,
  } = req.body

  const product = new Product({
    user: req.user._id,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    countReviews,
    description,
  })

  const createdProduct = await product.save()

  return res.status(200).json(createdProduct)
})

// update a product
// PUT /api/products/:pid
// private | admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.pid)
  if (!product) return done(res, 404, 'Product not found')

  product.name = name
  product.price = price
  product.description = description
  product.image = image
  product.brand = brand
  product.category = category
  product.countInStock = countInStock

  const updatedProduct = await product.save()
  return res.status(200).json(updatedProduct)
})

// create a product review
// POST /api/products/:pid/reviews
// private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, text } = req.body
  const product = await Product.findById(req.params.pid)
  if (!product) return done(res, 404, 'Products not found')

  const alreadyReviewed = product.reviews.find(
    rvw => rvw.user.toString() === req.user._id.toString()
  )
  if (alreadyReviewed)
    return done(res, 400, 'You have already written a review for this product.')

  const review = {
    user: req.user._id,
    displayName: req.user.displayName,
    rating: +rating,
    text,
  }

  product.reviews.push(review)
  product.countReviews = product.reviews.length
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  await product.save()
  return done(res, 200, 'Review added successfully')
})

// get top products
// GET /api/products/toprated
// public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const numTopProducts = 4
  const category = req.query.category || ''

  let products = []

  if (category)
    // if category parameter is passed in
    products = await Product.find({ category })
      .sort({ rating: -1 })
      .limit(numTopProducts)

  if (!category)
    // if nothing got passed in
    products = await Product.find().sort({ rating: -1 }).limit(numTopProducts)

  // products sorting logic above working checked on 5/22/2021

  if (!products) return done(res, 404, 'Products not found')

  return res.status(200).json(products)
})

export {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
}
