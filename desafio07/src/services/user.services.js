import UserManager from "../dao/mongo/user.dao";

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
    return await manager.createUser(user)
}

export const validateUser = async (email, password) => {
    const user = await manager.validateUser(email, password)
    if (!user) throw new Error("Incorrect email or password")
    return user
}