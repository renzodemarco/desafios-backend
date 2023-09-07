import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    products: [{
        product: String,
        quantity: Number
    }],
},
{ _id: false })

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel