import * as cartServices from '../services/cart.services.js'

export const GETCartById = async (req, res) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        res.render('cart', {cart})
    }
    catch (e) {
        res.status(502).send({ error: true, msg: e.message })
    }
}