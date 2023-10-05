import { Router } from "express";
import * as mockingProductsController from '../controllers/mocking.product.controller.js'


const mockingProductsRouter = Router();

mockingProductsRouter.get('/', mockingProductsController.GETMockingProducts)

export default mockingProductsRouter