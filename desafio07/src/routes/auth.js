import { Router } from 'express'
import passport from 'passport'
import { generateToken } from '../utils/jwt.js'

const authRouter = Router()

authRouter.get('/github',
    passport.authenticate('github',
    {
        scope: ['user: email']
    }),
    (req, res) => {
    }
)

authRouter.get('/github/callback', 
    passport.authenticate('github'),
    (req, res) => {
        const user = req.user
        const token = generateToken({
            sub: user._id, 
            user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
        })

        res.cookie('accessToken', token, {
            maxAge: 1000 * (60*60),
            httpOnly: true
        })

        res.redirect('/products')
    }
)

export default authRouter