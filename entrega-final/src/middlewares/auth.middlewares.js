import * as cartServices from '../services/cart.services.js'
import * as productServices from '../services/product.services.js'
import CustomError from '../utils/error.custom.js';
import dictionary from '../utils/error.dictionary.js';

export const isLogged = (req, res, next,) => {
    if (req.user) return res.redirect('/products');
    next()
}

export const userAuth = (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)
        next()
    }
    catch(error) {
        return next(error)
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)

        if (req.user.role !== "admin") return CustomError.new(dictionary.forbidden)

        next()
    }
    catch(error) {
        return next(error)
    }
}

export const isAdminOrPremium = (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)

        const authorized = ["admin", "premium"]

        if (!authorized.includes(req.user.role)) return CustomError.new(dictionary.forbidden)
        
        next()
    }
    catch(error) {
        return next(error)
    }
}

export const isAdminOrOwner = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') return next()

        const product = await productServices.getProductById(req.params.pid, next)

        if (req.user._id.toString() !== product.owner) return CustomError.new(dictionary.forbidden)

        next()
    }
    catch(error) {
        return next(error)
    }
}

export const isUser = (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)

        const authorized = ["user", "premium"]

        if (!authorized.includes(req.user.role)) return CustomError.new(dictionary.forbidden)

        next()
    }
    catch(error) {
        return next(error)
    }
}

export const isCartOwner = async (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)

        if (req.user.role === 'admin') return next()

        const cartId = req.user.cart._id

        const cart = await cartServices.getCartById(cartId, next)

        if (!req.user._id === cart.owner._id) return CustomError.new(dictionary.forbidden)

        next()
    }
    catch(error) {
        return next(error)
    }

}

export const isNotProductOwner = async (req, res, next) => {
    try {
        if (!req.user) return CustomError.new(dictionary.auth)

        const cartId = req.user.cart._id.toString()

        const product = await productServices.getProductById(req.params.pid, next)

        const cart = await cartServices.getCartById(cartId, next)

        if (cart.owner._id.toString() === product.owner) return CustomError.new(dictionary.ownProduct)
        
        next()
    }
    catch(error) {
        return next(error)
    }
}