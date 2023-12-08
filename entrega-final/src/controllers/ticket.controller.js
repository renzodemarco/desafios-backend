import * as ticketServices from '../services/ticket.services.js'
import * as cartServices from '../services/cart.services.js'

export const GETAllTickets = async (req, res, next) => {
    try {
        const tickets = await ticketServices.getTickets(next)
        return res.json(tickets)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const GETTicket = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.getCartById(cartId, next)
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        return res.send({totalPrice: cart.cartPrice})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const POSTTicket = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id.toString()
        const cart = await cartServices.getCartById(cartId, next);
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