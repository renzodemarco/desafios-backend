import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import productsRouter from './routes/products.js'
import cartRouter from './routes/carts.js';
import productsViewsRouter from './routes/productsViews.js';
import cartViewsRouter from './routes/cartViews.js';
import sessionRouter from './routes/sessionsViews.js';

const app = express();

const httpServer = HTTPServer(app)

const io = new SocketIO(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(session({
    secret: 'qwerty1234',
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl: 3600
    })
}))

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.use('/products', productsViewsRouter)

app.use('/carts', cartViewsRouter)

app.use('/', sessionRouter)


httpServer.listen(8080, () => {
    console.log("Escuchando en puerto 8080...")
})