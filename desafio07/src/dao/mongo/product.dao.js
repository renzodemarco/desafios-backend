import mongoose from 'mongoose'
import ProductModel from '../../models/products.model.js'
import config from '../../config/env.config.js'


const connection = await mongoose.connect(config.MONGO_URI)

export default class ProductManager {

    constructor() {}

    async getProducts({ limit, page, sort, query }) {
        let sortBy;
        if (sort == 'asc') {
            sortBy = { price: 1 }
        }
        else if (sort == 'desc') {
            sortBy = { price: -1 }
        }
        else sortBy = {}

        let queryBy =
            query.length > 0 ? {
                category: { $in: query }
            } : {}

        return await ProductModel.paginate(
            queryBy,
            {
                limit: limit,
                page: page,
                lean: true,
                sort: sortBy
            }
        )
    }

    async getProductById(_id) {
        return await ProductModel.findOne({ _id })
    }

    async createProduct(product) {
        return await ProductModel.create(product)
    }

    async updateProduct(_id, prod) {
        return await ProductModel.findOneAndUpdate({ _id }, prod, { new: true })
    }

    async deleteProduct(_id) {
        return await ProductModel.findOneAndDelete({ _id })
    }
}