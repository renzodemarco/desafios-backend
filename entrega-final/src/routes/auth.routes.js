import { Router } from 'express'
import passport from 'passport'
import * as authController from '../controllers/auth.controller.js'
import * as userController from '../controllers/user.controller.js'
import * as recoverPassController  from '../controllers/recover.password.controller.js'
import passportCall from '../middlewares/passport.call.js'

const authRouter = Router()

authRouter.post('/register', passportCall('register'), userController.POSTPassportUser)
.post('/login', userController.POSTUserValidation)
.get('/signout', userController.GETLogout)
.get('/github', passport.authenticate('github', { scope: ['user: email'] }))
.get('/github/callback', passport.authenticate('github'), authController.GETGithubCallback)
.put('/premium/:uid', userController.PUTRole)
.post('/request', recoverPassController.POSTRecoverPassRequest) 
.put('/', recoverPassController.PUTRecoverPass)

export default authRouter