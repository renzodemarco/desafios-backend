import mongoose from 'mongoose'
import ProductModel from '../models/products.model.js'

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority')

export default class productManager {

    constructor() { }

    async getProducts(limit) {
        try {
            if (limit) {
                return await ProductModel.find().limit().lean()
            }
                return await ProductModel.find().lean()
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

    async getProductById(id) {
        try {
            const product = await ProductModel.find({_id: id})
            return product
        }
        catch(e) {
            return {error: true, msg: e.message}
        }
    }

    async updateProduct(id, prod) {
        try {
            const updatedProduct = await ProductModel.findOneAndUpdate({_id: id}, prod, {new: true})
            return updatedProduct
        }
        catch (e) {
            return {error: true, msg: e.message}
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await ProductModel.findOneAndDelete({_id: id})
            return deletedProduct
        }
        catch (e) {
            return {error: true, msg: e.message}
        }
    }
}