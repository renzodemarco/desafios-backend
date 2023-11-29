import * as cartServices from '../services/cart.services.js'

export const GETCarts = async (req, res, next) => {
    try {
        const carts = await cartServices.getCarts(next)
        return res.send(carts)
    }
    catch(error) {
        error.from = 'controllercontroller'
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

export const DELETEAllProducts = async (req, res, next) =>{
    try {
        const cart = await cartServices.deleteAllProducts(req.params.cid, next)
        return res.send(cart)
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