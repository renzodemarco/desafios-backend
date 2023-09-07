import {promises as fs} from 'fs'
import ProductManager from './productManager.js'

export default class CartManager {

    constructor(path) {
        this.path = path;
        this.cartList = []
        this.initialize();
    }

    async initialize() {
        try {
            this.cartList = await this.getCartList()
        }
        catch (e) {
            console.log(e)
        }
    }

    async getCartList() {
        try {
            const file = await this.#readCarts(this.path)
            const cartList = JSON.parse(file)
            return cartList;
        }
        
        catch(e) {
            await this.#writeCarts([])
            return []
        }
    }

    async #writeCarts(cartList) {
        await fs.writeFile(this.path, JSON.stringify(cartList, null, 2))
        this.cartList = cartList
    }

    async #readCarts(path) {
        return await fs.readFile(path, 'utf-8')
    }

    async getCartById(id) {
        const cartList = await this.getCartList();

        return cartList.find(cart => cart.id === id) || "Not found"
    }

    async addCart() {
        try {
            const cartList = await this.getCartList()

            const addId = cartList.length === 0 ? 1 : cartList[cartList.length - 1].id + 1

            const cart = {
                id: addId,
                products: []
            }

            cartList.push(cart)

            await this.#writeCarts(cartList)

            return cart
        }
        
        catch (e) {
            console.log(e)
        }
    }

    addProductToCart(cart, prodId) {
        const prodIndex = cart.products.findIndex(prod => prod.product === prodId)

        if (prodIndex != -1) {
            cart.products[prodIndex].quantity ++
        }

        else {
            cart.products.push({
                product: prodId,
                quantity: 1
            })
        }
    }

    async productExists(id) {
        const manager = new ProductManager('preentrega1/src/db/products.json')

        const newProd = await manager.getProductById(id)

        return typeof newProd === 'object'
    }

    async addProduct(cartId, prodId) {
        try {

            if (await this.productExists(prodId)) {
                
                const cartList = await this.getCartList()

                const cartIndex = cartList.findIndex(prod => prod.id === cartId);

                if (cartIndex != -1) {

                        let cart = cartList[cartIndex]

                        this.addProductToCart(cart, prodId)

                        cartList[cartIndex] = cart

                        await this.#writeCarts(cartList)

                        return cart
                    }

                else return "Cart not found"
            }

            else return "Product not found"
        }

        catch(e) {
            console.log(e)
        }
    }
}