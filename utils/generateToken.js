import jwt from 'jsonwebtoken'

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET) // pass in like { expiresIn: '12h' } as the 3rd parameter
}

export default generateToken
