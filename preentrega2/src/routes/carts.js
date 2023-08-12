import {Router} from 'express';
import CartManager from '../dao/mongo/cartManager.js';

const manager = new CartManager('desafio04/src/db/carts.json');

const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await manager.getCartById(Number(cid));
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const {products} = req.body;
        const cart = await manager.addCart(products)
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cart = await manager.addProduct(Number(cid), Number(pid))
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }

})

export default cartRouter