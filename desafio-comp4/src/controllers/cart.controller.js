import * as cartServices from '../services/cart.services.js'

export const GETCarts = async (req, res) => {
    try {
        const carts = await cartServices.getCarts()
        return res.send(carts)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETCartById = async (req, res) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid)
        return res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTCart = async (req, res) => {
    try {
        const cart = await cartServices.createCart()
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTProductToCart = async (req, res) => {
    try {
        const cart = await cartServices.addProductToCart(req.params.cid, req.params.pid)
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const DELETEProductFromCart = async (req, res) =>{
    try {
        const cart = await cartServices.deleteProductFromCart(req.params.cid, req.params.pid)
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const DELETEAllProducts = async (req, res) =>{
    try {
        const cart = await cartServices.deleteAllProducts(req.params.cid)
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const PUTCart = async (req, res) => {
    try {
        const data = req.body
        const cart = await cartServices.updateCart(req.params.cid, data)
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const PUTProductQuantity = async (req, res) => {
    try {
        const {quantity} = req.body
        const cart = await cartServices.updateProdQuantity(req.params.cid, req.params.pid, Number(quantity))
        res.send(cart)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}