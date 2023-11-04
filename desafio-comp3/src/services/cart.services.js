import { CartDAO, ProductDAO } from "../dao/index.js";
import { generateCartError, generateProductError, generateProductInCartError } from "../utils/errors/generate.error.cause.js";

const cartManager = new CartDAO()
const productManager = new ProductDAO()

export const getCarts = async () => {
    return await cartManager.getCarts()
}

export const getCartById = async id => {
    const cart = await cartManager.getCartById(id)

    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(id),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    return cart
}

export const createCart = async () => {
    return await cartManager.createCart()
}

export const addProductToCart = async (cartId, prodId) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(cartId),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    const product = await productManager.getProductById(prodId)

    if (!product) throw CustomError.createError({
        message: 'Product not found',
        cause: generateProductError(prodId),
        name: 'Could not find product',
        code: enumErrors.DATABASE_ERROR
    })

    if (product.stock < 1) throw new Error('Not stock')

    await productManager.updateProduct(product._id, {
        stock: product.stock - 1,
    });

    return await cartManager.addProductToCart(cartId, prodId)
}

export const deleteProductFromCart = async (cartId, prodId) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(cartId),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    const product = await productManager.getProductById(prodId)

    if (!product) throw CustomError.createError({
        message: 'Product not found',
        cause: generateProductError(prodId),
        name: 'Could not find product',
        code: enumErrors.DATABASE_ERROR
    })

    const updatedCart = await cartManager.deleteProductFromCart(cartId, prodId) 

    if (!updatedCart) throw CustomError.createError({
        message: 'Product not found in cart',
        cause: generateProductInCartError(cartId, prodId),
        name: 'Could not find product in cart',
        code: enumErrors.DATABASE_ERROR
    })

    return updatedCart
}

export const deleteAllProducts = async cartId => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(cartId),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    return await cartManager.deleteAllProducts(cartId)
}

export const updateCart = async (cartId, products) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(cartId),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    const verifyProducts = await Promise.all(products.map(async prod => {
            const product = await productManager.getProductById(prod.product._id);
            return product !== null
    }))

    const validProducts = verifyProducts.every(result => result === true);

    if (!validProducts) throw new Error("Products not valid")

    return await cartManager.updateCart(cartId, products)
}

export const updateProdQuantity = async (cartId, prodId, quantity) => {
    if (isNaN(quantity)) throw new Error("Quantity not valid")

    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw CustomError.createError({
        message: 'Cart not found',
        cause: generateCartError(cartId),
        name: 'Could not find cart',
        code: enumErrors.DATABASE_ERROR
    })

    const product = await productManager.getProductById(prodId)

    if (!product) throw CustomError.createError({
        message: 'Product not found',
        cause: generateProductError(prodId),
        name: 'Could not find product',
        code: enumErrors.DATABASE_ERROR
    })

    const updatedProduct = await cartManager.updateProdQuantity(cartId, prodId, quantity)

    if (!updatedCart) throw CustomError.createError({
        message: 'Product not found in cart',
        cause: generateProductInCartError(cartId, prodId),
        name: 'Could not find product in cart',
        code: enumErrors.DATABASE_ERROR
    })

    return updatedProduct
}