import { ProductDAO } from "../dao/index.js";
import dictionary from '../utils/error.dictionary.js'
import CustomError from '../utils/error.custom.js'

const manager = new ProductDAO()

export const getProducts = async (options, next) => {
    try {
        return manager.getProducts(options, next)
    }
    catch(error) {
        error.from = "service"
        return next(error)
    }
}

export const getProductById = async (id, next) => {
    try {
        const product = await manager.getProductById(id, next)

        if (!product) return CustomError.new(dictionary.productNotFound)

        return product
    }
    catch(error) {
        error.from = "service"
        return next(error)
    }
}

export const createProduct = async (product, next) => {
    try {
        do {
            product.code = (Math.floor(Math.random() * 900000) + 100000).toString();
        } 
        while (await manager.getProductByCode(product.code, next))
    
        return await manager.createProduct(product, next)
    }
    catch(error) {
        error.from = "service"
        return next(error)
    }
}

export const updateProduct = async (id, product, next) => {
    try {
        return await manager.updateProduct(id, product, next)
    }
    catch(error) {
        error.from = "service"
        return next(error)
    }    
}

export const deleteProduct = async (id, next) => {
    try {
        return await manager.deleteProduct(id)
    }
    catch(error) {
        error.from = "service"
        return next(error)
    }
}