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

export const POSTTicket = async (req, res) => {
    try {
        const data = req.body
        const ticket = await ticketServices.createTicket(data)
        res.send(ticket)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}