import { Router } from "express";
import ProductManager from "../dao/fs/productManager.js";

const manager = new ProductManager("desafio04/src/db/products.json");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        const products = await manager.getProducts();
        const { limit } = req.query;
        if (limit) {
            const someProducts = products.slice(0, Number(limit));
            res.send(someProducts);
        } else res.send(products);
    } catch (e) {
        res.status(502).send({
            error: true,
            msg: e.message,
        });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const products = await manager.getProducts();
        const { pid } = req.params;
        const product = products.find((prod) => prod.id === Number(pid));
        res.send(product ? product : "Product not found");
    } catch (e) {
        res.status(502).send({
            error: true,
            msg: e.message,
        });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const info = req.body;
        const response = await manager.addProduct(info);
        const io = req.io;
        const updatedList = await manager.getProducts();
        io.emit('actualizacion', updatedList)
        res.send(response);
    } catch (e) {
        res.status(502).send({
            error: true,
            msg: e.message,
        });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const info = req.body;
        const response = await manager.updateProduct(Number(pid), info);
        const io = req.io;
        const updatedList = await manager.getProducts();
        io.emit('actualizacion', updatedList)
        res.send(response);
    } catch (e) {
        res.status(502).send({
            error: true,
            msg: e.message,
        });
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.deleteProduct(Number(pid));
        const io = req.io;
        const updatedList = await manager.getProducts();
        io.emit('actualizacion', updatedList)
        res.send(product);
    } catch (e) {
        res.status(502).send({
            error: true,
            msg: e.message,
        });
    }
});

export default productsRouter;
