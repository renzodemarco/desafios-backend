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
        const {first_name, last_name, role} = req.user 
        const admin = (role === 'admin') ? true : false
        res.render('products', { products: docs, first_name, last_name, admin})
    }
    catch(e) {
        return res.status(402).send({error: true, msg: e.message})
    }
}