import { Router } from 'express'
import passport from 'passport'
import * as authController from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.get('/github', passport.authenticate('github', { scope: ['user: email'] }))
.get('/github/callback', passport.authenticate('github'), authController.GETGithubCallback)

export default authRouter