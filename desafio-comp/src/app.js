import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js';
import productsViewsRouter from './routes/productsViews.js';
import mongoProductsRouter from './routes/mongoProducts.js'
import chatRouter from './routes/chat.js';
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import ChatManager from './dao/mongo/chatManager.js';

const app = express();

const httpServer = HTTPServer(app)

const io = new SocketIO(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.use('/products', productsViewsRouter)

app.use('/mongo/products', mongoProductsRouter)

app.use('/chat', chatRouter)

app.use(express.static(`${__dirname}/public`))

const manager = new ChatManager()

io.on('connection', async socket => {
    console.log(`Cliente ${socket.id} conectado`)
    socket.on('enviarMsg', async msg => {
        await manager.sendMsg(msg)
        socket.broadcast.emit('recibirMsg', msg)
    })
})

httpServer.listen(8080, () => {
    console.log("Escuchando en puerto 8080...")
})