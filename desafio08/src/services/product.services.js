import { ProductDAO } from "../dao/index.js";
import CustomError from "../utils/errors/custom.error.js"
import enumErrors from '../utils/errors/enum.errors.js'
import { generateNewProductError } from "../utils/errors/generate.new.product.error.js";

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
    
    const {title, description, year, price, stock} = product

    if (typeof title !== 'string' || typeof description !== 'string' || typeof year !== 'number' || typeof price !== 'number' || typeof stock !== 'number') {
        throw CustomError.createError({
            message: 'Not valid inputs',
            cause: generateNewProductError({title, description, year, price, stock}),
            name: 'Could not create product',
            code: enumErrors.USER_INPUT_ERROR
        })
    }
    
    do {
        product.code = (Math.floor(Math.random() * 900000) + 100000).toString();
    } 
    while (await manager.getProductByCode(product.code))

    const newProduct = await manager.createProduct(product)

    if (!newProduct) {
        throw CustomError.createError({
            message: 'Could not create product',
            cause: 'Database error',
            name: 'New product error',
            code: enumErrors.DATABASE_ERROR
        })
    }

    return newProduct
}

export const updateProduct = async (id, product) => {
    const {title, description, year, price, stock} = product

    console.log(description)

    console.log(generateNewProductError({title, description, year, price, stock}))

    if (!title !== 'string' || typeof description !== 'string' || typeof year !== 'number' || typeof price !== 'number' || typeof stock !== 'number') {
        throw CustomError.createError({
            message: 'Not valid inputs',
            cause: generateNewProductError({title, description, year, price, stock}),
            name: 'Could not update product',
            code: enumErrors.USER_INPUT_ERROR
        })
    }

    const updatedProduct = manager.updateProduct(id, product)

    if (!updatedProduct) {
        throw CustomError.createError({
            message: 'Could not create product',
            cause: 'Database error',
            name: 'New product error',
            code: enumErrors.DATABASE_ERROR
        })
    }

    return updatedProduct
}

export const deleteProduct = async id => {
    const product = manager.deleteProduct(id)

    if (!product) throw new Error('Product not found')

    return product
}