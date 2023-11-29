import { Router } from "express";
import passportCall from "../middlewares/passport.call.js"
import { isAdmin, isCartOwner } from '../middlewares/auth.middlewares.js'
import * as ticketController from '../controllers/ticket.controller.js'


const ticketRouter = Router();

ticketRouter.get('/', passportCall('current'), isAdmin, ticketController.GETTickets)
.post('/:cid/purchase', passportCall('current'), isCartOwner, ticketController.POSTTicket)

export default ticketRouter