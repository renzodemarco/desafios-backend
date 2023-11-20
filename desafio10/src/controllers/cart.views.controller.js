import * as cartServices from '../services/cart.services.js'
import * as ticketServices from '../services/ticket.services.js'

export const GETCartById = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid, next);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        return res.render('cart', {cart})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const GETCartPurchase = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid, next);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        return res.render('purchase', {cart})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const POSTCartPurchase = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid, next);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        const purchase = await ticketServices.createTicket({cartId: cart._id, amount: cart.cartPrice, purchaser: cart.owner.email, products: cart.products})
        return res.send(purchase)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}