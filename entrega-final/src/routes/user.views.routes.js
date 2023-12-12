import { Router } from 'express'
import passportCall from '../middlewares/passport.call.js'
import passport from 'passport'
import { isLogged } from '../middlewares/auth.middlewares.js'
import * as userController from '../controllers/user.views.controller.js'

const userViewsRouter = Router()

userViewsRouter.get('/', passportCall('current'), userController.GETIndexView)
.get('/login', passportCall('current'), isLogged, userController.GETLoginView)
.get('/register', passportCall('current'), isLogged, userController.GETRegisterView)
.get('/api/auth/github/callback', passport.authenticate('github'), userController.GETGithubCallback)
.get('/recover-password/request', userController.GETRecoverPassRequest)
.get('/recover-password', userController.GETRecoverPass)



export default userViewsRouter