import {Router} from 'express';
import * as cartController from '../controllers/cart.views.controller.js'

const cartViewsRouter = Router();

cartViewsRouter.get('/:cid', cartController.GETCartById)

export default cartViewsRouter