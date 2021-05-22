import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const done = (res, status, message) => {
  return res.status(status).json({ message: message })
}

// authenticate (login) user
// POST /api/users/login
// public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user || !(await user.matchPassword(password)))
    return done(res, 401, 'Invalid email or password')

  return res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    avatar: user.avatar,
    email: user.email,
    isPremium: user.isPremium,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

// register user
// POST /api/users/register
// public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, displayName, email, password } = req.body

  const imageNumber = Number(await User.countDocuments({})) + 1
  const avatar = `https://i.pravatar.cc/250?img=${imageNumber}`

  const userExists = await User.findOne({ email })

  if (userExists) return done(res, 400, 'User already exists')

  const user = await User.create({
    firstName:
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
    lastName:
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
    displayName,
    email,
    password,
    avatar,
  })

  if (!user) return done(res, 400, 'Invalid user data')

  return res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    isPremium: user.isPremium,
    token: generateToken(user._id),
  })
})

// get logged in user
// GET /api/users
// private
const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) return done(res, 404, 'User not found')

  return res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    isPremium: user.isPremium,
  })
})

// get a user by its id
// GET /api/users/:uid
// private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.uid)

  if (!user) return done(res, 404, 'User not found')

  return res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    isPremium: user.isPremium,
  })
})

// delete a user as an admin
// DELETE /api/users/:uid
// private | admin
const adminDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.uid)

  if (!user) return done(res, 404, 'User not found')

  await user.remove()
  return done(res, 200, 'Successfully deleted the account')
})

// self-delete logged in user
// DELETE /api/users/delete
// private
const deleteUserSelf = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return done(res, 404, 'User not found')

  await user.remove()
  return done(res, 200, 'Successfully deleted the account')
})

export {
  authUser,
  registerUser,
  getLoggedInUser,
  getUserById,
  adminDeleteUser,
  deleteUserSelf,
}
