import { Router } from 'express'
import passport from 'passport'

const sessionRouter = Router()

sessionRouter.get('/', (req, res) => {
    res.redirect('/login')
})

sessionRouter.get('/login', (req, res) => {
    const {retry} = req.query
    res.render('login', {retry})
})

sessionRouter.get('/register', (req, res) => {
    const {error} = req.query
    res.render('register', {error})
})

sessionRouter.post('/register', 
    passport.authenticate('register', 
        {
            successRedirect: '/login',
            failureRedirect: '/register?error=true',
            session: false
        }),
    async (req, res) => {
})

sessionRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.clearCookie('accessToken')
        res.redirect('/')
    });
})



export default sessionRouter