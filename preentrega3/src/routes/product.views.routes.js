import { Router } from "express";
import passportCall from "../utils/passport.call.js";
import { userAuth } from "../utils/auth.middlewares.js";
import * as productController from '../controllers/product.views.controller.js'

const productsViewsRouter = Router();

productsViewsRouter.get('/', passportCall('current'), userAuth, productController.GETProducts)

export default productsViewsRouter 