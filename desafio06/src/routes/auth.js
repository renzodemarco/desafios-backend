import { Router } from 'express'
import passport from 'passport'

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
    passport.authenticate('github',
        {
            failureRedirect: '/login?retry=true',
            successRedirect: '/products'
        }
    ), (req, res) => {
    }
)

export default authRouter