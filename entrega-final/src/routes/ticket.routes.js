import { Router } from "express";
import passportCall from "../middlewares/passport.call.js"
import { isAdmin, isUser } from '../middlewares/auth.middlewares.js'
import * as ticketController from '../controllers/ticket.controller.js'


const ticketRouter = Router();

ticketRouter.get('/', passportCall('current'), isUser, ticketController.GETTicket)
.get('/all', passportCall('current'), isAdmin, ticketController.GETAllTickets)
.post('/', passportCall('current'), isUser, ticketController.POSTTicket)

export default ticketRouter