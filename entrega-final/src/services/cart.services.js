import { CartDAO, ProductDAO } from "../dao/index.js";
import dictionary from '../utils/error.dictionary.js'
import CustomError from '../utils/error.custom.js'

const cartManager = new CartDAO()
const productManager = new ProductDAO()

export const getCarts = async () => {
    try {
        return await cartManager.getCarts()
    }
    catch(error) {
        throw error
    }
}

export const getCartById = async (id) => {
    try {
        const cart = await cartManager.getCartById(id)

        if (!cart) return CustomError.new(dictionary.cartNotFound)

        return cart
    }
    catch(error) {
        throw error
    }
}

export const createCart = async () => {
    try {
        return await cartManager.createCart()
    }
    catch(error) {
        throw error
    }
}

export const addProductToCart = async (cartId, prodId) => {
    try {
        const cart = await cartManager.getCartById(cartId)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        const response = await cartManager.addProductToCart(cartId, prodId)

        return response
    }

    catch(error) {
        throw error
    }
}

export const deleteProductFromCart = async (cartId, prodId) => {
    try {
        const cart = await cartManager.getCartById(cartId)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        const updatedCart = await cartManager.deleteProductFromCart(cartId, prodId) 

        if (!updatedCart) return CustomError.new(dictionary.notFoundInCart)

        return updatedCart
    }

    catch(error) {
        throw error
    }
}

export const deleteAllProducts = async (cartId) => {
    try {
        const cart = await cartManager.getCartById(cartId)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        return await cartManager.deleteAllProducts(cartId)
    }

    catch(error) {
        throw error
    }
}

export const updateCart = async (cartId, products) => {
    try {
        const cart = await cartManager.getCartById(cartId)
    
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const verifyProducts = await Promise.all(products.map(async (prod) => {
                const product = await productManager.getProductById(prod.product._id);
                return product !== null
        }))
    
        const validProducts = verifyProducts.every(result => result === true);
    
        if (!validProducts) return CustomError.new(dictionary.notValidProducts)
    
        return await cartManager.updateCart(cartId, products)
    }

    catch(error) {
        throw error
    }
}

export const updateProdQuantity = async (cartId, prodId, quantity) => {
    try {
        if (isNaN(quantity)) return CustomError.new(dictionary.notValidValues)

        const cart = await cartManager.getCartById(cartId)
        
        if (!cart) return CustomError.new(dictionary.cartNotFound)
    
        const product = await productManager.getProductById(prodId)
    
        if (!product) return CustomError.new(dictionary.productNotFound)
    
        const updatedCart = await cartManager.updateProdQuantity(cartId, prodId, quantity)
    
        if (!updatedCart) return CustomError.new(dictionary.notFoundInCart)
    
        return updatedCart
    }

    catch(error) {
        throw error
    }
}

export const deleteCart = async (id) => {
    try {
        return await cartManager.deleteCart(id)
    }
    catch(error) {
        throw error
    }
}