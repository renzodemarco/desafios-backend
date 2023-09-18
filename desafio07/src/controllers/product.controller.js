import * as productServices from '../services/product.services.js'

export const GETProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const options = {
            limit: Number(limit), 
            page: Number(page), 
            sort, query
        }
        return await productServices.getProducts(options)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}
export const GETProductById = async (req, res) => {
    try {
        const {id} = req.params
        await manager.getProductById(id)
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const POSTProduct = async product => {
    return await manager.getProductById(product)
}

export const PUTProduct = async (id, product) => {
    return await manager.updateProduct(id, product)
}

export const DELETEProduct = async id => {
    return await manager.deleteProduct(id)
}