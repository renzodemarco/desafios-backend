import { Router } from 'express'
import { isLogged } from '../utils/auth.middlewares.js'

const sessionRouter = Router()

sessionRouter.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/products');
    res.redirect('/login')
})

sessionRouter.get('/login', isLogged, (req, res) => {
    const {retry} = req.query
    res.render('login', {retry})
})

sessionRouter.get('/register', isLogged, (req, res) => {
    const {error} = req.query
    res.render('register', {error})
})

sessionRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.redirect('/')
    });
})

export default sessionRouter