import { UserDAO, CartDAO } from "../dao/index.js";
import bcrypt from 'bcrypt'

const userManager = new UserDAO()
const cartManager = new CartDAO()

export const getUsers = async () => {
    return await userManager.getUsers()
}

export const getUserByEmail = async email => {
    const user = await userManager.getUserByEmail(email)

    if (!user) throw new Error("User not found")
    
    return user
}

export const getUserById = async id => {
    const user = await userManager.getUserById(id)

    if (!user) throw new Error("User not found")

    return user
}

export const createUser = async user => {
    if (!user.first_name || !user.email) throw new Error("Incomplete information")

    const cart = await cartManager.createCart()

    const cartId = cart._id

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    return await userManager.createUser({...user, cart: cartId})
}

export const validateUser = async (email, password) => {
    const user = await userManager.getUserByEmail(email)

    if (!user) throw new Error("Email does not exist")

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) throw new Error("Incorrect email or password")

    return user
}