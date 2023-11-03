import * as productServices from '../services/product.services.js'

export const GETProducts = async (req, res) => {
    try {
        const { limit = 30, page = 1, sort, query = [] } = req.query;
        const options = {
            limit: Number(limit), 
            page: Number(page), 
            sort, 
            query
        }
        const products = await productServices.getProducts(options)
        const { docs, ...data} = products
        const {first_name, last_name, role, cart, _id} = req.user 

        if (role === 'admin') {
            return res.render('products-admin', { admin: true, products: docs, first_name: 'Administrador' })
        }

        if (role === 'premium') {
            const ownProducts = docs.filter(prod => prod.owner === _id.toString())
            const otherProducts = docs.filter(prod => prod.owner !== _id.toString())
            return res.render('products-premium', { products: otherProducts, ownProducts, first_name, last_name, premium: true, cart: cart?._id, user: _id })
        }

        return res.render('products-user', { products: docs, first_name, last_name, cart: cart?._id, user: _id })
    }
    catch(e) {
        return res.status(500).send({error: true, msg: e.message})
    }
}

export const GETCreateProduct = (req, res) => {
    const user = req.user.role == 'premium' ? req.user._id.toString() : 'admin'
    res.render('create-product', { user })
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