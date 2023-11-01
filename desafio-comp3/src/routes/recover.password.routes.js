import { Router } from "express"
import * as recoverPassController  from '../controllers/recover.password.controller.js'

const recoverPassRouter = Router();

recoverPassRouter.get('/request', recoverPassController.GETRecoverPassRequest)
.post('/request', recoverPassController.POSTRecoverPassRequest) 
.get('/', recoverPassController.GETRecoverPass )
.put('/', recoverPassController.PUTRecoverPass)


export default recoverPassRouter