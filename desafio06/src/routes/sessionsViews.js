import {Router} from 'express'
import UserManager from '../dao/mongo/userManager.js'

const sessionRouter = Router()

const manager = new UserManager()

const isLogged = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next()
}

sessionRouter.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/products');
    res.redirect('/login')
})

sessionRouter.get('/login', isLogged, (req, res) => {
    const {retry} = req.query
    res.render('login', {retry})
})

sessionRouter.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await manager.validarUser(username, password)
    if (!user) return res.redirect('/login?retry=true')
    delete user.password;
    delete user.salt;
    req.session.user = user;
    res.redirect('/products')
})

sessionRouter.get('/register', isLogged, (req, res) => {
    const {error} = req.query
    res.render('register', {error})
})

sessionRouter.post('/register', async (req, res) => {
    const {name, surname, email, username, password} = req.body
    const user = await manager.crearUser({name, surname, email, username, password})
    if (user.error) return res.redirect('/register?error=true')
    res.redirect('/products')
})

sessionRouter.get('/logout', (req, res) => {
    if (!req.session.user) res.redirect('/login')
    req.session.destroy()
    res.redirect('/')
})

export default sessionRouter