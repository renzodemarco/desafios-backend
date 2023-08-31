import { Router } from 'express'
import { isLogged} from '../utils/auth.middlewares.js'
import UserManager from '../dao/mongo/userManager.js'
import passport from 'passport'

const sessionRouter = Router()

const manager = new UserManager()

sessionRouter.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/products');
    res.redirect('/login')
})

sessionRouter.get('/login', isLogged, (req, res) => {
    const {retry} = req.query
    res.render('login', {retry})
})

sessionRouter.post('/login',
    passport.authenticate('login',
        {
            successRedirect: '/products',
            failureRedirect: '/login?retry=true',
            failureFlash: true
        }),
async (req, res) => {
})

sessionRouter.get('/register', isLogged, (req, res) => {
    const {error} = req.query
    res.render('register', {error})
})

sessionRouter.post('/register', 
    passport.authenticate('register', 
        {
            successRedirect: '/login',
            failureRedirect: '/register?error=true',
            failureFlash: true
        }),
    async (req, res) => {
})

sessionRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.redirect('/')
    });
})

export default sessionRouter