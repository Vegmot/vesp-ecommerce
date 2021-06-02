import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const done = (res, status, message) => {
  return res.status(status).send({ message })
}

// get all products
// GET /api/products?keyword=''&sortBy=''
// public
const getAllProductsWithKeyword = asyncHandler(async (req, res) => {
  const productsPerPage = 8
  const page = +req.query.page || 1

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

  const sortBy = req.query.sortBy || 'ratingDesc'
  const sortOptions = [
    { rating: -1 },
    { rating: 1 },
    { countReviews: -1 },
    { countReviews: 1 },
    { brand: -1 },
    { brand: 1 },
    { price: -1 },
    { price: 1 },
  ]
  let sortIndex = 0

  switch (sortBy) {
    case 'ratingDesc':
      sortIndex = 0
      break

    case 'ratingAsc':
      sortIndex = 1

    case 'reviewsDesc':
      sortIndex = 2
      break

    case 'reviewAsc':
      sortIndex = 3
      break

    case 'brandDesc':
      sortIndex = 4
      break

    case 'brandAsc':
      sortIndex = 5
      break

    case 'priceDesc':
      sortIndex = 6
      break

    case 'priceAsc':
      sortIndex = 7
      break

    default:
      // ratingDesc
      sortIndex = 0
      break
  }

  const products = await Product.find({ ...keyword })
    .sort(sortOptions[sortIndex])
    .limit(productsPerPage)
    .skip(productsPerPage * (page - 1))

  if (!products) return done(res, 404, 'Products not found')

  const count = products.length

  return res
    .status(200)
    .json({ page, products, pages: Math.ceil(count / productsPerPage) })
})

// get all products under certain category
// GET /api/products/:category
// public
const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const productsPerPage = 10
  const page = +req.query.page || 1

  const category = req.params.category
  const categoriesArray = ['treats', 'drinks', 'decorations']
  if (!categoriesArray.includes(category))
    return done(res, 404, 'No such category')

  const sortBy = req.query.sortBy || 'ratingDesc'
  const sortOptions = [
    { rating: -1 }, // desc
    { rating: 1 }, // asc
    { countReviews: -1 },
    { countReviews: 1 },
    { brand: -1 },
    { brand: 1 },
    { price: -1 },
    { price: 1 },
  ]

  let sortIndex = 0

  switch (sortBy) {
    case 'ratingDesc':
      sortIndex = 0
      break

    case 'ratingAsc':
      sortIndex = 1

    case 'reviewsDesc':
      sortIndex = 2
      break

    case 'reviewAsc':
      sortIndex = 3
      break

    case 'brandDesc':
      sortIndex = 4
      break

    case 'brandAsc':
      sortIndex = 5
      break

    case 'priceDesc':
      sortIndex = 6
      break

    case 'priceAsc':
      sortIndex = 7
      break

    default:
      // ratingDesc
      sortIndex = 0
      break
  }

  const products = await Product.find({ category })
    .sort(sortOptions[sortIndex])
    .limit(productsPerPage)
    .skip(productsPerPage * (page - 1))

  if (!products) return done(res, 404, 'Products not found')

  const count = products.length

  return res
    .status(200)
    .json({ page, products, pages: Math.ceil(count / productsPerPage) })
})

// get a product by its id
// GET /api/products/product/:pid
// public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.pid)
  if (!product) return done(res, 404, 'Product not found')

  return res.status(200).json(product)
})

// delete a product
// DELETE /api/products/product/:pid
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
// PUT /api/products/product/:pid
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
// POST /api/products/product/:pid/reviews
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
    avatar: req.user.avatar,
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
  return res.status(200).json(review)
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

  if (!category || category.length === 0)
    // if nothing got passed in
    products = await Product.find().sort({ rating: -1 }).limit(numTopProducts)

  // products sorting logic above working checked on 5/22/2021

  if (!products) return done(res, 404, 'Products not found')

  return res.status(200).json(products)
})

export {
  getAllProductsWithKeyword,
  getAllProductsByCategory,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
}
