import { ProductDAO } from "../dao/index.js";
import dictionary from '../utils/error.dictionary.js'
import CustomError from '../utils/error.custom.js'

const manager = new ProductDAO()

export const getProducts = async (options) => {
    try {
        return manager.getProducts(options)
    }
    catch(error) {
        throw error
    }
}

export const getProductById = async (id) => {
    try {
        const product = await manager.getProductById(id)

        if (!product) return CustomError.new(dictionary.productNotFound)

        return product
    }
    catch(error) {
        throw error
    }
}

export const createProduct = async (product) => {
    try {
        do {
            product.code = (Math.floor(Math.random() * 900000) + 100000).toString();
        } 
        while (await manager.getProductByCode(product.code))
    
        return await manager.createProduct(product)
    }
    catch(error) {
        throw error
    }
}

export const updateProduct = async (id, product) => {
    try {
        return await manager.updateProduct(id, product)
    }
    catch(error) {
        throw error
    }    
}

export const deleteProduct = async (id) => {
    try {
        return await manager.deleteProduct(id)
    }
    catch(error) {
        throw error
    }
}