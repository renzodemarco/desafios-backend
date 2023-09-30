import TicketManager from "../dao/mongo/ticket.dao.js"

const ticketManager = new TicketManager()

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

    ticket.purchase_datatime = new Date().toLocaleString()

    const newTicket = await ticketManager.createTicket(ticket)

    if (!newTicket) throw new Error('Could not create ticket')

    return newTicket
}