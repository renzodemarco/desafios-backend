import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";
import passportCall from "../utils/passport.call.js";
import { userAuth } from "../utils/auth.middlewares.js";

const manager = new ProductManager()

const productsViewsRouter = Router();

productsViewsRouter.get('/', passportCall('current', {session: false}), async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const products = await manager.getProducts({limit: Number(limit), page: Number(page), sort, query});
        const { docs, ...data} = products
        const {first_name, last_name, role} = req.user 
        const admin = (role === 'admin') ? true : false
        res.render('products', { products: docs, first_name, last_name, admin})
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default productsViewsRouter 