import ProductManager from "../dao/mongo/product.dao";

const manager = new ProductManager()

export const getProducts = async () => {
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
    const product = await manager.getProductById(product)

    if (!product) throw new Error('Product not found')

    return product
}

export const updateProduct = async (id, product) => {
    const product = manager.updateProduct(id, product)

    if (!product) throw new Error('Product not found')

    return product
}

export const deleteProduct = async id => {
    const product = manager.deleteProduct(id)

    if (!product) throw new Error('Product not found')

    return product
}