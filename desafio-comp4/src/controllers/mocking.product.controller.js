import generateMockProduct from '../utils/generate.mock.products.js'

export const GETMockingProducts = (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateMockProduct())
    }
    const {first_name, last_name, role, cart} = req.user 
    const admin = (role === 'admin') ? true : false

    return res.render('products', { products, first_name, last_name, admin, cart: cart?._id })
}