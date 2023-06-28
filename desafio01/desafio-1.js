import fs from 'fs/promises'

class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    checkInfo(prod) {
        if (prod.title && prod.description && prod.price && prod.code && prod.stock && prod.thumbnail) return true;
        else return false
    }

    codeAlreadyExists(product) {
        return (this.products.some(prod => prod.code === product.code))
    }

    addProduct(product) {
        if (!this.checkInfo(product)) return console.log("Incomplete information")

        if (this.codeAlreadyExists(product)) return console.log("Code already exists")

        const addId = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1

        product.id = addId

        this.products.push(product)

        return product
    }

    getProductIndex(id) {
        return this.products.findIndex(prod => prod.id === id)
    }

    getProductById(id) {
        const index = this.getProductIndex(id)

        if (index === -1) return null

        return this.products[index]
    }

    updateProduct(id, prod) {
        const index = this.getProductIndex(id)

        if (index) {

        const product = this.products[index]

        const updatedProduct = {...product, ...prod}

        this.products.splice(index, 1, updatedProduct)

        return updatedProduct}

        else return null
    }

    deleteProduct(id) {
        const index = this.getProductIndex(id)

        if (index) {

        this.products.splice(index, 1)

        return `Product ${id} has been deleted`}

        else return null
    }
}


const Productos = new ProductManager

console.log('Llamo a los productos, lo que devuelve un array vacío:')
console.log(Productos.getProducts());

Productos.addProduct({title:"Producto prueba", description: "Este es un producto prueba", price: 200, code: "abc123", stock: 25, thumbnail: "Sin imagen"});

console.log('LLamo a los productos después de haber agregado uno:')
console.log(Productos.getProducts());

console.log('Intento agregar un producto con un code ya usado:') 
Productos.addProduct({title:"Producto prueba", description: "Este es un producto prueba", price: 200, code: "abc123", stock: 25, thumbnail: "Sin imagen"})

console.log('Obtengo el producto con id 1:')
console.log(Productos.getProductById(1));

console.log('Intento obtener el producto con id 2:')
console.log(Productos.getProductById(2));

console.log('Se actualiza el producto con id 1: cambio su título y su precio.')
Productos.updateProduct(1, {title: "Producto actualizado", precio: 290})

console.log('Obtengo nuevamente los productos con los cambios ya realizados:')
console.log(Productos.getProducts())

console.log('Elimino el producto con id 1')
console.log(Productos.deleteProduct(1) ?? "Not found")

console.log('Al haber eliminado el único producto, ahora recibo un array vacío cuando llamo a los productos:')
console.log(Productos.getProducts())