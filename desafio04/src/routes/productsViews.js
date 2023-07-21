import { Router } from "express";
import ProductManager from "../productManager.js";

const manager = new ProductManager('desafio04/src/db/products.json')

const productsViewsRouter = Router();

productsViewsRouter.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const {limit} = req.query;
        if (limit) {
            const someProducts = products.slice(0, Number(limit));
            res.render('home', {products: someProducts});
        } 
        else res.render('home', {products});
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

productsViewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts')
        const io = req.io;
        const products = await manager.getProducts()
        io.on('connection', ()=> {
            io.emit('actualizacion', products)
        })
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})


export default productsViewsRouter