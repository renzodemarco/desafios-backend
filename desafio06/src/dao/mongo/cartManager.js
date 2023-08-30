import mongoose from "mongoose";
import CartModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";

const connection = await mongoose.connect('mongodb+srv://renzodemarco:coderhouse@rencluster.iuxqmho.mongodb.net/ecommerce?retryWrites=true&w=majority')

export default class CartManager {

    constructor() { }

    async getCartList() {
        try {
            const data = CartModel.find().lean()
            return data
        }
        catch (e) {
            return { error: true, msg: e.message }
        }
    }

    async getCartById(_id) {
        try {
            const cart = CartModel.findOne({ _id }).lean()
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

    async addProductToCart(cartId, prodId) { 
        try {
            const cart = await CartModel.findOne({_id: cartId})

            if (!cart) {
                throw new Error( { error: true, msg: "Cart not found" })
            }

            const product = await ProductModel.findOne({_id: prodId})
            
            if (!product) {
                return { error: true, msg: "Product not found" }
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

            return {updated: true, cart}
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


// ! CUANDO CORRO ESTE CODIGO FUNCIONA PERO NO CUANDO LO HAGO DESDE MI REST API

// * PARA ELIMINAR "THE WALL":
// console.log(await manager.deleteProductFromCart('64d7d02b706458d74832ead9','64d7bf86678402946f7a1261'))

// * PARA MODIFICAR QUANTITY DE "THE DARK SIDE OF THE MOON":
// console.log(await manager.updateProdQuantity('64d7d02b706458d74832ead9', '64d7bf86678402946f7a126a', 120))