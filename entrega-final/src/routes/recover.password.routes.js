import { Router } from "express"
import * as recoverPassController  from '../controllers/recover.password.controller.js'

const recoverPassRouter = Router();

recoverPassRouter.get('/request', recoverPassController.GETRecoverPassRequest)
.get('/', recoverPassController.GETRecoverPass )



export default recoverPassRouter