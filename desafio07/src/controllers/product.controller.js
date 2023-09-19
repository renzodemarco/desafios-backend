import * as productServices from '../services/product.services.js'

export const GETProducts = async (req, res) => {
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
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}
export const GETProductById = async (req, res) => {
    try {
        const product = await productServices.getProductById(req.params.pid)
        return res.send(product)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await productServices.createProduct(data)
        res.send(product)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const PUTProduct = async (req, res) => {
    try {
        const {pid} = req.params
        const data = req.body
        const product = await productServices.updateProduct(pid, data)
        return res.send(product)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const DELETEProduct = async (req, res) => {
    try {
        const product = await productServices.deleteProduct(req.params.pid)
        return res.send(product)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}