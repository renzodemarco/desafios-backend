import { CartDAO, ProductDAO } from "../dao/index.js";
import dictionary from '../utils/error.dictionary.js'
import CustomError from '../utils/error.custom.js'

const cartManager = new CartDAO()
const productManager = new ProductDAO()

export const getCarts = async (next) => {
    try {
        return await cartManager.getCarts(next)
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const getCartById = async (id, next) => {
    try {
        const cart = await cartManager.getCartById(id, next)

        if (!cart) return CustomError.new(dictionary.cartNotFound)

        return cart
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const createCart = async (next) => {
    try {
        return await cartManager.createCart(next)
    }
    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const addProductToCart = async (cartId, prodId, next) => {
    try {
        const cart = await cartManager.getCartById(cartId, next)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId, next)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        return await cartManager.addProductToCart(cartId, prodId)
    }

    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const deleteProductFromCart = async (cartId, prodId, next) => {
    try {
        const cart = await cartManager.getCartById(cartId, next)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId, next)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        const updatedCart = await cartManager.deleteProductFromCart(cartId, prodId) 

        if (!updatedCart) return CustomError.new(dictionary.notFoundInCart)

        return updatedCart
    }

    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const deleteAllProducts = async (cartId, next) => {
    try {
        const cart = await cartManager.getCartById(cartId, next)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        return await cartManager.deleteAllProducts(cartId, next)
    }

    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const updateCart = async (cartId, products, next) => {
    try {
        const cart = await cartManager.getCartById(cartId, next)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const verifyProducts = await Promise.all(products.map(async (prod, next) => {
                const product = await productManager.getProductById(prod.product._id, next);
                return product !== null
        }))
    
        const validProducts = verifyProducts.every(result => result === true);
    
        if (!validProducts) return CustomError.new(dictionary.notValidProducts)
    
        return await cartManager.updateCart(cartId, products, next)
    }

    catch(error) {
        error.from = 'services'
        return next(error)
    }
}

export const updateProdQuantity = async (cartId, prodId, quantity, next) => {
    try {
        if (isNaN(quantity)) return CustomError.new(dictionary.notValidValues)

        const cart = await cartManager.getCartById(cartId, next)
        
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId, next)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        const updatedCart = await cartManager.updateProdQuantity(cartId, prodId, quantity, next)
    
        if (!updatedCart) return CustomError.new(dictionary.notFoundInCart)
    
        return updatedCart
    }

    catch(error) {
        error.from = 'services'
        return next(error)
    }
}