import { Router } from 'express';
import { isCartOwner } from '../middlewares/auth.middlewares.js'
import * as cartController from '../controllers/cart.views.controller.js'
import passportCall from "../middlewares/passport.call.js";

const cartViewsRouter = Router();

cartViewsRouter.get('/:cid', passportCall('current'), isCartOwner, cartController.GETCartById)

export default cartViewsRouter