import {promises as fs} from 'fs'

export default class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = this.getProducts();
    }

    async getProducts() {
        try {
            const file = await this.readFile(this.path)
            const products = JSON.parse(file)
            return products;
        }
        catch(e) {
            await this.writeProducts([])
            return []
        }
    }

    async writeProducts(products) {
        fs.writeFile(this.path, JSON.stringify(products, null, 2))
        this.products = products
    }

    async readFile(path) {
        return await fs.readFile(path, 'utf-8')
    }

    checkInfo(prod) {
        if (prod.title && prod.description && prod.price && prod.code && prod.stock && prod.thumbnail) return true;
        else return false
    }

    async codeAlreadyExists(product) {
        const products = await this.getProducts()

        return (products.some(prod => prod.code === product.code))
    }

    async addProduct(product) {
        if (!this.checkInfo(product)) return console.log("Incomplete information")

        try {
            const products = await this.getProducts()

            if (await this.codeAlreadyExists(product)) console.log("Code already exists")

            else {
                const addId = products.length === 0 ? 1 : products[products.length - 1].id + 1

                product.id = addId

                products.push(product)

                await this.writeProducts(products)

                return product
            }
        } 

        catch (e) {
            console.log(e)
        }
    }

    async getProductIndex(id) {
        const products = await this.getProducts()

        return products.findIndex(prod => prod.id === id)
    }

    async getProductById(id) {
        const index = await this.getProductIndex(id)

        const products = await this.getProducts()

        if (index === -1) return "Not found"

        else return products[index]
    }

    async updateProduct(id, prod) {
        const index = await this.getProductIndex(id)

        const products = await this.getProducts()

        if (index != -1) {

            try {
                const product = products[index]

                const updatedProduct = {...product, ...prod}

                products.splice(index, 1, updatedProduct)

                await this.writeProducts(products)

                return updatedProduct
            }

            catch (e) {
                console.log(e)
            }
        }

        else console.log("Not found")
    }

    async deleteProduct(id) {
        const index = await this.getProductIndex(id)

        const products = await this.getProducts()

        if (index != -1) {

            try {
                products.splice(index, 1)

                await this.writeProducts(products)

                console.log(`Product ${id} has been deleted`)
            }

            catch(e) {
                console.log(e)
            }
        }

        else console.log("Not found")
    }
}
