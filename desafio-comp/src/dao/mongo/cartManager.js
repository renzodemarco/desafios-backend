import mongoose from "mongoose";
import CartModel from "../models/carts.model.js";
import productManager from './productManager.js'

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority')

export default class CartManager {

    constructor() { }

    async getCartList() {
        try {
            const data = CartModel.find()
            return data
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async getCartById(id) {
        try {
            const cart = CartModel.find({ id })
            return cart
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async addCart(id) {
        try {
            const newCart = CartModel.insertMany([{ id, products: [] }])
            return newCart
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async addProductToCart(cartId, prodCode) {
        try {
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }
}