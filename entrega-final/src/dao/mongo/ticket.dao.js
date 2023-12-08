import TicketModel from "../../models/ticket.model.js"

export default class TicketManager {

    constructor() {}

    async getTickets(next) {
        try {
            return await TicketModel.find()
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async getTicketByCode(code, next) { 
        try {
            return await TicketModel.findOne({code})
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async createTicket(ticket, next) {
        try {
            return await TicketModel.create(ticket)
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }
}