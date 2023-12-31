import * as cartServices from '../services/cart.services.js'

export const GETTicketById = async (req, res, next) => {
    try {
        const cart = await cartServices.getCartById(req.params.cid, next);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        return res.render('purchase', {cart})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}