import { Router } from "express";
import passportCall from "../middlewares/passport.call.js";
import { isAdminOrPremium } from "../middlewares/auth.middlewares.js";
import * as productController from '../controllers/product.views.controller.js'

const productsViewsRouter = Router();

productsViewsRouter.get('/', passportCall('current'), productController.GETProducts)
.get('/create', passportCall('current'), isAdminOrPremium, productController.GETCreateProduct)
.get('/edit/:pid', passportCall('current'), isAdminOrPremium, productController.GETEditProduct)

export default productsViewsRouter 