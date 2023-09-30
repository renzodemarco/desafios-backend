import { Router } from "express";
import { isAdmin } from '../utils/auth.middlewares.js'
import passportCall from "../utils/passport.call.js"
import * as productController from '../controllers/product.controller.js'


const productsRouter = Router();

productsRouter.get('/', productController.GETProducts)
.get('/:pid', productController.GETProductById)
.post('/', passportCall('current'), isAdmin, productController.POSTProduct)
.put('/:pid', passportCall('current'), isAdmin, productController.PUTProduct)
.delete('/:pid', passportCall('current'), isAdmin, productController.DELETEProduct)

export default productsRouter