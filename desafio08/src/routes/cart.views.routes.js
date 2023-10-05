import { Router } from 'express';
import { isCartOwner } from '../utils/auth.middlewares.js'
import * as cartController from '../controllers/cart.views.controller.js'
import passportCall from "../utils/passport.call.js";

const cartViewsRouter = Router();

cartViewsRouter.get('/:cid', passportCall('current'), isCartOwner, cartController.GETCartById)
.get('/:cid/purchase', passportCall('current'), isCartOwner, cartController.GETCartPurchase)
.post('/:cid/purchase', passportCall('current'), isCartOwner, cartController.POSTCartPurchase)

export default cartViewsRouter