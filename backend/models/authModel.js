import User from './User.js'
import bcrypt from 'bcryptjs'

export const register = async (userData) => {
  const { name, email, password } = userData

  const existing = await User.findOne({ email })
  if (existing) throw new Error('User already exists')

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  return user
}

export const login = async (userData) => {
  const { email, password } = userData

  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid email or password')

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) throw new Error('Invalid email or password')

  return user
}