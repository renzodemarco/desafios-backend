import * as ticketServices from '../services/ticket.services.js'

export const GETTickets = async (req, res) => {
    try {
        const tickets = await ticketServices.getTickets()
        res.send(tickets)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}
