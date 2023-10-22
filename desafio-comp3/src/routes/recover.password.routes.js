import { Router } from "express"
import * as recoverPassController  from '../controllers/recover.password.controller.js'

const recoverPassRouter = Router();

recoverPassRouter.get('/request', recoverPassController.GETRecoverPassRequest)
.post('/request', recoverPassController.POSTRecoverPassRequest) 
.get('/check', recoverPassController.GETCheckMail)
.get('/', recoverPassController.GETRecoverPass )
.post('/', recoverPassController.POSTRecoverPass)  // POST para cambiar contraseña


export default recoverPassRouter