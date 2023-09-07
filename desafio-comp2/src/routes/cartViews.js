import {Router} from 'express';
import CartManager from '../dao/mongo/cartManager.js';

const manager = new CartManager('desafio04/src/db/carts.json');

const cartViewsRouter = Router();

cartViewsRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await manager.getCartById(cid);
        cart.products.forEach(prod => prod.totalPrice = prod.quantity * prod.product.price)
        res.render('cart', { products: cart.products, totalPrice: cart.products.totalPrice })
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default cartViewsRouter