import config from '../config/env.config.js'
import MongoConnection from '../utils/db.connection.js'

let CartDAO, ProductDAO, UserDAO

switch (config.persistence) {
    case "MONGO": 
    default: 
        const connection = MongoConnection.getInstance()
        const { default: cartManager } = await import('./mongo/cart.dao.js')
        const { default: productManager } = await import('./mongo/product.dao.js')
        const { default: userManager } = await import('./mongo/user.dao.js')
        CartDAO = cartManager
        ProductDAO = productManager
        UserDAO = userManager
}

export {CartDAO, ProductDAO, UserDAO}