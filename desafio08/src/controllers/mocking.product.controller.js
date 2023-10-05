import generateMockProduct from '../utils/generate.mock.products.js'

export const GETMockingProducts = (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateMockProduct())
    }
    return res.render('products', {products})
}