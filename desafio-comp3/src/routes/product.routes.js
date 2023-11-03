import { Router } from "express";
import { isAdminOrPremium, isAdminOrOwner } from '../utils/middlewares/auth.middlewares.js'
import passportCall from "../utils/middlewares/passport.call.js"
import * as productController from '../controllers/product.controller.js'


const productsRouter = Router();

productsRouter.get('/', productController.GETProducts)
.get('/:pid', productController.GETProductById)
.post('/', passportCall('current'), isAdminOrPremium, productController.POSTProduct)
.put('/:pid', passportCall('current'), isAdminOrOwner, productController.PUTProduct)
.delete('/:pid', passportCall('current'), isAdminOrOwner, productController.DELETEProduct)

export default productsRouter