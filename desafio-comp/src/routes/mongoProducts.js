import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";
import mongoose from "mongoose";

const manager = new ProductManager()

const mongoProductsRouter = Router();

mongoProductsRouter.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await manager.getProducts(limit);
        res.render('home-mongo', {products})
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

mongoProductsRouter.post('/products', async (req, res) => {
    try {
        const data = req.body
        const newProduct = await manager.addProduct(data)
        const updatedList = await manager.getProducts()
        req.io.emit('actualizacion', updatedList)
        res.send(newProduct)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})


export default mongoProductsRouter