import * as cartServices from '../services/cart.services.js'

export const GETCartById = async (req, res, next) => {
    try {
        const cartId = req.user.cart._id
        const cart = await cartServices.getCartById(cartId);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        cart.cartPrice = cart.products.reduce((acc, cur) => acc + cur.totalPrice, 0)
        return res.render('cart', {cart})
    }
    catch(error) {
        error.from = 'controller'
        return next(error)
    }
}
