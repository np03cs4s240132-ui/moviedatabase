import User from '../data/user.js'
import bcrypt from 'bcryptjs'

export const register = (user) => {
    return User.create(user)
}

export const login =(user)=>{
    const { email, password } = user
    const loggedINUser = User.findOne({ email })
    if(!loggedINUser) {
        throw new Error('User not found')
    }
    const isValidPassword = await bcrypt.compare(password, loggedINUser.password)
}