class Product {

    constructor() {
        this.products = [{titulo: 'mate', id: 1}]
    }

    delete(id) {
        const index = this.getIndex(id)
    
        if (index != -1) {

        const product = this.products[index]
    
        this.products.splice(index, 1)
    
        return product
    }
    
        else return null
    }

    getIndex(id) {
        return this.products.findIndex(prod => prod.id === id)
    }

    getById(id) {
        const index = this.getProductIndex(id)

        if (index === -1) return null

        return this.products[index]
    }


}

class ProductManager {
    
    constructor() {
        this.product = new Product()
    }

    delete(id) {
        const product = this.product.delete(id)

        product ? console.log(`Producto ${id} eliminado`) : console.log("No se encuentra el producto")
    }
}


const productManager = new ProductManager()

const product = new Product()

console.log(productManager.product.products)

productManager.delete(1)

console.log(productManager.product.products)
