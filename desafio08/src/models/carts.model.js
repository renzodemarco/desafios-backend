import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

cartSchema.pre("findOne", function() {
    this.populate("products.product")
});

cartSchema.pre("findOne", function() {
    this.populate("owner")
});

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel