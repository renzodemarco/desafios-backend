import { Router } from "express";
import { isAdminOrPremium, isAdminOrOwner, isNotProductOwner, isCartOwner } from '../middlewares/auth.middlewares.js'
import passportCall from "../middlewares/passport.call.js"
import * as productController from '../controllers/product.controller.js'


const productsRouter = Router();

productsRouter.get('/', productController.GETProducts)
.get('/:pid', productController.GETProductById)
.post('/', passportCall('current'), isAdminOrPremium, isCartOwner, isNotProductOwner, productController.POSTProduct)
.put('/:pid', passportCall('current'), isAdminOrPremium, isCartOwner, isAdminOrOwner, productController.PUTProduct)
.delete('/:pid', passportCall('current'), isAdminOrPremium, isCartOwner, isAdminOrOwner, productController.DELETEProduct)

export default productsRouter