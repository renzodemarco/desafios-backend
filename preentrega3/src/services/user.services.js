import UserManager from "../dao/mongo/user.dao.js"
import bcrypt from 'bcrypt'

const manager = new UserManager()

export const getUsers = async () => {
    return await manager.getUsers()
}

export const getUserByEmail = async email => {
    const user = await manager.getUserByEmail(email)

    if (!user) throw new Error("User not found")
    
    return user
}

export const getUserById = async id => {
    const user = await manager.getUserById(id)

    if (!user) throw new Error("User not found")

    return user
}

export const createUser = async user => {
    if (!user.first_name || !user.email) throw new Error("Incomplete information")

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    return await manager.createUser(user)
}

export const validateUser = async (email, password) => {
    const user = await manager.getUserByEmail(email)

    if (!user) throw new Error("Email does not exist")

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) throw new Error("Incorrect email or password")

    return user
}