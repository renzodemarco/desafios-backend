import { Router } from "express";
import passportCall from "../middlewares/passport.call.js"
import { isCartOwner, userAuth } from '../middlewares/auth.middlewares.js'
import * as ticketController from '../controllers/ticket.views.controller.js'


const ticketRouter = Router();

ticketRouter.get('/purchase', passportCall('current'), userAuth, isCartOwner, ticketController.GETTicketById)

export default ticketRouter