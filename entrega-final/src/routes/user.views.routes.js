import { Router } from 'express'
import passportCall from '../middlewares/passport.call.js'
import { isLogged, userAuth } from '../middlewares/auth.middlewares.js'
import * as userController from '../controllers/user.views.controller.js'
import * as recoverPassController from '../controllers/recover.password.controller.js'

const userViewsRouter = Router()

userViewsRouter.get('/', passportCall('current'), isLogged, userAuth)
.get('/login', passportCall('current'), isLogged, userController.GETLoginView)
.get('/register', passportCall('current'), isLogged, userController.GETRegisterView)
.get('/logout', passportCall('current'), userAuth, userController.GETSignoutView)
.get('/recover-password/request', recoverPassController.GETRecoverPassRequest)
.get('/recover-password', recoverPassController.GETRecoverPass )



export default userViewsRouter