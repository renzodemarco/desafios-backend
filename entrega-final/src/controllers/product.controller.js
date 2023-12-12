import * as productServices from '../services/product.services.js'
import toNumber from '../utils/convert.to.number.js';

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
        return res.status(200).json(products)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const GETProductById = async (req, res, next) => {
    try {
        const product = await productServices.getProductById(req.params.pid)
        return res.status(200).json(product)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const POSTProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const owner = req.user.role !== 'admin' ? req.user._id : 'admin'
        const product = await productServices.createProduct({...data, price: toNumber(data.price), stock: toNumber(data.stock), year: toNumber(data.year), owner})
        return res.status(201).json(product)
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
        const product = await productServices.updateProduct(pid, {...data, price: toNumber(data.price), stock: toNumber(data.stock), year: toNumber(data.year)})
        return res.status(200).json(product)
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}

export const DELETEProduct = async (req, res, next) => {
    try {
        const product = await productServices.deleteProduct(req.params.pid)
        return res.status(200).json(product)  
    }
    catch (error) {
        error.from = "controller"
        return next(error)
    }
}
