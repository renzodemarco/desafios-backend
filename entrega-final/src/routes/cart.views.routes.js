import { Router } from 'express';
import * as cartController from '../controllers/cart.views.controller.js'
import passportCall from "../middlewares/passport.call.js";

const cartViewsRouter = Router();

cartViewsRouter.get('/', passportCall('current'), cartController.GETCartById)

export default cartViewsRouter