import { CartDAO, ProductDAO} from "../dao/index.js";

const cartManager = new CartDAO()
const ProductManager = new ProductDAO()

export const getCarts = async () => {
    return await cartManager.getCarts()
}

export const getCartById = async id => {
    const cart = await cartManager.getCartById(id)

    if (!cart) throw new Error("Cart not found")

    return cart
}

export const createCart = async () => {
    return await cartManager.createCart()
}

export const addProductToCart = async (cartId, prodId) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw new Error("Cart not found")

    const product = await productManager.getProductById(prodId)

    if (!product) throw new Error("Product not found")

    return await cartManager.addProductToCart(cartId, prodId)
}

export const deleteProductFromCart = async (cartId, prodId) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw new Error("Cart not found")

    const product = await productManager.getProductById(prodId)

    if (!product) throw new Error("Product not found")

    const updatedCart = await cartManager.deleteProductFromCart(cartId, prodId) 

    if (!updatedCart) throw new Error("Product not found in cart")

    return updatedCart
}

export const deleteAllProducts = async cartId => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw new Error("Cart not found")

    return await cartManager.deleteAllProducts(cartId)
}

export const updateCart = async (cartId, products) => {
    const cart = await cartManager.getCartById(cartId)
    
    if (!cart) throw new Error("Cart not found")

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
    
    if (!cart) throw new Error("Cart not found")

    const product = await productManager.getProductById(prodId)

    if (!product) throw new Error("Product not found")

    const updatedProduct = await cartManager.updateProdQuantity(cartId, prodId, quantity)

    if (!updatedProduct) throw new Error("Product doest not exist in cart")

    return updatedProduct
}