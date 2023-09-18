import {Router} from 'express';
import CartManager from '../dao/mongo/cartManager.js';

const manager = new CartManager('desafio04/src/db/carts.json');

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try {
        const cartList = await manager.getCartList()
        res.send(cartList)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await manager.getCartById(cid);
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const cart = await manager.addCart()
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cart = await manager.addProductToCart(cid, pid)
        res.send(cart)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const response = await manager.deleteProductFromCart(cid, pid);
        res.send(response)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.put('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const newProducts = req.body;
        const response = await manager.updateCart(cid, newProducts);
        res.send(response)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        const response = await manager.updateProdQuantity(cid, pid, quantity)
        res.send(response)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const response = await manager.deleteAllProducts(cid)
        res.send(response)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default cartRouter