import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js';
import ProductManager from './productManager.js';
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";

const app = express();

const manager = new ProductManager('preentrega1/src/db/products.json')

const httpServer = HTTPServer(app) 

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.use(express.static(`${__dirname}/public`))

app.get("/", async (req, res) => {
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

app.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.render('realTimeProducts', {products});
    }
    catch(e) {
        res.status(502).send({error: true, msg: e.message})
    }
})

httpServer.listen(8080, ()=> {
    console.log("Escuchando en puerto 8080...")
})

const io = new SocketIO(httpServer)

io.on('connection', async socket => {
    const products = await manager.getProducts()
    socket.emit('products', products)
})

app.post('/api/products')