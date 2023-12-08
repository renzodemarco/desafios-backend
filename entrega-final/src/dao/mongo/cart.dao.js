import CartModel from "../../models/carts.model.js";

export default class CartManager {

    constructor() { }

    async getCarts(next) {
        try {
            return await CartModel.find()
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async getCartById(_id, next) {
        try {
            return await CartModel.findOne({ _id }).lean()
        }
        catch(error) {
            error.from = 'dao'
            return(next)
        }
    }

    async createCart(next) {
        try {
            return await CartModel.create({products: []})
        }
        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async addProductToCart(cartId, prodId, next) {
        try {
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

        catch(error) {
            error.from = 'dao'
            return next(error)
        }        
    }

    async addOwner(cartId, owner, next) {
        try {
            const cart = await CartModel.findOne({ _id: cartId })

            cart.owner = owner
    
            cart.save()
            
            return cart
        }

        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async deleteProductFromCart(cartId, prodId, next) {
        try {
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

        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async deleteAllProducts(cartId, next) {
        try {
            const cart = await CartModel.findOne({ _id: cartId })

            cart.products = []
    
            cart.save()
    
            return cart
        }

        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }

    async updateCart(cartId, products, next) {
        try {
            const cart = await CartModel.findOne({ _id: cartId })

            cart.products = products
    
            cart.save()
    
            return cart
        }

        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }


    async updateProdQuantity(cartId, prodId, quantity, next) {
        try {
            const cart = await CartModel.findOne({ _id: cartId })

            const product = cart.products.find(prod => prod.product._id.toString() == prodId)
    
            if (!product) return false
    
            product.quantity = quantity
    
            await cart.save();
    
            return cart
        }

        catch(error) {
            error.from = 'dao'
            return next(error)
        }
    }
}
