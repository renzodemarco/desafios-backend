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
    },
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }],
        default: []
    }
})

ticketSchema.pre("findOne", function() {
    this.populate("products.product")
});

const TicketModel = mongoose.model('tickets', ticketSchema)

export default TicketModel