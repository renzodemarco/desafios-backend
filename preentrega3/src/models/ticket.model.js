import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: String,
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

const TicketModel = mongoose.model('tickets', ticketSchema)

export default TicketModel