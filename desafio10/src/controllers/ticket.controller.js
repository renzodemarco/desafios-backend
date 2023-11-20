import * as ticketServices from '../services/ticket.services.js'

export const GETTickets = async (req, res, next) => {
    try {
        const tickets = await ticketServices.getTickets(next)
        return res.json(tickets)
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}
