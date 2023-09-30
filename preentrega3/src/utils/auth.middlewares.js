import * as cartServices from '../services/cart.services.js'
import mongoose from 'mongoose';

export const isLogged = (req, res, next,) => {
    if (req.user) return res.redirect('/products');
    next()
}

export const userAuth = (req, res, next) => {
    if (!req.user) return res.redirect('/login');
    next()
}

export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin" || !req.user) return res.status(403).send({ auth: false, msg: "Not admin" });
    next()
}

export const isUser = (req, res, next) => {
    if (req.user?.role !== "user" || !req.user) return res.status(403).send({ auth: false, msg: "Not user" });
    next()
}

export const isCartOwner = async (req, res, next) => {
    const cart = await cartServices.getCartById(req.params.cid)
    if (!req.user?._id.equals(cart.owner._id)) {
        return res.status(403).send({ auth: false, msg: "Not cart owner" })
    }
    next()
}