import { UserDAO, CartDAO } from "../dao/index.js";
import bcrypt from 'bcrypt'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'

const userManager = new UserDAO()
const cartManager = new CartDAO()

export const getUsers = async (next) => {
    try {
        return await userManager.getUsers(next)
    }
    catch(error){
        error.from = 'services'
        return next(error)
    }
}

export const getUserByEmail = async (email, next) => {
    try {
        const user = await userManager.getUserByEmail(email, next)

        if (!user) return CustomError.new(dictionary.userNotFound)
        
        return user
    }
    catch(error){
        error.from = 'services'
        return next(error)
    }
}

export const getUserById = async (id, next) => {
    try {
        const user = await userManager.getUserById(id, next)

        if (!user) return CustomError.new(dictionary.userNotFound)
    
        return user
    }
    catch(error){
        error.from = 'services'
        return next(error)
    }
}

export const createUser = async (user, next) => {
    try {
        if (!user.first_name || !user.email) return CustomError.new(dictionary.incomplete)

        const cart = await cartManager.createCart(next)
    
        const cartId = cart._id
    
        const salt = await bcrypt.genSalt(10)
    
        user.password = await bcrypt.hash(user.password, salt)
    
        const newUser = await userManager.createUser({...user, cart: cartId}, next)
    
        await cartManager.addOwner(cartId, newUser._id, next)
    
        return newUser
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const validateUser = async (email, password, next) => {
    try {
        const user = await userManager.getUserByEmail(email, next)

        if (!user) return CustomError.new(dictionary.email)
    
        const isEqual = await bcrypt.compare(password, user.password)
    
        if (!isEqual) return CustomError.new(dictionary.signUp)
    
        return user
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const updateUserById = async (id, data, next) => {
    try {
        const user = await userManager.getUserById(id, next)

        if (!user) return CustomError.new(dictionary.userNotFound)
    
        if (data.password) {
            const isEqual = await bcrypt.compare(data.password, user.password)
    
            if (isEqual) return CustomError.new(dictionary.samePassword)
    
            const salt = await bcrypt.genSalt(10)
    
            data.password = await bcrypt.hash(data.password, salt)
        }
    
        const updatedUser = await userManager.updateUser(user._id, data, next)
    
        return updatedUser
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}