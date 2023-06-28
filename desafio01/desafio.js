class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, code, stock, thumbnail) {

        const addId = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1

        const codeExists = (prod) => prod.code === product.code

        const product = {
            title,
            description,
            price,
            thumbnail, 
            code,
            stock,
            id: addId
        }

        if (this.products.some(prod => codeExists(prod))) return "Code already exists"

        if (!title || !description || !price || !code || !stock || !thumbnail) return "Incomplete information"

        this.products.push(product)

        return product
    }

    getProductById(id) {
        const productIndex = this.products.findIndex(prod => prod.id === id)

        if (productIndex === -1) return "Not found"

        return this.products[productIndex]
    }
}


const Productos = new ProductManager

console.log('Llamo a los productos, lo que devuelve un array vacío:')
console.log(Productos.getProducts());

Productos.addProduct("Producto prueba", "Este es un producto prueba", 200, "abc123", 25, "Sin imagen");

console.log('LLamo a los productos después de haber agregado uno:')
console.log(Productos.getProducts());

console.log('Intento agregar un producto con un code ya usado:') 
console.log(Productos.addProduct("Producto prueba", "Este es un producto prueba", 200, "abc123", 25, "Sin imagen"))

console.log('Obtengo el producto con id 1:')
console.log(Productos.getProductById(1));

console.log('Intento obtener el producto con id 2:')
console.log(Productos.getProductById(2));