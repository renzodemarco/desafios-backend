import TicketManager from "../dao/mongo/ticket.dao.js"
import ProductManager from '../dao/mongo/product.dao.js'
import CartManager from '../dao/mongo/cart.dao.js'

const ticketManager = new TicketManager()
const productManager = new ProductManager()
const cartManager = new CartManager()

export const getTickets = async () => {
    const tickets = await ticketManager.getTickets()

    if (!tickets) throw new Error('Ticket list empty')

    return tickets
}

export const createTicket = async ticket => {
    do {
        ticket.code = (Math.floor(Math.random() * 900000) + 100000).toString();
    }
    while (await ticketManager.getTicketByCode(ticket.code))

    ticket.purchase_datetime = new Date().toLocaleString()

    const hasStock = []

    const noStock = []

    for (const prod of ticket.products) {
        const product = await productManager.getProductById(prod.product._id);
        if (product.stock >= prod.quantity) {
            hasStock.push(prod);
            await productManager.updateProduct(prod.product._id, {
                stock: product.stock - prod.quantity,
            });
        } else {
            noStock.push(prod);
        }
    }

    if (hasStock.length > 0) {
        cartManager.updateCart(ticket.cartId, noStock)

        const newTicket = await ticketManager.createTicket({...ticket, products: hasStock })
    
        if (!newTicket) throw new Error('Could not create ticket')
    
        return { ticket: newTicket, noStock }
    }

    return { noStock }
}