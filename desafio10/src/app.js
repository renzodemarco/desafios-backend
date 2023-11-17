import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import productsRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js';
import productsViewsRouter from './routes/product.views.routes.js';
import cartViewsRouter from './routes/cart.views.routes.js';
import userViewsRouter from './routes/user.views.routes.js';
import userRouter from './routes/user.routes.js'
import chatRouter from './routes/chat.routes.js'
import ticketRouter from './routes/ticket.routes.js';
import passport from 'passport';
import initPassportStrategy from './config/passport.config.js'
import authRouter from './routes/auth.routes.js';
import env from './config/env.config.js'
import mockingProductsRouter from './routes/mocking.products.routes.js';
import errorHandler from './middlewares/error.handler.js';
import loggerMW from './middlewares/logger.middlewares.js'
import loggerRouter from './routes/loggers.routes.js';
import recoverPassRouter from './routes/recover.password.routes.js';

const app = express();

const PORT = env.PORT || 9090

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))

app.use(session({
    secret: 'qwerty1234',
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: env.MONGO_URI,
        ttl: 3600
    })
}))

initPassportStrategy()
app.use(passport.initialize())
app.use(passport.session()) 

app.use(loggerMW)

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.use('/api/sessions', userRouter)

app.use('/products', productsViewsRouter)

app.use('/carts', cartViewsRouter)

app.use('/', userViewsRouter)

app.use('/auth', authRouter)

app.use('/chat', chatRouter)

app.use('/tickets', ticketRouter)

app.use('/mockingproducts', mockingProductsRouter)

app.use('/api/loggers', loggerRouter)

app.use('/recover-password', recoverPassRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Escuchando en puerto " + PORT)
})