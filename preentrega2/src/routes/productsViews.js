import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";

const manager = new ProductManager()

const productsViewsRouter = Router();

productsViewsRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const products = await manager.getProducts({limit: Number(limit), page: Number(page), sort, query});
        const { docs, ...data} = products
        data.nextLink = data.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${data.nextPage}` : null
        data.prevLink = data.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${data.prevPage}` : null
        res.render('products', { products: docs })
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

export default productsViewsRouter 