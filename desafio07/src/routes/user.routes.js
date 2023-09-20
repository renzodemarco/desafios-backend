import {Router} from 'express'
import * as userController from '../controllers/user.controller.js'
import passportCall from '../utils/passport.call.js'

const userRouter = Router()

userRouter.get('/', userController.GETUsers)
.get('/current', passportCall('current'), userController.GETCurrentUser)
.post('/register', passportCall('register'), userController.POSTPassportUser)
.post('/login', userController.POSTUserValidation)

export default userRouter