import { Router } from "express";
import ProductManager from "../productManager.js";

const manager = new ProductManager('preentrega1/src/db/products.json')

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

export default productsViewsRouter