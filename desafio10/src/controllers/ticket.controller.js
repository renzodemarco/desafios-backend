import * as ticketServices from '../services/ticket.services.js'
import * as cartServices from '../services/cart.services.js'

export const GETTickets = async (req, res, next) => {
    try {
        const tickets = await ticketServices.getTickets()
        return res.json(tickets)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}

export const POSTTicket = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid);
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