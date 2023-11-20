import TicketManager from "../dao/mongo/ticket.dao.js"
import ProductManager from '../dao/mongo/product.dao.js'
import CartManager from '../dao/mongo/cart.dao.js'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'

const ticketManager = new TicketManager()
const productManager = new ProductManager()
const cartManager = new CartManager()

export const getTickets = async (next) => {
    try {
        const tickets = await ticketManager.getTickets(next)

        if (!tickets) return CustomError.new(dictionary.ticketsNotFound)

        return tickets.length < 1 ? "Ticket list empty" : tickets
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const createTicket = async (ticket, next) => {
    try {
        do {
            ticket.code = (Math.floor(Math.random() * 900000) + 100000).toString();
        }
        while (await ticketManager.getTicketByCode(ticket.code, next))
    
        ticket.purchase_datetime = new Date().toLocaleString()
    
        const hasStock = []
        const noStock = []
    
        for (const prod of ticket.products) {
            const product = await productManager.getProductById(prod.product._id, next);
            if (product.stock >= prod.quantity) {
                hasStock.push(prod);
                await productManager.updateProduct(prod.product._id, {
                    stock: product.stock - prod.quantity,
                }, next);
            } else {
                noStock.push(prod);
            }
        }
    
        if (hasStock.length > 0) {
            await cartManager.updateCart(ticket.cartId, noStock, next)
    
            const newTicket = await ticketManager.createTicket({...ticket, products: hasStock }, next)
        
            return { ticket: newTicket, noStock }
        }
    
        return { noStock }
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}