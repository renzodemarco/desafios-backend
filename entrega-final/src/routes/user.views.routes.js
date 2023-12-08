import { Router } from 'express'
import passportCall from '../middlewares/passport.call.js'
import { isLogged, userAuth } from '../middlewares/auth.middlewares.js'
import * as userController from '../controllers/user.views.controller.js'

const userViewsRouter = Router()

userViewsRouter.get('/', passportCall('current'), isLogged, userAuth)
.get('/login', passportCall('current'), isLogged, userController.GETLoginView)
.get('/register', passportCall('current'), isLogged, userController.GETRegisterView)



export default userViewsRouter