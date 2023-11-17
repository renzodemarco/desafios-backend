import * as productServices from '../services/product.services.js'

export const GETProducts = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const options = {
            limit: Number(limit), 
            page: Number(page), 
            sort, 
            query
        }
        const products = await productServices.getProducts(options)
        return res.send(products)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const GETProductById = async (req, res, next) => {
    try {
        const product = await productServices.getProductById(req.params.pid)
        return res.send(product)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const POSTProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await productServices.createProduct({...data, price: Number(data.price), stock: Number(data.stock), year: Number(data.year)})
        res.send(product)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const PUTProduct = async (req, res, next) => {
    try {
        const {pid} = req.params
        const data = req.body
        const product = await productServices.updateProduct(pid, {...data, price: Number(data.price), stock: Number(data.stock), year: Number(data.year)}, next)
        return res.send({product})
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const DELETEProduct = async (req, res, next) => {
    try {
        const product = await productServices.deleteProduct(req.params.pid, next)
        return res.json({product})  
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}
