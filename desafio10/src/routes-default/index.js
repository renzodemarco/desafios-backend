import MyRouter from "./router.js";
import ProductsRouter from "./api/products.routes.js";

let products = new ProductsRouter()
products = products.getRouter()

export default class IndexRouter extends MyRouter {
    init() {
        this.use('/products', products)
    }
}