import { Router } from "express";
import passportCall from "../middlewares/passport.call.js"
import { isCartOwner } from '../middlewares/auth.middlewares.js'
import * as ticketController from '../controllers/ticket.views.controller.js'


const ticketRouter = Router();

ticketRouter.get('/:cid/purchase', passportCall('current'), isCartOwner, ticketController.GETTicketById)

export default ticketRouter