import express from 'express';
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.listen(8080, ()=> {
    console.log("Escuchando en puerto 8080...")
})