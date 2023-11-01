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
        const { docs, ...data} = products
        const {first_name, last_name, role, cart, _id} = req.user 
        const admin = role === 'admin'
        const premium = role === 'premium'
        res.render('products', { products: docs, first_name, last_name, admin, premium, cart: cart?._id, user: _id})
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}

export const GETCreateProduct = (req, res) => {
    res.render('create-product')
}

export const GETEditProduct = async (req, res) => {
    try {
        const product = await productServices.getProductById(req.params.pid)
        res.render('edit-product', {product})
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}