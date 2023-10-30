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

    const newUser = await userManager.createUser({...user, cart: cartId})

    await cartManager.addOwner(cartId, newUser._id)

    return newUser
}

export const validateUser = async (email, password) => {
    const user = await userManager.getUserByEmail(email)

    if (!user) throw new Error("Email does not exist")

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) throw new Error("Incorrect email or password")

    return user
}

export const updateUserById = async (id, data) => {
    const user = await userManager.getUserById(id)

    if (!user) throw new Error("User does not exist")

    if (data.password) {
        const isEqual = await bcrypt.compare(data.password, user.password)

        if (isEqual) throw new Error("New password can not be the same as the old one")

        const salt = await bcrypt.genSalt(10)

        data.password = await bcrypt.hash(data.password, salt)
    }

    const updatedUser = await userManager.updateUser(user._id, data)

    if (!updatedUser) throw new Error("Could not update user")

    return updatedUser
}