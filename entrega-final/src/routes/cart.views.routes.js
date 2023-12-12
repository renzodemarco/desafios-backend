import { Router } from 'express';
import * as cartController from '../controllers/cart.views.controller.js'
import passportCall from "../middlewares/passport.call.js";
import { userAuth, isCartOwner } from '../middlewares/auth.middlewares.js'

const cartViewsRouter = Router();

cartViewsRouter.get('/', passportCall('current'), userAuth, isCartOwner, cartController.GETCartById)

export default cartViewsRouter