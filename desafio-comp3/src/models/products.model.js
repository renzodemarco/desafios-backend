import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
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
    owner: {
        type: String,
        default: 'admin'
    },
    thumbnail: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        enum: ['rock', 'pop', 'jazz', 'latin', 'metal', 'electro', 'rap'],
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

productSchema.plugin(paginate);

const ProductModel = mongoose.model('products', productSchema)

export default ProductModel