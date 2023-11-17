import {Router} from 'express'
import * as cartController from '../controllers/cart.controller.js'
import { isCartOwner } from '../utils/middlewares/auth.middlewares.js'
import passportCall from "../utils/middlewares/passport.call.js";

const cartRouter = Router()

cartRouter.get('/', cartController.GETCarts)
.get('/:cid', cartController.GETCartById)
.post('/', cartController.POSTCart)
.post('/:cid/products/:pid', passportCall('current'), isCartOwner, cartController.POSTProductToCart)
.delete('/:cid/products/:pid', passportCall('current'), isCartOwner, cartController.DELETEProductFromCart)
.delete('/:cid', cartController.DELETEAllProducts)
.put('/:cid', cartController.PUTCart)
.put('/:cid/products/:pid', cartController.PUTProductQuantity)

export default cartRouter