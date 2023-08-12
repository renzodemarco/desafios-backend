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

    async getCartById(_id) {
        try {
            const cart = CartModel.find({ _id })
            return cart
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async addCart() {
        try {
            const newCart = CartModel.create({products:[]})
            return newCart
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async addProductToCart(cartId, prodId) {   // NO FUNCIONA EL POPULATE
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                return { error: true, msg: "Cart not found" }
            }

            const existingProduct = cart.products.find(prod => prod.product._id.toString() === prodId);

            if (existingProduct) {
                existingProduct.quantity ++;
            } else {
                cart.products.push({ product: prodId, quantity: 1 });
            }

            await cart.save();
            
            return {cart: cartId, newProduct: prodId}
        }

        catch(e) {
            return { error: true, msg: e.message }
        }
    }

    async deleteProductFromCart(cartId, prodId) {
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                return { error: true, msg: "Cart not found" }
            }

            const productIndex = cart.products.findIndex(prod => prod.product._id.toString() === prodId);

            if (productIndex === -1) {
                return { error: true, msg: "Product not found" }
            } 

            if (cart.products[productIndex].quantity === 1) {
                cart.products.splice([productIndex], 1)
            }

            else {
                cart.products[productIndex].quantity--
            }

            await cart.save();
            
            return {cart: cartId, product: prodId, msg: "One product has been deleted"}
        }

        catch(e) {
            return { error: true, msg: e.message }
        }
    }

    async deleteAllProducts(cartId) {
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                return { error: true, msg: "Cart not found" }
            }

            cart.products = []

            cart.save()

            return {cart: cartId, msg: "All the products have been deleted"}
        }

        catch(e) {
            return { error: true, msg: e.message }
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                return "Cart not found"
            }

            if(!Array.isArray(products)) {
                return { error: true, msg: "Products must be an array"}
            }

            cart.products = products

            cart.save()

            return {cart: cartId, updated: true}
        }

        catch(e) {
            return { error: true, msg: e.message }
        }
    }

    async updateProdQuantity(cartId, prodId, quantity) {
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                return "Cart not found"
            }

            const product = cart.products.find(prod => prod.product._id.toString() == prodId)

            if (!product) return "Product not found in cart"

            product.quantity = quantity

            await cart.save();
            
            return {cart: cartId, product: prodId, newQuantity: quantity}
        }

        catch(e) {
            return { error: true, msg: e.message }
        }
    }
}



const manager = new CartManager()

console.log(await manager.addProductToCart('64d7d02b706458d74832ead9','64d7bf86678402946f7a126a'))

// console.log(await manager.deleteProductFromCart('64d7d02b706458d74832ead9','64d7bf86678402946f7a1263'))

// console.log(await manager.updateProdQuantity('64d7d02b706458d74832ead9','64d7bf86678402946f7a1263', 200))