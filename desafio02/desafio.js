import fs from 'fs/promises'

class ProductManager {

    constructor() {
        this.path = './products.json';
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
        fs.writeFile(this.path, JSON.stringify(products))
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


const Productos = new ProductManager

console.log("Al principio no existe archivo json")

console.log("Agrego dos productos, lo que hace que se cree un archivo json conteniendolos")

await Productos.addProduct({
    title:"Producto prueba",
    description: "Este es un producto prueba", 
    price: 150, 
    code: "abc123", 
    stock: 25, 
    thumbnail: "Sin imagen"})

await Productos.addProduct({
        title:"Producto prueba 2", 
        description: "Este es otro producto prueba", 
        price: 180, 
        code: "abc124", 
        stock: 10, 
        thumbnail: "Sin imagen"})

console.log("Muestro en consola el listado de productos")

console.log(await Productos.getProducts());

console.log("Intento agregar un producto con código repetido")

await Productos.addProduct({
    title:"Producto prueba 3", 
    description: "Este es un producto con código repetido", 
    price: 120, 
    code: "abc123", 
    stock: 25, 
    thumbnail: "Sin imagen"})

console.log("Actualizo el producto con id 1")

await Productos.updateProduct(1, {title: "Titulo actualizado", description: "Descripción actualizada"})

console.log("Muestro en consola el producto actualizado")

console.log(await Productos.getProductById(1))

console.log("Intento mostrar en consola un producto cuyo id no existe")

console.log(await Productos.getProductById(3))

console.log("Elimino el producto con id 2")

await Productos.deleteProduct(2)

console.log("Muestro nuevamente el listado de productos")

console.log(await Productos.getProducts());

console.log("Intento eliminar un producto cuyo id no existe")

await Productos.deleteProduct(3);
