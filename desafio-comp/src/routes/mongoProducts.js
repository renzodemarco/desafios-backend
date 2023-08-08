import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";

const manager = new ProductManager()

const mongoProductsRouter = Router();

mongoProductsRouter.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const {limit} = req.query;
        if (limit) {
            const someProducts = products.slice(0, Number(limit));
            // res.render('home-mongo', {products: someProducts});
            res.send(someProducts)
        } 
        else {
            // res.render('home-mongo', {products});
            res.send(products)
        }
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

mongoProductsRouter.get('/realtimeproducts', async (req, res) => {
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


export default mongoProductsRouter