import { Router } from "express";
import { isAdminOrPremium, isAdminOrOwner } from '../middlewares/auth.middlewares.js'
import passportCall from "../middlewares/passport.call.js"
import * as productController from '../controllers/product.controller.js'


const productsRouter = Router();

productsRouter.get('/', productController.GETProducts)
.get('/:pid', productController.GETProductById)
.post('/', passportCall('current'), isAdminOrPremium, productController.POSTProduct)
.put('/:pid', passportCall('current'), isAdminOrPremium, isAdminOrOwner, productController.PUTProduct)
.delete('/:pid', passportCall('current'), isAdminOrPremium, isAdminOrOwner, productController.DELETEProduct)

export default productsRouter