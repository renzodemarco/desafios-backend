import ProductModel from "../../models/products.model.js";

export default class ProductManager {

    constructor() {}

    getProducts = async ({ limit, page, sort, query }, next) => {
        try {
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
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }

    getProductById = async (_id, next) => {
        try {
            return await ProductModel.findOne({ _id }).lean()
        }
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }

    getProductByCode = async (code, next) => {
        try {
            return await ProductModel.findOne({ code }).lean()
        }
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }

    createProduct = async (product, next) => {
        try {
            return await ProductModel.create(product)
        }
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }

    updateProduct = async (_id, prod, next) => {
        try {
            return await ProductModel.findOneAndUpdate({ _id }, prod, { new: true })
        }
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }

    deleteProduct = async (_id, next) => {
        try {
            return await ProductModel.findOneAndDelete({ _id })
        }
        catch(error) {
            error.from = "dao"
            return next(error)
        }
    }
}