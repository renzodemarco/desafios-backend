import {Router} from 'express'
import * as cartController from '../controllers/cart.controller.js'

const cartRouter = Router()

cartRouter.get('/', cartController.GETCarts)
.get('/:cid', cartController.GETCartById)
.post('/', cartController.POSTCart)
.post('/:cid/products/:pid', cartController.POSTProductToCart)
.delete('/:cid/products/:pid', cartController.DELETEProductFromCart)
.delete('/:cid', cartController.DELETEAllProducts)
.put('/:cid', cartController.PUTCart)
.put('/:cid/products/:pid', cartController.PUTProductQuantity)

export default cartRouter