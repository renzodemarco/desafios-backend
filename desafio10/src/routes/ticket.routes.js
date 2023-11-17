import { Router } from "express";
import passportCall from "../middlewares/passport.call.js"
import { isAdmin } from '../middlewares/auth.middlewares.js'
import * as ticketController from '../controllers/ticket.controller.js'


const ticketRouter = Router();

ticketRouter.get('/', passportCall('current'), isAdmin, ticketController.GETTickets)

export default ticketRouter