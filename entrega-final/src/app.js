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
import ticketViewsRouter from './routes/ticket.views.routes.js';
import ticketRouter from './routes/ticket.routes.js';
import authRouter from './routes/user.routes.js';
import passport from 'passport';
import initPassportStrategy from './config/passport.config.js'
import env from './config/env.config.js'
import errorHandler from './middlewares/error.handler.js';
import notFoundHandler from './middlewares/not.found.handler.js';
import loggerMW from './middlewares/logger.middlewares.js'
import MongoConnection from './utils/db.connection.js'
import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import config from './config/swagger.js'
import cors from 'cors'


const app = express();

const PORT = env.PORT || 9090

const specs = swaggerJSDoc(config)

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))
app.use(cors())

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

app.use('/api/auth', authRouter)

app.use('/api/tickets', ticketRouter)

app.use('/products', productsViewsRouter)

app.use('/carts', cartViewsRouter)

app.use('/tickets', ticketViewsRouter)

app.use('/docs', serve, setup(specs))

app.use('/', userViewsRouter)

app.use(errorHandler)

app.use(notFoundHandler)

app.listen(PORT, () => {
    MongoConnection.getInstance()
    console.log("Escuchando en puerto " + PORT)
})