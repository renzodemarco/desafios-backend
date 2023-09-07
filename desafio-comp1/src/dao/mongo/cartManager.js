import mongoose from "mongoose";
import CartModel from "../models/carts.model.js";

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

    async addProductToCart(prodCode, cartId) {
        try {
            const cart = await CartModel.findOne({ id: cartId });

            if (!cart) {
                return "Cart not found"
            }

            const existingProduct = cart.products.find(prod => prod.product === prodCode);

            if (existingProduct) {
                existingProduct.quantity ++;
            } else {
                cart.products.push({ product: prodCode, quantity: 1 });
            }

            await cart.save();
            
            return {cart: cartId, newProduct: prodCode}
        } 
        catch(e) {
            return { error: true, msg: e.message }
        }
    }
    
}