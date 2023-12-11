import { Router } from 'express'
import passport from 'passport'
import * as userController from '../controllers/user.controller.js'
import { isUser } from '../middlewares/auth.middlewares.js'
import passportCall from '../middlewares/passport.call.js'

const authRouter = Router()

authRouter.post('/register', passportCall('register'), userController.POSTPassportUser)
.post('/login', userController.POSTUserValidation)
.get('/current', passportCall('current'), userController.GETCurrentUser)
.post('/signout', passportCall('current'), userController.POSTLogout)
.get('/github', passport.authenticate('github', { scope: ['user: email'] }))
.put('/prem', passportCall('current'), isUser, userController.PUTRole)
.post('/request', passportCall('current'), userController.POSTRecoverPassRequest) 
.put('/', userController.PUTRecoverPass)
.delete('/', passportCall('current'), userController.DELETEUser)

export default authRouter