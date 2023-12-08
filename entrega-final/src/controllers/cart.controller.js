import * as cartServices from '../services/cart.services.js'

export const GETOwnCart = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.getCartById(cartId, next)
        return res.json(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const GETCartById = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid, next)
        return res.json(cart)
    }
    catch(error) {
        error.from = "controller"
        return next(error)
    }
}

export const POSTCart = async (req, res, next) => {
    try {
        const cart = await cartServices.createCart(next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const POSTProductToOwnCart = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const response = await cartServices.addProductToCart(cartId, req.params.pid, next)
        return res.json(response)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const POSTProductToCart = async (req, res, next) => {
    try {
        const cart = await cartServices.addProductToCart(req.params.cid, req.params.pid, next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const DELETEProductFromCart = async (req, res, next) =>{
    try {
        const cart = await cartServices.deleteProductFromCart(req.params.cid, req.params.pid, next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const DELETEProductFromOwnCart = async (req, res, next) =>{
    try {
        const product = req.params.pid
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.deleteProductFromCart(cartId, product, next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const DELETEAllProductsFromOwnCart = async (req, res, next) =>{
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.deleteAllProducts(cartId, next)
        return res.json(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const PUTCart = async (req, res, next) => {
    try {
        const data = req.body
        const cart = await cartServices.updateCart(req.params.cid, data, next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const PUTProductQuantity = async (req, res, next) => {
    try {
        const {quantity} = req.body
        const cart = await cartServices.updateProdQuantity(req.params.cid, req.params.pid, Number(quantity), next)
        return res.send(cart)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const PUTProductQuantityFromOwnCart = async (req, res, next) => {
    try {
        const { quantity } = req.body
        const cartId = req.user.cart._id.toString()
        const response = await cartServices.updateProdQuantity(cartId, req.params.pid, Number(quantity), next)
        return res.send(response)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}