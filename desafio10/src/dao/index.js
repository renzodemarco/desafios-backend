import config from '../config/env.config.js'

let CartDAO, ProductDAO, UserDAO

switch (config.persistence) {
    case "MONGO": 
        const { default: mongoCartManager } = await import('./mongo/cart.dao.js')
        const { default: mongoProductManager } = await import('./mongo/product.dao.js')
        const { default: mongoUserManager } = await import('./mongo/user.dao.js')
        CartDAO = mongoCartManager
        ProductDAO = mongoProductManager
        UserDAO = mongoUserManager
        break
    case "LOCAL": 
        const { default: localCartManager } = await import('./mongo/cart.dao.js')
        const { default: localProductManager } = await import('./mongo/product.dao.js')
        const { default: localUserManager } = await import('./mongo/user.dao.js')
        CartDAO = localCartManager
        ProductDAO = localProductManager
        UserDAO = localUserManager
        break
    default: 
        const { default: cartManager } = await import('./mongo/cart.dao.js')
        const { default: productManager } = await import('./mongo/product.dao.js')
        const { default: userManager } = await import('./mongo/user.dao.js')
        CartDAO = cartManager
        ProductDAO = productManager
        UserDAO = userManager
}

export { CartDAO, ProductDAO, UserDAO }