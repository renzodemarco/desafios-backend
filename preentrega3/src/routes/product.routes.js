import { Router } from "express";
import * as productController from '../controllers/product.controller.js'


const productsRouter = Router();

productsRouter.get('/', productController.GETProducts)
.get('/:pid', productController.GETProductById)
.post('/', productController.POSTProduct)
.put('/:pid', productController.PUTProduct)
.delete('/:pid', productController.DELETEProduct)

export default productsRouter