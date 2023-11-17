import { Router } from "express"
import passportCall from '../middlewares/passport.call.js'
import * as mockingProductsController from '../controllers/mocking.product.controller.js'


const mockingProductsRouter = Router();

mockingProductsRouter.get('/', passportCall('current'), mockingProductsController.GETMockingProducts)

export default mockingProductsRouter