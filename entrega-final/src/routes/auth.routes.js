import { Router } from 'express'
import passport from 'passport'
import * as authController from '../controllers/auth.controller.js'
import * as userController from '../controllers/user.controller.js'
import * as recoverPassController  from '../controllers/recover.password.controller.js'
import { isUser } from '../middlewares/auth.middlewares.js'
import passportCall from '../middlewares/passport.call.js'

const authRouter = Router()

authRouter.post('/register', passportCall('register'), userController.POSTPassportUser)
.post('/login', userController.POSTUserValidation)
.post('/signout', userController.POSTLogout)
.get('/github', passport.authenticate('github', { scope: ['user: email'] }))
.get('/github/callback', passport.authenticate('github'), authController.GETGithubCallback)
.put('/prem', passportCall('current'), isUser, userController.PUTRole)
.post('/request', passportCall('current'), recoverPassController.POSTRecoverPassRequest) 
.put('/', recoverPassController.PUTRecoverPass)
.delete('/', passportCall('current'), authController.DELETEUser)

export default authRouter