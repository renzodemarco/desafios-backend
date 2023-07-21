import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js';
import productsViewsRouter from './routes/productsViews.js';
import ProductManager from './productManager.js';
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";

const manager = new ProductManager('preentrega1/src/db/products.json')

const app = express();

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

app.use('/', productsViewsRouter)

app.use(express.static(`${__dirname}/public`))


httpServer.listen(8080, ()=> {
    console.log("Escuchando en puerto 8080...")
})

const io = new SocketIO(httpServer)

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado`)
})