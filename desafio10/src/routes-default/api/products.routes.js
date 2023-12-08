import MyRouter from "../router.js"
import ProductsController from "../../controllers/products.controller.js"

const controller = new ProductsController()
const { create, read, destroy, update } = controller

export default class ProductsRouter extends MyRouter {

    init() {
        this.create('/', create) 

        this.read('/', read)

        this.update('/:id', update)

        this.destroy('/:id', destroy)
    }
}