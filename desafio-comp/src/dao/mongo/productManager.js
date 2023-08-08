import mongoose from 'mongoose'
import ProductModel from '../models/products.model.js'

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority')

export default class productManager {

    constructor() { }

    async getProducts() {
        try {
            const products = await ProductModel.find()
            return products;
        }
        catch(e) {
            return {error: true, msg: e.message}
        }
    }

    async addProduct(product) {
        try {
            await ProductModel.insertMany([product])
            return product
        }

        catch (e) {
            return {error: true, msg: e.message}
        }
    }

    async getProductByCode(code) {
        try {
            const product = await ProductModel.find({code})
            return product
        }
        catch(e) {
            return {error: true, msg: e.message}
        }
    }

    async updateProduct(code, prod) {
        try {
            const updatedProduct = await ProductModel.findOneAndUpdate({code}, prod, {new: true})
            return updatedProduct
        }
        catch (e) {
            return {error: true, msg: e.message}
        }
    }

    async deleteProduct(code) {
        try {
            const deletedProduct = await ProductModel.findOneAndDelete({code})
            return deletedProduct
        }
        catch (e) {
            return {error: true, msg: e.message}
        }
    }
}