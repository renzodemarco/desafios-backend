import ProductModel from "../../models/products.model.js";

export default class ProductManager {

    constructor() { }

    getProducts = async ({ limit, page, sort, query }) => {
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

    getProductById = async (_id) => {
        return await ProductModel.findOne({ _id }).lean()

    }

    getProductByCode = async (code) => {
        return await ProductModel.findOne({ code }).lean()
    }

    createProduct = async (product) => {
        return await ProductModel.create(product)
    }

    updateProduct = async (_id, prod) => {
        return await ProductModel.findOneAndUpdate({ _id }, prod, { new: true })
    }

    deleteProduct = async (_id) => {
        return await ProductModel.findOneAndDelete({ _id })
    }
}