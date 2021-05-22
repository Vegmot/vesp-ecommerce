import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const done = (res, status, message) => {
  return res.status(status).send({ message })
}

// create a new order
// POST /api/orders
// private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if ((orderItems && orderItems.length === 0) || !orderItems)
    return done(res, 404, 'No items found')

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })

  const orderCreated = await order.save()
  return res.status(201).json(orderCreated)
})

// get an order by its id
// GET /api/orders/:oid
// private | admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid).populate(
    'user',
    'firstName lastName displayName email avatar'
  )
  if (!order) return done(res, 404, 'Order not found')

  return res.status(200).json(order)
})

// get logged in user's order
// GET /api/orders/myorders
// private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findOne({ user: req.user._id })
  if (!orders) return done(res, 404, 'Order not found')

  return res.status(200).json(orders)
})

// update the status of an order to 'paid'
// PATCH /api/orders/:oid/paid
// private | admin
const setOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid)
  if (!order) return done(res, 404, 'Order not found')

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  }

  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})

// update the status of an order to 'out for delivery'
// PATCH /api/orders/:oid/outfd
// private | admin
const setOrderToOutFD = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid)
  if (!order) return done(res, 404, 'Order not found')

  order.isOutFD = true
  order.outAt = Date.now()

  const updatedOrder = await order.save()
  return res.status(200).json(updatedOrder)
})

// delete (cancel) logged in user's order
// DELETE /api/orders/cancelorder
// private
const cancelMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ user: req.user._id })
  if (!order) return done(res, 404, 'Order not found')

  await order.remove()
  return done(res, 200, 'Successfully cancelled the order')
})

// delete an order by its id
// DELETE /api/orders/:oid
// private | admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid)
  if (!order) return done(res, 404, 'Order not found')

  await order.remove()
  return done(res, 200, 'Successfully cancelled the order')
})

// get all orders as admin
// GET /api/orders
// private | admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
  if (!orders || orders.length === 0) return done(res, 404, 'No order found')

  return res.status(200).json(orders)
})

export {
  createOrder,
  getOrderById,
  getMyOrders,
  setOrderToPaid,
  setOrderToOutFD,
  cancelMyOrder,
  deleteOrder,
  getAllOrders,
}
