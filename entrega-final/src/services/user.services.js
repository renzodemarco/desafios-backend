import { UserDAO, CartDAO } from "../dao/index.js";
import bcrypt from 'bcrypt'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'

const userManager = new UserDAO()
const cartManager = new CartDAO()

export const getUsers = async () => {
    try {
        return await userManager.getUsers()
    }
    catch(error){
        throw error
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await userManager.getUserByEmail(email)

        if (!user) return CustomError.new(dictionary.userNotFound)
        
        return user
    }
    catch(error){
        throw error
    }
}

export const getUserById = async (id) => {
    try {
        const user = await userManager.getUserById(id)

        if (!user) return CustomError.new(dictionary.userNotFound)
    
        return user
    }
    catch(error){
        throw error
    }
}

export const createUser = async (user) => {
    try {
        if (!user.first_name || !user.email) return CustomError.new(dictionary.incomplete)

        const emailExists = await userManager.getUserByEmail(user.email)

        if (emailExists) return CustomError.new(dictionary.emailExists)

        const cart = await cartManager.createCart()
    
        const cartId = cart._id
    
        const salt = await bcrypt.genSalt(10)
    
        user.password = await bcrypt.hash(user.password, salt)
    
        const newUser = await userManager.createUser({...user, cart: cartId})
    
        await cartManager.addOwner(cartId, newUser._id)
    
        return newUser
    }
    catch(error) {
        throw error
    }
}

export const validateUser = async (email, password) => {
    try {
        const user = await userManager.getUserByEmail(email)

        if (!user) return CustomError.new(dictionary.email)
    
        const isEqual = await bcrypt.compare(password, user.password)
    
        if (!isEqual) return CustomError.new(dictionary.signUp)
    
        return user
    }
    catch(error) {
        throw error
    }
}

export const updateUserById = async (id, data) => {
    try {
        const user = await userManager.getUserById(id)

        if (!user) return CustomError.new(dictionary.userNotFound)
    
        if (data.password) {
            const isEqual = await bcrypt.compare(data.password, user.password)
    
            if (isEqual) return CustomError.new(dictionary.samePassword)
    
            const salt = await bcrypt.genSalt(10)

            data.password = await bcrypt.hash(data.password, salt)
        }
    
        const updatedUser = await userManager.updateUser(user._id, data)
    
        return updatedUser
    }
    catch(error) {
        throw error
    }
}