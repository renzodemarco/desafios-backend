import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";

const manager = new ProductManager()

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query = [] } = req.query;
        const data = await manager.getProducts({limit: Number(limit), page: Number(page), sort, query});
        data.nextLink = data.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${data.nextPage}` : null
        data.prevLink = data.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${data.prevPage}` : null
        res.send(data)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
        const product = await manager.getProductById(pid)
        res.send(product)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const product = await manager.addProduct(data)
        res.send(product)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        const data = req.body
        const product = await manager.updateProduct(pid, data)
        res.send(product)
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params
    const product = await manager.deleteProduct(pid)
    res.send(product)
})

export default productsRouter 