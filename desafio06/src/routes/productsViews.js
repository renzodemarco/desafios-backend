import { Router } from "express";
import { userAuth } from '../utils/auth.middlewares.js'
import ProductManager from "../dao/mongo/productManager.js";

const manager = new ProductManager()

const productsViewsRouter = Router();

productsViewsRouter.get('/', userAuth, async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const products = await manager.getProducts({limit: Number(limit), page: Number(page), sort, query});
        const { docs, ...data} = products
        const {name, surname, role} = req.user 
        const admin = (role === 'admin') ? true : false
        res.render('products', { products: docs, name, surname, admin})
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default productsViewsRouter 