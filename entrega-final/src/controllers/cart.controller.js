import * as cartServices from '../services/cart.services.js'
import dictionary from '../utils/error.dictionary.js'
import CustomError from '../utils/error.custom.js'

export const GETOwnCart = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.getCartById(cartId)
        if (!cart) return CustomError.new(dictionary.getError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const GETCarts = async (req, res, next) => {
    try {
        const response = await cartServices.getCarts()
        if (!response) return CustomError.new(dictionary.getError)
        return res.status(200).json(response)
    }
    catch(error) {
        return next(error)
    }
}

export const GETCartById = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid)
        if (!cart) return CustomError.new(dictionary.getError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const POSTCart = async (req, res, next) => {
    try {
        const cart = await cartServices.createCart()
        if (!cart) return CustomError.new(dictionary.postError)
        return res.status(201).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const POSTProductToOwnCart = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const response = await cartServices.addProductToCart(cartId, req.params.pid)
        if (!response) return CustomError.new(dictionary.postError)
        return res.status(200).json(response)
    }
    catch(error) {
        return next(error)
    }
}

export const POSTProductToCart = async (req, res, next) => {
    try {
        const cart = await cartServices.addProductToCart(req.params.cid, req.params.pid)
        if (!cart) return CustomError.new(dictionary.getError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const DELETECart = async (req, res, next) =>{
    try {
        const response = await cartServices.deleteCart(req.params.cid)
        if (!response) return CustomError.new(dictionary.deleteError)
        return res.status(200).json(response)
    }
    catch(error) {
        return next(error)
    }
}

export const DELETEProductFromCart = async (req, res, next) =>{
    try {
        const cart = await cartServices.deleteProductFromCart(req.params.cid, req.params.pid)
        if (!cart) return CustomError.new(dictionary.deleteError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const DELETEProductFromOwnCart = async (req, res, next) =>{
    try {
        const product = req.params.pid
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.deleteProductFromCart(cartId, product)
        if (!cart) return CustomError.new(dictionary.deleteError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const DELETEAllProductsFromOwnCart = async (req, res, next) =>{
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.deleteAllProducts(cartId)
        if (!cart) return CustomError.new(dictionary.deleteError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const PUTCart = async (req, res, next) => {
    try {
        const data = req.body
        const cart = await cartServices.updateCart(req.params.cid, data)
        if (!cart) return CustomError.new(dictionary.putError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const PUTProductQuantity = async (req, res, next) => {
    try {
        const {quantity} = req.body
        const cart = await cartServices.updateProdQuantity(req.params.cid, req.params.pid, Number(quantity))
        if (!cart) return CustomError.new(dictionary.putError)
        return res.status(200).json(cart)
    }
    catch(error) {
        return next(error)
    }
}

export const PUTProductQuantityFromOwnCart = async (req, res, next) => {
    try {
        const { quantity } = req.body
        const cartId = req.user.cart._id.toString()
        const response = await cartServices.updateProdQuantity(cartId, req.params.pid, Number(quantity))
        if (!response) return CustomError.new(dictionary.putError)
        return res.status(200).json(response)
    }
    catch(error) {
        return next(error)
    }
}