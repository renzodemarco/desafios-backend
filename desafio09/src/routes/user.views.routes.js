import { Router } from 'express'
import passportCall from '../utils/passport.call.js'
import { isLogged, userAuth } from '../utils/auth.middlewares.js'
import * as userController from '../controllers/user.views.controller.js'

const userViewsRouter = Router()

userViewsRouter.get('/', passportCall('current'), isLogged, userAuth)
.get('/login', passportCall('current'), isLogged, userController.GETLoginView)
.get('/register', passportCall('current'), isLogged, userController.GETRegisterView)
.get('/logout', userController.GETLogout)



export default userViewsRouter