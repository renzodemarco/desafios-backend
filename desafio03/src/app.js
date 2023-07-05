import ProductManager from "./productManager.js";
import express from 'express';

const app = express();

const manager = new ProductManager();

app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
    const someProducts = products.slice(0, Number(limit));
    res.send(someProducts);
    } else res.send(products);
})

app.get('/products/:pid', async (req, res) => {
    const products = await manager.getProducts();
    const {pid} = req.params;
    const product = products.find(prod => prod.id === Number(pid));
    res.send(product ? product : "Product not found")
})

app.listen(8080, ()=> {
    console.log("Escuchando en puerto 8080...")
})