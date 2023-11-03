import { Router } from "express";
import passportCall from "../utils/middlewares/passport.call.js";
import { userAuth, isAdminOrPremium } from "../utils/middlewares/auth.middlewares.js";
import * as productController from '../controllers/product.views.controller.js'

const productsViewsRouter = Router();

productsViewsRouter.get('/', passportCall('current'), userAuth, productController.GETProducts)
.get('/create', passportCall('current'), isAdminOrPremium, productController.GETCreateProduct)
.get('/edit/:pid', passportCall('current'), isAdminOrPremium, productController.GETEditProduct)

export default productsViewsRouter 