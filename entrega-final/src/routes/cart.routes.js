import {Router} from 'express'
import * as cartController from '../controllers/cart.controller.js'
import { isAdmin, isNotProductOwner, isUser } from '../middlewares/auth.middlewares.js'
import passportCall from "../middlewares/passport.call.js";

const cartRouter = Router()

cartRouter
// user routes (se trabaja siempre con)
.get('/', passportCall('current'), isUser, cartController.GETOwnCart)
.post('/', passportCall('current'), isUser, cartController.POSTCart)
.post('/:pid', passportCall('current'), isNotProductOwner, cartController.POSTProductToOwnCart)
.put('/:pid', passportCall('current'), cartController.PUTProductQuantityFromOwnCart)
.delete('/', passportCall('current'), cartController.DELETEAllProductsFromOwnCart)
.delete('/:pid', passportCall('current'), cartController.DELETEProductFromOwnCart)

// admin routes (se debe indicar qué cart se quiere modificar)
.get('/:cid', passportCall('current'), isAdmin, cartController.GETCartById)
.put('/:cid', passportCall('current'), isAdmin, cartController.PUTCart)
.post('/:cid/products/:pid', passportCall('current'), isAdmin, cartController.POSTProductToCart)
.delete('/:cid/products/:pid', passportCall('current'), isAdmin, cartController.DELETEProductFromCart)
.put('/:cid/products/:pid', passportCall('current'), isAdmin, cartController.PUTProductQuantity)

export default cartRouter 