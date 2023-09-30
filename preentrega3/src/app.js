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
import passport from 'passport';
import initPassportStrategy from './config/passport.config.js'
import authRouter from './routes/auth.routes.js';
import ENV_CONFIG from './config/env.config.js'

const app = express();

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
        mongoUrl: ENV_CONFIG.MONGO_URI,
        ttl: 3600
    })
}))

initPassportStrategy()
app.use(passport.initialize())
app.use(passport.session()) 

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

app.use('/api/sessions', userRouter)

app.use('/products', productsViewsRouter)

app.use('/carts', cartViewsRouter)

app.use('/', userViewsRouter)

app.use('/auth', authRouter)

app.use('/chat', chatRouter)


app.listen(8080, () => {
    console.log("Escuchando en puerto 8080...")
})