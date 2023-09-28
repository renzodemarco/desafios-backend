import { ProductDAO } from "../dao/index.js";

const manager = new ProductDAO()

export const getProducts = async options => {
    const products = await manager.getProducts(options)

    if (!products) throw new Error('Could not get products')

    return products
}

export const getProductById = async id => {
    const product = await manager.getProductById(id)

    if (!product) throw new Error('Product not found')

    return product
}

export const createProduct = async product => {
    // Acá le creo un code y verifico que no se repita
    do {
        product.code = (Math.floor(Math.random() * 900000) + 100000).toString();
    } 
    while (await manager.getProductByCode(product.code))

    const newProduct = await manager.createProduct(product)

    if (!newProduct) throw new Error('Product not found')

    return newProduct
}

export const updateProduct = async (id, product) => {
    const updatedProduct = manager.updateProduct(id, product)

    if (!updatedProduct) throw new Error('Product not found')

    return updatedProduct
}

export const deleteProduct = async id => {
    const product = manager.deleteProduct(id)

    if (!product) throw new Error('Product not found')

    return product
}