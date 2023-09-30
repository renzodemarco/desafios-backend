import { Router } from "express";
import passportCall from "../utils/passport.call.js"
import * as ticketController from '../controllers/ticket.controller.js'


const ticketRouter = Router();

ticketRouter.get('/', passportCall('current'), isAdmin, ticketController.GETTickets)
.post('/', ticketController.POSTTicket)

export default ticketRouter