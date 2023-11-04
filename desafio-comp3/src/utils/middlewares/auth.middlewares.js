import * as cartServices from '../../services/cart.services.js'
import * as productServices from '../../services/product.services.js'

export const isLogged = (req, res, next,) => {
    if (req.user) return res.redirect('/products');
    next()
}

export const userAuth = (req, res, next) => {
    if (!req.user) return res.redirect('/login');
    next()
}

export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin" || !req.user) return res.status(403).send({ error: true, msg: "Not Authorized" });
    next()
}

export const isAdminOrPremium = (req, res, next) => {
    const authorized = ['admin', 'premium']
    if (!authorized.includes(req.user?.role) || !req.user) return res.status(403).send({ error: true, msg: "Not Authorized" });
    next()
}

export const isAdminOrOwner = async (req, res, next) => {
    await isAdminOrPremium(req, res, async () => {
        try {
            const product = await productServices.getProductById(req.params.pid);

            if (!product) {
                return res.status(404).send({ error: true, msg: "Product not found" });
            }

            if (req.user._id?.toString() !== product.owner && req.user.role !== 'admin') {
                return res.status(403).send({ error: true, msg: "Not Product Owner" });
            }

            next();
        }
        catch (e) {
            return res.status(500).send({ error: true, msg: "Internal Server Error" })
        }
    })
}

export const isNotProductOwner = async (req, res, next) => {
        const product = await productServices.getProductById(req.params.pid)

        if (!product) {
            return res.status(404).send({ error: true, msg: "Product not found" });
        }

        if (req.user._id?.toString() === product.owner) {
            return res.status(403).send({ error: true, msg: "Can not add own product to cart" });
        }

        next()
}

export const isUser = (req, res, next) => {
    if (req.user?.role !== "user" || !req.user) return res.status(403).send({ error: true, msg: "Not Authorized" });
    next()
}

export const isCartOwner = async (req, res, next) => {
    const cart = await cartServices.getCartById(req.params.cid)
    if (!req.user?._id === cart.owner._id) {
        return res.status(403).send({ error: true, msg: "Not cart owner" })
    }
    next()
}