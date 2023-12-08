import TicketModel from "../../models/ticket.model.js"

export default class TicketManager {

    constructor() { }

    async getTickets() {
        return await TicketModel.find()

    }

    async getTicketByCode(code) {
        return await TicketModel.findOne({ code })

    }

    async createTicket(ticket) {
        return await TicketModel.create(ticket)
    }
}