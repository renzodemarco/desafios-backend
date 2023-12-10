import CartModel from "../../models/carts.model.js";

export default class CartManager {

    constructor() { }

    async getCarts() {
        return await CartModel.find()
    }

    async getCartById(_id) {
        return await CartModel.findOne({ _id }).lean()
    }

    async createCart() {
        return await CartModel.create({ products: [] })
    }

    async deleteCart(id) {
        return await CartModel.findByIdAndDelete(id)
    }

    async addProductToCart(cartId, prodId) {
        const cart = await CartModel.findOne({ _id: cartId })

        const existingProduct = cart.products.find(prod => prod.product._id.toString() === prodId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: prodId, quantity: 1 });
        }

        await cart.save();

        return cart
    }

    async addOwner(cartId, owner) {
        const cart = await CartModel.findOne({ _id: cartId })

        cart.owner = owner

        cart.save()

        return cart
    }

    async deleteProductFromCart(cartId, prodId) {
        const cart = await CartModel.findOne({ _id: cartId })

        const productIndex = cart.products.findIndex(prod => prod.product._id.toString() === prodId);

        if (productIndex === -1) {
            return false
        }

        if (cart.products[productIndex].quantity === 1) {
            cart.products.splice([productIndex], 1)
        }

        else {
            cart.products[productIndex].quantity--
        }

        await cart.save();

        return cart
    }

    async deleteAllProducts(cartId) {
        const cart = await CartModel.findOne({ _id: cartId })

        cart.products = []

        cart.save()

        return cart
    }

    async updateCart(cartId, products) {
        const cart = await CartModel.findOne({ _id: cartId })

        cart.products = products

        cart.save()

        return cart
    }


    async updateProdQuantity(cartId, prodId, quantity) {
        const cart = await CartModel.findOne({ _id: cartId })

        const product = cart.products.find(prod => prod.product._id.toString() == prodId)

        if (!product) return false

        product.quantity = quantity

        await cart.save();

        return cart
    }
}
