import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const ProductModel = mongoose.model('products', productSchema)

export default ProductModel