import * as cartServices from '../services/cart.services.js'
import * as productServices from '../services/product.services.js'

export const isLogged = (req, res, next,) => {
    if (req.user) return res.redirect('/products');
    next()
}

export const userAuth = (req, res, next) => {
    if (!req.user) return res.redirect('/login');
    next()
}

export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin" || !req.user) {
        const error = new Error("Not Authorized")
        error.status = 403
        error.from = "middleware isAdmin"
        return next(error)
    }
    next()
}

export const isAdminOrPremium = (req, res, next) => {
    const authorized = ['admin', 'premium']
    if (!req.user || !authorized.includes(req.user.role)) {
        const error = new Error("Not Authorized")
        error.status = 403
        error.from = "middleware isAdminOrPremium"
        return next(error)
    }
    console.log("IS ADMIN OR PREMIUM OK")
    next()
}

export const isAdminOrOwner = async (req, res, next) => {
    try {
        if (req.user === 'admin') return next()
        const product = await productServices.getProductById(req.params.pid, next)
        if (req.user._id.toString() !== product.owner) {
            const error = new Error("Not Authorized")
            error.status = 403
            error.from = "middleware isAdminOrOwner"
            return next(error)
        }
        next()
    }
    catch(error) {
        error.from = "middleware isAdminOrOwner"
        next(error)
    }
}

export const isUser = (req, res, next) => {
    if (req.user?.role !== "user" || !req.user) return res.status(403).send({ error: true, msg: "Not Authorized" });
    next()
}

export const isCartOwner = async (req, res, next) => {
    const cart = await cartServices.getCartById(req.params.cid, next)
    if (!req.user?._id === cart.owner._id) {
        const error = new Error("Not Cart Owner")
        error.status = 403
        error.from = "middleware isCartOwner"
        return next(error)
    }
    next()
}