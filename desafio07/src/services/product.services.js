import ProductManager from "../dao/mongo/product.dao.js";

const manager = new ProductManager()

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