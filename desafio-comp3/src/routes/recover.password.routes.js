import { Router } from "express"
import * as recoverPassController  from '../controllers/recover.password.controller.js'

const recoverPassRouter = Router();

recoverPassRouter.get('/request', recoverPassController.GETRecoverPassRequest)
.post('/request', recoverPassController.POSTRecoverPassRequest) 
.get('/', recoverPassController.GETRecoverPass )
.post('/', recoverPassController.POSTRecoverPass)


export default recoverPassRouter